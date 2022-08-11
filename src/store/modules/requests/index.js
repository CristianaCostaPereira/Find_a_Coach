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
    requests (state, _, _2, rootGetters) {
      const coachId = rootGetters.userId

      return state.requests.filter(request => request.coachId === coachId)
    },

    hasRequests (_, getters) {
      return getters.requests && getters.requests.length > 0
    }
  }
}

export default requestsModule