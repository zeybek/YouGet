<template>
<div>
  <p>Settings Page</p>
  <router-link :to="{ name: 'home' }"><p>Go Back</p></router-link>
</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  name: 'settings',
  methods: {}
};
</script>

<style scoped>
</style>