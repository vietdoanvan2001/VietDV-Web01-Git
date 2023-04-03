<template>
  <div class="layout-left">
    <m-menu></m-menu>
  </div>
  <div class="layout-right">
    <m-header></m-header>
    <m-Content></m-Content>
  </div>
</template>

<script>


import MHeader from './components/layout/TheHeader.vue'
import MContent from './components/layout/TheContent.vue'
import MMenu from './components/layout/TheMenu.vue'
export default {
  name: 'App',
  components: {
    MHeader,MContent,MMenu
  }
}
</script>

<style>

</style>
