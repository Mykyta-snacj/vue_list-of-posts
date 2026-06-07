//pinia
import { defineStore } from 'pinia'

//types
import type { Post } from '@/types'

//api
import { createPost, getPosts, removePost, updatePost } from '@/http-client'

//store
import { useUser } from './useUser'
import { useComments } from './useComments'

//router
import { router } from '@/router'

export const usePosts = defineStore('posts', {
  state: () => {
    return {
      posts: [] as Post[],
      isLoadingList: false,
      activeSidebar: 'none' as 'none' | 'add' | 'comment' | 'edit',
      selectedPostId: undefined as number | undefined,
    }
  },

  actions: {
    //posts
    async loadPosts() {
      const userStore = useUser()

      if (!userStore.user) {
        router.push('/login')
        return
      }

      try {
        const data = await getPosts(userStore.user.id)
        this.posts = data
      } catch (error) {
        console.log('Error', error)
      }
    },

    clearPosts() {
      this.posts = []
    },

    async addPost(title: string, body: string) {
      const userStore = useUser()

      try {
        await createPost(userStore.user?.id ?? null, title.trim(), body.trim())
        await this.loadPosts()
      } catch (error) {
        console.log('Error', error)
      } finally {
        this.closeSidebar()
      }
    },

    async deletePost() {
      this.posts = this.posts.filter((p: Post) => p.id !== this.selectedPostId)

      if (!this.selectedPostId) {
        return
      }

      try {
        try {
          await removePost(this.selectedPostId)
        } finally {
          this.closeSidebar()
        }

        await this.loadPosts()
      } catch (error) {
        console.log('Error', error)
        await this.loadPosts()
      }
    },

    async editPost(title: string, body: string) {
      const userStore = useUser()

      if (!this.selectedPostId) {
        return
      }

      try {
        await updatePost(userStore.user?.id ?? null, this.selectedPostId, title.trim(), body.trim())
        await this.loadPosts()
      } catch (error) {
        console.log('Error', error)
      } finally {
        this.closeSidebar()
      }
    },

    //sidebar
    toggleSidebar(type: 'add' | 'comment' | 'edit', id?: number) {
      const commentsStore = useComments()
      const isSameSidebar = this.activeSidebar === type && this.selectedPostId === id
      commentsStore.clearComments()

      if (isSameSidebar) {
        this.closeSidebar()
      } else {
        this.activeSidebar = type
        this.selectedPostId = id

        if (type === 'comment' && this.selectedPostId) {
          commentsStore.loadComments(this.selectedPostId)
        }
      }
    },

    closeSidebar() {
      const commentsStore = useComments()

      this.activeSidebar = 'none'
      this.selectedPostId = undefined
      commentsStore.clearComments()
    },
  },

  getters: {
    selectedPost(state): Post | null {
      return state.posts.find((el: Post) => el.id === state.selectedPostId) || null
    },
  },
})
