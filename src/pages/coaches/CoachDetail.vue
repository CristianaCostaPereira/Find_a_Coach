<template>
  Details for Coach

  <router-view></router-view>

  <router-link :to="{ name: 'coach-contact', params: { id: id } }">Contact</router-link>
</template>

<script>
export default {
  props: ['id']
}
</script>