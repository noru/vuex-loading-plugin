const RawModule = {
  state: {
    ongoing: 0,
  },
  getters: {
    $globalLoading(state) {
      return state.ongoing > 0
    },
  },
  mutations: {
    ongoing(state, count) {
      state.ongoing += count
    },
    singleAction(state, { key, status }) {
      state[key] = status
    },
  },
}

let COMMIT: any = null
let NAMESPACE: string = 'loading'
let PREFIX: string = 'l_'

const createloadingFunc = (key) => {
  return {
    start() {
      let status = true
      COMMIT('ongoing', 1)
      COMMIT('singleAction', { key, status })
    },
    end() {
      let status = false
      COMMIT('ongoing', -1)
      COMMIT('singleAction', { key, status })
    },
  }
}

const actionWrapper = (context: any, old: any, key: string, ...rest: any[]) => {
  try {
    context.$l = createloadingFunc(PREFIX + key)
  } catch (e) {
    console.error(e)
  }
  return old(context, ...rest)
}

export function wrapActions(actions: any) {
  Object.keys(actions)
    .forEach(key => {
      let old = actions[key]
      actions[key] = (context, ...rest) => actionWrapper(context, old, key, ...rest)
    })
  return actions
}

function initLoadingModule(store, namespace, prefix) {
  Object.keys(store._actions)
  .forEach(key => {
    let loadingKey = prefix + key
    RawModule.state[loadingKey] = false
  })
  store.registerModule(namespace, RawModule)
}

interface Option {
  namespace?: string
  prefix?: string
}

export function createLoadingPlugin(option: Option = {}) {

  NAMESPACE = option.namespace || NAMESPACE
  PREFIX = option.prefix || PREFIX

  return function(store) {
    COMMIT = store.commit
    initLoadingModule(store, NAMESPACE, PREFIX)
  }
}

export default {
  create: createLoadingPlugin,
  wrap: wrapActions,
}
