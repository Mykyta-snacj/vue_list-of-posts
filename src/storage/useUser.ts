//pinia
import { defineStore } from 'pinia'

//types
import type { User } from '@/types'

//store
import { usePosts } from './usePosts'

export const useUser = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
  }),

  actions: {
    setUser(user: User | null) {
      this.user = user

      if (!user) {
        localStorage.removeItem('user')
      } else {
        localStorage.setItem('user', JSON.stringify(user))
      }
    },

    logout() {
      const postsStore = usePosts()
      this.user = null

      localStorage.removeItem('user')
      postsStore.clearPosts()
    },
  },
})
