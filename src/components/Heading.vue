<template>
  <div id="heading">
    <nav class="navbar navbar-default">
      <div class="container">
        <ul class="nav navbar-nav">
          <li>
            <router-link to="/" exact>Home</router-link>
          </li>
          <li v-if="!loggedIn">
            <router-link to="/features">Features</router-link>
          </li>
          <li v-if="!loggedIn">
            <router-link to="/pricing">Pricing</router-link>
          </li>
          <li v-if="!loggedIn">
            <router-link to="/register">Register</router-link>
          </li>
          <li v-if="loggedIn">
            <router-link to="/dashboard">Dashboard</router-link>
          </li>
          <li v-if="loggedIn">
            <router-link to="/presentations">Presentations</router-link>
          </li>
          <li v-if="loggedIn">
            <router-link to="/profile">Profile</router-link>
          </li>
          <li>
            <router-link v-if="loggedIn" to="/logout">Log out</router-link>
            <router-link v-if="!loggedIn" to="/login">Sign in</router-link>
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
