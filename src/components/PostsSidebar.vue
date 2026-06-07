<script lang="ts">
//components
import MakePost from './MakePost.vue'
import PostInfo from './PostInfo.vue'
import EditPost from './EditPost.vue'

//storage
import { usePosts } from '@/storage/usePosts'

export default {
  data() {
    return {
      store: usePosts(),
    }
  },
  components: {
    MakePost,
    PostInfo,
    EditPost,
  },
}
</script>

<template>
  <div class="column is-4" v-if="store.activeSidebar !== 'none'">
    <div class="box">
      <MakePost v-if="store.activeSidebar === 'add'" />

      <PostInfo v-else-if="store.activeSidebar === 'comment'" />

      <EditPost v-else-if="store.activeSidebar === 'edit'" />
    </div>
  </div>
</template>
