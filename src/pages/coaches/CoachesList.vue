<template>
  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>

  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="fetchCoaches">Refresh</base-button>

        <base-button
          v-if="!isCoach && !isLoading"
          link
          :to="{ name: 'register' }">

          Register as a Coach
        </base-button>
      </div>

      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>

      <ul v-else-if="hasCoaches && !isLoading">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"

          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas">
        </coach-item>
      </ul>

      <h3 v-else>No coaches found</h3>
    </base-card>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CoachItem from '../../components/coaches/CoachItem.vue'
import CoachFilter from '../../components/coaches/CoachFilter.vue'

export default {
  components: {
    CoachItem,
    CoachFilter
  },

  data () {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true
      },

      isLoading: false
    }
  },

  computed: {
    ...mapGetters ('coaches', ['coaches', 'hasCoaches', 'isCoach']),

    filteredCoaches () {
      return this.coaches.filter(coach => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true
        }
        return false
      })
    },

    // hasCoaches () {
    //   return !this.isLoading && this.$store.getters['coaches/hasCoaches']
    // }
  },

  methods: {
    ...mapActions('coaches', ['loadCoaches']),

    setFilters (updatedFilters) {
      this.activeFilters = updatedFilters
    },

    async fetchCoaches () {
      this.isLoading = true

      await this.loadCoaches()

      this.isLoading = false
    }
  },

  created () {
    this.fetchCoaches()
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>