<script lang="ts">
//storage
import { usePosts } from '@/storage/usePosts'

//components
import RingLoader from './loader/RingLoader.vue'

export default {
  data() {
    return {
      store: usePosts(),
    }
  },
  components: {
    RingLoader,
  },
  methods: {
    getToggleText(id: number) {
      return this.store.activeSidebar === 'comment' && this.store.selectedPostId === id
        ? 'Close'
        : 'Open'
    },
  },
}
</script>

<template>
  <div>
    <div class="is-flex is-justify-content-space-between mb-4">
      <p class="title">Posts</p>

      <button
        type="button"
        class="button is-link"
        :class="{ 'is-light': store.activeSidebar === 'add' }"
        @click="store.toggleSidebar('add')"
      >
        Add New Post
      </button>
    </div>

    <table class="table is-fullwidth is-striped is-hoverable">
      <div
        class="is-flex is-justify-content-center is-align-items-center"
        v-if="store.isLoadingList"
      >
        <RingLoader />
      </div>

      <thead v-else>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th class="has-text-right">Actions</th>
        </tr>
      </thead>

      <TransitionGroup name="list" tag="tbody">
        <tr v-for="post in store.posts" :key="post.id">
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td>
          <td class="has-text-right is-vcentered">
            <button
              type="button"
              class="button is-link"
              :class="{ 'is-light': getToggleText(post.id) === 'Close' }"
              @click="store.toggleSidebar('comment', post.id)"
            >
              {{ getToggleText(post.id) }}
            </button>
          </td>
        </tr>
      </TransitionGroup>
    </table>
  </div>
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
