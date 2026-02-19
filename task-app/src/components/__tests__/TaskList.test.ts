import { mount } from '@vue/test-utils'
import TaskList from '../TaskList.vue'
import type { Task } from '../../types.ts'

const tasks: Task[] = [
  { id: '1', title: 'Buy milk', done: false },
  { id: '2', title: 'Walk the dog', done: true },
  { id: '3', title: 'Read a book', done: false },
]

describe('TaskList', () => {
  it('renders one article per task', () => {
    const wrapper = mount(TaskList, { props: { tasks } })
    expect(wrapper.findAll('article').length).toBe(tasks.length)
  })

  it('displays each task title', () => {
    const wrapper = mount(TaskList, { props: { tasks } })
    const spans = wrapper.findAll('span')
    expect(spans[0].text()).toBe('Buy milk')
    expect(spans[1].text()).toBe('Walk the dog')
    expect(spans[2].text()).toBe('Read a book')
  })

  it('applies the done class only on completed tasks', () => {
    const wrapper = mount(TaskList, { props: { tasks } })
    const spans = wrapper.findAll('span')
    expect(spans[0].classes()).not.toContain('done')
    expect(spans[1].classes()).toContain('done')
    expect(spans[2].classes()).not.toContain('done')
  })

  it('checks the checkbox only for completed tasks', () => {
    const wrapper = mount(TaskList, { props: { tasks } })
    const checkboxes = wrapper.findAll('input[type="checkbox"]')
    expect((checkboxes[0].element as HTMLInputElement).checked).toBe(false)
    expect((checkboxes[1].element as HTMLInputElement).checked).toBe(true)
    expect((checkboxes[2].element as HTMLInputElement).checked).toBe(false)
  })

  it('emits toggleTask with the correct id when a checkbox is clicked', async () => {
    const wrapper = mount(TaskList, { props: { tasks } })
    await wrapper.findAll('input[type="checkbox"]')[0].trigger('input')
    expect(wrapper.emitted('toggleTask')).toEqual([['1']])
  })

  it('emits removeTask with the correct id when Remove is clicked', async () => {
    const wrapper = mount(TaskList, { props: { tasks } })
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('removeTask')).toEqual([['2']])
  })

  it('renders nothing when tasks is empty', () => {
    const wrapper = mount(TaskList, { props: { tasks: [] } })
    expect(wrapper.findAll('article').length).toBe(0)
  })
})
