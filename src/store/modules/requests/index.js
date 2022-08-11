const requestsModule = {
  namespaced: true,

  state () {
    return {
      requests: []
    }
  },

  mutations: {
    addRequest (state, payload) {
      // .push into the [], assuming that the payload already is the finished request as we wanna add it
      state.requests.push(payload)
    }
  },

  actions: {
    contactCoach (context, payload) {
      const newRequest = {
        id: new Date().toISOString(),
        coachId: payload.coachId,
        userEmail: payload.email,
        message: payload.message
      }

      context.commit('addRequest', newRequest)
    }
  },

  getters: {
    requests (state) {
      return state.requests
    },

    hasRequests (state) {
      return state.requests && state.requests.length > 0
    }
  }
}

export default requestsModule