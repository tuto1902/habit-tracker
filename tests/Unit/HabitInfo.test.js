import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import HabitInfo from '@/components/HabitInfo.vue';

describe('HabitInfo.vue', () => {
    let wrapper = null

    beforeEach(() => {
        wrapper = mount(HabitInfo, {
            props: {
                name: 'Drink water',
                times_per_day: 3,
                executions_count: 1
            }
        })
    })

    it('displays the habit name', () => {
        expect(wrapper.find('#name').text()).toBe('Drink water')
    })

    it('displays the executions', () => {
        expect(wrapper.find('#executions').text()).toBe('1 / 3 times')
    })
})