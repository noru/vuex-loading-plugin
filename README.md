# Vuex-loading-plugin
![Vue 2.x](https://img.shields.io/badge/vue-2.x-green.svg "Vue 2 Compatible")
[![npm version](https://img.shields.io/npm/v/vuex-loading-plugin.svg)](https://www.npmjs.com/package/vuex-loading-plugin)

## Dead simple and intuitive loading management for Vuex

Handling intermedia state is not a easy task in vue/vuex, but it should be, without creating further complexity. That's why I create this tiny plugin:
1. start or end a loading state within an action
2. there is a value in store corresponding to the state, simply use it.

## Usage

#### Install
`npm i --save vuex-loading-plugin`

#### Quickstart
```javascript
// when creating store...
import VuexLoading from 'vuex-loading-plugin'

let store = Vuex.Store({
    ...
    actions: VuexLoading.wrap(actions),
    plugins: [VuexLoading.create({
      namespace: 'loading', // default
      prefix: 'l_',         // default
    })],
  })

// That's it! Then in your actions you can write...
async someAction ({ commit, $l }) {
  $l.start() // check out your store, under module "loading", "l_someAction" = true
  commit('overview', await fetch('something'))
  $l.end()  // "l_someAction" = false
  // bonus, there is a global loading state, called...that's right! "global"!
},


```

## API reference
Seriously, do you really need it?

## License
MIT
