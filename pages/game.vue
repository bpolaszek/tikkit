<template>
  <div>
    <!-- Score Notification -->
    <div
      v-if="showNotification"
      class="fixed top-4 right-4 bg-forest-light text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-500"
      :class="{ 'opacity-0': notificationFading }"
    >
      {{ notificationMessage }}
    </div>

    <!-- Winner Modal -->
    <div v-if="playersStore.gameWinner" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-wood-light p-8 rounded-lg shadow-xl animate-bounce">
        <h2 class="text-3xl font-bold text-center mb-4">🎉 Winner! 🎉</h2>
        <p class="text-xl text-center mb-6">{{ playersStore.gameWinner.name }} has won the game!</p>
        <button
          @click="playersStore.resetGame()"
          class="w-full bg-forest-light text-white py-3 px-6 rounded-lg font-semibold hover:bg-forest transition-colors"
        >
          Start New Game
        </button>
      </div>
    </div>

    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-2">Current Player</h2>
      <div v-if="currentPlayer" class="bg-white p-4 rounded-lg shadow">
        <p class="text-lg">{{ currentPlayer.name }}</p>
        <p class="text-gray-600">Score: {{ currentPlayer.score }}/50</p>
      </div>
      <div v-else class="text-red-600">
        Please add players in the leaderboard first
      </div>
    </div>

    <div v-if="currentPlayer" class="space-y-6">
      <!-- Pins Grid -->
      <div class="grid grid-cols-4 gap-3">
        <button
          v-for="pin in 12"
          :key="pin"
          @click="togglePin(pin)"
          class="w-16 h-16 rounded-full text-lg font-bold transition-all flex items-center justify-center"
          :class="{
            'bg-wood text-forest-dark': !fallenPins.includes(pin),
            'bg-wood-light text-wood-dark opacity-50': fallenPins.includes(pin)
          }"
        >
          {{ pin }}
        </button>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-4 mt-4">
        <button
          @click="cancelTurn"
          class="flex-1 py-3 rounded-lg font-semibold transition-colors"
          :class="{
            'bg-red-500 text-white hover:bg-red-600': fallenPins.length > 0,
            'bg-gray-200 text-gray-400 cursor-not-allowed': fallenPins.length === 0
          }"
          :disabled="fallenPins.length === 0"
        >
          Cancel
        </button>
        <button
          @click="validateTurn"
          class="flex-1 py-3 rounded-lg font-semibold transition-colors"
          :class="{
            'bg-green-500 text-white hover:bg-green-600': fallenPins.length > 0,
            'bg-gray-200 text-gray-400 cursor-not-allowed': fallenPins.length === 0
          }"
          :disabled="fallenPins.length === 0"
        >
          Validate ({{ calculateScore }} points)
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const playersStore = usePlayersStore()
const players = computed(() => playersStore.players)
const currentPlayer = computed(() => players.value[playersStore.currentPlayerIndex])
const fallenPins = ref<number[]>([])
const showNotification = ref(false)
const notificationMessage = ref('')
const notificationFading = ref(false)

const calculateScore = computed(() => {
  if (fallenPins.value.length === 1) {
    // If only one pin is fallen, score equals the pin number
    return fallenPins.value[0]
  } else if (fallenPins.value.length > 1) {
    // If multiple pins are fallen, score equals the count of fallen pins
    return fallenPins.value.length
  }
  return 0
})

function togglePin(pin: number) {
  const index = fallenPins.value.indexOf(pin)
  if (index === -1) {
    fallenPins.value.push(pin)
  } else {
    fallenPins.value.splice(index, 1)
  }
}

function showScoreNotification(player: any, newScore: number) {
  notificationMessage.value = `${player.name}'s new score: ${newScore}`
  showNotification.value = true
  notificationFading.value = false

  // Start fade out after 1.5s
  setTimeout(() => {
    notificationFading.value = true
  }, 1500)

  // Hide completely after fade animation
  setTimeout(() => {
    showNotification.value = false
  }, 2000)
}

function validateTurn() {
  if (fallenPins.value.length > 0) {
    const previousPlayer = currentPlayer.value
    const previousScore = previousPlayer.score
    playersStore.updateScore(calculateScore.value)
    
    // Show notification if the game hasn't been won
    if (!playersStore.gameWinner && previousPlayer.score !== previousScore) {
      showScoreNotification(previousPlayer, previousPlayer.score)
    }
    
    fallenPins.value = []
  }
}

function cancelTurn() {
  fallenPins.value = []
}
</script>