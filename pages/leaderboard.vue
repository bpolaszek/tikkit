<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Players</h1>
    
    <!-- Add Player Form -->
    <form @submit.prevent="addPlayer" class="mb-8">
      <div class="flex gap-2">
        <input
          v-model="newPlayerName"
          type="text"
          placeholder="Enter player name"
          class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-light bg-white"
          required
        >
        <button
          type="submit"
          class="bg-forest-light hover:bg-forest text-white px-6 py-2 rounded-lg transition-colors"
        >
          Add Player
        </button>
      </div>
    </form>

    <!-- Players List -->
    <div class="space-y-4">
      <div v-for="player in players" :key="player.id" class="bg-wood-light p-4 rounded-lg shadow flex items-center justify-between">
        <div class="flex items-center gap-4 flex-1">
          <div v-if="editingPlayer !== player.id">
            <span class="font-medium" :class="{ 'text-forest': player.hasWon }">
              {{ player.name }}{{ player.hasWon ? ' 👑' : '' }}
            </span>
            <span class="text-wood-dark ml-2">Score: {{ player.score }}/50</span>
          </div>
          <input
            v-else
            v-model="editedName"
            type="text"
            class="px-2 py-1 border rounded bg-white"
            @keyup.enter="updateName(player.id)"
            @blur="updateName(player.id)"
          >
        </div>
        <div class="flex gap-2">
          <button
            @click="startEditing(player)"
            class="text-forest-light hover:text-forest transition-colors"
          >
            Edit
          </button>
          <button
            @click="removePlayer(player.id)"
            class="text-wood-dark hover:text-forest-dark transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const playersStore = usePlayersStore()
const players = computed(() => playersStore.players)
const newPlayerName = ref('')
const editingPlayer = ref<string | null>(null)
const editedName = ref('')

function addPlayer() {
  if (newPlayerName.value.trim()) {
    playersStore.addPlayer(newPlayerName.value.trim())
    newPlayerName.value = ''
  }
}

function removePlayer(id: string) {
  playersStore.removePlayer(id)
}

function startEditing(player: { id: string, name: string }) {
  editingPlayer.value = player.id
  editedName.value = player.name
}

function updateName(id: string) {
  if (editedName.value.trim()) {
    playersStore.updatePlayerName(id, editedName.value.trim())
  }
  editingPlayer.value = null
}
</script>