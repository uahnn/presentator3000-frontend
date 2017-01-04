<template>
  <div class="reveal">
    <div class="slides">
      <section v-for="slide in slides" v-html="slide.content"></section>
    </div>
  </div>
</template>

<script>
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
            sid: 1,
            content: '\n<h1>Test</h1># Title\n\n### Subtitle Longlonglonglongcat',
          },
          {
            sid: 2,
            content: '\n## Normal title\n\n- List item 1\n- List item 2\n- etc. etc. etc.',
          },
          {
            sid: 3,
            content: '',
          },
        ],
      };
    },
    mounted() {
      Reveal.initialize({
        history: true,
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
    },
    methods: {
      components: Reveal,
    },
  };
</script>

<style src="reveal.js/css/reveal.css"></style>
<style src="reveal.js/lib/css/zenburn.css"></style>
