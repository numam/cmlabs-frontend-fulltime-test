<script setup lang="ts">
import type { Ingredient } from '~/composables/useMeal'

// Props for ingredients list
defineProps<{
  ingredients: Ingredient[]
}>()

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
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
    <NuxtLink
      v-for="(item, idx) in ingredients"
      :key="item.idIngredient"
      :to="`/ingredients/${item.strIngredient}`"
      :class="[
        'group border-2 rounded-3xl p-3 text-center transition-all duration-100',
        'shadow-[3px_3px_0px_rgba(0,0,0,0.07)]',
        'hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]',
        cardColorCycle[idx % cardColorCycle.length]
      ]"
    >
      <!-- Thumbnail -->
      <div class="aspect-square rounded-2xl overflow-hidden mb-2.5 bg-white border border-white/60">
        <img
          :src="item.strThumb"
          :alt="item.strIngredient"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      <!-- text -->
      <p class="text-xs font-bold text-[#2D2416] leading-snug truncate">
        {{ item.strIngredient }}
      </p>
    </NuxtLink>
  </div>
</template>