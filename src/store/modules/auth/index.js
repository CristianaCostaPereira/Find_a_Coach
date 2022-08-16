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
      state.token = payload.token
      state.userId = payload.userId
      state.tokenExpiration = payload.tokenExpiration
    }
  },

  actions: {
    login() {},

    // Request that creates a new user
    async signup (contex, payload) {
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
        const error = new Error(responseData.message || 'Failed to authenticate')
        throw error
      }

      console.log(responseData)

      contex.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn
      })
    }
  },

  getters: {
    userId (state) {
      return state.userId
    }
  }
}

export default authModule