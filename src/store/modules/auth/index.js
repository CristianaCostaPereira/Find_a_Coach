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
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCwoMvRubF1YsB3garRPaZmy2klD6ccTEc', {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      })

      const responseData = await response.json()

      if (!response.ok) {
        console.log(responseData);
        const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.')
        throw error
      }

      console.log(responseData)

      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn
      })
    },

    // Request that creates a new user
    async signup (context, payload) {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCwoMvRubF1YsB3garRPaZmy2klD6ccTEc', {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      })

      const responseData = await response.json()

      if (!response.ok) {
        console.log(responseData);
        const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.')
        throw error
      }

      console.log(responseData)

      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn
      })
    }
  },

  getters: {
    userId (state) {
      return state.userId
    },

    token (state) {
      return state.token
    }
  }
}

export default authModule