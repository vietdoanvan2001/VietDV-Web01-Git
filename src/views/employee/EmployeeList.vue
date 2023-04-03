<template>
  <loading-layer v-if="showLoading"></loading-layer>
  <div class="container">
    <m-popup
      v-if="showPopup"
      @closePopup="closePopup"
      :listErrorPopup="listError"
      :isQuestion="isPopupQuestion"
      :question="popupQuestion"
    ></m-popup>
    <EmployeeDetail
      v-if="showForm"
      :selectedEmployeeID="selectedEmployee.EmployeeId"
      :isFixEmployee="isFixEmployee"
      :isDuplicateEmployeeProp="isDuplicateEmployee"
      :popupClosed="popupClosed"
      :serverError="serverErrorReturn"
      @closeForm="closeForm"
      @openForm="openForm"
      @showError="showError"
      @showLoadingLayer="showLoadingLayer"
      @hideLoadingLayer="hideLoadingLayer"
      @postData="postData"
      @updateEmployee="updateEmployee"
      @showQuestion="showQuestion"
      @refreshData="refreshData"
      @showToastMessage="showToastMessage"
      @closePopup="closePopup"
    ></EmployeeDetail>
    <div class="content-head">
      <div class="content-title">{{ employeeListText.title }}</div>
      <dialog-button
        :text="buttonText.addNewEmployee"
        class="table-btn"
        @click="openForm"
      ></dialog-button>
    </div>
    <div class="content-body">
      <div class="content-option">
        <div class="content-option__left" v-if="!disableButton">
          <div class="selectedAmount">
            {{ employeeListText.selected }}
            <span style="font-family: Notosans-bold">{{ tikedAmount }}</span>
          </div>
          <div class="untickedAll" @click="uncheckedClick">
            {{ employeeListText.unchecked }}
          </div>
          <!-- <div class="tickedAll">{{ employeeListText.checkedAll }}</div> -->
          <m-subButton
            :text="buttonText.deleteAll"
            @click="multipleDeleteClick"
            :class="{ deleteAllButton: disableButton }"
          ></m-subButton>
        </div>
        <div class="content-option__right">
          <div class="content_search-input">
            <input
              type="text"
              class="inputField"
              :placeholder="inputPlaceholder.searchInputPlaceholder"
              v-model="searchValue"
              @input="searchData"
            />
            <div class="inputIcon" @click="searchData"></div>
          </div>
          <div class="content-icon">
            <div class="content_export-icon" @click="exportDataTable"></div>
          </div>
          <div class="content-icon last-content-icon">
            <div class="content_refresh-icon" @click="refreshData"></div>
          </div>
        </div>
      </div>
      <m-table
        @fixEmployee="fixEmployee"
        @getEmployeeAmount="getEmployeeAmount"
        @refreshData="refreshData"
        @showLoadingLayer="showLoadingLayer"
        @hideLoadingLayer="hideLoadingLayer"
        @deleteSuccessToast="deleteSuccessToast"
        @showTikedAmount="showTikedAmount"
        @showToastMessage="showToastMessage"
        @loadData="loadData"
        @deleteEmployee="deleteEmployee"
        @duplicateEmployee="duplicateEmployee"
        :employeeList="employeeList"
        :pagingParamsProp="pagingParams"
        :multipleDelete="multipleDelete"
        :isResetData="isResetData"
      ></m-table>
      <m-paging
        :employeeAmount="employeeAmount"
        :pagingParamsProp="pagingParams"
        :beginData="beginData"
        :endData="endData"
        @changePageSize="pagingParams.pageSize = $event"
        @changeOffSet="pagingParams.offSet = $event"
        @refreshData="searchData"
      ></m-paging>
      <toast-message
        :toastStatusTxt="toastStatusTxt"
        :toastActivityTxt="toastActivityTxt"
        v-if="showToast"
      ></toast-message>
    </div>
  </div>
</template>

