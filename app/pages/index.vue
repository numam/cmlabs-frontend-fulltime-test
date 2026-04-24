<script setup lang="ts">
const { getIngredients, getCategories } = useMeal()

// Fetch ingredients and categories from API
const { data: ingredientsData } = await useAsyncData('ingredients', () => getIngredients())
const { data: categoriesData } = await useAsyncData('categories', () => getCategories())

// Get preview of ingredients and categories
const previewIngredients = computed(() => ingredientsData.value?.meals?.slice(0, 6) ?? [])
const allCategories = computed(() => categoriesData.value?.categories ?? [])
const previewCategories = computed(() => allCategories.value.slice(0, 8))

// Statistics
const stats = computed(() => [
  {
    value: `${ingredientsData.value?.meals?.length ?? 0}+`,
    label: 'Base Ingredients',
  },
  {
    value: `${categoriesData.value?.categories?.length ?? 0}+`,
    label: 'Recipe Categories',
  },
])

const steps = [
  { num: '01', title: 'Choose Ingredients', desc: 'Select the ingredients you have from our complete list.', bg: 'bg-[#FFF3D6]', border: 'border-card-yellow-border', numColor: 'text-[#C9921A]' },
  { num: '02', title: 'Find Recipes', desc: 'Our system matches your ingredients with thousands of available recipes.', bg: 'bg-[#E2F5E2]', border: 'border-[#A8DCB0]', numColor: 'text-[#3A8C4A]' },
  { num: '03', title: 'Start Cooking', desc: 'Follow the step-by-step instructions and serve your dish.', bg: 'bg-[#F0E2FF]', border: 'border-[#CCA8EC]', numColor: 'text-[#7A3DB5]' },
]


// UI color variants for cards (cycled dynamically)
const cardColorCycle = [
  'border-card-pink-border bg-card-pink-bg',
  'border-card-yellow-border bg-card-yellow-bg',
  'border-card-green-border bg-card-green-bg',
  'border-card-purple-border bg-card-purple-bg',
  'border-card-blue-border bg-card-blue-bg',
  'border-card-orange-border bg-card-orange-bg',
]
</script>

