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
            <a class="c-button c-button--small c-button--neutral" href="">
              <icon name="plus-circle"></icon> Add slide
            </a>
            <ul class="list">
              <li v-for="slide in slides">
                <canvas class="preview" width="600" height="400" v-on:click="reload"></canvas>
                <icon name="star"></icon>
                <icon name="trash"></icon>
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

            <trumbowyg :content="html" :language="en" @tbwchange="update"></trumbowyg>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import Icon from 'vue-awesome/components/Icon';
  import rasterizehtml from 'rasterizehtml';
  import Trumbowyg from './Trumbowyg';

  export default {
    data() {
      return {
        html: '<h1>Test</h1>',
        presentation: {
          pid: 1,
          title: 'Vue.js and Laravel',
          number_of_slides: 30,
          date_created: '01.10.2016',
        },
        slides: [
          {
            sid: 1,
            content: '<h1>Title</h1>\n<h2>Subtitle</h2>Longlonglonglongcat',
            preview: null,
          },
          {
            sid: 2,
            content: '<h2>Normal title</h2>\n<ul><li>- List item 1</li>\n<li>- List item 2</li>\n<li>- etc. etc. etc.</li></ul>',
            preview: null,
          },
          {
            sid: 3,
            content: '',
            preview: null,
          },
        ],
      };
    },
    components: { Icon, Trumbowyg },
    mounted() {
      let that = this;
      this.slides.forEach(function (slide) {
        that.preview(slide.sid);
      });
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
        let canvas = document.getElementsByTagName('canvas')[this.getSlideIndex(sid)];
        let html = `<div class="reveal"><div class="slide"> ${this.getSlide(sid).content} </div></div>`;
        rasterizehtml.drawHTML(html, canvas)
        .then(function success(renderResult) {
          console.log(renderResult);
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
    },
  };
</script>

<!-- todo make styles go away after component unloading -->
<style src="src/assets/stylesheets/reveal/reveal.scss" lang="scss"></style>
<style src="src/assets/stylesheets/reveal/blood.scss" lang="scss"></style>
<style src="src/assets/stylesheets/reveal/zenburn.css"></style>