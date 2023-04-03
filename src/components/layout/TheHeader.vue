<template>
  <div class="header">
    <div class="header-left">
      <div class="header-icon menu-toggle-icon"></div>
      <div class="header-select">
        <div class="header-select-name">{{ headerText.companyName }}</div>
        <div class="header-icon-mini header-select-icon"></div>
      </div>
    </div>
    <div class="header-right">
      <div class="right-icon">
        <div class="header-icon header-notifi-icon"></div>
      </div>
      <div class="header-user">
        <div class="header-user-avatar"></div>
        <div class="header-user-name">{{ headerText.userName }}</div>
        <div class="header-icon-mini header-user-select"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {headerText} from '../../js/resources.js'
export default {
  data() {
    return {
      headerText:headerText
    }
  },
};
</script>

<style>
@import url(@/css/main.css);
</style>
