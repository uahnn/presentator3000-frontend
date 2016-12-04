<template>
  <div id="presentations">
    <main class="main">
      <div class="l-container">
        <h1>Presentations</h1>
        {{ msg }}
        <div class="actionbar">
          <div class="l-3">
            <a class="c-button c-button--small c-button--success" href="">
              <icon name="plus-circle"></icon> New presentation
            </a>
            <a class="c-button c-button--small c-button--alert" href="">
              <icon name="trash"></icon> Delete
            </a>
          </div>
          <div class="l-9"><input type="text" placeholder="search presentations" /></div>
        </div>
      </div>
      <div class="l-container">
        <ul class="list">
          <li v-for="presentation in presentations">
            <div class="preview"></div>
            <div class="info">
              <div class="title">{{ presentation.title }}</div>
              <div class="meta">
                Slides: {{ presentation.number_of_slides }} |
                Theme: XXXXX |
                Created: {{ presentation.date_created }}
              </div>
              <div class="action">
                <a class="c-button c-button--small c-button--neutral" href="">
                  <icon name="pencil"></icon> Edit
                </a>
                <a class="c-button c-button--small c-button--neutral" href="">
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
        presentations: [
          {
            title: 'presentation 1',
            number_of_slides: 30,
            date_created: '01.10.2016',
          },
          {
            title: 'presentation 2',
            number_of_slides: 30,
            date_created: '01.10.2016',
          },
          {
            title: 'presentation 3',
            number_of_slides: 30,
            date_created: '01.10.2016',
          },
        ],
      };
    },
    components: { Icon },
  };

</script>
