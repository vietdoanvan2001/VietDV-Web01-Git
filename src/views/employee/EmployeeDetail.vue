<template>
  <div class="detail-background"></div>
  <m-popup
    v-if="showPopup"
    :isQuestion="isPopupQuestion"
    :question="popupQuestion"
    @popupButtonSellect="popupButtonSellect"
    
  ></m-popup>
  <div class="detail" tabindex="0" @keydown="detailKeyDown">
    <div class="detail__head">
      <div class="detail__head-right">
        <h1 class="detail-name">
          {{ isFix ? formTitle.Fix : formTitle.Add }}
        </h1>
        <!-- <div class="detail__head-select">
          <input type="checkbox" name="" id="" />
          <div class="select__text">{{ employeeDetailLabel.isCustomer }}</div>
        </div>
        <div class="detail__head-select">
          <input type="checkbox" name="" id="" />
          <div class="select__text">{{ employeeDetailLabel.isSupplier }}</div>
        </div> -->
      </div>
      <div class="detail__head-left">
        <!-- <div class="help-btn detail-icon"></div> -->
        <div :title="titleIcon.close" class="close-btn detail-icon" @click="cancelDetail"></div>
      </div>
    </div>
    <div class="detail__container">
      <div class="block-1">
        <div class="detail-row-100">
          <div class="detail-input small-left">
            <label for="" class="detail-input__label"
              >{{ employeeDetailLabel.code }}<span class="compulsory-field">*</span></label
            >
            <m-input
              @updateValue="employeeDetailData.EmployeeCode = $event"
              :value="employeeDetailData.EmployeeCode"
              :isRequire="true"
              @addError="addError"
              @removeError="removeError"
              :firstFocus="true"
              :name="validateForm?.EmployeeCode.name"
              :fieldName="validateForm.EmployeeCode.label"
              :focusFieldName="focusField"
              :errorValueProp="validateForm.EmployeeCode"
              :watchForm="watchForm"
              :isReadonly="isFix"
              ref="EmployeeCode"
            >
            </m-input>
          </div>
          <div class="detail-input">
            <label for="" class="detail-input__label"
              >{{ employeeDetailLabel.name }}<span class="compulsory-field">*</span></label
            >
            <m-input
              @updateValue="employeeDetailData.FullName = $event"
              :value="employeeDetailData.FullName"
              :isRequire="true"
              @addError="addError"
              @removeError="removeError"
              :name="validateForm.FullName.name"
              :fieldName="validateForm.FullName.label"
              :focusFieldName="focusField"
              :errorValueProp="validateForm.FullName"
              :watchForm="watchForm"
            />
          </div>
        </div>
        <div class="detail-input">
          <label for="" class="detail-input__label"
            >{{ employeeDetailLabel.department }}<span class="compulsory-field">*</span></label
          >
          <detail-combobox
            :valueID="employeeDetailData.DepartmentId"
            @updateValue="employeeDetailData.DepartmentId = $event"
            @resetComboboxDataStatus="resetComboboxDataStatus"
            :name="validateForm.DepartmentId.name"
            :fieldName="validateForm.DepartmentId.label"
            :focusFieldName="focusField"
            :isRequire="true"
            :errorValueProp="validateForm.DepartmentId"
            :resetData="resetComboboxData"
            :watchForm="watchForm"
            :isFix="isFix"
            :isDuplicateEmployee="isDuplicateEmployee"
          ></detail-combobox>
        </div>
        <div class="detail-input">
          <label for="" class="detail-input__label">{{ employeeDetailLabel.position }}</label>
          <m-input
            :value="employeeDetailData.PositionName"
            @updateValue="employeeDetailData.PositionName = $event"
          ></m-input>
        </div>
      </div>
      <div class="block-2">
        <div class="detail-row-100">
          <div class="detail-input small-left">
            <label for="" class="detail-input__label">{{ employeeDetailLabel.dateOfBirth }}</label>
            <m-input
              type="date"
              :name="validateForm.DateOfBirth.name"
              :focusFieldName="focusField"
              :watchForm="watchForm"
              :value="
                employeeDetailData.DateOfBirth
                  ? formatDate(employeeDetailData.DateOfBirth)
                  : employeeDetailData.DateOfBirth
              "
              @updateValue="employeeDetailData.DateOfBirth = $event"
              @addError="addError"
              @removeError="removeError"
            />
          </div>
          <div class="detail-input mgl-10">
            <label for="" class="detail-input__label">{{ employeeDetailLabel.gender }}</label>
            <div class="sex-selection">
              <radio-input
                :data="genderList"
                :selected="employeeDetailData.Gender"
                @updateSelectedItem="employeeDetailData.Gender = $event"
              ></radio-input>
            </div>
          </div>
        </div>
        <div class="detail-row-100">
          <div class="detail-input">
            <label class="detail-input__label" :title=titleExplain.identityNumber
              >{{ employeeDetailLabel.identityNumber }}</label
            >
            <m-input
              @updateValue="employeeDetailData.IdentityNumber = $event"
              :value="employeeDetailData.IdentityNumber"
              isOnlyNumber="true"
              :name="validateForm.IdentityNumber.name"
              :focusFieldName="focusField"
              :watchForm="watchForm"
              @addError="addError"
              @removeError="removeError"
            ></m-input>
          </div>
          <div class="detail-input small-right">
            <label for="" class="detail-input__label">{{ employeeDetailLabel.identityDate }}</label>
            <m-input
              type="date"
              :name="validateForm.IdentityDate.name"
              :focusFieldName="focusField"
              :watchForm="watchForm"
              :value="
                employeeDetailData.IdentityDate
                  ? formatDate(employeeDetailData.IdentityDate)
                  : employeeDetailData.IdentityDate
              "
              @updateValue="employeeDetailData.IdentityDate = $event"
              @addError="addError"
              @removeError="removeError"
            />
          </div>
        </div>
        <div class="detail-input">
          <label for="" class="detail-input__label">{{ employeeDetailLabel.identityPlace }}</label>
          <m-input
            @updateValue="employeeDetailData.IdentityPlace = $event"
            :value="employeeDetailData.IdentityPlace"
          ></m-input>
        </div>
      </div>
      <div class="block-3">
        <div class="detail-input">
          <label for="" class="detail-input__label">{{ employeeDetailLabel.address }}</label>
          <m-input
            @updateValue="employeeDetailData.Address = $event"
            :value="employeeDetailData.Address"
          ></m-input>
        </div>
        <div class="detail-row-75">
          <div class="detail-input equal">
            <label for="" class="detail-input__label" :title=titleExplain.phoneNumber
              >{{ employeeDetailLabel.phoneNumber }}</label
            >
            <m-input
              @updateValue="employeeDetailData.PhoneNumber = $event"
              :value="employeeDetailData.PhoneNumber"
              :name="validateForm.PhoneNumber.name"
              :focusFieldName="focusField"
              :watchForm="watchForm"
              isOnlyNumber="true"
              @addError="addError"
              @removeError="removeError"
            ></m-input>
          </div>
          <div class="detail-input equal">
            <label for="" class="detail-input__label" :title=titleExplain.landLine>{{ employeeDetailLabel.landLine }}</label>
            <m-input
            :value="employeeDetailData.LandLine" 
            :name="validateForm.LandLine.name"
            :focusFieldName="focusField"
            :watchForm="watchForm"
            @updateValue="employeeDetailData.LandLine = $event"
            isOnlyNumber="true"
              @addError="addError"
              @removeError="removeError"
            ></m-input>
          </div>
          <div class="detail-input">
            <label for="" class="detail-input__label">{{ employeeDetailLabel.email }}</label>
            <m-input
              :value="employeeDetailData.Email"
              :name="'mail'"
              :focusFieldName="focusField"
              :watchForm="watchForm"
              @updateValue="employeeDetailData.Email = $event"
              @addError="addError"
              @removeError="removeError"
              isEmail="true"
            ></m-input>
          </div>
        </div>
        <div class="detail-row-75">
          <div class="detail-input equal">
            <label for="" class="detail-input__label"
              >{{ employeeDetailLabel.bankNumber }}</label
            >
            <m-input
            :value="employeeDetailData.BankNumber" 
            @updateValue="employeeDetailData.BankNumber = $event"
            ></m-input>
          </div>
          <div class="detail-input equal">
            <label for="" class="detail-input__label">{{ employeeDetailLabel.bankName }}</label>
            <m-input
            :value="employeeDetailData.BankName" 
            @updateValue="employeeDetailData.BankName = $event"
            ></m-input>
          </div>
          <div class="detail-input">
            <label for="" class="detail-input__label">{{ employeeDetailLabel.bankBranch }}</label>
            <m-input
            :value="employeeDetailData.BankBranch" 
            @updateValue="employeeDetailData.BankBranch = $event"
            ></m-input>
          </div>
          <input type="text" style="opacity: 0; width: 0;" @keyup.tab="focusButton">
        </div>
      </div>
    </div>
    <template class="detail__bottom">
      <div class="bottom-left">
        <input type="text" tabindex="4" style="opacity: 0; width: 0;" @keyup.tab="() => this.$nextTick(() => this.$refs.EmployeeCode.focus()) ">
        <sub-dialogButton 
        tabindex="3"
        :title="buttonDetailExplain.cancel"
        :text=buttonText.cancelDetail @click="cancelDetail"></sub-dialogButton>
      </div>
      <div class="bottom-right">
        <sub-dialogButton 
        tabindex="1"
        ref="saveButton"
        :title="buttonDetailExplain.save"
        :text=buttonText.saveData @click="saveData"></sub-dialogButton>
        <dialog-button
          tabindex="2"
          :title="buttonDetailExplain.saveAndAdd"
          :text=buttonText.saveAndAdd
          class="save-btn"
          @click="saveAndAddNew"
        ></dialog-button>
      </div>
    </template>
  </div>
