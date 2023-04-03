<template>
    <div class="toast-container">
        <div :class="iconClass"></div>
        <div class="toast-message"><span :class="toastClass">{{toastStatusTxt}}!</span>{{toastActivityTxt}}</div>
    </div>
</template>

<script>

import {toastStatus} from '@/js/resources.js'
export default {
    name: "ToastMessage",
    created() {
        if(this.toastStatusTxt == this.toastStatusList.Success){
            this.toastClass = 'success-toast-status'
            this.iconClass = 'success-toast-icon'
        }else{
            this.toastClass = 'fail-toast-status'
            this.iconClass = 'fail-toast-icon'
        }
    },
    props:{
        //Biến trạng thái của popmessage truyền từ component cha
        toastStatusTxt:{
            Type: String,
            default:""
        },
        //Biến hành động(vd: thêm/sửa/xoá thành công) từ component cha
        toastActivityTxt:{
            Type: String,
            default:""
        }
    },
    data() {
        return {
            toastClass:"",
            iconClass:"",
            toastStatusList:toastStatus,
        }
    },
}
</script>

<style>
    @import url(@/css/main.css);
</style>