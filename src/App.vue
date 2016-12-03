<template>
  <div class="wrapper">
    <heading></heading>
    <template v-if="$route.matched.length">
      <router-view></router-view>
    </template>
    <template v-else>
      <p>You are logged {{ loggedIn ? 'in' : 'out' }}</p>
    </template>
  </div>
</template>

<script>
import Heading from './components/Heading';

export default {
  name: 'presentator',
  components: {
    Heading,
  },
};
</script>

<style lang="sass">
  @import "assets/stylesheets/main"
</style>
