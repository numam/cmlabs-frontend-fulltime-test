<script setup lang="ts">

useHead({
  title: 'Ingredients'
})


const { getIngredients } = useMeal()

const { data: ingredientsData } = await useAsyncData('all-ingredients', () => getIngredients())
const allIngredients = computed(() => ingredientsData.value?.meals ?? [])

// Search
const searchQuery = ref('')

const filteredIngredients = computed(() => {
  if (!searchQuery.value) return allIngredients.value

  return allIngredients.value.filter(item =>
    item.strIngredient.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// UI color variants for cards (cycled dynamically)
const cardColorCycle = [
  'border-card-pink-border bg-card-pink-bg',
  'border-card-yellow-border bg-card-yellow-bg',
  'border-card-green-border bg-card-green-bg',
  'border-card-purple-border bg-card-purple-bg',
  'border-card-blue-border bg-card-blue-bg',
  'border-card-orange-border bg-card-orange-bg',
]

const getCardColor = (idx: number) => {
  const shuffled = [...cardColorCycle].sort(() => Math.random() - 0.5)
  return shuffled[idx % shuffled.length]
}
</script>

<template>
  <div class="font-primary min-h-screen ">
    <div class="max-w-6xl mx-auto px-4 py-10">

      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-sm font-semibold text-[#9A8E7E] mb-6">
        <NuxtLink to="/" class="hover:text-gray-800 transition-colors">Home</NuxtLink>
        <span class="text-[#C8C0B0]">/</span>
        <span class="text-primary">Ingredients</span>
      </div>

      <!-- Header -->
       <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">

        <!-- Title -->
        <div class="flex flex-col">
          <p class="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
            Ingredients
          </p>
          <h1 class="text-3xl font-bold text-gray-800">
            All Ingredients
          </h1>
          <p class="text-sm text-[#9A8E7E] mt-1 font-medium">
            <template v-if="allIngredients.length">
              {{ filteredIngredients.length }} of {{ allIngredients.length }} ingredients
            </template>
            <template v-else>Loading ingredients...</template>
          </p>
        </div>

        <!-- Search -->
        <div class="relative w-full max-w-sm">
          <!-- Icon -->
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8E7E] pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </span>

          <!-- Input -->
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search ingredients..."
            class="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-white border border-[#D4C8B0] text-sm text-gray-700 placeholder-[#B0A898] focus:outline-none focus:border-primary transition"
          />

          <!-- Clear button -->
          <button
            v-if="searchQuery"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A8E7E] hover:text-gray-600 transition"
            @click="searchQuery = ''"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

      </div>

      <!-- Skeleton Loading -->
      <div v-if="!allIngredients.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div
          v-for="n in 18"
          :key="n"
          class="rounded-3xl border-2 border-[#E8E0D0] p-4 animate-pulse bg-[#F8F4EC]"
        >
          <div class="aspect-square rounded-2xl bg-[#E8E0D0] mb-3" />
          <div class="h-3 bg-[#E8E0D0] rounded-full w-3/4 mx-auto" />
        </div>
      </div>

      <!-- Empty state (search result kosong) -->
      <div
        v-else-if="filteredIngredients.length === 0"
        class="text-center py-20"
      >
        <h3 class="text-lg font-semibold text-gray-800 mb-2">
          No ingredients found
        </h3>
        <p class="text-sm text-[#9A8E7E]">
          Try a different keyword.
        </p>
      </div>

      <!-- Grid -->
      <div
        v-else
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        <NuxtLink
          v-for="(item, idx) in filteredIngredients"
          :key="item.idIngredient"
          :to="`/ingredients/${item.strIngredient}`"
          :class="[
            'group border-2 rounded-3xl p-3 text-center transition-all duration-100',
            'shadow-[3px_3px_0px_rgba(0,0,0,0.07)]',
            'hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]',
            getCardColor(idx)
          ]"
        >
          <div class="aspect-square rounded-2xl overflow-hidden mb-2.5 bg-white border border-white/60">
            <img
              :src="item.strThumb"
              :alt="item.strIngredient"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
          </div>

          <p class="text-xs font-semibold text-gray-800 truncate">
            {{ item.strIngredient }}
          </p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>