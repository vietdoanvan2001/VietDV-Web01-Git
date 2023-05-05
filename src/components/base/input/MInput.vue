<template>
  <div class="mInput">
    <input
      :value="value"
      :class="{ error_input: errorBorder || errorValueData.class }"
      @input="changeInput($event)"
      @focusout="checkValidateInput"
      :disabled="isReadonly"
      :type="type"
      class="inputField"
      :ref="name"
    />
    <div class="detail-tooltip" v-show="showTooltip">
      {{ errorValueData.title || errorTitle }}
    </div>
  </div>
</template>

<script>
import { warningTxt } from "@/js/resources.js";
import moment from 'moment'
export default {
  mounted() {
    this.$nextTick(function () {
      // Focus vào trường ưu tiên
      if (typeof this.focusFieldName !== 'undefined' && typeof this.$refs[this.focusFieldName] !== 'undefined') {
        this.$refs[this.focusFieldName].focus();
      }
    });
  },
  name: "MInput",
  props: {
    //Tên trường phục vụ hiển thị lỗi validate truyền từ component Form
    fieldName: String,

    //Tên trường chỉ định focus vào
    name: String,
    //Giá trị ô input phục vụ cho binding truyền từ component Form
    value: {
      Type: String,
      default: "",
    },
    //Biến để kiểm tra trường có bắt buộc nhập không truyền từ component Form
    isRequire: {
      type: Boolean,
      default: false,
    },
    //Trường chỉ định focus khi mở form truyền từ component Form
    focusFieldName: {
      type: Boolean,
      default: false,
    },
    //Biến lưu thông tin lỗi của input
    errorValueProp: {
      Type: Object,
      default: {},

    },
    //Xác định trường chỉ đọc
    isReadonly: {
      Type: Boolean,
      default: false
    },
    //Kiểu dữ liệu của ô input
    type: String,
    //Theo dõi sự kiện đóng popup cảnh báo lỗi
    watchForm: Boolean,

    //Biến xác định trường chỉ gồm số
    isOnlyNumber:Boolean,

    //Biến xác định trường email
    isEmail: String,
  },
  data() {
    return {
      warningText: warningTxt,
      errorTitle: "",
      errorBorder: false,
      showTooltip: false,
      errorValueData: {},
    };
  },
  watch: {
    /**
     * Theo dõi sự thay đổi của errorValueProp để cập nhật errorValueData
     * author: VietDV(24/2/2023)
     */
    errorValueProp: {
      handler() {
        this.errorValueData = { ...this.errorValueProp };
        if (!this.errorValueData.title) {
          this.showTooltip = false;
          this.errorValueData = {};
        } else {
          this.showTooltip = true;
        }
      },
      immediate: true,
      deep: true,
    },

    /**
     * Theo dõi sự kiện đóng popup cảnh báo lỗi để focus vào lỗi đầu tiên
     * author: VietDV(4/3/2023)
     */
    watchForm: {
      handler() {
          this.$nextTick(function () {
            // Focus vào trường ưu tiên
            if (typeof this.focusFieldName !== 'undefined' && typeof this.$refs[this.focusFieldName] !== 'undefined') {
              this.$refs[this.focusFieldName].focus();
            }
          });
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    /**
     * Truyền dữ liệu giá trị ô input lên component Form
     * khi thay đổi giá trị ô input
     * Đồng thời ẩn css lỗi
     * author: VietDV(18/2/2023)
     * @param {*} e
     */
    changeInput(e) {
      this.showTooltip = false;
      this.errorBorder = false;
      this.errorValueData = {};
      this.$emit("updateValue", e.target.value);
    },

    /**
     * Validate các trường input
     * author: VietDV(18/2/2023)
     * @param {*} e
     */
    checkValidateInput(e) {
      //Kiểm tra ngày có lớn hơn ngày hiện tại hay không
      if(this.type === 'date'){
        this.validateDateTime(e.target.value)
      }
      //Kiểm tra trường bắt buộc có trống hay không
      if (typeof this.isRequire !== 'undefined' && this.isRequire==true ) {
        this.validateRequireField(e.target.value)
      }
      //Kiểm tra trường có đúng định dạng mail không
      if(this.isEmail == 'true'){
        this.validateEmail(e.target.value)
      }
      //Kiểm tra trường có đúng định dạng chỉ có số hay không
      if(this.isOnlyNumber == 'true'){
        this.validateOnlyNumber(e.target.value)
      }
    },

    /**
     * Hàm validate trường chỉ được phép chứa số
     * author: VietDV(10/3/2023)
     * @param {*} value 
     */
    validateOnlyNumber(value){
      if(value != null && value.trim() != ''){
          const emailRegex = /^[0-9]+$/;
          if(emailRegex.test(value) == false){
            this.errorTitle = this.warningText.OnlyNumberField
            this.$emit("addError", this.errorTitle,this.name);
            this.errorBorder = true;
            this.showTooltip = true;
          }
          else{
            this.errorTitle = this.warningText.OnlyNumberField
            this.$emit("removeError", this.errorTitle,this.name);
            this.errorBorder = false;
            this.showTooltip = false;
          }
        }
        else{
          this.errorTitle = this.warningText.OnlyNumberField
            this.$emit("removeError", this.errorTitle,this.name);
            this.errorBorder = false;
            this.showTooltip = false;
        }
    },

    /**
     * Hàm validate trường email phải có dạng email
     * author: VietDV(10/3/2023)
     * @param {*} value 
     */
    validateEmail(value){
      if(value){
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if(emailRegex.test(value) == false){
            this.errorTitle = this.warningText.ErrorEmail
            this.$emit("addError", this.errorTitle,this.name);
            this.errorBorder = true;
            this.showTooltip = true;
          }
          else{
            this.errorTitle = this.warningText.ErrorEmail
            this.$emit("removeError", this.errorTitle,this.name);
            this.errorBorder = false;
            this.showTooltip = false;
          }
        }
        else{
          this.errorTitle = this.warningText.ErrorEmail
            this.$emit("removeError", this.errorTitle,this.name);
            this.errorBorder = false;
            this.showTooltip = false;
        }
    },

    /**
     * Hàm validate trường date không được lớn hơn thời gian hiện tại
     * author: VietDV(10/3/2023)
     * @param {*} value 
     */
    validateDateTime(value){
      let currentTime = new Date();
        let formattedTime = moment(currentTime).format('YYYY-MM-DD');
        if(value>formattedTime){
          this.errorTitle = this.warningText.ErrorDate
          this.$emit("addError", this.errorTitle,this.name);
          this.errorBorder = true;
          this.showTooltip = true;
        }
        else{
          this.errorTitle = this.warningText.ErrorDate
          this.$emit("removeError", this.errorTitle,this.name);
          this.errorBorder = false;
          this.showTooltip = false;
        }
    },

    /**
     * Hàm validate trường bắt buộc nhập không được để trống
     * author: VietDV(10/3/2023)
     * @param {*} value 
     */
    validateRequireField(value){
      if (!value.trim()) {
          this.errorTitle = this.fieldName + " " + this.warningText.Require;
          this.$emit("addError", this.errorTitle,this.name);
          this.errorBorder = true;
          this.showTooltip = true;
        } else {
          this.errorTitle = this.fieldName + " " + this.warningText.Require;
          this.$emit("removeError", this.errorTitle,this.name);
          this.errorBorder = false;
          this.showTooltip = false;
        }
    },

    focus(){
      this.$nextTick(() => this.$refs[this.name].focus());
    },
  },
};
</script>

<style>
@import url(@/css/main.css);
.error_input {
  border: 1px solid var(--input-border-color-warning) !important;
}

.detail-input:hover .detail-tooltip{
  display: block;
}

.detail-tooltip {
    display: none;
    transform: translateX(-50%);
    color: #fff;
    position: absolute;
    left: 50%;
    background-color: #000;
    min-width: 150px;
    /* color: red; */
    top: 70px;
    z-index: 2;
    font-size: 12px;
    margin-top: -14px;
    text-align: center;
    padding: 1px 2px;
}
</style>
