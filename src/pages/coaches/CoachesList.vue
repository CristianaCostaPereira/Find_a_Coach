<template>
  <section>
    FILTER
  </section>

  <section>
    <div class="controls">
      <button>Refresh</button>

      <router-link :to="{ name: 'register' }">Register as a Coach</router-link>
    </div>

    <ul>
      List of coaches
    </ul>
  </section>
</template>

<script>
export default {
  data () {
    return {
      choaches: []
    }
  }
}
</script>