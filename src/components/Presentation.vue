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
                  <a><icon name="arrows"></icon></a>
                  <a><icon name="star"></icon></a>
                  <a v-on:click.stop.prevent="deleteslide"><icon name="trash"></icon></a>
                </div>
              </li>
            </ul>
          </div>
          <div class="l-9">
            <a class="c-button c-button--small c-button--neutral" href="">
              <icon name="plus-circle"></icon> Add Code Fragment
            </a>
            <a class="c-button c-button--small c-button--neutral" href="">
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
        presentation: {
          pid: 1,
          title: 'Vue.js and Laravel',
          number_of_slides: 30,
          date_created: '01.10.2016',
        },
        slides: [
          {
            sid: 1,
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
      getSlide(sid) {
        for (let slide in this.slides) {
          if (this.slides[slide].sid === sid) {
            return this.slides[slide];
          }
        }
        return false;
      },
      getSlideIndex(sid) {
        for (let slide in this.slides) {
          if (this.slides[slide].sid === sid) return slide;
        }
        return false;
      },
      preview(sid) {
        let canvas = $('canvas').eq(this.getSlideIndex(sid));
        let html = `<div class="reveal"><div class="slide">${this.getSlide(sid).content}</div></div>`;

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
        this.preview(this.slides[index].sid);
      },
      reload(e) {
        let index = $(e.target).parent().index();
        let newcontent = this.slides[index].content;

        // replace text in editor
        $('#trumbowyg-editor').trumbowyg('html', newcontent);

        // set active state on thumb
        $('canvas').removeClass('active');
        $(e.target).addClass('active');
      },
      newslide() {
        // todo how to get new sid?
        let newsid = 4;

        // push new slide
        this.slides.push({ sid: newsid, content: '', preview: null });

        // generate empty preview
        this.preview(this.slides[newsid - 1].sid);

        // empty text in editor
        $('#trumbowyg-editor').trumbowyg('empty');
      },
      deleteslide(e) {
        let index = $(e.target).parents('li').index();

        // delete from list
        this.slides.splice(index, 1);
      },
      sortableOnEnd: function (e) {
        console.log(this.slides, e);
        // todo stuff... right now the data object isn't sorted
      },
      fetchData() {
        let that = this;
        this.error = null;
        this.loading = true;
        const url = 'http://presentator3000.uahnn.com/api/presentations/' + this.$route.params.pid + '/slides';
        this.$http.get(url)
        .then(response => response.json(), (response) => {
          this.error = response.status + response.statusText;
        }).then((json) => {
          this.loading = false;
          this.slides = json;
          let i = 0;
          // add sids manually as not yet provided by external data
          for (let p in this.slides) {
            if (!this.slides[p].hasOwnProperty('sid')) {
              this.slides[p].sid = ++i;
            }
            if (!this.slides[p].hasOwnProperty('preview')) {
              this.slides[p].preview = null;
            }
          }

          // wait for dom update to happen before trying to render previews
          Vue.nextTick(function () {
            for (let p in that.slides) {
              that.preview(that.slides[p].sid);
            }
          });

          // set initial active state
          $('canvas').eq(0).trigger('click');
        });
      },
    },
  };
</script>

<!-- todo make styles go away after component unloading -->
<style src="src/assets/stylesheets/reveal/reveal.scss" lang="scss"></style>
<style src="src/assets/stylesheets/reveal/blood.scss" lang="scss"></style>
<style src="src/assets/stylesheets/reveal/zenburn.css"></style>