<template>
  <button  ref="buttonFocusRef" class="subDialogButton" :title="title">{{ text }}</button>
</template>

<script>
export default {
    name: "SubDialogButton",
    props: ["text","title"],
    methods:{
      /**
       * Focus vào button trong form
       * author: VietDV(4/4/2023)
       */
    focus(){
      // console.log(this.ref);
      this.$nextTick(() => this.$refs.buttonFocusRef.focus());
    },
  }
}
</script>

<style>
    @import url(@/css/main.css);

    .subDialogButton:focus{
      background-color: var(--sub-btn--hover-background-color);
    }
</style>