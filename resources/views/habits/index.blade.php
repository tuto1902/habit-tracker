<x-app-layout>
    <div id="app" class="flex flex-col bg-gray-200 min-h-screen justify-center">
        <div class="flex flex-col bg-white pt-10 pb-8 sm:max-w-lg sm:min-w-[490px] sm:mx-auto px-6 sm:px-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl">
            <div class="flex items-center justify-between">
                <h1 class="text-xl font-semibold">Habit Tracker</h1>
                <new-habit-button />
            </div>
            <habits />
        </div>
        <habit-dialog />
    </div>
</x-app-layout>