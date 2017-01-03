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
                <div class="preview"></div>
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
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import Icon from 'vue-awesome/components/Icon';

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
            content: '# Title\n\n### Subtitle Longlonglonglongcat',
          },
          {
            sid: 2,
            content: '## Normal title\n\n- List item 1\n- List item 2\n- etc. etc. etc.',
          },
          {
            sid: 3,
            content: '',
          },
        ],
      };
    },
    components: { Icon },
  };

</script>
