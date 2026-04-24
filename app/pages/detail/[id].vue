<script setup lang="ts">
const route = useRoute()
const { getMealDetails } = useMeal()

// Extract meal ID from route params
const mealId = computed(() => route.params.id as string)

// Fetch meal details based on ID
const { data, pending: loadingMeal } = await useAsyncData(
  () => `detail-${mealId.value}`,
  () => getMealDetails(mealId.value),
  { watch: [mealId] }
)

// Extract meal details
const meal = computed(() => data.value?.meals?.[0] ?? null)

// title
useHead({
  title: computed(() => {
    if (!meal.value?.strMeal) return 'Recipe'
    return meal.value.strMeal
  })
})

// Extract ingredients and measures into a structured list
const ingredients = computed(() => {
  if (!meal.value) return []
  const list = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal.value[`strIngredient${i}`]
    const measure = meal.value[`strMeasure${i}`]
    if (ingredient && ingredient.trim()) {
      list.push({ ingredient, measure })
    }
  }
  return list
})

// Extract YouTube video ID and create embed URL
const youtubeEmbed = computed(() => {
  if (!meal.value?.strYoutube) return null
  const videoId = meal.value.strYoutube.split('v=')[1]
  return `https://www.youtube.com/embed/${videoId}`
})
</script>

<template>
  <div class="font-primary min-h-screen ">

    <!-- Loading -->
    <div v-if="loadingMeal" class="max-w-6xl mx-auto px-4 py-10">
      <div class="mb-6 h-6 bg-[#E8E0D0] rounded-full w-32 animate-pulse" />

      <div class="flex flex-col sm:flex-row gap-8">
        <div class="w-80 h-80 rounded-3xl bg-[#E8E0D0] animate-pulse" />
        <div class="flex-1 space-y-4">
          <div class="h-8 bg-[#E8E0D0] rounded-full w-2/3 animate-pulse" />
          <div class="h-4 bg-[#E8E0D0] rounded-full w-1/2 animate-pulse" />
        </div>
      </div>
    </div>

    <!-- Content -->
    <div v-else-if="meal" class="max-w-6xl mx-auto px-4 py-10">

      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-sm font-semibold text-[#9A8E7E] mb-6">
        <NuxtLink to="/" class="hover:text-gray-800">Home</NuxtLink>
        <span>/</span>
        <NuxtLink to="/recipes" class="hover:text-gray-800">Recipes</NuxtLink>
        <span>/</span>
        <span class="text-primary">{{ meal.strMeal }}</span>
      </div>

      <!-- Header -->
      <div class="flex flex-col gap-8 mb-12">

        <!-- Info -->
        <div class="flex-1">
          <p class="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
            Recipe
          </p>

          <h1 class="text-4xl font-bold text-gray-800 mb-4">
            {{ meal.strMeal }}
          </h1>

          <p class="text-sm text-[#7A6E5E] mb-4">
            <span class="mr-4 border-gray-300 border py-1 px-2 rounded-xl">{{ meal.strCategory }}</span>
            <span>{{ meal.strArea }} Culinary</span>
          </p>

          <p class="text-sm text-[#9A8E7E]">
            {{ ingredients.length }} ingredients
          </p>
        </div>
        <!-- Image -->
        <div class="aspect-video rounded-3xl overflow-hidden border border-[#E8E0D0]">
          <img
            :src="meal.strMealThumb"
            :alt="meal.strMeal"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <!-- Ingredients -->
      <section class="mb-12">
        <div class="mb-4">
          <p class="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
            Ingredients
          </p>
          <h2 class="text-2xl font-bold text-gray-800">
            Full List
          </h2>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          <div
            v-for="(item, index) in ingredients"
            :key="index"
            class="bg-white border border-[#E8E0D0] rounded-xl px-4 py-3 hover:shadow-sm transition"
          >
            <p class="text-xs text-primary font-semibold mb-1">
              {{ item.measure }}
            </p>
            <p class="text-sm text-gray-800 font-medium">
              {{ item.ingredient }}
            </p>
          </div>
        </div>
      </section>

      <!-- Instructions -->
      <section class="mb-12">
        <div class="mb-4">
          <p class="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
            Instructions
          </p>
          <h2 class="text-2xl font-bold text-gray-800">
            Cooking Steps
          </h2>
        </div>

        <div class="bg-white border border-[#E8E0D0] rounded-2xl p-6">
          <p class="text-[#7A6E5E] leading-relaxed whitespace-pre-line text-sm">
            {{ meal.strInstructions }}
          </p>
        </div>
      </section>

      <!-- Youtube Video -->
      <section v-if="youtubeEmbed" class="mb-12">
        <div class="mb-4">
          <p class="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
            Video
          </p>
          <h2 class="text-2xl font-bold text-gray-800">
            Watch Tutorial
          </h2>
        </div>

        <div class="rounded-2xl overflow-hidden border border-[#E8E0D0]">
          <div class="video-wrapper">
            <iframe :src="youtubeEmbed" allowfullscreen />
          </div>
        </div>
      </section>

    </div>

    <!-- Empty Template -->
    <div v-else class="max-w-6xl mx-auto px-4 py-20 text-center">
      <h3 class="text-lg font-semibold text-gray-800 mb-2">
        Recipe not found
      </h3>
      <p class="text-sm text-[#9A8E7E] mb-6">
        The recipe you are looking for is not available.
      </p>

      <NuxtLink
        to="/recipes"
        class="px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold"
      >
        Browse Recipes
      </NuxtLink>
    </div>

  </div>
</template>

<style scoped>
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
}

.video-wrapper iframe {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>