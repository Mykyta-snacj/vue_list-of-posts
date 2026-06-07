<script lang="ts">
//storage
import { useComments } from '@/storage/useComments'

export default {
  data() {
    return {
      commentsStore: useComments(),
    }
  },
}
</script>

<template>
  <div class="block" v-for="comment in commentsStore.comments" :key="comment.id">
    <article className="message is-small">
      <div className="message-header">
        <a href="#">{{ comment.name }}</a>
        <button
          type="button"
          className="delete is-small"
          aria-label="delete"
          @click="commentsStore.deleteComment(comment.id)"
        ></button>
      </div>
      <div className="message-body">{{ comment.body }}</div>
    </article>
  </div>
</template>
