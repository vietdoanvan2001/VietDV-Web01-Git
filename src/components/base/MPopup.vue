<template>
  <div class="pop-up__background"></div>
  <div class="pop-up__container" @keydown="popupKeyDown" tabindex="1">
    <div class="pop-up__head">
      <div class="pop-up-title" v-if="!isQuestion && !isWarning">
        {{ popupTitle.ErrorMessage }}
      </div>
      <div class="pop-up-title" v-if="isQuestion">
        {{ popupTitle.DataChanged }}
      </div>
      <div class="pop-up-title" v-if="isWarning">
        {{ popupTitle.DeleteData }}
      </div>
      <div class="pop-up__head-icon" @click="closePopup"></div>
    </div>
    <div class="pop-up__content">
      <div class="pop-up__icon" :class="popupIconClass"></div>
      <div class="list-error">
        <p
          class="pop-up__text"
          v-for="(item, index) in listErrorPopup"
          :key="index"
        >
          - {{ item }}.
        </p>
        <p class="pop-up__text" v-if="isQuestion || isWarning">
          {{ isQuestion || isWarning ? question : listErrorPopup[0] }}
        </p>
      </div>
    </div>
    

    <div class="pop-up__footer">
      <div class="ask-popup-btn" v-if="showAskPopupBtn">
        <div class="footer-left">
          <sub-dialogButton
            :text=buttonText.close
            @click="popupClickBtn(buttonStatus.Cancel)"
          ></sub-dialogButton>
        </div>
        <div class="footer-right">
          <sub-dialogButton
            :text=buttonText.doNotSave
            @click="popupClickBtn(buttonStatus.No)"
            class="popup-right__leftBtn mgl-8"
          ></sub-dialogButton>
          <dialog-button
            :text=buttonText.save
            @click="popupClickBtn(buttonStatus.Yes)"
          ></dialog-button>
        </div>
      </div>


      <div class="warning-popup-btn" v-if="showNotificationPopupBtn">
        <dialog-button :text=buttonText.close @click="closePopup"></dialog-button>
      </div>


      <div class="ask-popup-btn" v-if="showWarningPopupBtn">
        <div class="footer-left">
          <sub-dialogButton
            :text=buttonText.cancel
            @click="popupClickBtn(buttonStatus.No)"
            class="popup-right__leftBtn"
          ></sub-dialogButton>
        </div>
        <div class="footer-right">
          <dialog-button
            :text=buttonText.delete
            class="delete-button__color"
            @click="popupClickBtn(buttonStatus.Yes)"
          ></dialog-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {  keyCodeName } from "@/js/enum.js";
import {buttonStatus, popupTitle, buttonText } from "@/js/resources.js";
export default {
  name: "MPopup",
  created() {
    if (this.isQuestion) {
      this.popupIconClass = "ask-popup-icon";
      this.showAskPopupBtn = true;
      this.showWarningPopupBtn = false;
      this.showNotificationPopupBtn = false;
    } else if (this.isWarning) {
      this.popupIconClass = "delete-popup-icon";
      this.showWarningPopupBtn = true;
      this.showAskPopupBtn = false;
      this.showNotificationPopupBtn = false;
    } else {
      this.popupIconClass = "warning-popup-icon";
      this.showNotificationPopupBtn = true;
      this.showAskPopupBtn = false;
      this.showWarningPopupBtn = false;
    }
  },
  props: {
    //Danh sách các lỗi trong form truyền vào từ component EmployeeList
    listErrorPopup: Array,
    
    //Biến xác định popup có phải câu hỏi không
    isQuestion: {
      Type: Boolean,
      default: false,
    },
    //Biến xác định popup có phải cảnh báo không
    isWarning: {
      Type: Boolean,
      default: false,
    },

    //Câu hỏi
    question: {
      Type: String,
      default: "",
    },
  },
  data() {
    return {
      showAskPopupBtn: false,
      showWarningPopupBtn: false,
      popupIconClass: "",
      buttonStatus: buttonStatus,
      popupTitle: popupTitle,
      keyCodeName: keyCodeName,
      buttonText:buttonText
    };
  },
  methods: {
    /**
     * Gọi hàm đóng Popup trên component EmployeeList
     * author: VietDV(18/2/2023)
     */
    closePopup() {
      if (this.isQuestion) {
        this.popupClickBtn(buttonStatus.Cancel);
      } else if (this.isWarning) {
        this.popupClickBtn(buttonStatus.No);
      } else {
        this.$emit("closePopup");
      }
    },

    /**
     * Emit lên component EmployeeDetail để xử lý các sự kiện ấn nút popup
     * author: VietDV(2/3/2023)
     * @param {*} status
     */
    popupClickBtn(status) {
      this.$emit("popupButtonSellect", status);
    },

    /**
     * cài phím tắt cho popup
     * author: VietDV(10/3/2023)
     * @param {*} event
     */
    popupKeyDown(event) {
      //Nhấn Esc để đóng popup
      if (event.keyCode == this.keyCodeName.ESC) {
        this.popupClickBtn(buttonStatus.Cancel);
      }
    },
  },
};
</script>

<style>
@import url(@/css/main.css);

.delete-button__color {
  background-color: #de3617;
}

.delete-button__color:hover {
  background-color: #de3617;
  opacity: 0.9;
}
</style>
