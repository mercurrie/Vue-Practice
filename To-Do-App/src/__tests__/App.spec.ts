import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import { createPinia } from 'pinia'
import App from '../App.vue'

const vuetify = createVuetify()

function mountApp() {
  return mount(App, {
    global: {
      plugins: [createPinia(), vuetify],
    },
  })
}

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the app bar title', () => {
    const wrapper = mountApp()
    expect(wrapper.text()).toContain('To-Do App')
  })

  it('loads seed data on first render', () => {
    const wrapper = mountApp()
    expect(wrapper.text()).toContain('Buy groceries')
    expect(wrapper.text()).toContain('Morning workout')
    expect(wrapper.text()).toContain('Read Vue docs')
  })

  it('renders three ToDoCards from seed data', () => {
    const wrapper = mountApp()
    const cards = wrapper.findAllComponents({ name: 'ToDoCard' })
    expect(cards.length).toBe(3)
  })

  it('persists todos to localStorage after a change', async () => {
    const wrapper = mountApp()
    const cards = wrapper.findAllComponents({ name: 'ToDoCard' })
    // Trigger a delete so the store persists
    await cards[0]!.vm.$emit('delete', cards[0]!.props().todo.id)
    await wrapper.vm.$nextTick()

    const stored = localStorage.getItem('todo-app-data')
    expect(stored).toBeTruthy()
    const parsed = JSON.parse(stored!)
    expect(parsed.length).toBe(2)
  })

  it('loads from localStorage when data exists', () => {
    const customTodos = [
      { id: 99, header: 'Custom Task', description: 'From storage', done: false },
    ]
    localStorage.setItem('todo-app-data', JSON.stringify(customTodos))

    const wrapper = mountApp()
    expect(wrapper.text()).toContain('Custom Task')
    expect(wrapper.text()).toContain('From storage')
  })

  it('deletes a todo when delete event is emitted', async () => {
    const wrapper = mountApp()
    const cards = wrapper.findAllComponents({ name: 'ToDoCard' })
    expect(cards.length).toBe(3)

    await cards[0]!.vm.$emit('delete', cards[0]!.props().todo.id)
    await wrapper.vm.$nextTick()

    const updatedCards = wrapper.findAllComponents({ name: 'ToDoCard' })
    expect(updatedCards.length).toBe(2)
  })

  it('updates a todo when update event is emitted', async () => {
    const wrapper = mountApp()
    const cards = wrapper.findAllComponents({ name: 'ToDoCard' })
    const firstTodo = cards[0]!.props().todo

    await cards[0]!.vm.$emit('update', { ...firstTodo, header: 'Updated!' })
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Updated!')
  })

  it('has an add button', () => {
    const wrapper = mountApp()
    const addBtn = wrapper.findAll('.v-btn').find(
      (btn) => btn.find('.mdi-plus').exists()
    )
    expect(addBtn).toBeTruthy()
  })
})
