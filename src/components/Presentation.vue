<template>
  <div id="presentation">
    <main class="main">
      <div class="l-container">
        <h1>{{ presentation.title }} <span class="mode">
          <span class="c-button c-button--small c-button--disabled">Edit</span>
          <a class="c-button c-button--small c-button--neutral" :href="'/presentation/view/' + filters.slugify(presentation.title) + '/' + presentation.pid">View</a>
        </span></h1>
        <div class="actionbar">
          <div class="l-3">
            <a class="c-button c-button--small c-button--neutral" v-on:click.stop.prevent="newslide">
              <icon name="plus-circle"></icon> Add slide
            </a>
            <ul class="list" v-sortable="{ onEnd: sortableOnEnd }">
              <li v-for="slide in slides">
                <canvas class="preview" width="600" height="400" v-on:click.stop.prevent="reload"></canvas>
                <div class="actions">
                  <a title="reorder slide"><icon name="arrows"></icon></a>
                  <a v-on:click.stop.prevent="deleteslide" title="delete slide"><icon name="trash"></icon></a>
                </div>
              </li>
            </ul>
          </div>
          <div class="l-9">
            <a class="c-button c-button--small c-button--disabled">
              <icon name="plus-circle"></icon> Add Code Fragment
            </a>
            <a class="c-button c-button--small c-button--disabled">
            <icon name="gear"></icon> Preferences
            </a>
            <div class="title">
              <label>Title</label><input type="text" v-model="presentation.title" />
            </div>
            <trumbowyg :content="slides[0].content" :language="en" @tbwchange="update"></trumbowyg>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Icon from 'vue-awesome/components/Icon';
  import rasterizehtml from 'rasterizehtml';
  import Sortable from 'vue-sortable';
  import Trumbowyg from './Trumbowyg';

  Vue.use(Sortable);

  export default {
    data() {
      return {
        en: 'en',
        presentation: {
          pid: 1,
          title: 'Vue.js and Laravel',
          number_of_slides: 30,
          date_created: '01.10.2016',
        },
        slides: [
          {
            id: 1,
            content: null,
            preview: null,
          },
        ],
      };
    },
    components: { Icon, Trumbowyg },
    mounted() {
      // fetch the data when the view is created and the data is
      // already being observed
      this.fetchData();
    },
    watch: {
      // call again the method if the route changes
      $route: 'fetchData',
    },
    methods: {
      getSlide(id) {
        for (let slide in this.slides) {
          if (this.slides[slide].id === id) {
            return this.slides[slide];
          }
        }
        return false;
      },
      getSlideIndex(id) {
        for (let slide in this.slides) {
          if (this.slides[slide].id === id) return slide;
        }
        return false;
      },
      preview(id) {
        let canvas = $('canvas').eq(this.getSlideIndex(id)).empty();
        let html = `<style>* { background-color: rgb(34, 34, 34); color: #fff; font-family: Ubuntu, sans-serif; font-size: 32pt; } h1 { font-size: 72pt; text-transform: uppercase;}</style><div class="reveal"><div class="slide">${this.getSlide(id).content}</div></div>`;

        rasterizehtml.drawHTML(html, canvas[0])
        .then(function success() {
          // console.log(renderResult);
        }, function error(e) {
          console.log(e);
        });
      },
      update(content) {
        let index = $('canvas.active').parent().index();

        // write back changes
        this.slides[index].content = content;

        // update thumb
        this.preview(this.slides[index].id);
      },
      reload(e) {
        let index = $(e.target).parent().index();
        let newcontent = this.slides[index].content;

        // replace text in editor
        $('#trumbowyg-editor').trumbowyg('html', newcontent);

        // set active state on thumb
        $('canvas').removeClass('active');
        $(e.target).addClass('active');

        // push presentation to server
        let slides = this.slides;
        slides.forEach(function (c, i) {
          delete slides[i].preview;
        });
        const url = 'http://presentator3000.uahnn.com/api/presentations/' + this.$route.params.pid + '/slides';
        this.$http.post(url, slides).then(response => response.json(), (response) => {
          console.log('error while saving', response);
        }).then((json) => {
          console.log('SAVED!', json);
        });
      },
      newslide() {
        // request new slide
        const url = 'http://presentator3000.uahnn.com/api/presentations/' + this.$route.params.pid + '/slides';
        this.$http.post(url, { content: 'Content', shared: false }).then(response => response.json(), (response) => {
          console.log('error', response);
        }).then((json) => {
          let that = this;
          let newslide = json;
          newslide.preview = null;

          // push new slide
          this.slides.push(newslide);

          // wait for dom update to happen before trying to render previews
          Vue.nextTick(function () {
            // generate empty preview
            that.preview(newslide.id);

            // make active
            $('canvas').last().trigger('click');
          });

          // empty text in editor
          $('#trumbowyg-editor').trumbowyg('html', newslide.content);
        });
      },
      deleteslide(e) {
        if (!confirm('Are you sure?')) return;
        let index = $(e.target).parents('li').index();
        let id = this.slides[index].id;
        console.log(id);
        // delete in db
        let url = 'http://presentator3000.uahnn.com/api/slides/' + id;
        this.$http.delete(url)
        .then((response) => {
          console.log(response);

          // delete from list
          this.slides.splice(index, 1);
        });
      },
      sortableOnEnd: function (e) {
        console.log(this.slides, e);
        // todo stuff... right now the data object isn't sorted
      },
      fetchData() {
        // query all slides
        let that = this;
        this.error = null;
        this.loading = true;
        let url = 'http://presentator3000.uahnn.com/api/presentations/' + this.$route.params.pid + '/slides';
        this.$http.get(url)
        .then(response => response.json(), (response) => {
          this.error = response.status + response.statusText;
        }).then((json) => {
          this.loading = false;
          if (json.length !== 0) {
            this.slides = json;
          }
          // add preview manually as not yet provided by external data
          for (let p in this.slides) {
            if (!this.slides[p].hasOwnProperty('preview')) {
              this.slides[p].preview = null;
            }
          }

          // wait for dom update to happen before trying to render previews
          Vue.nextTick(function () {
            for (let p in that.slides) {
              that.preview(that.slides[p].id);
            }
          });

          // set initial active state
          $('canvas').eq(0).trigger('click');
        });

        // query presentation
        url = 'http://presentator3000.uahnn.com/api/presentations/' + this.$route.params.pid;
        this.$http.get(url)
        .then(response => response.json(), (response) => {
          this.error = response.status + response.statusText;
        }).then((json) => {
          // set presentation
          this.presentation = json;
        });
      },
    },
  };
</script>

<!-- todo make styles go away after component unloading -->
<style src="src/assets/stylesheets/reveal/reveal.scss" lang="scss"></style>
<style src="src/assets/stylesheets/reveal/blood.scss" lang="scss"></style>
<style src="src/assets/stylesheets/reveal/zenburn.css"></style>