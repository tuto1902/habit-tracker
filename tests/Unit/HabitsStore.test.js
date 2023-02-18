import { createPinia, setActivePinia } from "pinia"
import { beforeEach, describe, it, expect } from "vitest"
import { useHabitsStore } from '@/stores/habits'

describe('Habits Store', () => {
    let habits = null
    let habitIndex = 0

    beforeEach(async () => {
        setActivePinia(createPinia())
        habits = useHabitsStore()
        await habits.fetch()
    })

    it('fetches the list of habits', () => {
        expect(habits.list.length).toBe(1)
    })

    it('increments the executions', () => {        
        habits.list[habitIndex].executions_count = 0

        habits.newExecution(habitIndex)

        expect(habits.list[habitIndex].executions_count).toBe(1)
    })

    it('returns the percent', () => {
        habits.list[habitIndex].times_per_day = 3
        habits.list[habitIndex].executions_count = 1

        expect(habits.percent(habitIndex)).toBe(33)
    })

    it('keeps the executions less than or equal to times per day', () => {
        habits.list[habitIndex].times_per_day = 3
        habits.list[habitIndex].executions_count = 3

        habits.newExecution(habitIndex)

        expect(habits.list[habitIndex].executions_count).toBe(3)
    })
})