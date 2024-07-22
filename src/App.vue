<script setup>
import VScaleScreen from 'v-scale-screen';
</script>

<template>
  <div class="app">
    <div v-if="$route.path === '/'">
      <VScaleScreen>
        <RouterView />
      </VScaleScreen>
    </div>
    <div v-else>
      <RouterView />
    </div>
  </div>
</template>

<style>
/* #app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
} */
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
