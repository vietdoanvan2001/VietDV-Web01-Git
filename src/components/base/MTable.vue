<template>
  <m-popup
    v-if="showPopup"
    @closePopup="closePopup"
    :isWarning="isPopupWarning"
    :question="popupQuestion"
    @popupButtonSellect="popupButtonSellect"
  ></m-popup>
  <table class="table">
    <tr class="table-title">
      <th style="min-width: 30px" class="first-column-1">
        <input
          type="checkbox"
          @click="tickCheckbox"
          v-model="tickedCheckbox"
        />
      </th>
      <th
        v-for="(item, index) in titleTable"
        :key="index"
        :style="{ 'min-width': item.Width, 'max-width': item.Width, 'overflow': 'hidden', 'text-overflow': 'ellipsis' }"
        :class="item.Cellclass"
        :title="item.Title"
      >
        {{ item.Name }}
      </th>
      <th style="min-width: 120px" class="last-column last-column-1">
        {{ tableButtonText.function }}
      </th>
    </tr>
    <tr @dblclick="showForm(empl)" v-for="(empl, i) in employeeList" :key="i">
      <td style="min-width: 30px" class="first-column">
        <input type="checkbox" @click="childTicked(i,empl)" v-model="listCheck[i]" />
      </td>
      <td
        v-for="(item, index) in titleTable"
        :key="index"
        :class="item.Cellclass"
        :style="{ 'min-width': item.Width, 'max-width': item.Width, 'overflow': 'hidden', 'text-overflow': 'ellipsis'}"
        :title="(formatTableDate(item.FieldName, empl[item.FieldName]))"
      >
        {{ formatTableDate(item.FieldName, empl[item.FieldName]) }}
      </td>
      <td
        style="min-width: 120px"
        class="last-column"
        :style="
          empl.EmployeeCode === clickedEmployee.EmployeeCode
            ? { 'z-index': trZIndex }
            : ''
        "
      >
        <div class="table-option">
          <div class="fix-empl" @click="showForm(empl)">{{ tableButtonText.fix }}</div>
          <div
            class="more-option__btn"
            @click="toggleOption(empl)"
            v-click-away="
              empl.EmployeeCode === clickedEmployee.EmployeeCode
                ? closeOption
                : ''
            "
          ></div>
          <div
            class="more-option"
            v-if="empl.EmployeeCode == clickedEmployee.EmployeeCode"
          >
            <div 
                class="option-items"
                @click="duplicateEmployee(empl)"    
            >
                {{ optionSellectedItem.duplicate }}
            </div>
            <div
              class="option-items"
              @click="showDeleteWarningPopup(empl.EmployeeId, empl.EmployeeCode, false)"
            >
              {{ optionSellectedItem.delete }}
            </div>
            <div class="option-items">{{ optionSellectedItem.stopUsing }}</div>
          </div>
        </div>
      </td>
    </tr>
  </table>
</template>
<script>
import moment from "moment";
import {
  defaultPagingParams, 
  toastStatus, 
  buttonStatus, 
  titleTable, 
  questionPopup, 
  toastActivity,
  optionSellectedItem,
  tableButtonText
 } from "@/js/resources.js";
