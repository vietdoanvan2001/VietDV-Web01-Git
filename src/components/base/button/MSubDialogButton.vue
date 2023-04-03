<template>
  <button class="subDialogButton" :title="title">{{ text }}</button>
</template>

<script>
export default {
    name: "SubDialogButton",
    props: ["text","title"]
}
</script>

<style>
    @import url(@/css/main.css);
</style>