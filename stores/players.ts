import { defineStore } from 'pinia'

interface Player {
  id: string
  name: string
  score: number,
  hasWon?: boolean
}

export const usePlayersStore = defineStore('players', {
  state: () => ({
    players: [] as Player[],
    currentPlayerIndex: 0,
    gameWinner: null as Player | null
  }),
  
  actions: {
    addPlayer(name: string) {
      this.players.push({
        id: crypto.randomUUID(),
        name,
        score: 0,
        hasWon: false
      })
    },
    
    removePlayer(id: string) {
      this.players = this.players.filter(player => player.id !== id)
    },
    
    updatePlayerName(id: string, newName: string) {
      const player = this.players.find(p => p.id === id)
      if (player) {
        player.name = newName
      }
    },
    
    updateScore(score: number) {
      if (this.players.length > 0) {
        const currentPlayer = this.players[this.currentPlayerIndex]
        const newScore = currentPlayer.score + score
        
        if (newScore === 50) {
          currentPlayer.score = newScore
          currentPlayer.hasWon = true
          this.gameWinner = currentPlayer
        } else if (newScore > 50) {
          currentPlayer.score = 25
        } else {
          currentPlayer.score = newScore
        }
        
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length
      }
    },
    
    resetGame() {
      this.players.forEach(player => {
        player.score = 0
        player.hasWon = false
      })
      this.gameWinner = null
      this.currentPlayerIndex = 0
    }
  }
})