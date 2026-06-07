<script lang="ts">
//storage
import { usePosts } from '@/storage/usePosts'

//components
import RingLoader from './loader/RingLoader.vue'

export default {
  data() {
    return {
      store: usePosts(),
      isLoading: false,
      title: '',
      body: '',
    }
  },
  components: {
    RingLoader,
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true
      try {
        await this.store.addPost(this.title, this.body)
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<template>
  <div>
    <h2 class="title is-4 mb-4">Create New Post</h2>

    <div class="is-flex is-justify-content-center is-align-items-center" v-if="isLoading">
      <RingLoader />
    </div>

    <form @submit.prevent="handleSubmit()" v-else>
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input class="input" type="text" placeholder="Post title" required v-model="title" />
        </div>
      </div>

      <div class="field">
        <label class="label">Body</label>
        <div class="control">
          <textarea class="textarea" placeholder="Post body" required v-model="body"></textarea>
        </div>
      </div>

      <div class="buttons mt-4">
        <button type="submit" class="button is-link">Save</button>

        <button type="button" class="button is-light" @click="store.closeSidebar">Cancel</button>
      </div>
    </form>
  </div>
</template>
