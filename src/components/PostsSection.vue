<script lang="ts">
//components
import PostsList from './PostsList.vue'
import PostsSidebar from './PostsSidebar.vue'

//storage
import { usePosts } from '@/storage/usePosts'

export default {
  data() {
    return {
      store: usePosts(),
    }
  },
  async mounted() {
    this.store.isLoadingList = true

    try {
      await this.store.loadPosts()
    } finally {
      this.store.isLoadingList = false
    }
  },
  components: {
    PostsList,
    PostsSidebar,
  },
  computed: {
    columnClass() {
      return this.store.activeSidebar === 'none' ? 'is-12' : 'is-8'
    },
  },
}
</script>

<template>
  <div class="columns">
    <div class="column" :class="columnClass">
      <div class="box">
        <PostsList />
      </div>
    </div>

    <Transition name="sidebar">
      <PostsSidebar />
    </Transition>
  </div>
</template>

<style>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: all 0.5s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.columns .column {
  transition: all 0.5s ease;
}
</style>
