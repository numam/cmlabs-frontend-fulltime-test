<script setup lang="ts">
import HeaderInfo from '~/components/common/headerInfo.vue'

const route = useRoute()
const { filterByIngredient, getIngredients } = useMeal()

// Active category from query
const ingredient = computed(() => route.params.ingredient as string)

// Fetch meals based on ingredient
const { data: mealsData, pending: loadingMeals } = await useAsyncData(
  () => `meals-${ingredient.value}`,
  () => filterByIngredient(ingredient.value),
  { watch: [ingredient] }
)

// Fetch all ingredients
const { data: ingredientsData } = await useAsyncData('all-ingredients', () => getIngredients())
const allIngredients = computed(() => ingredientsData.value?.meals ?? [])

// Extract meals list
const meals = computed(() => mealsData.value?.meals ?? [])

// Get selected ingredient details 
const ingredientInfo = computed(() =>
  allIngredients.value.find(i => i.strIngredient === ingredient.value)
)

// Search
const searchQuery = ref('')

const filteredMeals = computed(() => {
  if (!searchQuery.value.trim()) return meals.value
  return meals.value.filter(m =>
    m.strMeal.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<template>
  <div class="font-primary min-h-screen">
    <div class="max-w-6xl mx-auto px-4 py-10">

      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-sm font-semibold text-[#9A8E7E] mb-6">
        <NuxtLink to="/" class="hover:text-gray-800 transition-colors">Home</NuxtLink>
        <span class="text-[#C8C0B0]">/</span>
        <NuxtLink to="/ingredients" class="hover:text-gray-800 transition-colors">Ingredients</NuxtLink>
        <span class="text-[#C8C0B0]">/</span>
        <span class="text-primary">{{ ingredient }}</span>
      </div>

      <!-- Header -->
      <HeaderInfo
        label="Ingredient"
        :title="ingredient"
        :image="ingredientInfo?.strThumb"
        :description="ingredientInfo?.strDescription"
        :total="filteredMeals.length"
        :loading="loadingMeals"
        backTo="/ingredients"
        backLabel="All Ingredients"
        searchPlaceholder="Search meals..."
        @search="q => searchQuery = q"
      />

      <!-- Skeleton loading -->
      <div v-if="loadingMeals" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        <div v-for="n in 8" :key="n" class="rounded-3xl border-2 border-[#E8E0D0] animate-pulse bg-[#F8F4EC] overflow-hidden">
          <div class="aspect-video bg-[#E8E0D0]" />
          <div class="p-3">
            <div class="h-3.5 bg-[#E8E0D0] rounded-full w-3/4 mb-1.5" />
            <div class="h-3 bg-[#E8E0D0] rounded-full w-1/2" />
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else-if="!filteredMeals.length" class="text-center py-20">
        <h3 class="text-xl font-bold text-gray-800 mb-2">
          {{ searchQuery ? 'No meals match your search' : 'No recipes found' }}
        </h3>
        <p class="text-sm text-[#9A8E7E] mb-6">
          {{ searchQuery ? `No results for "${searchQuery}".` : 'Try selecting a different ingredient.' }}
        </p>
        <NuxtLink
          to="/ingredients"
          class="inline-flex px-6 py-3 rounded-2xl bg-primary text-white font-semibold text-sm hover:opacity-90 transition"
        >
          Browse Ingredients
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

    </div>
  </div>
</template>