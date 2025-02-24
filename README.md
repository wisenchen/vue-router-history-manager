# vue-router-history-manager

A Vue Router plugin that manages navigation history state and provides methods to check if back/forward navigation is possible.

## Features

- Track router navigation history
- Check if back navigation is possible
- Check if forward navigation is possible
- Compatible with Vue 2.7+ and Vue Router 3.x

## Installation

```bash
npm install vue-router-history-manager
```

## Usage

First, register the plugin in your Vue application:

```javascript
import Vue from "vue";
import Router from "vue-router";
import VueRouterHistoryManager from "vue-router-history-manager";
const router = new Router({
  // your router config
});
Vue.use(VueRouterHistoryManager, { router });
```

### In Components

The plugin adds `$historyManager` to Vue's prototype, which you can use in any component:

```javascript
export default {
  computed: {
    canBack() {
      return this.$historyManager.canBack();
    },
    canForward() {
      return this.$historyManager.canForward();
    },
  },
  template: `
    <div> 
        <button :disabled="!$historyManager.canBack()" @click="$router.back()"> Back </button> 
        <button :disabled="!$historyManager.canForward()" @click="$router.forward()"> Forward </button> 
    </div>`,
};
```

## API

### `$historyManager.canBack()`
- Returns: `boolean`
- Returns `true` if there are entries in the history stack to go back to.

### `$historyManager.canForward()`
- Returns: `boolean`
- Returns `true` if there are entries in the history stack to go forward to.

## TypeScript Support

This plugin includes TypeScript type declarations. The types will be automatically available when you import the plugin.

For TypeScript users, you can access the types like this:

```typescript
import { VueRouterHistoryManager } from 'vue-router-history-manager'

declare module 'vue/types/vue' {
  interface Vue {
    $historyManager: VueRouterHistoryManager
  }
}
```

## Browser Support

- All modern browsers
- IE11 and above (requires appropriate polyfills)


## License

MIT © [wisen](https://github.com/wisenchen)
