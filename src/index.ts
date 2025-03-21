/**
 * A plugin based on vue@2.7.x and vue-router@3.x
 * Extends vue router capabilities by adding a history stack array to determine if back/forward navigation is possible
 */
import VueRouter from "vue-router";
import { Ref, ref } from "vue";

interface HistoryItem {
  key: string;
  url: string;
}
class VueRouterHistoryManager {
  private currentIdx = ref(-1);
  private historyStack: Ref<HistoryItem[]> = ref([]);
  private router: VueRouter;

  private maxStackLength: number;

  constructor(router: VueRouter, maxStackLength = 100) {
    this.router = router;
    this.maxStackLength = maxStackLength;

    // Listen for route changes
    this.router.afterEach(() => {
      this.updateHistory();
    });
  }

  private updateHistory() {
    // Vue Router 3.x history state key is unique for each route and can be used to identify it
    const currentKey = window.history.state?.key;
    if (!currentKey) return;
    const historyIndex = this.historyStack.value.findIndex(item => item.key === currentKey);
    // If the route is not in the history stack, add it, backward and forward will be based on this stack
    if (historyIndex === -1) {
      // If in back navigation state and not at the latest index (currentIdx !== historyStack.length - 1), truncate subsequent routes
      this.historyStack.value.splice(this.currentIdx.value + 1);
      this.historyStack.value.push({
        key: currentKey,
        url: window.location.href,
      });
      this.currentIdx.value = this.historyStack.value.length - 1;
      if (this.historyStack.value.length > this.maxStackLength) {
        this.historyStack.value.shift();
      }
    } else {
      // if the route exists, it means a forward or backward operation is triggered, just update the current index
      this.currentIdx.value = historyIndex;
    }
  }

  canBack() {
    return this.historyStack.value.length > 1 && this.currentIdx.value > 0;
  }

  canForward() {
    return this.currentIdx.value < this.historyStack.value.length - 1;
  }

  back() {
    if (!this.canBack()) return;
    this.currentIdx.value--;
    this.jumpCurrentPosition();
  }

  forward() {
    if (!this.canForward()) return;
    this.currentIdx.value++;
    this.jumpCurrentPosition();
  }

  jumpCurrentPosition() {
    const targetItem = this.historyStack.value[this.currentIdx.value];
    if (targetItem) {
      window.location.href = targetItem.url;
    }
  }
}

const plugin = {
  install(Vue: any, options: { router: VueRouter, maxStackLength?: number }) {
    const router = options.router;
    if (!router) throw new Error('Router is required');

    const manager = new VueRouterHistoryManager(router, options.maxStackLength);

    Vue.prototype.$historyManager = manager;
  },
};

export default plugin;
