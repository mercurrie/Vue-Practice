import { mount } from '@vue/test-utils'
import TaskForm from '../TaskForm.vue'

describe('TaskForm', () => {
  it('emits addTask with trimmed value on valid submit', async () => {
    const wrapper = mount(TaskForm)
    await wrapper.find('input').setValue('Buy milk')
    await wrapper.find('form').trigger('submit')
    expect(wrapper.emitted('addTask')).toEqual([['Buy milk']])
  })

  it('trims whitespace from the emitted value', async () => {
    const wrapper = mount(TaskForm)
    await wrapper.find('input').setValue('  Buy milk  ')
    await wrapper.find('form').trigger('submit')
    expect(wrapper.emitted('addTask')).toEqual([['Buy milk']])
  })

  it('clears the input after a successful submit', async () => {
    const wrapper = mount(TaskForm)
    await wrapper.find('input').setValue('Buy milk')
    await wrapper.find('form').trigger('submit')
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('')
  })

  it('shows an error when submitted empty', async () => {
    const wrapper = mount(TaskForm)
    await wrapper.find('form').trigger('submit')
    expect(wrapper.find('small').text()).toBe('Task Cannot Be Empty!')
  })

  it('does not emit when submitted with only whitespace', async () => {
    const wrapper = mount(TaskForm)
    await wrapper.find('input').setValue('   ')
    await wrapper.find('form').trigger('submit')
    expect(wrapper.emitted('addTask')).toBeUndefined()
  })

  it('clears the error when the user starts typing', async () => {
    const wrapper = mount(TaskForm)
    await wrapper.find('form').trigger('submit') // trigger error state
    expect(wrapper.find('small').exists()).toBe(true)
    await wrapper.find('input').setValue('B')    // @input clears errorValue
    expect(wrapper.find('small').exists()).toBe(false)
  })
})
