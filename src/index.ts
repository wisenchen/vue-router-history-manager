/**
 * A plugin based on vue@2.7.x and vue-router@3.x
 * Extends vue router capabilities by adding a history stack array to determine if back/forward navigation is possible
 */
import VueRouter from "vue-router";
import { ref } from "vue";

export class VueRouterHistoryManager {
  currentIdx = ref<number>(-1);
  historyStack = ref<string[]>([]);
  router: VueRouter;

  constructor(router: VueRouter) {
    this.router = router;

    // Initialize the history stack with initial route
    this._updateHistory();

    // Listen for route changes
    this.router.afterEach(() => {
      this._updateHistory();
    });
  }

  _updateHistory() {
    // Vue Router 3.x history state key is unique for each route and can be used to identify it
    const currentKey = window.history.state?.key;
    if (!currentKey) return;
    const historyIndex = this.historyStack.value.indexOf(currentKey);
    // If the route is not in the history stack, add it, backward and forward will be based on this stack
    if (historyIndex === -1) {
      this.historyStack.value.push(currentKey);
      this.currentIdx.value = this.historyStack.value.length - 1;
    } else {
      // if the route exists, it means a forward or backward operation is triggered, just update the current index
      this.currentIdx.value = historyIndex;
    }
  }

  canBack() {
    return this.currentIdx.value > 0;
  }

  canForward() {
    return this.currentIdx.value < this.historyStack.value.length - 1;
  }
}

const plugin = {
  install(Vue: any, options: { router: VueRouter }) {
    const router = options.router;
    if (!router) throw new Error("Router is required");

    const manager = new VueRouterHistoryManager(router);

    Vue.prototype.$historyManager = manager;
  },
};

export default plugin;
