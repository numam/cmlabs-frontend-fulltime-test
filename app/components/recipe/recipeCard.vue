<script setup lang="ts">
// Props for recipe card
defineProps<{
  to: string
  thumb: string
  title: string
  description?: string
  idx: number
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

const getCardColor = (idx: number) => {
  const shuffled = [...cardColorCycle].sort(() => Math.random() - 0.5)
  return shuffled[idx % shuffled.length]
}
</script>

<template>
  <NuxtLink
    :to="to"
    :class="[
      'group border-2 rounded-3xl overflow-hidden transition-all duration-100',
      'shadow-[4px_4px_0px_rgba(0,0,0,0.08)]',
      'hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]',
      getCardColor(idx)
    ]"
  >
    <!-- Thumbnail -->
    <div class="aspect-video overflow-hidden bg-white/60">
      <img
        :src="thumb"
        :alt="title"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </div>

    <!-- Description -->
    <div class="p-4">
      <h3 class="font-bold text-[#2D2416] text-sm mb-1 line-clamp-2">{{ title }}</h3>
      <p v-if="description" class="text-xs text-[#7A6E5E] leading-relaxed line-clamp-2">
        {{ description }}
      </p>
    </div>
  </NuxtLink>
</template>