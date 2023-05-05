<template>
    <div class="header__container">
        <div class="header__left">
            <div class="header__option">
                <div class="box-app-menu"></div>
            </div>
            <div class="header__icon"></div>
            <div class="header__name">{{ appName }}</div>
        </div>
        <div class="header__right">
            <div class="heaeder__right--menu"
            v-click-away="closeOption"
            >
                <div 
                v-for="(item,index) in headerMenu" :key="index" 
                class="menu__selection"
                >
                    <div class="menu-selection__item">
                        <div class="menu-selection__text"
                            :style="item.isActive?'font-weight : 600':''"
                            @click="showOption(index)"
                        >
                            {{ item.name }}
                        </div>
                        <div class="border__active--hidden" :class="item.isActive?'border__active':''" ></div>
                    </div>
                    <div 
                    class="menu-selection__icon" v-if="item.isIcon" 
                    @click="showOption(index)"></div>
                    <div 
                        class="menu-selection__option" 
                        v-if="item.selection&&isShowOption[index]"
                        :style="{'min-height' : item.height}"
                    >
                        <div class="menu-selection__option--item"
                            :style="{'min-width' : item.width }"
                            v-for="(selection,j) in item.selection" :key="j"
                            :class="(selection == item.selection.overTimeRegistration?
                            'menu-selection__option--active':
                            (selection == item.selection.timeAttendanceApproval?'menu__split-line':''))"
                            @click="closeOption"
                        >
                            {{ selection }}
                            <div :class="(selection == item.selection.overTimeRegistration?'menu-selection__option--icon':'')"></div>  
                        </div>    
                    </div>
                </div>
            </div>
            <div class="header__right--navigation" >
                <div class="header__right--icon mgr_8" id="product1">
                    <div class="header__right--notification" ></div>
                    <DxTooltip
                        :hide-on-outside-click="false"
                        target="#product1"
                        show-event="mouseenter"
                        hide-event="mouseleave"
                    >
                        {{ titleIcon.notification }}
                    </DxTooltip>
                </div>
                <div class="header__right--icon mgr_8" id="product2">
                    <div class="header__right--help" ></div>
                    <DxTooltip
                        :hide-on-outside-click="false"
                        target="#product2"
                        show-event="mouseenter"
                        hide-event="mouseleave"
                    >
                        {{ titleIcon.help }}
                    </DxTooltip>
                </div>
                <div class="header__right--icon mgr_8" id="product3">
                    <div class="header__right--other" ></div>
                    <DxTooltip
                        :hide-on-outside-click="false"
                        target="#product3"
                        show-event="mouseenter"
                        hide-event="mouseleave"
                    >
                        {{ titleIcon.other }}
                    </DxTooltip>
                </div>
                <div class="header__right--icon mgr_24" id="product4">
                    <div class="header__right--knowledge" ></div>
                    <DxTooltip
                        :hide-on-outside-click="false"
                        target="#product4"
                        show-event="mouseenter"
                        hide-event="mouseleave"
                    >
                        {{ titleIcon.knowledge }}
                    </DxTooltip>
                </div>
                <div class="header__right--avatar">ĐV</div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    appName,
    headerMenu,
    optionHeader,
    titleIcon
} from '@/js/resource'
import { DxTooltip } from 'devextreme-vue/tooltip';
export default {
    components:{
        DxTooltip
    },
    data() {
        return {
            appName: appName,
            headerMenu:headerMenu,
            optionHeader:optionHeader,
            titleIcon:titleIcon,
            isShowOption: []
        }
    },
    methods: {
        /**
         * Hiển thị các lựa chọn của danh mục được click trên menu
         * author: VietDV(14/4/2023)
         */
        showOption(index){
            if(this.isShowOption[index] == true){
                for(let i = 0; i < headerMenu.length;i++){
                    this.isShowOption[i] = false
                }
            }
            else{
                for(let i = 0; i < headerMenu.length;i++){
                    this.isShowOption[i] = false
                }
                this.isShowOption[index] = true
            }
        },

        /**
         * Đóng các lựa chọn của danh mục được click trên menu
         * author: VietDV(14/4/2023)
         */
        closeOption(){
            for(let i = 0; i < headerMenu.length;i++){
                    this.isShowOption[i] = false
                }
        }
    },
}
</script>

<style>
    @import url(@/css/components/layout/header.css);
    @import url(@/css/components/base/tooltip.css);
</style>