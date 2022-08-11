<template>
  <base-dialog
    :show="!!error"
    title="An error ocuured!"
    @close="handleError">

    <p>{{ error }}</p>
  </base-dialog>

  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>

      <base-spinner v-if="isLoading"></base-spinner>

      <ul v-else-if="hasRequests && !isLoading">
        <request-item
          v-for="request in requests"
          :key="request.id"

          :email="request.userEmail"
          :message="request.message">
        </request-item>
      </ul>

      <h3 v-else>You haven't received any requests yet!</h3>
    </base-card>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RequestItem from '../../components/requests/RequestItem.vue';

export default {
  components: {
    RequestItem
  },

  data () {
    return {
      isLoading: false,
      error: null
    }
  },

  computed: {
    ...mapGetters ('requests', ['requests', 'hasRequests'])
  },

  methods: {
    ...mapActions ('requests', ['fetchRequests']),

    async loadRequests () {
      this.isLoading = true

      try {
        await this.fetchRequests()
      } catch (error) {
        this.error = error.message || 'Something went wrong!'
      }

      this.isLoading = false
    },

    handleError () {
      this.error = null
    }
  },

  created () {
    this.loadRequests()
  }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>