<template>
  <div class="min-h-screen">

    <!-- HERO -->
    <section class="relative overflow-hidden pt-20 pb-24 px-4">
      <div class="absolute top-10 right-10 w-72 h-72 bg-[#FFE8D6] rounded-full opacity-70 pointer-events-none" />
      <div class="absolute top-32 right-32 w-40 h-40 bg-[#FFD6C2] rounded-full opacity-50 pointer-events-none" />
      <div class="absolute bottom-10 left-6 w-56 h-56 bg-[#D6F0D6] rounded-full opacity-60 pointer-events-none" />
      <div class="absolute top-20 left-1/4 w-20 h-20 bg-[#EDD6FF] rounded-full opacity-50 pointer-events-none" />

      <div class="relative max-w-3xl mx-auto text-center">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-[#FFF3D6] border-2 border-card-yellow-border text-[#C9921A] text-xs font-semibold uppercase tracking-wide mb-6">
          Trusted by Thousands of Recipes
        </div>

        <h1 class="text-5xl md:text-6xl font-bold text-gray-800 leading-tight mb-5 tracking-tight">
          Cook More Easily<br />
          <span class="text-primary relative inline-block">
            With Your Ingredients
          </span>
        </h1>

        <p class="text-[#7A6E5E] text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-8">
          Enter the ingredients you have, and we will show the best recipes for you. No need to buy extra ingredients.
        </p>

        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <NuxtLink
            to="/recipes"
            class="px-7 py-3.5 rounded-2xl bg-primary text-white font-bold text-sm border-2 border-[#E07040] shadow-[4px_4px_0px_#C05828] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-100"
          >
            Browse Recipes →
          </NuxtLink>

          <NuxtLink
            to="/ingredients"
            class="px-7 py-3.5 rounded-2xl border-2 border-[#D4C8B0] text-gray-800 font-bold text-sm bg-white shadow-[4px_4px_0px_#C8B890] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-100"
          >
            View Ingredients
          </NuxtLink>
        </div>
      </div>
    </section>


    <!-- STATS -->
    <section class="py-12 border-y-2 border-[#E8E0D0] bg-white">
      <div class="max-w-2xl mx-auto px-4 grid grid-cols-2 gap-6 text-center">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="py-8 px-6 rounded-3xl border-2 border-[#E8E0D0] bg-white shadow-[4px_4px_0px_rgba(0,0,0,0.06)]"
        >
          <p class="text-4xl md:text-5xl font-bold text-card-orange-border mb-2">{{ stat.value }}</p>
          <p class="text-sm md:text-base text-[#9A8E7E] font-semibold">{{ stat.label }}</p>
        </div>
      </div>
    </section>


    <!-- CATEGORY -->
    <section class="py-14 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-end justify-between mb-8">
          <div>
            <p class="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
              Categories
            </p>
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800">
              Browse by Category
            </h2>
          </div>

          <NuxtLink
            to="/recipes"
            class="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-1 px-4 py-2 rounded-2xl bg-[#FFF3D6] border-2 border-card-yellow-border shadow-[3px_3px_0px_#E8C060] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-100"
          >
            View All →
          </NuxtLink>
        </div>

        <div v-if="!previewCategories.length" class="flex flex-wrap gap-3">
          <div
            v-for="n in 8"
            :key="n"
            class="h-11 w-28 rounded-2xl bg-[#F0E8D8] border-2 border-[#E8E0D0] animate-pulse"
          />
        </div>

        <div v-else class="flex flex-wrap gap-3">
          <NuxtLink
            v-for="(cat, idx) in previewCategories"
            :key="cat.idCategory"
            :to="`/recipes?c=${encodeURIComponent(cat.strCategory)}`"
            :class="[
              'flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-bold text-gray-800',
              'border-2 shadow-[3px_3px_0px_rgba(0,0,0,0.08)]',
              'hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]',
              'transition-all duration-100',
              cardColorCycle[idx % cardColorCycle.length]
            ]"
          >
            <img
              v-if="cat.strCategoryThumb"
              :src="cat.strCategoryThumb"
              :alt="cat.strCategory"
              class="w-6 h-6 rounded-lg object-cover"
            />
            {{ cat.strCategory }}
          </NuxtLink>
        </div>
      </div>
    </section>


    <!-- INGREDIENTS -->
    <section class="py-14 px-4 bg-white border-y-2 border-[#E8E0D0]">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-end justify-between mb-8">
          <div>
            <p class="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
              Popular Ingredients
            </p>
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800">
              Explore Ingredients
            </h2>
          </div>

          <NuxtLink
            to="/ingredients"
            class="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-1 px-4 py-2 rounded-2xl bg-[#FFF3D6] border-2 border-card-yellow-border shadow-[3px_3px_0px_#E8C060] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-100"
          >
            View All →
          </NuxtLink>
        </div>

        <div v-if="!previewIngredients.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <div
            v-for="n in 6"
            :key="n"
            class="rounded-3xl border-2 border-[#E8E0D0] p-4 text-center animate-pulse bg-[#F8F4EC]"
          >
            <div class="w-16 h-16 rounded-2xl bg-[#E8E0D0] mx-auto mb-3" />
            <div class="h-3 bg-[#E8E0D0] rounded-full w-3/4 mx-auto" />
          </div>
        </div>

        <IngredientsCard
          v-else
          :ingredients="previewIngredients"
        />
      </div>
    </section>


    <!-- HOW IT WORKS -->
    <section class="py-16 px-4 ">
      <div class="max-w-4xl mx-auto text-center mb-12">
        <p class="text-xs font-semibold text-primary uppercase tracking-wide mb-2">
          How It Works
        </p>
        <h2 class="text-2xl font-bold text-gray-800">
          Simple Steps
        </h2>
      </div>

      <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="step in steps"
          :key="step.num"
          :class="[
            'rounded-3xl p-6 border-2 shadow-[4px_4px_0px_rgba(0,0,0,0.07)]',
            'hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-100',
            step.bg, step.border
          ]"
        >
          <div :class="['text-4xl font-black mb-4 font-mono', step.numColor]">{{ step.num }}</div>
          <h3 class="text-base font-bold text-gray-800 mb-2">{{ step.title }}</h3>
          <p class="text-sm text-[#7A6E5E] leading-relaxed">{{ step.desc }}</p>
        </div>
      </div>
    </section>

    
    <!-- CTA -->
    <section class="py-16 px-4">
      <div class="max-w-4xl mx-auto bg-primary rounded-3xl px-8 py-12 text-center relative overflow-hidden border-2 border-[#E07040] shadow-[6px_6px_0px_#C05828]">
        <div class="relative">
          <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">
            Start Exploring Recipes
          </h2>

          <p class="text-[#FFE8D8] text-base mb-7 max-w-md mx-auto font-medium">
            Discover recipes tailored to your ingredients and cooking preferences.
          </p>

          <NuxtLink
            to="/ingredients"
            class="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#C05828] font-bold rounded-2xl text-sm border-2 border-[#F0D0B0] shadow-[3px_3px_0px_rgba(192,88,40,0.35)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-100"
          >
            Browse Recipes →
          </NuxtLink>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all 0.2s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-8px); }
</style>