//pinia
import { defineStore } from 'pinia'

//api-methods
import { createComment, getComments, removeComment } from '@/http-client'

//types
import type { PostComment } from '@/types'

//store
import { usePosts } from './usePosts'

export const useComments = defineStore('comments', {
  state: () => {
    return {
      comments: [] as PostComment[],
    }
  },
  actions: {
    async loadComments(id: number) {
      try {
        const data = await getComments(id)
        this.comments = data
      } catch (error) {
        console.log('Error', error)
      }
    },

    async addComment(name: string, email: string, body: string) {
      const postsStore = usePosts()
      if (!postsStore.selectedPostId) return

      try {
        await createComment(postsStore.selectedPostId, name, email, body)
        await this.loadComments(postsStore.selectedPostId)
      } catch (error) {
        console.log('Error', error)
      }
    },

    async deleteComment(id: number) {
      const postsStore = usePosts()
      this.comments = this.comments.filter((el: PostComment) => el.id !== id)

      try {
        await removeComment(id)
        if (postsStore.selectedPostId) {
          await this.loadComments(postsStore.selectedPostId)
        }
      } catch (error) {
        console.log('Error', error)
        if (postsStore.selectedPostId) {
          await this.loadComments(postsStore.selectedPostId)
        }
      }
    },

    clearComments() {
      this.comments = []
    },
  },
})
