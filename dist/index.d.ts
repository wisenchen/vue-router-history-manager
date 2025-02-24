/**
 * A plugin based on vue@2.7.x and vue-router@3.x
 * Extends vue router capabilities by adding a history stack array to determine if back/forward navigation is possible
 */
import VueRouter from "vue-router";
export declare class VueRouterHistoryManager {
    currentIdx: import("vue").Ref<number>;
    historyStack: import("vue").Ref<string[]>;
    router: VueRouter;
    constructor(router: VueRouter);
    _updateHistory(): void;
    canBack(): boolean;
    canForward(): boolean;
}
declare const plugin: {
    install(Vue: any, options: {
        router: VueRouter;
    }): void;
};
export default plugin;
