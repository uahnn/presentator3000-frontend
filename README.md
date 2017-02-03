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

## Dependencies

## Node.js
Node.js is a set of libraries for JavaScript which allows it to be used outside of the browser. It is primarily  focused  on  creating  simple, easy to build network clients and servers.

## npm
npm  is  the package manager for the Node.js JavaScript platform.  It puts modules in place so that node can find  them,  and  manages  dependency conflicts intelligently.

It is extremely configurable to support a wide variety of use cases. Most commonly, it is used to publish, discover,  install,  and  develop node programs.

In this case here, npm is used as full-fletched package manager, and as a "proxy" for two Node.js commands to start a development server or to build the codebase (see package.json:scripts).


### "highlight.js": "^9.8.0"

    "jquery": "^3.1.1",
    "rasterizehtml": "^1.2.4",
    "reveal.js": "^3.3.0",
    "trumbowyg": "^2.4.2",
    "vue": "^2.1.8",
    "vue-awesome": "^2.0.3",
    "vue-chunk": "^1.0.0",
    "vue-resource": "^1.0.3",
    "vue-router": "^2.0.3",
    "vue-sortable": "github:ryanhightower/vue-sortable"

## CSS w/ BEM
Add a new component (the right way)

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

## To-Dos
* Slide preview with correct styling. This is difficult due to the way webpack works.
* If the ordering of slides is changed, it won't be propagated to the backend.
* 