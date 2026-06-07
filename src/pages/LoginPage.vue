<script lang="ts">
//api
import { createUser, getUser } from '@/http-client'

//store
import { useUser } from '@/storage/useUser'

//components
import RingLoader from '@/components/loader/RingLoader.vue'

export default {
  data() {
    return {
      store: useUser(),
      email: '',
      name: '',
      needRegister: false,
      isLoading: false,
    }
  },
  components: {
    RingLoader,
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true

      try {
        if (this.needRegister) {
          await createUser(this.email, this.name)

          this.store.setUser(await getUser(this.email))

          this.$router.push('/posts')

          return
        }

        const user = await getUser(this.email)

        if (!user) {
          this.needRegister = true
          return
        }

        this.store.setUser(user)

        this.$router.push('/posts')
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<template>
  <section className="container is-flex is-justify-content-center">
    <form className="box mt-5" @submit.prevent="handleSubmit">
      <div class="is-flex is-justify-content-center is-align-items-center" v-if="isLoading">
        <RingLoader />
      </div>
      <template v-else>
        <h1 className="title is-3" v-if="needRegister">You need to register</h1>
        <h1 className="title is-3" v-else>Login</h1>

        <div className="field">
          <label className="label" htmlFor="user-email"> Email </label>

          <div className="control has-icons-left">
            <input
              type="email"
              id="user-email"
              name="email"
              className="input"
              placeholder="Enter your email"
              v-model.trim="email"
              required
              :disabled="needRegister"
            />

            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>
          </div>

          <template v-if="needRegister">
            <label className="label" htmlFor="user-email"> Name </label>

            <div className="control has-icons-left">
              <input
                type="text"
                id="user-name"
                name="name"
                className="input"
                placeholder="Enter your name"
                v-model.trim="name"
                required
              />

              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
            </div>
          </template>
        </div>

        <div className="field">
          <button type="submit" class="button is-primary">
            {{ needRegister ? 'Register' : 'Login' }}
          </button>
        </div>
      </template>
    </form>
  </section>
</template>
