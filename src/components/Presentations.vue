<template>
  <div id="presentations">
    <main class="main">
      <div class="l-container">
        <h1>Presentations</h1>
        {{ msg }}
        <div class="actionbar">
          <div class="l-3">
            <a class="c-button c-button--small c-button--success" @click="newPresentation">
              <icon name="plus-circle"></icon> Add
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
                Updated: {{ presentation.updated_at }}
              </div>
              <div class="action">
                <a class="c-button c-button--small c-button--neutral" :href="'/presentation/edit/' + filters.slugify(presentation.title) + '/' + presentation.id">
                  <icon name="pencil"></icon> Edit
                </a>
                <a class="c-button c-button--small c-button--neutral" :href="'/presentation/view/' + filters.slugify(presentation.title) + '/' + presentation.id">
                  <icon name="eye"></icon> Present
                </a>
                <a class="c-button c-button--small c-button--disabled" href="">
                  <icon name="print"></icon> Print Handout
                </a>
                <a class="c-button c-button--small c-button--disabled" href="">
                  <icon name="share-alt"></icon> Share
                </a>
                <a class="c-button c-button--small c-button--neutral" v-on:click="deletePresentation">
                  <icon name="trash"></icon> Delete
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
            id: 1,
            title: 'Vue.js and Laravel',
            number_of_slides: 30,
            date_created: '01.10.2016',
          },
          {
            id: 2,
            title: 'Angular 2 framework',
            number_of_slides: 30,
            date_created: '01.10.2016',
          },
          {
            id: 3,
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
        this.error = null;
        this.loading = true;
        this.$http.get('http://presentator3000.uahnn.com/api/presentations')
        .then(response => response.json(), (response) => {
          console.log(response);
          this.error = response.status + response.statusText;
        }).then((json) => {
          this.loading = false;
          this.presentations = json.data;
          let i = 0;

          // add ids manually as not yet provided by external data
          for (let p in this.presentations) {
            if (!this.presentations[p].hasOwnProperty('id')) {
              this.presentations[p].id = ++i;
            }
          }
        });
      },
      newPresentation() {
        this.$http.post('http://presentator3000.uahnn.com/api/presentations',
        { title: 'Title', description: 'Description' })
        .then(response => response.json(), (response) => {
          console.log(response.body.error);
        }).then((json) => {
          this.presentations.push(json.data);

          $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
        });
      },
      deletePresentation(e) {
        if (!confirm('Are you sure?')) return;
        let index = $(e.target).parents('li').index();
        let id = this.presentations[index].id;
        console.log(id);
        // delete in db
        let url = 'http://presentator3000.uahnn.com/api/presentations/' + id;
        this.$http.delete(url)
        .then((response) => {
          console.log(response);

          // delete from list
          this.presentations.splice(index, 1);
        });
      },
    },
    components: { Icon },
  };

</script>
