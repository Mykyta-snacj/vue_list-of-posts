<script lang="ts">
//storage
import { usePosts } from '@/storage/usePosts'

//components
import RingLoader from './loader/RingLoader.vue'

export default {
  data() {
    return {
      store: usePosts(),
      title: '',
      description: '',
      isLoading: false,
    }
  },
  components: {
    RingLoader,
  },
  mounted() {
    this.title = this.store.selectedPost?.title || ''
    this.description = this.store.selectedPost?.body || ''
  },

  methods: {
    async handleSubmit() {
      this.isLoading = true

      try {
        this.store.editPost(this.title, this.description)
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<template>
  <div>
    <h2 class="title is-4 mb-4">Post editing</h2>

    <div class="is-flex is-justify-content-center is-align-items-center" v-if="isLoading">
      <RingLoader />
    </div>

    <form v-if="store.selectedPost && !isLoading" @submit.prevent="handleSubmit">
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input class="input" type="text" placeholder="Post title" required v-model.trim="title" />
        </div>
      </div>

      <div class="field">
        <label class="label">Body</label>
        <div class="control">
          <textarea
            class="textarea"
            placeholder="Post body"
            required
            v-model.trim="description"
          ></textarea>
        </div>
      </div>

      <div class="buttons mt-4">
        <button type="submit" class="button is-link">Save</button>

        <button type="button" class="button is-light" @click="store.closeSidebar">Cancel</button>
      </div>
    </form>

    <h3 v-if="!store.selectedPost && !isLoading">No post to edit</h3>
  </div>
</template>
