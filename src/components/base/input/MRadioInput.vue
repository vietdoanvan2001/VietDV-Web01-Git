<template>
  <div class="sex-selection__item" v-for="(item,index) in data" :key="index">
    <input type="radio" 
    :id="index"
    :value="item.value"
    @input="changeInput($event)"
    v-model="selectedItem"
    class="sex-selection__item--input" />
    <label :for="index" class="sex-selection__item--text">{{ item.labelTxt }}</label>
  </div>
</template>

<script>
import {gender} from '@/js/enum.js'
export default {
  name: "RadioInput",
  watch:{
    //Theo dõi nếu thay đổi lựa chọn thì cập nhật value ở component Cha, nếu không thì lưu value ở Cha là giá trị mặc định
    selected: {
            handler() {
              //Khi thay đổi thì cập nhật
              if(this.selected !=null){
                this.selectedItem = this.selected;
                this.$emit("updateSelectedItem", this.selectedItem);
              }
              //Nếu không đổi thì giữ nguyên giá trị mặc định
              else{
                this.$emit("updateSelectedItem", this.selectedItem);
              }
            },
            immediate: true,
            deep: true
        }
  },
  props:{
    //Biến lưu dữ liệu các ô radio input truyền vào từ component Form
    data:{
        Type: Array,
        gender:gender
    },
    //Biến lưu truyền giá trị đang được chọn từ component Form
    selected: String
  },
  mounted() {
  },
  data() {
    return {
      //gán giá trị mặc định là nam
        selectedItem: gender.Male
    }
  },
  methods: {
    /**
     * Hàm đẩy value được chọn lên component cha để hiển thị
     * author: VietDV(24/2/2023)
     * @param {*} event 
     */
    changeInput(event){
      this.$emit("updateSelectedItem", parseInt(event.target.value));
    }
  },
};
</script>

<style>
@import url(@/css/main.css);
</style>
