<template>
  <section>
    FILTER
  </section>

  <section>
    <div class="controls">
      <button>Refresh</button>

      <router-link :to="{ name: 'register' }">Register as a Coach</router-link>
    </div>

    <ul v-if="hasCoaches">
      <li
        v-for="coach in coaches"
        :key="coach.id">

        {{ coach.firstName }}
      </li>
    </ul>

    <h3 v-else>No coaches found</h3>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters ('coaches', ['coaches', 'hasCoaches'])

    // filteredCoaches () {
    //   return this.$store.getters['coaches/coaches']
    // }
  }
}
</script>