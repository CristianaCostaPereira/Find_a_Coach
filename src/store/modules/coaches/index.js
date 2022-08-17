const coachesModule = {
  namespaced: true,

  state () {
    return {
      lastFetch: null,

      coaches: [
        {
          id: 'c1',
          firstName: 'Maximilian',
          lastName: 'Schwarzmüller',
          areas: ['frontend', 'backend', 'career'],
          description: "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          hourlyRate: 30
        },

        {
          id: 'c2',
          firstName: 'Julie',
          lastName: 'Jones',
          areas: ['frontend', 'career'],
          description: 'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
          hourlyRate: 30
        }
      ]
    }
  },

  mutations: {
    registerCoach (state, payload) {
      state.coaches.push(payload)
    },

    setCoaches (state, payload) {
      // We assumed that the payload is a list of coaches
      state.coaches = payload
    },

    setFetchTimestamp (state) {
      state.lastFetch = new Date().getTime()
    }
  },

  actions: {
    async registerCoach (context, data) {
      const userId = context.rootGetters.userId

      const coachData = {
        firstName: data.first,
        lastName: data.last,
        description: data.desc,
        hourlyRate: data.rate,
        areas: data.areas
      }

      const token = context.rootGetters.token

      const response = await fetch(`https://find-a-coach-109ab-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` + token, {
        method: 'PUT',
        body: JSON.stringify(coachData )
      })

      // const responseDate = await response.json()

      if (!response.ok) {
        // error
      }

      context.commit('registerCoach', {
        ...coachData,
        id: userId
      })
    },

    async loadCoaches (context, payload) {
      // Not fetch a new coach all the time and instead reuse the existinh data
      if (!payload.forceRefresh && !context.getters.shouldUpdate) {
        return
      }

      const response = await fetch(
        `https://find-a-coach-109ab-default-rtdb.firebaseio.com/coaches.json`
      )

      const responseData = await response.json()

      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch!')
        throw error
      }

      const coaches = []

      for (const key in responseData) {
        const coach = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate,
          areas: responseData[key].areas
        }

        coaches.push(coach)
      }

      context.commit('setCoaches', coaches)
      context.commit('setFetchTimestamp')
    }
  },

  getters: {
    coaches (state) {
      return state.coaches
    },

    hasCoaches (state) {
      return state.coaches && state.coaches.length > 0
    },

    isCoach (_, getters, _2, rootGetters ) {
      const coaches = getters.coaches

      const userId = rootGetters.userId

      return coaches.some(coach => coach.id === userId)
    },

    shouldUpdate (state) {
      const lastFetch = state.lastFetch

      if (!lastFetch) {
        // If we have no timestapmp we should update
        return true
      }

      const currentTimestamp = new Date().getTime()

      // compares the currentTimestamp with the stored timestamp
      // Divided by 1000 because both numbers are in milliseconds
      // Will return true if it is more than a minute ago; so we should update again
      return(currentTimestamp - lastFetch) / 1000 > 60
    }
  }
}

export default coachesModule