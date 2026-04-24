<script setup lang="ts">
import HeaderInfo from '~/components/common/headerInfo.vue'

const { getCategories, getMealsByCategory } = useMeal()

// Active category from query
const route = useRoute()
const activeCategory = computed(() => route.query.c as string | undefined)

// Title
useHead({
  title: computed(() => {
    if (!activeCategory.value) return 'Recipes'
    return `Recipes - ${activeCategory.value}`
  })
})

// Fetch all categories for listing 
const { data: categoriesData } = await useAsyncData('categories', () => getCategories())
const allCategories = computed(() => categoriesData.value?.categories ?? [])

// Fetch meals when category is selected
const { data: mealsData, pending: loadingMeals } = await useAsyncData(
  () => `meals-cat-${activeCategory.value ?? '_none'}`,
  () => activeCategory.value ? getMealsByCategory(activeCategory.value) : Promise.resolve(null),
  { watch: [activeCategory] }
)

// Extract meals list
const meals = computed(() => mealsData.value?.meals ?? [])

// Get active category info for header
const activeCategoryInfo = computed(() =>
  allCategories.value.find(c => c.strCategory === activeCategory.value)
)

// Search
const searchQuery = ref('')
const categorySearchQuery = ref('')

// Reset meal search when category changes
watch(activeCategory, () => {
  searchQuery.value = ''
})


// Filtered meals based on search query
const filteredMeals = computed(() => {
  if (!searchQuery.value.trim()) return meals.value
  return meals.value.filter(m =>
    m.strMeal.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const filteredCategories = computed(() => {
  if (!categorySearchQuery.value.trim()) return allCategories.value
  return allCategories.value.filter(c =>
    c.strCategory.toLowerCase().includes(categorySearchQuery.value.toLowerCase())
  )
})
</script>


<template>
  <div class="font-primary min-h-screen">
    <div class="max-w-6xl mx-auto px-4 py-10">

      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-sm font-semibold text-[#9A8E7E] mb-6">
        <NuxtLink to="/" class="hover:text-gray-800">Home</NuxtLink>
        <span>/</span>
        <NuxtLink
          to="/recipes"
          :class="!activeCategory ? 'text-primary' : 'hover:text-gray-800'"
        >
          Recipes
        </NuxtLink>
        <template v-if="activeCategory">
          <span>/</span>
          <span class="text-primary">{{ activeCategory }}</span>
        </template>
      </div>

      <!-- Category List -->
      <template v-if="!activeCategory">

        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">

          <!-- Title -->
          <div class="flex flex-col">
            <p class="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
              Categories
            </p>
            <h1 class="text-3xl font-bold text-gray-800">
              Browse Recipe by Categories
            </h1>
            <p class="text-sm text-[#9A8E7E] mt-1">
              <template v-if="allCategories.length">
                {{ filteredCategories.length }} of {{ allCategories.length }} categories
              </template>
              <template v-else>Loading categories...</template>
            </p>
          </div>

          <!-- Search -->
          <div class="relative w-full max-w-sm">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8E7E] pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </span>
            <input
              v-model="categorySearchQuery"
              type="text"
              placeholder="Search categories..."
              class="w-full pl-9 pr-8 py-2.5 rounded-2xl bg-white border-2 border-[#D4C8B0] text-sm text-gray-700 placeholder-[#B0A898] focus:outline-none focus:border-primary transition"
            />
            <button
              v-if="categorySearchQuery"
              class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9A8E7E] hover:text-gray-600 transition"
              @click="categorySearchQuery = ''"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

        </div>

        <!-- Skeleton Loading -->
        <div v-if="!allCategories.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          <div v-for="n in 12" :key="n" class="rounded-3xl border animate-pulse bg-[#F8F4EC]">
            <div class="aspect-video bg-[#E8E0D0]" />
          </div>
        </div>

        <!-- Empty state search -->
        <div v-else-if="!filteredCategories.length" class="text-center py-20">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">No categories found</h3>
          <p class="text-sm text-[#9A8E7E] mb-6">No results for "{{ categorySearchQuery }}".</p>
          <button
            class="inline-flex px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition"
            @click="categorySearchQuery = ''"
          >
            Clear Search
          </button>
        </div>

        <!-- Grid -->
        <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          <recipeCard
            v-for="(cat, idx) in filteredCategories"
            :key="cat.idCategory"
            :to="`/recipes?c=${encodeURIComponent(cat.strCategory)}`"
            :thumb="cat.strCategoryThumb"
            :title="cat.strCategory"
            :description="cat.strCategoryDescription"
            :idx="idx"
          />
        </div>

      </template>

      <!-- Category Detail -->
      <template v-else>

        <HeaderInfo
          label="Category"
          :title="activeCategory"
          :image="activeCategoryInfo?.strCategoryThumb"
          :description="activeCategoryInfo?.strCategoryDescription"
          :total="filteredMeals.length"
          :loading="loadingMeals"
          backTo="/recipes"
          backLabel="All Categories"
          searchPlaceholder="Search meals..."
          @search="q => searchQuery = q"
        />

        <!-- Skeleton -->
        <div v-if="loadingMeals" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          <div v-for="n in 8" :key="n" class="rounded-3xl border animate-pulse bg-[#F8F4EC]">
            <div class="aspect-video bg-[#E8E0D0]" />
          </div>
        </div>

        <!-- Empty -->
        <div v-else-if="!filteredMeals.length" class="text-center py-20">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">
            {{ searchQuery ? 'No results found' : 'No recipes available' }}
          </h3>
          <p class="text-sm text-[#9A8E7E] mb-6">
            {{ searchQuery
              ? `No results for "${searchQuery}".`
              : 'Try selecting a different category.'
            }}
          </p>
          <NuxtLink
            to="/recipes"
            class="inline-flex px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition"
          >
            Browse Categories
          </NuxtLink>
        </div>

        <!-- Grid -->
        <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          <recipeCard
            v-for="(meal, idx) in filteredMeals"
            :key="meal.idMeal"
            :to="`/detail/${meal.idMeal}`"
            :thumb="meal.strMealThumb"
            :title="meal.strMeal"
            :idx="idx"
          />
        </div>

      </template>

    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>