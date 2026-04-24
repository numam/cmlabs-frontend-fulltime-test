<script setup lang="ts">
const isMenuOpen = ref(false)
const route = useRoute()

// Navigation links for header
const navLinks = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'ingredients', label: 'Ingredients', href: '/ingredients' },
  { key: 'recipes', label: 'Recipes', href: '/recipes' },
]

// Determine if a link is active based on current route
const isActive = (href: string) => {
  if (href === '/') return route.path === '/'
  return route.path.startsWith(href)
}

// Close mobile menu on route change
watch(() => route.path, () => {
  isMenuOpen.value = false
})
</script>

<template>
  <header class="sticky top-0 z-50 bg-[#FFFDF8]/85 backdrop-blur-sm border-b-2 border-[#E8E0D0]">
    <div class="max-w-6xl mx-auto px-5 h-20 flex items-center justify-between">

      <NuxtLink to="/" class="flex items-center gap-2.5 group">
        <div class="w-9 h-9 rounded-2xl bg-primary border-2 border-[#E07040] flex items-center justify-center text-sm shadow-[2px_2px_0px_#C05828] transition-all group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px]">
          🍽️
        </div>
        <span class="font-bold text-[#2D2416] text-lg tracking-tight">MealFinder</span>
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-1">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.key"
          :to="link.href"
          :class="[
            'px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-150',
            isActive(link.href)
              ? 'text-[#C05828] bg-[#FFE4D6]'
              : 'text-[#7A6E5E] hover:text-[#2D2416] hover:bg-[#F0E8D8]'
          ]"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="hidden md:flex items-center">
        <NuxtLink
          to="/ingredients"
          class="px-5 py-2.5 rounded-2xl bg-primary text-white text-sm font-bold border-2 border-[#E07040] shadow-[3px_3px_0px_#C05828] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-100"
        >
          Contact Us
        </NuxtLink>
      </div>

      <button
        class="md:hidden p-2 rounded-xl hover:bg-[#F0E8D8] transition-colors"
        @click="isMenuOpen = !isMenuOpen"
        aria-label="Toggle menu"
      >
        <div class="w-5 flex flex-col gap-[5px]">
          <span :class="['block h-[2px] bg-[#2D2416] rounded-full transition-all duration-200', isMenuOpen ? 'rotate-45 translate-y-[7px]' : '']" />
          <span :class="['block h-[2px] bg-[#2D2416] rounded-full transition-all duration-200', isMenuOpen ? 'opacity-0' : '']" />
          <span :class="['block h-[2px] bg-[#2D2416] rounded-full transition-all duration-200', isMenuOpen ? '-rotate-45 -translate-y-[7px]' : '']" />
        </div>
      </button>
    </div>

    <Transition name="slide">
      <div v-if="isMenuOpen" class="md:hidden border-t-2 border-[#E8E0D0]  px-4 py-3 flex flex-col gap-1">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.key"
          :to="link.href"
          :class="[
            'px-4 py-3 rounded-2xl text-sm font-semibold transition-all',
            isActive(link.href)
              ? 'text-[#C05828] bg-[#FFE4D6]'
              : 'text-[#7A6E5E] hover:bg-[#F0E8D8]'
          ]"
          @click="isMenuOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
        <NuxtLink
          to="/ingredients"
          class="mt-2 px-4 py-3 rounded-2xl bg-primary text-white text-sm font-bold text-center border-2 border-[#E07040] shadow-[3px_3px_0px_#C05828]"
          @click="isMenuOpen = false"
        >
          Contact Us
        </NuxtLink>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>