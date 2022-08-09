<template>
  <section>
    FILTER
  </section>

  <section>
    <div class="controls">
      <button>Refresh</button>

      <router-link :to="{ name: 'register' }">
        Register as a Coach
      </router-link>
    </div>

    <ul v-if="hasCoaches">
      <coach-item
        v-for="coach in coaches"
        :key="coach.id"

        :id="coach.id"
        :first-name="coach.firstName"
        :last-name="coach.lastName"
        :rate="coach.hourlyRate"
        :areas="coach.areas">
      </coach-item>
    </ul>

    <h3 v-else>No coaches found</h3>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import CoachItem from '../../components/coaches/CoachItem.vue'

export default {
  components: {
    CoachItem
  },

  computed: {
    ...mapGetters ('coaches', ['coaches', 'hasCoaches'])

    // filteredCoaches () {
    //   return this.$store.getters['coaches/coaches']
    // }
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