</template>

<script>
import {
  toastStatus,
  listValidateField,
  formTitle,
  genderSelection,
  warningTxt,
  questionPopup,
  toastActivity,
  buttonStatus,
  employeeDetailLabel,
  titleExplain,
  buttonText,
  buttonDetailExplain,
  titleIcon
} from "../../js/resources.js";
import {
  keyCodeName,
} from "@/js/enum.js";
import moment from "moment";
import DxDateBox from 'devextreme-vue/date-box';
import {
  putEmployee,
  addNewEmployee,
  getEmployeeByID,
  getNewEmployeeCode,
} from "@/axios/controller/employee-controller";
export default {
  name: "MForm",
  props: {
    //Biến lưu ID nhân viên đang được chọn trên component EmployeeList để hiển thị thông tin
    selectedEmployeeID: String,
    // Biến xác định xem Form là thêm mới hay sửa
    isFixEmployee: {
      Type: Boolean,
      default: false,
    },
    //Biến xác định có phải nhân bản hay không
    isDuplicateEmployeeProp: {
      Type: Boolean,
      default: false,
    },
    //Biến theo dõi sự kiện close popup cảnh báo lỗi
    popupClosed: Boolean,
  },
  components: {
    DxDateBox
  },  
  created() {
    this.isFix = this.isFixEmployee;
    if (this.isFix) {
      this.getData(this.selectedEmployeeID);
      this.focusField = this.listValidateField.FullName.name;
    }
    else{
      this.focusField = this.listValidateField.EmployeeCode.name;
      this.getNewEmployeeCode();
    }
  },

  data() {
    return {
      test: "",
      listValidateField: listValidateField,
      warningText: warningTxt,
      employee: {},
      inputError: [],
      fieldError: [],
      validateForm: listValidateField,
      genderList: genderSelection,
      employeeDetailData: {},
      formTitle: formTitle,
      isSaveAndAddNew: false,
      isFix: false,
      originalData: {},
      isPopupQuestion: false,
      popupQuestion: "",
      showForm: false,
      showPopup: false,
      buttonStatus: buttonStatus,
      questionPopup: questionPopup,
      resetComboboxData: false,
      focusField: "",
      watchForm: Boolean,
      toastStatusList: toastStatus,
      toastActivityList: toastActivity,
      toastStatusTxt: "",
      toastActivityTxt: "",
      keyCodeName: keyCodeName,
      employeeDetailLabel:employeeDetailLabel,
      titleExplain:titleExplain,
      buttonText:buttonText,
      buttonDetailExplain:buttonDetailExplain,
      newEmployeeCode:"",
      isDuplicateEmployee: this.isDuplicateEmployeeProp,
      titleIcon:titleIcon
    };
  },
  watch: {
    //Bắt sự kiện khi đóng pop up
    popupClosed: {
      handler() {
        this.watchForm = this.popupClosed;
        this.inputError = [];
        this.fieldError = [];
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    /**
     * focus vào các nút trong form khi tab
     * author: VietDV(4/4/2023)
     */
    focusButton(){
      this.$refs.saveButton.$refs.buttonFocusRef.focus();

    },
    /**
     * click cancel icon hiển thị popup hỏi nếu dữ liệu thay đổi
     * author: VietDV(18/2/2023)
     */
    cancelDetail() {
      if (
        JSON.stringify(this.originalData) !==
        JSON.stringify(this.employeeDetailData)
      ) {
        this.showQuestion(questionPopup.changeData);
      } else {
        this.closeDetail();
      }
    },

    /**
     * Gọi thuộc tính đóng form chi tiết của EmployeeList khi click button huỷ
     * author: VietDV(2/3/2023)
     */
    closeDetail() {
      if (this.validateForm) {
        for (let item in this.validateForm) {
          this.validateForm[item].class = false;
          this.validateForm[item].title = "";
        }
      }
      this.$emit("closeForm");
    },

    /**
     * Hiển thị popup hỏi
     * author: VietDV(2/3/2023)
     * @param {*} question
     */
    showQuestion(question) {
      this.isPopupQuestion = true;
      this.popupQuestion = question;
      this.showPopup = true;
    },

    /**
     * Xử lý sự kiện click các nút trong popup
     * author: VietDV(2/3/2023)
     * @param {*} status
     */
    popupButtonSellect(status) {
      if (status == buttonStatus.Cancel) {
        this.showPopup = false;
      } else if (status == buttonStatus.No) {
        this.closeDetail();
      } else {
        this.saveData();
        this.showPopup = false;
      }
    },

    /**
     * Thêm lỗi vào danh sách lỗi của Form
     * author: VietDV(18/2/2023)
     * @param {*} title
     */
    addError(title, field) {
      //Thêm phần tử vào mảng lưu các trường lỗi
      if (this.fieldError.includes(field)) return;
      else {
        this.fieldError.push(field);
      }

      //Thêm phần tử vào mảng lưu các title lỗi
      if (this.inputError.includes(title)) return;
      else {
        this.inputError.push(title);
      }
    },

    /**
     * Xoá lỗi trong danh sách lỗi của Form
     * author: VietDV(18/2/2023)
     * @param {*} title
     */
    removeError(title, field) {
      //Xoá phần tử trong mảng lưu các title lỗi
      if (this.inputError.includes(title)) {
        const index = this.inputError.indexOf(title);
        this.inputError.splice(index, 1);
      }

      //Xoá phần tử trong mảng lưu các trường lỗi
      if (this.fieldError.includes(field)) {
        const index = this.fieldError.indexOf(field);
        this.fieldError.splice(index, 1);
      }
    },

    /**
     * Cất dữ liệu Form
     * author: VietDV(18/2/2023)
     */
    saveData() {
      // Kiểm tra các trường cần validate
      for (let item in this.validateForm) {
        if (this.validateForm[item].isRequire == true) {
          //Nếu trường có thông tin thì xoá lỗi trong listError và bỏ các css lỗi
          if (
            this.employeeDetailData[item] !== null &&
            typeof this.employeeDetailData[item] !== "undefined" &&
            this.employeeDetailData[item].trim() !== ""
          ) {
            let title =
              this.validateForm[item].label + " " + this.warningText.Require;
            this.removeError(title, this.validateForm[item].name);
            this.validateForm[item].class = false;
            this.validateForm[item].title = "";
          }
          //Nếu trường trống thì add lỗi vào listError và thêm css lỗi
          else {
            let title =
              this.validateForm[item].label + " " + this.warningText.Require;
            this.addError(title, this.validateForm[item].name);
            this.validateForm[item].class = true;
            this.validateForm[item].title = title;
          }
          if (this.validateForm[item].title) {
            this.validateForm[item].class = true;
          }
        }
      }
      //Nếu listError có lỗi thì emit component EmployeeList hiển thị popup lỗi
      if (this.inputError.length > 0) {
        //Duyệt từ trên xuống dưới nếu trường nào lỗi thì gán ref = tên trường rồi break luôn
        for (let item in this.listValidateField) {
          if (this.fieldError.includes(this.listValidateField[item].name)) {
            this.focusField = this.listValidateField[item].name;
            this.$emit("showError", this.inputError);
            break;
          }
        }
      } 
      //Nếu không còn lỗi thì thực hiện sửa hoặc thêm mới
      else {
        this.$emit("showLoadingLayer");
        //Nếu là form thêm mới thì gọi hàm postData
        if (!this.isFix) {
          this.postData(this.employeeDetailData);
        }
        //Nếu là form sửa thông tin thì gọi hàm updateEmployee
        else {
          this.updateEmployee(
            this.employeeDetailData.EmployeeId,
            this.employeeDetailData
          );
        }
      }
    },

    /**
     * Hàm cất và thêm mới
     * author: VietDV(28/2/2023)
     */
    saveAndAddNew() {
      this.isSaveAndAddNew = true;
      // this.isDuplicateEmployee = false;
      this.saveData();
    },

    /**
     * Chuyển trạng thái của resetCombobox sau khi cất
     * author: VietDV(4/3/2023)
     */
    resetComboboxDataStatus() {
      this.resetComboboxData = false;
    },

    /**
     * Hàm format ngày để hiển thị trên input:date
     * author: VietDV(22/2/2023)
     * @param {*} date
     */
    formatDate(data) {
      const date = new Date(data);
      return moment(date).format("YYYY-MM-DD");
    },

    /**
     * Hàm call API lấy thông tin nhân viên theo ID
     * author: VietDV(27/2/2023)
     * @param {selectedID} id
     */
    getData: async function (id) {
      try {
        const res = await getEmployeeByID(id);
        if(!this.isSaveAndAddNew){
          this.originalData = res.data;
        }
        else{
          this.originalData = {};
        }
        this.employeeDetailData = { ...this.originalData };
      } catch (error) {
        console.log(error);
      }
      this.$emit("hideLoadingLayer");
    },

    /**
     * Hàm call api thêm mới
     * author: VietDV(28/2/2023)
     * @param {*} body
     */
    postData: async function (body) {
      try {
        const res = await addNewEmployee(body);
        if (res.status == 201) {
          this.$emit("refreshData");
          this.toastStatusTxt = this.toastStatusList.Success;
          this.toastActivityTxt = this.toastActivityList.AddSuccess;
          this.$emit(
            "showToastMessage",
            this.toastStatusTxt,
            this.toastActivityTxt
          );
          //Nếu là nút cất thì đóng form sau khi cất
          if (!this.isSaveAndAddNew) {
            this.closeDetail();
          }
          this.isSaveAndAddNew = false;
          this.isDuplicateEmployee = false;
          this.getNewEmployeeCode();
          this.resetComboboxData = true;
          this.$emit("closePopup")
        } else {
          console.log("error");
          this.isSaveAndAddNew = false;
        }
      } catch (error) {
        console.log(error);
        //bắt lỗi trả về từ server để hiển thị
        var arrayError = error.response.data;
        console.log(arrayError);
        for(let i = 0; i< arrayError.length;i++){
          let fieldError = arrayError[i].ErrorField;
          let errorText = arrayError[i].UserMsg;
          let title = errorText;
            this.validateForm[fieldError].class = true;
            this.validateForm[fieldError].title = title;
          this.addError(errorText, fieldError);
        }
        // hiển thị popup lỗi nếu có lỗi
        if (this.inputError.length > 0) {
          for (let item in this.listValidateField) {
            if (this.fieldError.includes(item)) {
              break;
            }
          }
          this.focusField = this.fieldError[0];
          this.isSaveAndAddNew = false;
          this.$emit("showError", this.inputError);
        }
        this.$emit("hideLoadingLayer");
      }
    },

    /**
     * call API lấy mã nhân viên tiếp theo
     * author: VietDV(28/02/2023)
     */
    getNewEmployeeCode: async function () {
      if (!this.isFix){
        try {
          if(!this.isDuplicateEmployee){
            this.employeeDetailData = {};
          }
          else{
            if(this.selectedEmployeeID){
              await this.getData(this.selectedEmployeeID)
            }
          }
          this.$emit("showLoadingLayer");
          const res = await getNewEmployeeCode();

          this.employeeDetailData.EmployeeCode = res.data;
          this.originalData = { ...this.employeeDetailData };
          this.$emit("hideLoadingLayer");
        } catch (error) {
          console.log(error);
        }
      }
      
    },

    /**
     * Hàm call api sửa thông tin nhân viên
     * author: VietDV(2/3/2023)
     * @param {*} id
     * @param {*} body
     */
    updateEmployee: async function (id, body) {
      this.$emit("showLoadingLayer");
      try {
        const res = await putEmployee(id, body);
        if (res.status == 200) {
          this.$emit("refreshData");
          this.toastStatusTxt = this.toastStatusList.Success;
          this.toastActivityTxt = this.toastActivityList.UpdateSuccess;
          this.$emit(
            "showToastMessage",
            this.toastStatusTxt,
            this.toastActivityTxt
          );
          if (!this.isSaveAndAddNew) {
            this.closeDetail();
          }
          this.isSaveAndAddNew = false;
          //Nếu đang là form sửa thì chuyển thành form thêm mới
          if (this.isFix) {
            this.isFix = false;
          }
          this.getNewEmployeeCode();
          this.resetComboboxData = true;
          this.$emit("closePopup")
        } 
        else 
        {
          this.toastStatusTxt = this.toastStatusList.Fail;
          this.toastActivityTxt = this.toastActivityList.UpdateFail;
          this.isSaveAndAddNew = false;
          this.isFix = true;
          this.$emit(
            "showToastMessage",
            this.toastStatusTxt,
            this.toastActivityTxt
          );
        }
      } catch (error) {
        //bắt lỗi trả về từ server để hiển thị
        var arrayError = error.response.data;
        for(let i = 0; i< arrayError.length;i++){
          let fieldError = arrayError[i].ErrorField;
          let errorText = arrayError[i].UserMsg;
          let title = errorText;
            this.validateForm[fieldError].class = true;
            this.validateForm[fieldError].title = title;
          this.addError(errorText, fieldError);
        }
        // hiển thị popup lỗi nếu có lỗi
        if (this.inputError.length > 0) {
          for (let item in this.listValidateField) {
            if (this.fieldError.includes(item)) {
              break;
            }
          }
          this.focusField = this.fieldError[0];
          this.$emit("showError", this.inputError);
          // this.getNewEmployeeCode();
        }
        this.$emit("hideLoadingLayer");
        this.isSaveAndAddNew = false;
        this.isFix = true;
      }
    },

    /**
     * Lập trình các phím tắt cho bảng
     * author: VietDV(9/3/2023)
     * @param {*} event
     */
    detailKeyDown(event) {
      //Ctrl + Enter để save
      if (event.ctrlKey && event.keyCode === this.keyCodeName.Enter) {
        event.preventDefault();
        this.saveData();
      }
      // Ctrl + Shift + S để save and Add new
      else if (
        event.ctrlKey &&
        event.shiftKey &&
        event.keyCode === this.keyCodeName.S
      ) {
        event.preventDefault();
        this.saveAndAddNew();
      }
      // Esc để đóng form
      else if (event.keyCode == this.keyCodeName.ESC) {
        event.preventDefault();
        this.cancelDetail();
      }
    },

    
  },
};
</script>

<style>
@import url(@/css/main.css);
</style>
