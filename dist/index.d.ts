/**
 * A plugin based on vue@2.7.x and vue-router@3.x
 * Extends vue router capabilities by adding a history stack array to determine if back/forward navigation is possible
 */
import VueRouter from "vue-router";
declare const plugin: {
    install(Vue: any, options: {
        router: VueRouter;
        maxStackLength?: number | undefined;
    }): void;
};
export default plugin;
