<template>
    <div class="header__container">
        <div class="header__left">
            <div class="header__option">
                <div class="box-app-menu"></div>
            </div>
            <div class="header__icon"></div>
            <div class="header__name">{{ $t('appName') }}</div>
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
                            {{ $t(item.name) }}
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
                        {{ $t('titleIcon.notification') }}
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
                        {{ $t('titleIcon.help') }}
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
                        {{ $t('titleIcon.other') }}
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
                        {{ $t('titleIcon.knowledge') }}
                    </DxTooltip>
                </div>
                <div class="header__right--avatar"
                @click="togleAvatarSelection"
                >ĐV</div>
                <div class="avatar-option" 
                v-click-away="closeAvatarSelection"
                v-if="isShowAvatarSelection" >
                    <div class="avatar-option__body">
                        <div class="avatar-option__icon">ĐV</div>
                        <div class="avatar-option__name">Đoàn Văn Việt</div>
                        <div class="avatar-option__email">vietdoan@gmail.com</div>
                        <div style="width: 100%; padding: 0 8px; border: 1px solid #e0e0e0;border-radius: 4px;">
                            <div class="avatar-option__department">Công ty cổ phần MISA</div>
                        </div>
                        <div class="avatar-option__item">
                            <i class="avatar-item__icon key"></i>
                            {{ $t('avatar.changePass') }}
                        </div>
                        <div class="avatar-option__item">
                            <i class="avatar-item__icon account"></i>
                            {{ $t('avatar.accountSetting') }}</div>
                        <div class="avatar-option__item">
                            <i class="avatar-item__icon security"></i>
                            {{ $t('avatar.securitySetting') }}</div>
                        <div class="avatar-option__item">
                            <i class="avatar-item__icon gift"></i>
                            {{ $t('avatar.getPoint') }}</div>
                        <div class="avatar-option__item item__languge" 
                        @click="toggleLanguageSelection"
                        >
                            <i v-if="isVietnamese" class="avatar-item__icon vietnam"></i>
                            <i v-if="!isVietnamese" class="avatar-item__icon england"></i>
                            {{ $t('avatar.language') }} {{ $t('languageSwitch') }}
                            <div class="avatar-item__icon--dropdown"></div>
                            <div class="language-selection" 
                            v-if="isShowSelection"
                            v-click-away="closeLanguageSelection"
                            >
                                <div class="language-selection__item"
                                @click="setVietnamese"
                                :style="isVietnamese?'background:#ffede2; color: #ec5504;':''"
                                >
                                    <i class="avatar-item__icon vietnam"></i>
                                    Việt Nam</div>
                                <div class="language-selection__item"
                                @click="setEnglish"
                                :style="!isVietnamese?'background:#ffede2; color: #ec5504;':''"
                                >
                                    <i class="avatar-item__icon england"></i>
                                    English</div>
                            </div>
                        </div>
                    </div>
                    <div class="avatar-option__footer">
                        <i class="avatar-item__icon logout"></i>
                        {{ $t('avatar.logout') }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    appName,
    optionHeader,
    headerMenu,
    titleIcon
} from '@/js/resource'

import { Resource } from '@/js/language';

import { DxTooltip } from 'devextreme-vue/tooltip';
export default {
    components:{
        DxTooltip
    },
    watch:{
        //Xác định ngôn ngữ
        '$i18n.locale': {
        handler() {
           if(this.$i18n.locale == "vi"){
               this.headerMenu = Resource.messages.vi.headerMenu
           }else{
                this.headerMenu = Resource.messages.eng.headerMenu
           }
        },
        deep: true,
        immediate: true
        }
    },
    data() {
        return {
            appName: appName,
            headerMenu:Resource.messages.vi.headerMenu,
            optionHeader:optionHeader,
            titleIcon:titleIcon,
            isShowOption: [],
            isShowSelection: false,
            isShowAvatarSelection: false,
            isVietnamese:true
        }
    },
    methods: {
        /**
         * Chuyển sang ngôn ngữ tiếng anh
         * author: VietDV(9/5/2023)
         */
        setVietnamese(){
            this.isVietnamese = true
            localStorage.setItem('language', "vi");
            this.$i18n.locale = localStorage.getItem('language')
        },

        /**
         * Chuyển sang ngôn ngữ tiếng anh
         * author: VietDV(9/5/2023)
         */
        setEnglish(){
            this.isVietnamese = false
            localStorage.setItem('language', "eng");
            this.$i18n.locale = localStorage.getItem('language')
        },

        /**
         * Ẩn hiện avatar selection
         * author: VietDV(9/5/2023)
         */
        togleAvatarSelection(){
            this.isShowAvatarSelection = !this.isShowAvatarSelection
        },

        /**
         * Ẩn avatar selection
         * author: VietDV(9/5/2023)
         */
        closeAvatarSelection(){
            this.isShowAvatarSelection = false
        },

        /**
         * Ẩn Hiện chọn ngôn ngữ
         * author: VietDV(9/5/2023)
         */
        toggleLanguageSelection(){
            this.isShowSelection = !this.isShowSelection
        },

        /**
         * Ẩn chọn ngôn ngữ
         * author: VietDV(9/5/2023)
         */
        closeLanguageSelection(){
            this.isShowSelection = false
        },
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