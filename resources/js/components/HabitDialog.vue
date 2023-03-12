<template>
    <TransitionRoot appear :show="habits.isDialogOpen" as="template">
        <Dialog as="div" @close="habits.closeDialog" class="relative z-10">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>
            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                >
                    <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                            {{ habits.formData.id ? 'Edit Habit' : 'New Habit' }}
                        </DialogTitle>
                        <div class="mt-2">
                            <div>
                                <label for="name" class="block text-sm font-medium text-gray-700">Habit Name</label>
                                <input type="text" v-model="habits.formData.name" name="name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-600">
                                <span v-if="habits.validationErrors.hasOwnProperty('name')" class="text-sm text-red-600">
                                    {{ habits.validationErrors.name[0] }}
                                </span>
                            </div>
                            <div class="mt-2">
                                <label for="times_per_day" class="block text-sm font-medium text-gray-700">Times Per Day</label>
                                <input type="text" v-model="habits.formData.times_per_day" name="times_per_day" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-600">
                                <span v-if="habits.validationErrors.hasOwnProperty('times_per_day')" class="text-sm text-red-600">
                                    {{ habits.validationErrors.times_per_day[0] }}
                                </span>
                            </div>
                        </div>
                        <div class="mt-4">
                            <button :disabled="loading" @click="storeHabit" type="button" class="inline-flex items-center bg-primary-600 px-3.5 py-2 rounded-md text-sm font-medium text-white">
                                <span v-if="!loading" class="ml-1 mr-1">Save</span>
                                <svg v-if="loading" class="animate-spin ml-2 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </button>
                        </div>
                    </DialogPanel>
                </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
    import {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel,
        DialogTitle
    } from '@headlessui/vue'
    import { useHabitsStore } from '@/stores/habits'
import { ref } from 'vue';

    const loading = ref(false)

    const habits = useHabitsStore()

    const storeHabit = async () => {
        loading.value = true

        if (habits.formData.id) {
            await habits.updateHabit()
        } else {
            await habits.storeHabit()
        }

        loading.value = false
    }
</script>