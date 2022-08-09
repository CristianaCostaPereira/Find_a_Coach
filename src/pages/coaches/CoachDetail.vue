<template>
  Details for Coach

  <router-view></router-view>

  <router-link :to="{ name: 'coach-contact', params: { id: 'c1'} }">Contact</router-link>
</template>