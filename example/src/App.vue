<template>
  <div id="app">
    <nav>
      <div class="navigation-controls">
        <button :disabled="!$historyManager.canBack()" @click="$router.back()">
          ← Back
        </button>
        <button
          :disabled="!$historyManager.canForward()"
          @click="$router.forward()"
        >
          Forward →
        </button>
      </div>
      <div>
        stack: {{ $historyManager.historyStack }}
        <br/>
        index:{{ $historyManager.currentIdx }}
      </div>

      <div class="nav-links">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/contact">Contact</router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
});
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

nav {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}

.nav-links {
  margin-bottom: 15px;
}

.nav-links a {
  color: #2c3e50;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-links a:hover {
  background-color: #f5f5f5;
}

.nav-links a.router-link-active {
  color: #42b983;
  font-weight: bold;
}

.navigation-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

button:hover:not(:disabled) {
  background-color: #3aa876;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  opacity: 0.7;
}

button:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: none;
}
</style>
