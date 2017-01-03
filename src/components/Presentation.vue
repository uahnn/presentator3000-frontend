<template>
  <div id="presentation">
    <main class="main">
      <div class="l-container">
        <h1>Presentation <span class="mode">Edit</span></h1>
        {{ msg }}
        <div class="actionbar">
          <div class="l-3">
            <a class="c-button c-button--small c-button--neutral" href="">
              <icon name="plus-circle"></icon> Add slide
            </a>
            <ul class="list">
              <li v-for="slide in presentation">
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
        msg: 'text',
        presentation: [
          {
            title: 'slide 1',
            number_of_slides: 30,
            date_created: '01.10.2016',
          },
          {
            title: 'slide 2',
            number_of_slides: 30,
            date_created: '01.10.2016',
          },
          {
            title: 'slide 3',
            number_of_slides: 30,
            date_created: '01.10.2016',
          },
        ],
      };
    },
    components: { Icon },
  };

</script>
