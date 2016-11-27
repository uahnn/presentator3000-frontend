<template>
  <div id="presentator">

    <hello></hello>
    <admin></admin>
    <viewer></viewer>

  </div>
</template>

<script>
import Hello from './components/Hello';
import Admin from './components/Admin';
import Viewer from './components/Viewer';

export default {
  name: 'presentator',
  components: {
    Hello, Admin, Viewer,
  },
};
</script>

<style>
#presentator {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<style lang="sass">
  @import "./assets/scss/main"
</style>
