<template>
  <div id="presentations">
    <main class="main">
      <div class="l-container">
        <h1>Presentations</h1>
        {{ msg }}
        <div class="actionbar">
          <div class="l-3">
            <a class="c-button c-button--small c-button--success" href="/presentation/add">
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
        <ul class="list">
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
    components: { Icon },
  };

</script>
