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

### Node.js
Node.js is a set of libraries for JavaScript which allows it to be used outside of the browser. It is primarily  focused  on  creating  simple, easy to build network clients and servers.

### npm
npm  is  the package manager for the Node.js JavaScript platform.  It puts modules in place so that node can find  them,  and  manages  dependency conflicts intelligently.

It is extremely configurable to support a wide variety of use cases. Most commonly, it is used to publish, discover,  install,  and  develop node programs.

In this case here, npm is used as full-fletched package manager, and as a "proxy" for two Node.js commands to start a development server or to build the codebase (see package.json:scripts).

### other dependencies
Have a look into package.json.

For detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## To-Dos
* Slide preview with correct styling. This is difficult due to the way webpack works.
* If the ordering of slides is changed, it won't be propagated to the backend.