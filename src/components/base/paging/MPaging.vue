<template>
    <div class="page">
        <div class="page-left">{{ pagingText.amount }} <span class="amount-page">{{ employeeAmount }}</span></div>
        <div class="page-right">
            <m-combobox
            @changePageSize="changePageSize"
            ></m-combobox>
            <div class="page-range"><span style="font-family: Notosans-bold;">{{ beginData }}</span> - <span style="font-family: Notosans-bold;">{{ endData }}</span> {{ pagingText.record }}</div>
            <div class="page-number">
                <div :title=titleIcon.previos class="pre-button" @click="previousPage" :class="canBack?'':'disable-button'"></div>
                <div :title=titleIcon.next class="next-button" @click="nextPage" :class="canNext?'':'disable-button'"></div>
            </div>
        </div>
    </div>
</template>

<script>
import{pagingText,titleIcon} from '@/js/resources.js'
export default {
    data() {
        return {
            canNext:true,
            canBack: false,
            pagingText:pagingText,
            titleIcon:titleIcon
        }
    },
    watch:{
        //Cập nhật tổng số bản ghi thoả mãn truyền từ component cha
        employeeAmount: {
            handler(){
                // bản ghi đầu > 1 thì có thể back
                if(this.beginData > 1){
                    this.canBack = true;
                }
                else{
                    this.canBack = false;
                }

                //bản ghi cuối = tổng số bản ghi thì không thể next
                if(this.endData  >= this.employeeAmount){
                    this.canNext = false;
                }
                else{
                    this.canNext = true;
                }
            },
            immediate: true,
            deep: true,
        },
        //Cập nhật giá trị bản ghi bắt đầu truyền từ component cha
        beginData: {
            handler(){
                // bản ghi đầu > 1 thì có thể back
                if(this.beginData > 1){
                    this.canBack = true;
                }
                else{
                    this.canBack = false;
                }

                //bản ghi cuối = tổng số bản ghi thì không thể next
                if(this.endData  >= this.employeeAmount){
                    this.canNext = false;
                }
                else{
                    this.canNext = true;
                }
            },
            immediate: true,
            deep: true,
        },
        //Cập nhật giá trị bản ghi kết thúc truyền từ component cha
        endData: {
            handler(){
                // bản ghi đầu > 1 thì có thể back
                if(this.beginData > 1){
                    this.canBack = true;
                }
                else{
                    this.canBack = false;
                }

                //bản ghi cuối = tổng số bản ghi thì không thể next
                if(this.endData  >= this.employeeAmount){
                    this.canNext = false;
                }
                else{
                    this.canNext = true;
                }
            },
            immediate: true,
            deep: true,
        }
    },
    props:{
        //Số lượng bản ghi nhận từ EmployeeList
        employeeAmount: Number,

        //param phân trang truyền từ component cha
        pagingParamsProp: {
            Type: Object,
        },

        //bản ghi bắt đầu
        beginData: Number,

        //bản ghi kết thúc
        endData : Number
    },
    methods: {
        //Cập nhật giá trị param paging filter khi đổi pagesize
        //Author: VietDV(15/3/2023)
        changePageSize(pagesize){
            this.$emit("changePageSize",pagesize); 
            this.$emit("refreshData")
        },

        //Cập nhật giá trị param paging filter khi next trang
        //author: VietDV(18/3/2023)
        nextPage(){
            if(this.canNext){
                this.$emit("changeOffSet",this.endData);
            }

        },

        //Cập nhật giá trị param paging filter khi back trang
        //author: VietDV(18/3/2023)
        previousPage(){
            if(this.canBack){
                let offSet = this.beginData - this.pagingParamsProp.pageSize - 1 >= 0? this.beginData - this.pagingParamsProp.pageSize - 1: 0
                this.$emit("changeOffSet",offSet);
            }

        }
    },
}
</script>

<style>
    @import url(@/css/main.css);
    .disable-button{
        opacity: 0.6;
        cursor: default;
    }
</style>