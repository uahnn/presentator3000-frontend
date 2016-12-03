# presentator3000

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## CSS w/ BEM
Add a new component

```sass
/*
 * This is an example of a component.
 */


/*
 * Block
 */
.c-example {

  /* 1: Add the direct properties of the element */
  property: value;

  /* 2: Add media queries or print styles */
  @media (--breakpoint-10) { property: value; }

  /* 3: Add selectors of the parent element */
  &:hover { property: value; }

  /* 4: Add temporary states of the parent element */
  &.is-open { property: value; }

  /* 5: Add nested elements */
  & strong { property: value; }
}

  /*
   * Element
   */
  .c-example__subcomponent {
    property: value;
  }

/*
 * Modifier
 */
.c-example--modifier {
  property: value;
}

```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
