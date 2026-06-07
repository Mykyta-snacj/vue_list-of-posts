<script lang="ts">
//components
import CommentsInfo from './CommentsInfo.vue'
import RingLoader from './loader/RingLoader.vue'

//storage
import { usePosts } from '@/storage/usePosts'
import { useComments } from '@/storage/useComments.ts'

export default {
  data() {
    return {
      store: usePosts(),
      commentsStore: useComments(),
      isLoading: false,
    }
  },
  async mounted() {
    const id = this.store.selectedPostId

    if (!id) return

    this.isLoading = true

    try {
      await this.commentsStore.loadComments(id)
    } finally {
      this.isLoading = false
    }
  },
  watch: {
    async 'store.selectedPostId'(newId) {
      if (!newId) return

      await this.loadComments(newId)
    },
  },
  components: {
    CommentsInfo,
    RingLoader,
  },
  methods: {
    async loadComments(id: number) {
      this.isLoading = true

      try {
        await this.commentsStore.loadComments(id)
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<template>
  <div class="content">
    <div className="block">
      <div
        className="is-flex is-justify-content-space-between is-align-items-center"
        v-if="store.selectedPost"
      >
        <h2>#{{ store.selectedPost.id }}: {{ store.selectedPost.title }}</h2>
        <div className="is-flex">
          <span
            className="icon is-small is-right is-clickable"
            @click="store.toggleSidebar('edit', store.selectedPost.id)"
          >
            <i className="fas fa-pen-to-square"></i>
          </span>
          <span
            className="icon is-small is-right has-text-danger is-clickable ml-3"
            @click="store.deletePost()"
          >
            <i className="fas fa-trash"></i>
          </span>
        </div>
      </div>

      <div className="is-flex is-justify-content-space-between is-align-items-center" v-else>
        <h2>Post not found</h2>
      </div>

      <p data-cy="PostBody">{{ store.selectedPost?.body }}</p>

      <div class="is-flex is-justify-content-center is-align-items-center" v-if="isLoading">
        <RingLoader />
      </div>

      <div className="block" v-if="commentsStore.comments.length === 0 && !isLoading">
        <p className="title is-4">No comments yet</p>
      </div>

      <CommentsInfo />
    </div>
  </div>
</template>
