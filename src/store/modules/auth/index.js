const authModule = {
  state () {
    return {
      userId: null,
      token: null,
      tokenExpiration: null
    }
  },

  mutations: {
    setUser (state, payload) {
      state.token = payload.token // Token stored in Vuex
      state.userId = payload.userId
      state.tokenExpiration = payload.tokenExpiration
    }
  },

  actions: {
    async login(context, payload) {
      return context.dispatch('auth', {
        ...payload,
        mode: 'login'
      })
    },

    // Request that creates a new user
    async signup (context, payload) {
      return context.dispatch('auth', {
        ...payload,
        mode: 'signup'
      })
    },

    async auth (context, payload) {
      const mode = payload.mode

      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCwoMvRubF1YsB3garRPaZmy2klD6ccTEc'

      if (mode === 'signup') {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCwoMvRubF1YsB3garRPaZmy2klD6ccTEc'
      }

      const response = await fetch(
        url,
        {
          method: 'POST',
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
          })
        }
      )

      const responseData = await response.json()

      if (!response.ok) {
        const error = new Error(
          responseData.message || 'Failed to authenticate. Check your login data.'
        )
        throw error
      }

      // We do not just commit our token and userId into Vuex (lines 68-73), but we also store it in the browser storage
      localStorage.setItem('token', responseData.idToken)
      localStorage.setItem('userId', responseData.localId)

      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn
      })
    },

    tryLogin (context) {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')

      if (token && userId) {
        context.commit('setUser', {
          token: token, // sets token to the token extracted from localStorage
          userId: userId,
          tokenExpiration: null
        })
      }
    },

    logout(context) {
      context.commit('setUser', {
        token: null,
        userId: null,
        tokenExpiration: null
      })
    }
  },

  getters: {
    userId (state) {
      return state.userId
    },

    token (state) {
      return state.token
    },

    isAuthenticated (state) {
      return !!state.token
    }
  }
}

export default authModule