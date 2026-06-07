<script lang="ts">
//store
import { useUser } from '@/storage/useUser'

//router
import { router } from '@/router'

export default {
  data() {
    return {
      store: useUser(),
    }
  },
  methods: {
    handleLogout() {
      this.store.logout()
      router.push('/login')
    },
  },
}
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <h2 class="navbar-item is-size-4">Vue List Of Posts</h2>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <div class="mr-4">
              <p>{{ store.user?.name }}</p>
            </div>

            <button class="button is-light" @click="handleLogout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
