<template>
  <section>
    <base-card>
      <h2>Page not found ❌</h2>

      <p>This page could not be found.</p>

      <p>Maybe check all of our
        <router-link :to="{ name: 'coaches-list' }">
          coaches
        </router-link>.
      </p>
    </base-card>
  </section>
</template>