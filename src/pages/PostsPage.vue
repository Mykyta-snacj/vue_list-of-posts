<script lang="ts">
//components
import MainNavbar from '../components/MainNavbar.vue'
import PostsSection from '../components/PostsSection.vue'

export default {
  components: {
    MainNavbar,
    PostsSection,
  },
}
</script>

<template>
  <div id="root">
    <MainNavbar />

    <main class="section">
      <div class="container">
        <PostsSection />
      </div>
    </main>
  </div>
</template>
