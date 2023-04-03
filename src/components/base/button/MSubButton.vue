<template>
  <button class="SubButton">
    <font-awesome-icon icon="trash" class="white-icon"/>
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "MSubButton",
  props: ["text"],
};
</script>

<style>
@import url(@/css/components/sub-button.css);
.SubButton {
  border: 1px solid var(--sub-btn--border-coler);
  color: #fff;
  background-color: #de3617;
  padding: 0 16px;
  min-width: 80px;
  height: 36px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  font-family: Notosans-bold;
  margin-left: 24px;
}

.white-icon{
    color: #fff;
    margin-right: 8px;
}
</style>
