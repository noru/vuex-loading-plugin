/* vuex-loading-plugin */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var RawModule = {
    state: {
        ongoing: 0,
    },
    getters: {
        $globalLoading: function (state) {
            return state.ongoing > 0;
        },
    },
    mutations: {
        ongoing: function (state, count) {
            state.ongoing += count;
        },
        singleAction: function (state, _a) {
            var key = _a.key, status = _a.status;
            state[key] = status;
        },
    },
};
var COMMIT = null;
var NAMESPACE = 'loading';
var PREFIX = 'l_';
var createloadingFunc = function (key) {
    return {
        start: function () {
            var status = true;
            COMMIT('ongoing', 1);
            COMMIT('singleAction', { key: key, status: status });
        },
        end: function () {
            var status = false;
            COMMIT('ongoing', -1);
            COMMIT('singleAction', { key: key, status: status });
        },
    };
};
var actionWrapper = function (context, old, key) {
    var rest = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        rest[_i - 3] = arguments[_i];
    }
    try {
        context.$l = createloadingFunc(PREFIX + key);
    }
    catch (e) {
        console.error(e);
    }
    return old.apply(void 0, [context].concat(rest));
};
function wrapActions(actions) {
    Object.keys(actions)
        .forEach(function (key) {
        var old = actions[key];
        actions[key] = function (context) {
            var rest = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                rest[_i - 1] = arguments[_i];
            }
            return actionWrapper.apply(void 0, [context, old, key].concat(rest));
        };
    });
    return actions;
}
function initLoadingModule(store, namespace, prefix) {
    Object.keys(store._actions)
        .forEach(function (key) {
        var loadingKey = prefix + key;
        RawModule.state[loadingKey] = false;
    });
    store.registerModule(namespace, RawModule);
}
function createLoadingPlugin(option) {
    if (option === void 0) { option = {}; }
    NAMESPACE = option.namespace || NAMESPACE;
    PREFIX = option.prefix || PREFIX;
    return function (store) {
        COMMIT = store.commit;
        initLoadingModule(store, NAMESPACE, PREFIX);
    };
}
var index = {
    create: createLoadingPlugin,
    wrap: wrapActions,
};

exports.wrapActions = wrapActions;
exports.createLoadingPlugin = createLoadingPlugin;
exports.default = index;
/* https://github.com/noru */
