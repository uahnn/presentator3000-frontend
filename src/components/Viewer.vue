<template>
  <div class="reveal">
    <div class="slides">
      <section data-markdown v-for="slide in slides">
        <script type="text/template">
          {{ slide.content }}
        </script>
      </section>
    </div>
  </div>
</template>

<script>
  import Reveal from 'reveal.js';

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
            content: '\n# Title\n\n### Subtitle Longlonglonglongcat',
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
      });
    },
    methods: {
      components: Reveal,
    },
  };
</script>

<style src="reveal.js/css/reveal.css"></style>

<style src="reveal.js/lib/css/zenburn.css"></style>
