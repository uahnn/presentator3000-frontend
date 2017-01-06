<template>
  <div id="presentations">
    <main class="main">
      <div class="l-container">
        <h1>Presentations</h1>
        {{ msg }}
        <div class="actionbar">
          <div class="l-3">
            <a class="c-button c-button--small c-button--success" :href="'/presentation/edit/new%20presentation/0'">
              <icon name="plus-circle"></icon> New presentation
            </a>
            <a class="c-button c-button--small c-button--alert" href="">
              <icon name="trash"></icon> Delete
            </a>
          </div>
          <div class="l-9">
            <input type="text" v-model="searchterm" placeholder="search presentations" />
            <icon name="search"></icon>
          </div>
        </div>
      </div>
      <div class="l-container">
        <div class="loading" v-if="loading">Loading...</div>

        <ul v-if="filtered_presentations" class="list">
          <li v-for="presentation in filtered_presentations">
            <div class="preview"></div>
            <div class="info">
              <div class="title">{{ presentation.title }}</div>
              <div class="meta">
                Slides: {{ presentation.number_of_slides }} |
                Theme: XXXXX |
                Created: {{ presentation.date_created }}
              </div>
              <div class="action">
                <a class="c-button c-button--small c-button--neutral" :href="'/presentation/edit/' + filters.slugify(presentation.title) + '/' + presentation.pid">
                  <icon name="pencil"></icon> Edit
                </a>
                <a class="c-button c-button--small c-button--neutral" :href="'/presentation/view/' + filters.slugify(presentation.title) + '/' + presentation.pid">
                  <icon name="eye"></icon> Present
                </a>
                <a class="c-button c-button--small c-button--neutral" href="">
                  <icon name="print"></icon> Print Handout
                </a>
                <a class="c-button c-button--small c-button--neutral" href="">
                  <icon name="share-alt"></icon> Share
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
  import Icon from 'vue-awesome/components/Icon';

  export default {
    data() {
      return {
        loading: false,
        msg: 'text',
        searchterm: '',
        presentations: [
          {
            pid: 1,
            title: 'Vue.js and Laravel',
            number_of_slides: 30,
            date_created: '01.10.2016',
          },
          {
            pid: 2,
            title: 'Angular 2 framework',
            number_of_slides: 30,
            date_created: '01.10.2016',
          },
          {
            pid: 3,
            title: 'Vue.js framework',
            number_of_slides: 30,
            date_created: '01.10.2016',
          },
        ],
      };
    },
    computed: {
      filtered_presentations: function () {
        let that = this;
        return this.presentations.filter(function (presentation) {
          let searchfields = ['title'];
          let show = true;
          if (that.searchterm === '') return true;
          searchfields.forEach(function (field) {
            if (!presentation[field].toLowerCase().includes(that.searchterm.toLowerCase())) {
              show = false;
            }
          });
          return show;
        });
      },
    },
    created() {
      // fetch the data when the view is created and the data is
      // already being observed
      this.fetchData();
    },
    watch: {
      // call again the method if the route changes
      $route: 'fetchData',
    },
    methods: {
      fetchData() {
        this.error = this.post = null;
        this.loading = true;
        // replace getPost with your data fetching util / API wrapper
        /* getPost(this.$route.params.id, (err, post) => {
          this.loading = false;
          if (err) {
            this.error = err.toString();
          } else {
            this.post = post;
          }
        });*/
      },
    },
    components: { Icon },
  };

</script>