<script>
import {
  getEmployeeFilter,
  exportData,
} from "@/axios/controller/employee-controller";
import EmployeeDetail from "@/views/employee/EmployeeDetail.vue";
import _ from "lodash";
import {
  defaultPagingParams,
  toastStatus,
  toastActivity,
  employeeListText,
  buttonText,
  inputPlaceholder,
} from "@/js/resources.js";
export default {
  name: "EmployeeList",
  components: {
    EmployeeDetail,
  },
  created() {
    this.showLoading = true;
    this.pagingParams = { ...this.defaultPagingParams };
  },
  data() {
    return {
      showForm: false,
      showPopup: false,
      listError: [],
      selectedEmployee: {},
      employeeAmount: Number,
      isFixEmployee: false,
      showLoading: false,
      employeeList: [],
      showToast: false,
      toastStatusList: toastStatus,
      toastActivityList: toastActivity,
      toastStatusTxt: "",
      toastActivityTxt: "",
      popupClosed: false,
      tikedAmount: 0,
      disableButton: true,
      serverErrorReturn: {
        name: "",
        title: "",
      },
      defaultPagingParams: defaultPagingParams,
      pagingParams: {},
      searchValue: "",
      beginData: 0,
      endData: 20,
      multipleDelete: false,
      employeeListText: employeeListText,
      buttonText: buttonText,
      inputPlaceholder: inputPlaceholder,
      isResetData: false,
      unchecked: false,
      isDuplicateEmployee:false
    };
  },
  methods: {
    /**
     * Lấy số lượng bản ghi được chọn để hiển thị đồng thời able button xoá nhiều nếu có nhiều hơn 1 bản ghi được chọn
     * author: VietDV(6/3/2023)
     * @param {*} amount
     */
    showTikedAmount(amount) {
      this.tikedAmount = amount;
      if (this.tikedAmount >= 1) {
        this.disableButton = false;
      } else {
        this.disableButton = true;
      }
    },
    /**
     * Hiển thị form chi tiết nhân viên
     * author:  VietDV(18/2/2023)
     */
    openForm() {
      this.showForm = true;
    },

    /**
     * Đóng form chi tiết nhân viên
     * author: VietDV(18/2/2023)
     */
    closeForm() {
      this.showForm = false;
      this.isFixEmployee = false;
      this.selectedEmployee = {};
    },

    /**
     * Sửa thông tin chi tiết 1 nhân viên
     * author: VietDV(20/2/2023)
     */
    fixEmployee(employee) {
      this.showLoadingLayer();
      this.selectedEmployee = employee;
      this.isFixEmployee = true;
      this.openForm();
    },

    /**
     * Nhân bản nhân viên
     * author: VietDV(30/3/2023)
     * @param {nhân viên muốn nhân bản} employee 
     */
    duplicateEmployee(employee){
      this.showLoadingLayer();
      this.selectedEmployee = employee;
      // this.isFixEmployee = true;
      this.isDuplicateEmployee = true;
      this.openForm();
    },

    /**
     * Hiển thị popup cảnh báo lỗi
     * author: VietDV(20/2/2023)
     * @param {} inputError
     */
    showError(inputError) {
      this.listError = inputError;
      if (this.listError.length > 0) {
        this.showPopup = true;
      }
    },

    /**
     * Đóng popup Cảnh báo lỗi
     * author: VietDV(20/2/2022)
     */
    closePopup() {
      this.showPopup = false;
      this.popupClosed = !this.popupClosed;
    },

    /**
     * Hàm load dữ liệu danh sách nhân viên hiển thị lên bảng
     * author: VietDV(25/2/2023)
     */
    loadData: async function () {
      try {
        const res = await getEmployeeFilter(this.pagingParams);
        if (res.status == 200) {
          this.isResetData = !this.isResetData;
          this.employeeList = res.data.Data;
          this.employeeAmount = res.data.TotalRecord;
          this.beginData = res.data.Begin;
          this.endData = res.data.End;
          this.showLoading = false;
        }
      } catch (error) {
        console.log(error);
        this.showLoading = false;
      }
    },

    /**
     * Làm mới dữ liệu trong danh sách nhân viên
     * author: VietDV(28/2/2023)
     */
    refreshData() {
      // console.log(this.searchValue);
      // this.pagingParams.keyword = this.searchValue;
      this.pagingParams.offSet = this.defaultPagingParams.offSet;
      // this.pagingParams.keyword = this.defaultPagingParams.keyword
      this.showLoadingLayer();
      this.loadData(this.pagingParams);
    },

    /**
     * Tìm kiếm trong danh sách nhân viên
     * author: VietDV(18/3/2023)
     */
    searchData: _.debounce(function () {
      //thay đổi params bên table watch bắt sự thay đổi để load Data
      this.pagingParams.offSet = this.defaultPagingParams.offSet;
      this.pagingParams.keyword = this.searchValue;
      // this.loadData(this.pagingParams);
    }, 500),

    /**
     * Hiện loading layer
     * author: VietDV(28/2/2023)
     */
    showLoadingLayer() {
      this.showLoading = true;
    },

    /**
     * Ẩn loading layer
     * author: VietDV(28/2/2023)
     */
    hideLoadingLayer() {
      this.showLoading = false;
    },

    /**
     * Hiển thị Toast message
     * author: VietDV(2/3/2023)
     */
    showToastMessage(status, activity) {
      this.toastStatusTxt = status;
      this.toastActivityTxt = activity;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    },

    /**
     * Xử lí sự kiện nhấn xoá nhiều
     * author: VietDV(18/3/2023)
     */
    multipleDeleteClick() {
      this.multipleDelete = !this.multipleDelete;
    },

    /**
     * Xử lí sự kiện ấn bỏ chọn
     * author: VietDV(18/3/2023)
     */
    uncheckedClick() {
      this.isResetData = !this.isResetData;
    },

    /**
     * Gọi API xuất khẩu
     * author: VietDV(27/03/2023)
     */
    exportDataTable: async function () {
      try {
        const params = {
          keyword: this.pagingParams.keyword,
          total: this.employeeAmount,
        }
        const response = await exportData(params); 
        const url = URL.createObjectURL(
          new Blob([response.data],
          {type:"application/vnd.ms-excel"}) 
          
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Danh sách nhân viên_${Date.now()}.xlsx`);
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.log(error);
      }
      
    },
  },
};
</script>
<style>
@import url(../../css/views/employee-list.css);
</style>
