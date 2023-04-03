<template>
    <div class="button">
        <button class="button_left">
            {{text}}
        <div class="button-line"></div>
        </button>
        <button class="button_right">
            <i class="fa-solid fa-trash-can"></i>
        </button>
    </div>
</template>

<script>

export default {
    name: "MButton",
    props: ["text"]
}
</script>

<style>
    @import url(@/css/main.css);
</style>