<template>
  <div id="viewer" style="position: absolute; top: 30px; width: 100%; height: 100%;">
    <div class="reveal">
      <div class="slides">
        <section v-for="slide in slides" v-html="slide.content"></section>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Reveal from 'reveal.js';

  document.body.head = require('reveal.js/lib/js/head.min.js');
  document.body.classList = require('reveal.js/lib/js/classList.js');
  require('reveal.js/plugin/markdown/marked.js');
  require('reveal.js/plugin/markdown/markdown.js');
  // require('reveal.js/plugin/highlight/highlight.js');

  export default {
    name: 'Viewer',
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
            sid: 0,
            content: null,
          },
        ],
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
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
          }

          // wait for dom update to happen before trying to render previews
          Vue.nextTick(function () {
            Reveal.initialize({
              history: true,
              width: '100%',
              height: '100%',
              dependencies: [
                // Cross-browser shim that fully implements classList - https://github.com/eligrey/classList.js/
                // { src: '/node_modules/reveal.js/lib/js/classList.js', condition: function () { return !document.body.classList; } },
                // { src: '/node_modules/reveal.js/lib/js/head.min.js', condition: function () { return !document.body.head; } },

                // Interpret Markdown in <section> elements
                // { src: '/node_modules/reveal.js/plugin/markdown/marked.js', condition: function () { return !!document.querySelector('[data-markdown]'); } },
                // { src: '/node_modules/reveal.js/plugin/markdown/markdown.js', condition: function () { return !!document.querySelector('[data-markdown]'); } },

                // Syntax highlight for <code> elements
                /* eslint-disable no-undef */
                // { src: './~/reveal.js/plugin/highlight/highlight.js', async: true, callback: function () { hljs.initHighlightingOnLoad(); } },

                // Zoom in and out with Alt+click
                // { src: 'reveal.js/plugin/zoom-js/zoom.js', async: true },

                // Speaker notes
                // { src: './~/reveal.js/plugin/notes/notes.js', async: true },

                // MathJax
                // { src: 'reveal.js/plugin/math/math.js', async: true },
              ],
            });
          });
        });
      },
    },
  };
</script>


<!-- todo make styles go away after component unloading -->
<style src="src/assets/stylesheets/reveal/reveal.scss" lang="scss"></style>
<style src="src/assets/stylesheets/reveal/blood.scss" lang="scss"></style>
<style src="src/assets/stylesheets/reveal/zenburn.css"></style>
