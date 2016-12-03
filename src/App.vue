<template>
  <div class="wrapper">
    <heading></heading>
    <template v-if="$route.matched.length">
      <router-view></router-view>
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

<style src="assets/stylesheets/main.scss" lang="scss"></style>
