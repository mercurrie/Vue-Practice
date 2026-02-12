import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import ToDoCard from '../ToDoCard.vue'

const vuetify = createVuetify()

function mountCard(todo = {
  id: 1,
  header: 'Test Task',
  description: 'Test description',
  done: false,
}) {
  return mount(ToDoCard, {
    props: { todo },
    global: {
      plugins: [vuetify],
    },
  })
}

describe('ToDoCard', () => {
  it('renders header and description', () => {
    const wrapper = mountCard()
    expect(wrapper.text()).toContain('Test Task')
    expect(wrapper.text()).toContain('Test description')
  })

  it('shows "To-Do" label when not done', () => {
    const wrapper = mountCard()
    expect(wrapper.text()).toContain('To-Do')
  })

  it('shows "Done" label when done', () => {
    const wrapper = mountCard({
      id: 1,
      header: 'Done Task',
      description: 'Finished',
      done: true,
    })
    expect(wrapper.text()).toContain('Done')
  })

  it('applies strikethrough class when done', () => {
    const wrapper = mountCard({
      id: 1,
      header: 'Done Task',
      description: 'Finished',
      done: true,
    })
    const title = wrapper.find('.v-card-title span')
    expect(title.classes()).toContain('text-decoration-line-through')
  })

  it('does not apply strikethrough class when not done', () => {
    const wrapper = mountCard()
    const title = wrapper.find('.v-card-title span')
    expect(title.classes()).not.toContain('text-decoration-line-through')
  })

  it('emits update with toggled done when checkbox is clicked', async () => {
    const wrapper = mountCard()
    const checkbox = wrapper.findComponent({ name: 'v-checkbox' })
    await checkbox.vm.$emit('update:modelValue', true)
    expect(wrapper.emitted('update')).toBeTruthy()
    const emitted = wrapper.emitted('update')![0]![0] as any
    expect(emitted.done).toBe(true)
  })

  it('emits delete with id when delete button is clicked', async () => {
    const wrapper = mountCard()
    const deleteBtn = wrapper.findAll('.v-btn').find(
      (btn) => btn.find('.mdi-delete').exists()
    )
    await deleteBtn!.trigger('click')
    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')![0]![0]).toBe(1)
  })

  it('enters edit mode when edit button is clicked', async () => {
    const wrapper = mountCard()
    const editBtn = wrapper.findAll('.v-btn').find(
      (btn) => btn.find('.mdi-pencil').exists()
    )
    await editBtn!.trigger('click')
    expect(wrapper.findComponent({ name: 'v-text-field' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'v-textarea' }).exists()).toBe(true)
  })

  it('emits update with new values on save', async () => {
    const wrapper = mountCard()
    // Enter edit mode
    const editBtn = wrapper.findAll('.v-btn').find(
      (btn) => btn.find('.mdi-pencil').exists()
    )
    await editBtn!.trigger('click')

    // Modify fields via component vm
    const textField = wrapper.findComponent({ name: 'v-text-field' })
    const textarea = wrapper.findComponent({ name: 'v-textarea' })
    await textField.vm.$emit('update:modelValue', 'Updated Header')
    await textarea.vm.$emit('update:modelValue', 'Updated Description')

    // Click save
    const saveBtn = wrapper.findAll('.v-btn').find(
      (btn) => btn.text() === 'Save'
    )
    await saveBtn!.trigger('click')

    const emitted = wrapper.emitted('update')!
    const lastUpdate = emitted[emitted.length - 1]![0] as any
    expect(lastUpdate.header).toBe('Updated Header')
    expect(lastUpdate.description).toBe('Updated Description')
  })

  it('exits edit mode on cancel without emitting', async () => {
    const wrapper = mountCard()
    // Enter edit mode
    const editBtn = wrapper.findAll('.v-btn').find(
      (btn) => btn.find('.mdi-pencil').exists()
    )
    await editBtn!.trigger('click')
    expect(wrapper.findComponent({ name: 'v-text-field' }).exists()).toBe(true)

    // Click cancel
    const cancelBtn = wrapper.findAll('.v-btn').find(
      (btn) => btn.text() === 'Cancel'
    )
    await cancelBtn!.trigger('click')

    // Should exit edit mode, no update emitted
    expect(wrapper.findComponent({ name: 'v-text-field' }).exists()).toBe(false)
    expect(wrapper.emitted('update')).toBeFalsy()
  })
})
