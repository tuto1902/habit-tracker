import { describe, it, expect, beforeEach, vitest } from 'vitest'
import { mount } from '@vue/test-utils'
import ExecuteButton from '@/components/ExecuteButton.vue'
import { createTestingPinia } from '@pinia/testing'

describe('ExecuteButton.vue', () => {
    let wrapper = null

    beforeEach(() => {
        wrapper = mount(ExecuteButton, {
            plugins: [createTestingPinia({
                createSpy: vitest.fn
            })]
        })
    })

    it('renders the button', () => {
        expect(wrapper.find('#execute').text()).toBe('+1')
    })

    it('increments the executions', async () => {
        await wrapper.find('#execute').trigger('click')

        expect(wrapper.emitted('newExecution')).toBeTruthy()
    })
})