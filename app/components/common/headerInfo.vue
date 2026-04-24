<script setup lang="ts">
const props = defineProps<{
  title: string
  label: string
  image?: string
  description?: string
  total?: number
  loading?: boolean
  backTo: string
  backLabel: string
  searchPlaceholder?: string
}>()

const emit = defineEmits<{
  search: [query: string]
}>()

const searchQuery = ref('')

function onSearch() {
  emit('search', searchQuery.value)
}

function clearSearch() {
  searchQuery.value = ''
  emit('search', '')
}
</script>

<template>
  <div class="flex flex-col gap-3 mb-8">

    <!-- Back Button (mobile only) -->
    <div class="sm:hidden">
      <NuxtLink
        :to="backTo"
        class="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-2xl bg-white border-2 border-[#D4C8B0] text-sm font-semibold text-[#7A6E5E] hover:bg-[#F8F4EC] transition"
      >
        ← {{ backLabel }}
      </NuxtLink>
    </div>

    <!-- Row 1: Image + Title + Actions (desktop) -->
    <div class="flex flex-col sm:flex-row sm:items-start gap-5">

      <!-- Image -->
      <div
        v-if="image"
        class="w-24 h-24 rounded-3xl overflow-hidden border-2 border-[#E8E0D0] flex-shrink-0"
      >
        <img
          :src="image"
          :alt="title"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Title & Label -->
      <div class="flex-1 min-w-0">
        <p class="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
          {{ label }}
        </p>
        <h1 class="text-3xl font-bold text-gray-800">
          {{ title }}
        </h1>
      </div>

      <!-- Actions: Search + Back Button (desktop only) -->
      <div class="hidden sm:flex items-center gap-2 flex-shrink-0">

        <!-- Search -->
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8E7E] pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="searchPlaceholder ?? 'Search...'"
            class="pl-9 pr-8 py-2.5 rounded-2xl bg-white border-2 border-[#D4C8B0] text-sm text-gray-700 placeholder-[#B0A898] focus:outline-none focus:border-primary transition w-44"
            @input="onSearch"
          />
          <button
            v-if="searchQuery"
            class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9A8E7E] hover:text-gray-600 transition"
            @click="clearSearch"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Back Button -->
        <NuxtLink
          :to="backTo"
          class="inline-flex items-center px-4 py-2.5 rounded-2xl bg-white border-2 border-[#D4C8B0] text-sm font-semibold text-[#7A6E5E] hover:bg-[#F8F4EC] transition"
        >
          ← {{ backLabel }}
        </NuxtLink>

      </div>
    </div>

    <!-- Row 2: Description + Total (full width) -->
    <div v-if="description || total !== undefined">
      <p
        v-if="description"
        class="text-sm text-[#7A6E5E] leading-relaxed mb-3 text-justify"
      >
        {{ description }}
      </p>

      <p class="text-sm text-[#9A8E7E] font-medium">
        <template v-if="!loading">
          {{ total }} items
        </template>
        <template v-else>
          Loading...
        </template>
      </p>
    </div>

    <!-- Search (mobile only) -->
    <div class="sm:hidden relative">
      <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8E7E] pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
      </span>
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="searchPlaceholder ?? 'Search...'"
        class="w-full pl-9 pr-8 py-2.5 rounded-2xl bg-white border-2 border-[#D4C8B0] text-sm text-gray-700 placeholder-[#B0A898] focus:outline-none focus:border-primary transition"
        @input="onSearch"
      />
      <button
        v-if="searchQuery"
        class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9A8E7E] hover:text-gray-600 transition"
        @click="clearSearch"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

  </div>
</template>