<template>
    <button @click="habits.openDialog" type="button" class="text-white bg-primary-600 px-3.5 py-2 rounded-md">
        New Habit
    </button>
</template>

<script setup>
    import { useHabitsStore } from '@/stores/habits'

    const habits = useHabitsStore()
</script>