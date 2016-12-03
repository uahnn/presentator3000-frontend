<template>
  <div id="dashboard">
    <aside class="aside">
      <div class="l-container">
        <ul class="subnav">
          <li>test</li>
        </ul>
      </div>
    </aside>
    <main class="main">
      <div class="l-container">
        <h1>Dashboard</h1>
        {{msg}}

      </div>
    </main>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'This is your dashboard. Take care.',
      };
    },
  };

</script>
