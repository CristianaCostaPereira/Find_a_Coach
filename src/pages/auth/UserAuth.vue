<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred"
      @close="handleError">

      <p>{{ error }}</p>
    </base-dialog>

    <base-dialog
      :show="isLoading"
      title="Authenticating..."
      fixed>

      <base-spinner></base-spinner>
    </base-dialog>

    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-Mail</label>

          <input type="email" id="email" v-model.trim="email">
        </div>

        <div class="form-control">
          <label for="password">Password</label>

          <input type="password" id="password" v-model.trim="password">
        </div>

        <div
          v-if="!formIsValid"
          class="errors">

          <p>Please enter a valid email and password.</p>
          <p>Your password must be, at least, 6 characters long.</p>
        </div>

        <base-button>{{ submitButtonCaption }}</base-button>

        <base-button
          type="button"
          mode="flat"
          @click="switchAuthMode">

          {{ switchModeButtonCaption }}
        </base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null
    }
  },

  computed: {
    submitButtonCaption () {
      if (this.mode === 'login') {
        return 'Login'
      } else {
        return 'Sign up'
      }
    },

    switchModeButtonCaption () {
      if (this.mode === 'login') {
        return 'Sign up instead'
      } else {
        return 'Login instead'
      }
    }
  },

  methods: {
    ...mapActions(['signup', 'login']),

    async submitForm ()  {
      this.formIsValid = true

      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false
        return
      }

      this.isLoading = true

      const actionPayload = {
        email: this.email,
        password: this.password
      }

      try {
        if (this.mode === 'login') {
          await this.login(actionPayload)
        } else {
          await this.signup(actionPayload)
        }

        // Will construct a string which is either '/'' and what is stored in the redirect parameter or /coaches
        const redirectUrl = '/' + (this.$route.query.redirect || 'coaches')

        this.$router.replace(redirectUrl)

      } catch (error) {
        this.error = error.message || 'Failed to authenticate, try again later'
      }

      this.isLoading = false
    },

    switchAuthMode () {
      if (this.mode === 'login') {
        this.mode = 'signup'
      } else {
        this.mode = 'login'
      }
    },

    handleError () {
      this.error = null
    }
  }
}
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}
</style>