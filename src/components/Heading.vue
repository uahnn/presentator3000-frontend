<template>
  <div id="heading">
    <nav class="navbar navbar-default">
      <div class="container">
        <ul class="nav navbar-nav">
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/about">About</router-link>
          </li>
          <li>
            <router-link to="/dashboard">Dashboard</router-link>
          </li>
          <li>
            <router-link v-if="loggedIn" to="/logout">Log out</router-link>
            <router-link v-if="!loggedIn" to="/login">Log in</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import auth from '../auth';

export default {
  name: 'heading',
  data() {
    return {
      loggedIn: auth.loggedIn(),
    };
  },
  created() {
    auth.onChange = (loggedIn) => {
      this.loggedIn = loggedIn;
    };
  },
};
</script>