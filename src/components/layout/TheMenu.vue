<template>
    <div class="menu">
        <div class="menu-up">
            <div class="menu-up-option"></div>
            <img src="../../assets/img/Logo_Module_TiengViet_White.66947422.svg" alt="" class="menu-up-logo">
        </div>
        <div class="menu-down">
            <div class="menu-down-body">
                <router-link v-for="(item,index) in menuItems" :key="index" :to="item.tag" class="menu-items" v-slot="{isActive}">
                    <div class="menu__icon"  
                    :class="(isActive && item.iconActive)||item.iconDefault"
                     ></div>
                    <div class="menu__text">{{ item.name }}</div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import {menuItems} from '../../js/resources.js'
export default {
    data() {
        return {
            menuItems: []
        }
    },
    created() {
        this.menuItems = menuItems;
    },
}
</script>

<style>
    @import url(@/css/main.css);
</style>