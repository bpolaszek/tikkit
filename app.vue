<template>
  <div class="min-h-screen bg-wood-light">
    <header class="bg-forest-light shadow-sm">
      <nav class="container mx-auto px-4 py-3">
        <div class="flex justify-between items-center">
          <div class="space-x-4">
            <NuxtLink to="/game" class="text-wood-light hover:text-white transition-colors">Game Session</NuxtLink>
            <NuxtLink to="/leaderboard" class="text-wood-light hover:text-white transition-colors">Leaderboard</NuxtLink>
          </div>
        </div>
      </nav>
    </header>

    <main class="container mx-auto px-4 py-8">
      <NuxtPage />
    </main>
  </div>
</template>