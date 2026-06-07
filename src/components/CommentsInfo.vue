<script lang="ts">
//compontents
import CommentsList from './CommentsList.vue'

//storage
import { usePosts } from '@/storage/usePosts'
import { useComments } from '@/storage/useComments.ts'

//components
import RingLoader from './loader/RingLoader.vue'

export default {
  data() {
    return {
      store: usePosts(),
      addCommentForm: false,
      comment: {
        name: '',
        email: '',
        body: '',
      },
      isLoading: false,
    }
  },
  components: {
    CommentsList,
    RingLoader,
  },
  methods: {
    resetForm() {
      this.comment = {
        name: '',
        email: '',
        body: '',
      }
    },

    async handleSubmit() {
      const commentsStore = useComments()
      this.isLoading = true

      try {
        await commentsStore.addComment(this.comment.name, this.comment.email, this.comment.body)

        this.resetForm()
        this.addCommentForm = false
      } finally {
        this.isLoading = false
      }
    },

    handleOpenForm() {
      this.addCommentForm = !this.addCommentForm

      if (!this.addCommentForm) {
        this.resetForm()
      }
    },
  },
}
</script>
<template>
  <CommentsList v-if="!addCommentForm && !isLoading" />

  <div class="is-flex is-justify-content-center is-align-items-center" v-if="isLoading">
    <RingLoader />
  </div>

  <template v-if="addCommentForm && !isLoading">
    <form @submit.prevent="handleSubmit">
      <div class="field">
        <label class="label">Author Name</label>
        <div class="control has-icons-left has-icons-right">
          <span class="icon is-small is-left"><i class="fas fa-user fa-user"></i></span>
          <input
            class="input"
            type="text"
            placeholder="Name Surname"
            required
            v-model.trim="comment.name"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Author Email</label>
        <div class="control has-icons-left has-icons-right">
          <span class="icon is-small is-left"><i class="fas fa-user fa-envelope"></i></span>
          <input
            class="input"
            type="email"
            placeholder="Your Email"
            required
            v-model.trim="comment.email"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Write Post Body</label>
        <div class="control">
          <textarea
            class="textarea"
            placeholder="Post body"
            required
            v-model.trim="comment.body"
          ></textarea>
        </div>
      </div>

      <div class="buttons mt-4">
        <button type="submit" class="button is-link" :disabled="isLoading">Save</button>

        <button type="button" class="button is-light" @click="handleOpenForm()">Cancel</button>
      </div>
    </form>
  </template>

  <button v-if="!addCommentForm" type="button" className="button is-link" @click="handleOpenForm()">
    Write a comment
  </button>
</template>