import { deleteEmoloyeeByID, multipleDelete } from "@/axios/controller/employee-controller.js";
export default {
  props: {
    //danh sách nhân viên truyền từ component EmployeeList
    employeeList: {
      Type: Array,
      default: [],
    },

    //param phân trang truyền từ component EmployeeList
    pagingParamsProp: {
      Type: Object,
    },

    //cờ theo dõi sự kiện ấn nút xoá nhiều
    multipleDelete: {
      Type: Boolean
    },

    //cờ theo dõi sự kiện resetData
    isResetData: {
      Type: Boolean
    }
  },
  watch:{
    //Theo dõi thay đổi param phân trang để load dữ liệu trong bảng
    pagingParamsProp: {
      handler(){
        this.$emit("loadData",this.pagingParamsProp);
        this.listSellectedEmployeeId = [];
      },
      immediate: true,
      deep: true,
    },

    //Theo dõi sự kiện ấn nút xoá nhiều để xoá nhiều nhân viên
    multipleDelete: {
      handler(){
        if(this.listSellectedEmployeeId.length >0){
         this.showDeleteWarningPopup("", "", true)
        }
      },
      immediate: true,
      deep: true,
    },

    //Theo dõi sự kiện resetData để reset các trạng thái về mặc định
    isResetData: {
      handler(){
        this.tickedCheckbox = false
        this.tikedAmount = 0
        this.$emit("showTikedAmount", this.tikedAmount);
        for (let i = 0; i < this.employeeList.length; i++) {
          this.listCheck[i] = false;
        }
      },
      immediate: true,
      deep: true,
    }
  },
  data() {
    return {
      optionSellectedItem:optionSellectedItem,
      titleTable: titleTable,
      tickedCheckbox: false,
      clickedEmployee: {},
      listCheck: [],
      trZIndex: 2,
      employeeDataList: [],
      isPopupWarning: false,
      showPopup: false,
      questionPopup: questionPopup,
      popupQuestion: "",
      buttonStatusList: buttonStatus,
      employeeSelectedID: "",
      tikedAmount: 0,
      toastStatusList: toastStatus,
      toastActivityList: toastActivity,
      toastStatusTxt: "",
      toastActivityTxt: "",
      defaultPagingParams: defaultPagingParams,
      pagingParams: {},
      listSellectedEmployeeId:[],
      isMultipleDelete: false,
      tableButtonText:tableButtonText
    };
  },
  methods: {
    /**
     * Hàm format ngày để hiển thị trên bảng
     * author: VietDV(25/2/2023)
     */
    formatTableDate(name, data) {
      if (name == "DateOfBirth" && data) {
        const date = new Date(data);
        return moment(date).format("DD/MM/YYYY");
      }
      return data;
    },

    /**
     * Hiển thị các chức năng với 1 nhân viên nếu đang ẩn
     * Hoặc ẩn các chức năng với 1 nhân viên nếu đang hiện
     * author: VietDV(18/2/2023)
     */
    toggleOption(employee) {
      if (this.clickedEmployee.EmployeeCode === employee.EmployeeCode) {
        this.trZIndex = 2;
        this.clickedEmployee = {};
      } else {
        this.trZIndex = 3;
        this.clickedEmployee = employee;
      }
    },
    /**
     * Ẩn các chức năng với 1 nhân viên khi click ra ngoài
     * author: VietDV(18/2/2023)
     */
    closeOption() {
      this.trZIndex = 2;
      this.clickedEmployee = {};
    },
    /**
     * Hiển thị form sửa thông tin nhân viên
     * author: VietDV(18/2/2023)
     */
    showForm(empl) {
      this.$emit("showLoadingLayer");
      this.$emit("fixEmployee", empl);
    },

    /**
     * Nhân bản nhân viên
     * author: VietDV(30/3/2023)
     * @param {Nhân viên muốn nhân bản} employee 
     */
    duplicateEmployee(employee){
      this.$emit("duplicateEmployee", employee);
    },

    /**
     * Tích chọn toàn bộ nhân viên trong bảng hoặc bỏ chọn toàn bộ
     * author: VietDV(23/2/2023)
     */
    tickCheckbox() {
      this.tickedCheckbox = !this.tickedCheckbox;
      if (this.tickedCheckbox == true) {
        this.listSellectedEmployeeId = []
        for (let i = 0; i < this.employeeList.length; i++) {
          this.listCheck[i] = true;
          // console.log(this.employeeList[i]);
          this.listSellectedEmployeeId.push(this.employeeList[i].EmployeeId)
        }
        // console.log(this.listSellectedEmployeeId);
        this.tikedAmount = this.employeeList.length;
      } else {
        for (let i = 0; i < this.employeeList.length; i++) {
          this.listCheck[i] = false;
        }
        this.listSellectedEmployeeId=[];
        this.tikedAmount = 0;
      }
      this.$emit("showTikedAmount", this.tikedAmount);
    },
    /**
     * Khi bỏ chọn 1 nhân viên bất kì thì ô chọn tất cả bỏ chọn
     * author: VietDV(23/2/2023)
     * @param {*} index
     */
    childTicked(index,employee) {
      let id = employee.EmployeeId;
      if (this.listCheck[index] == true) {
        //nếu bỏ tick phần tử bất kì thì bỏ tick ô chọn tất cả
        this.listCheck[index] = false;
        this.tickedCheckbox = false;

        //xoá id trong list id được chọn
        if(this.listSellectedEmployeeId.includes(id)){
          const index = this.listSellectedEmployeeId.indexOf(id);
          this.listSellectedEmployeeId.splice(index,1);
        }
      } else {
        this.listCheck[index] = true;

        //thêm id vào list id được chọn
        if(this.listSellectedEmployeeId.includes(id)){
        } else{
          this.listSellectedEmployeeId.push(id);
        }

        //set các ô không tick thành false
        for (let i = 0; i < this.employeeList.length; i++) {
          if (typeof this.listCheck[i] == "undefined") {
            this.listCheck[i] = false;
          }
        }
        //nếu không có ô nào không chọn thì check chọn tất cả
        if (!this.listCheck.includes(false)) {
          this.tickedCheckbox = true;
        }
      }
      //đếm số ô được chọn để gửi lên component EmployeeList hiển thị
      this.tikedAmount = 0;
      for (let index = 0; index < this.employeeList.length; index++) {
        if (this.listCheck[index] == true) {
          this.tikedAmount += 1;
        }
      }
      this.$emit("showTikedAmount", this.tikedAmount);
    },

    /**
     * emit lên component EmployeeLisst call API xoá nhân viên theo ID
     * author: VietĐV(1/3/2023)
     * @param {EmployeeID} id
     */

    deleteEmployee: async function (id) {
      try {
        const res = await deleteEmoloyeeByID(id);
        //xoá thành công hiển thị toastmessage xoá thành công
        if (res.status == 200) {
          for (let i = 0; i < this.employeeList.length; i++) {
            this.listCheck[i] = false;
            this.tikedAmount = 0;
          }
          this.toastStatusTxt = this.toastStatusList.Success;
          this.toastActivityTxt = this.toastActivityList.DeleteSuccess;
          this.$emit(
            "showToastMessage",
            this.toastStatusTxt,
            this.toastActivityTxt
          );
          this.$emit("refreshData");
        } 
        //xoá thất bại hiển thị toastmessage xoá thất bại
        else {
          this.toastStatusTxt = this.toastStatusList.Fail;
          this.toastActivityTxt = this.toastActivityList.DeleteFail;
          this.$emit(
            "showToastMessage",
            this.toastStatusTxt,
            this.toastActivityTxt
          );
          this.$emit("hideLoadingLayer");
        }
      } catch (error) {
        console.log(error);
        this.$emit("deleteFailToast");
        this.$emit("hideLoadingLayer");
      }
    },

    /**
     * Hiển thị cảnh báo khi xoá nhân viên
     * author: VietDV(2/3/2023)
     */
    showDeleteWarningPopup(id,code,isMultipleDelete) {
      this.showPopup = true;
      this.isMultipleDelete = isMultipleDelete;
      this.isPopupWarning = true;
      if(isMultipleDelete){
        this.popupQuestion = questionPopup.deleteMultipleData;
      }
      else{
        this.employeeSelectedID = id;
        this.popupQuestion = questionPopup.deleteDataBegin + code + questionPopup.deleteDataEnd;
      }
    },

    /**
     * Xử lý sự kiện click các nút trong popup
     * author: VietDV(2/3/2023)
     * @param {*} status
     */
    popupButtonSellect(status) {
      if (status == this.buttonStatusList.No) {
        this.showPopup = false;
      } else {
        this.$emit("showLoadingLayer");
        if(this.isMultipleDelete){
          this.deleteListId(this.listSellectedEmployeeId)
          this.isMultipleDelete = false
        }
        else{
          this.deleteEmployee(this.employeeSelectedID);
        }
        this.showPopup = false;
      }
    },

    /**
     * Xử lý sự kiện xoá nhiều nhân viên
     * author: VietDV(18/3/2023)
     * @param {Mảng các ID muốn xoá} IDs 
     */
    deleteListId: async function(IDs){  
      try {
        const res = await multipleDelete(Object.values(IDs));
        if(res.status == 200){
          // this.$emit("deleteSuccessToast");
          this.toastStatusTxt = this.toastStatusList.Success;
          this.toastActivityTxt = this.toastActivityList.DeleteSuccess;
          this.$emit(
            "showToastMessage",
            this.toastStatusTxt,
            this.toastActivityTxt
          );
          this.$emit("refreshData");
          this.listSellectedEmployeeId=[]
        }
        else{
          // this.$emit("deleteFailToast")
          this.toastStatusTxt = this.toastStatusList.Fail;
          this.toastActivityTxt = this.toastActivityList.DeleteFail;
          this.$emit(
            "showToastMessage",
            this.toastStatusTxt,
            this.toastActivityTxt
          );
          this.$emit("hideLoadingLayer");
          this.listSellectedEmployeeId=[]
        }
      } catch (error) {
        console.log(error);
        this.toastStatusTxt = this.toastStatusList.Fail;
          this.toastActivityTxt = this.toastActivityList.DeleteFail;
          this.$emit(
            "showToastMessage",
            this.toastStatusTxt,
            this.toastActivityTxt
          );
        this.$emit("hideLoadingLayer");
        this.listSellectedEmployeeId=[]
      }   
      
    }
  },
};
</script>

<style>
@import url(../../css/main.css);
</style>
