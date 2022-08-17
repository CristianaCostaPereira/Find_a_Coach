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
    },

    setRequests (state, payload) {
      // payload should be an array full of requests
      state.requests = payload
    }
  },

  actions: {
    async contactCoach (context, payload) {
      const newRequest = {
        userEmail: payload.email,
        message: payload.message
      }

      const response = await fetch(
        `https://find-a-coach-109ab-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
          method: 'POST',
          body: JSON.stringify(newRequest)
        }
      )

      const responseData = await response.json()

      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to send request!')
        throw error
      }

      // Adding a new ID property to newRequest
      // The responseData, which we get back from Firebase, will have a name field that holds this automatically generated Id
      newRequest.id = responseData.name

      newRequest.coachId = payload.coachId

      context.commit('addRequest', newRequest)
    },

    async fetchRequests (context) {
      const coachId = context.rootGetters.userId

      const token = context.rootGetters.token

      const response = await fetch(`https://find-a-coach-109ab-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` + token)

      const responseData = await response.json()

      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch requests!')
        throw error
      }

      const requests = []

      for (const key in responseData) {
        const request = {
          id: key,
          coachId: coachId,
          userEmail: responseData[key].userEmail,
          message: responseData[key].message
        }

        requests.push(request)
      }

      context.commit('setRequests', requests)
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