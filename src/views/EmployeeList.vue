<template>
  <m-loading v-if="isShowLoading"></m-loading>
  <div class="container">
    <div class="content__header">
      <div class="content__header--left">{{ contentTitle.title }}</div>
      <div class="content__header--right">
        <DxButton type="default" class="content__icon-button">
          <DxButton
            class="content__icon-button--left"
            :width="93"
            icon="add"
            type="success"
            :text="textButton.iconButton"
            @click="showDetail(formMode.addNew)"
          />
          <DxButton
            class="content__icon-button--right"
            id="back"
            icon="chevrondown"
            @click="backClick()"
          />
        </DxButton>
      </div>
    </div>
    <div class="content__body">
      <div class="content__body--function" v-if="!selectedRecord.length">
        <div class="content__function--left">
          <search-input @changeKeyWord="changeKeyWord"> </search-input>
        </div>
        <div class="content__function--right">
          <button class="ms-con-dropdown m-l-16">
            <div class="flex align-center m-r-48">
              <span class="content__status-selection--name">{{
                contentFunctionName.status
              }}</span>

              <m-dropdown
                :inputValue="statusSelection[0].value"
                :dataSource="statusSelection"
                :widthValue="112"
                @changeSelection="changeStatus"
              >
              </m-dropdown>
            </div>
          </button>

          <div class="content__department-selection mgr_8">
            <department-dropdown
              :paramsData="params"
              @changeDepartment="changeDepartment"
            >
            </department-dropdown>
          </div>

          


          <div class="content__function--icon mgr_8" id="refresh" @click="refreshData">
            <div class="content__refresh-icon"></div>
            <DxTooltip
              :hide-on-outside-click="false"
              target="#refresh"
              show-event="mouseenter"
              hide-event="mouseleave"
            >
              {{ titleIcon.refresh }}
            </DxTooltip>
          </div>
          <div class="content__function--icon mgr_8" id="filter">
            <div class="content__filter-icon"></div>
            <DxTooltip
              :hide-on-outside-click="false"
              target="#filter"
              show-event="mouseenter"
              hide-event="mouseleave"
            >
              {{ titleIcon.filter }}
            </DxTooltip>
          </div>
          <div class="content__function--icon mgr_8" id="export" @click="exportFilterData">
            <div class="content__export-icon"></div>
            <DxTooltip
              :hide-on-outside-click="false"
              target="#export"
              show-event="mouseenter"
              hide-event="mouseleave"
            >
              {{ titleIcon.export }}
            </DxTooltip>
          </div>

          <div class="content__function--icon" id="setting">
            <div class="content__setting-icon"></div>
            <dx-popover
              :width="350"
              target="#setting"
              show-event="click"
              hide-event="clickaway"
              position="top"
              v-model:visible="isSettingVisible"
            >
              <div class="setting-content--header">
                <div class="setting-header__title">
                  <div class="setting-header__title--text">
                    {{ contentTitle.changeRow }}
                  </div>
                  <div class="close-button" @click="hideSettingPopup"></div>
                </div>
                <search-input
                  @changeKeyWord="changeColumnKeyWord"
                  :widthValue="284"
                >
                </search-input>
              </div>
              <DxScrollView>
                <DxSortable
                  v-model="tableTitleClone"
                  group="tasksGroup"
                  @reorder="onTaskDrop($event)"
                  @add="onTaskDrop($event)"
                >
                  <div
                    v-for="item in tableTitleClone"
                    :key="item.dataField"
                    class="card dx-card dx-theme-text-color dx-theme-background-color hover-change-color"
                  >
                    <div class="setting-item">
                      <div class="setting-item__left">
                        <input type="checkbox" 
                        v-model="item.isDisplay"
                        :value="item.isDisplay"/>
                        <div class="card-subject">{{ item.caption }}</div>
                      </div>
                      <i class="mi-drag"></i>
                    </div>
                  </div>
                </DxSortable>
              </DxScrollView>
              <div class="setting-header__footer">
                <DxButton
                  class="m-sub-button w-90 mgr_8"
                  :text="textButton.default"
                  type="normal"
                  @click="resetColumn"
                />
                <DxButton
                  class="m-button w-90"
                  :text="textButton.save"
                  :use-submit-behavior="true"
                  @click="saveColumn"
                  type="normal"
                />
              </div>
            </dx-popover>
            <DxTooltip
              :hide-on-outside-click="false"
              target="#setting"
              show-event="mouseenter"
              hide-event="mouseleave"
            >
              {{ titleIcon.setting }}
            </DxTooltip>
          </div>
        </div>
      </div>
      
      <div class="content__body--function option" v-if="selectedRecord.length">
        <div class="content__function--left">
          <div>{{ textButton.selected }} <span style="font-weight: 600;">{{ selectedRecord.length }}</span></div>
          <span style="padding-left: 8px; cursor: pointer; color: red; margin:0 24px;" @click="uncheckedSelectRows">{{ textButton.unchecked }}</span>
          <button class="denine-button" @click="changeMultipleStatus(status.deny)" v-if="showDenyButton"><i class="denine-icon"></i>
            <span>{{ textButton.deny }}</span></button>
          <button class="approve-button" @click="changeMultipleStatus(status.accept)" v-if="showAcceptButton"><i
              class="approve-icon"></i><span>{{ textButton.accept }}</span></button>
          <button @click="exportSelectedData" class="export-button"><i class="export-icon"></i> <span>{{ textButton.export }}</span></button>
          <button class="delete-all-button" @click="multipleDelete"><i
              class="delete-all-icon"></i><span>{{ textButton.delete }}</span></button>
          </div>
      </div>

      <div class="table__container">
        <m-table
          :dataSource="overTimeDataSource"
          :dataTitle="tableTitleArange"
          :selectedRowProps="selectedRecord"
          :changePage="params.offSet"
          :isUncheckedSelected="isUncheckedSelected"
          @showDetail="showDetail"
          @deleteOverTime="deleteOverTime"
          @addSelectedRecord="addSelectedRecord"
          @removeSelectedRecord="removeSelectedRecord"
        ></m-table>
      </div>
      <m-paging
        class="list__paging"
        :totalRecord="data.TotalRecord"
        :beginRecord="data.Begin"
        :endRecord="data.End"
        :paramsWatched="params"
        @changePageSize="changePageSize"
        @changeOffSet="changeOffSet"
      ></m-paging>
    </div>
  </div>
  <employee-detail
    :formMode="mode"
    :idDataProp="selectedEmployeeId"
    @showLoading="showLoading"
    @hideLoading="hideLoading"
    @hideDetail="hideDetail"
    @reloadData="getOverTimeData"
    v-if="showForm"
  ></employee-detail>
</template>

<script>
import {
  contentTitle,
  textButton,
  placeholderInput,
  contentFunctionName,
  statusSelection,
  titleIcon,
  tableTitle,
  dialogText
} from "@/js/resource";
import _ from "lodash";
import {formMode, status} from '@/js/enum.js'
import DxButton from "devextreme-vue/button";
import { DxTooltip } from 'devextreme-vue/tooltip';
import { DxSortable } from 'devextreme-vue/sortable';
import { DxScrollView } from 'devextreme-vue/scroll-view';
import { DxPopover } from 'devextreme-vue/popover';
import MDropdown from '@/components/base/dropdown/MDropdown.vue';
import { custom } from 'devextreme/ui/dialog';
import notify from "devextreme/ui/notify";

import { 
  getOverTimeFilter, 
  deleteEmoloyeeByID, 
  multipleDelete, 
  changeMultiple, 
  exportFilterData,
  exportSelectedData 
} from "@/axios/controller/overtime-controller.js";
import { valueDefault, toastStatus } from "../js/enum.js";
import MLoading from '@/components/base/MLoading.vue';
import lodash from "lodash";

export default {
  components: {
    DxButton,
    DxTooltip,
    DxSortable,
    DxScrollView,
    DxPopover,
    MDropdown,
    MLoading,
    custom,
    notify
  },
  created() {
    //tạo bản sao title
    this.tableTitleArange = []
    this.tableTitleClone = JSON.parse(localStorage.getItem('tableTitle'));
    this.tableTitleClone.forEach(element =>{
      if(element.isDisplay){
        this.tableTitleArange.push(element);
      }
    })
  },
  watch:{
        //params thay đổi thì load lại dữ liệu
        params: {
            handler(){
              this.getOverTimeData();
            },
            immediate: true,
            deep: true,
        },
    },
  data() {
    return {
      tableTitleClone:[],
      tableTitleArange:[],
      status:status,
      contentTitle: contentTitle,
      textButton: textButton,
      isChangePage: false,
      toastStatus:toastStatus,
      dialogText:dialogText,
      placeholderInput: placeholderInput,
      contentFunctionName: contentFunctionName,
      statusSelection: statusSelection,
      titleIcon:titleIcon,
      formMode:formMode,
      showForm: false,
      mode: 1,
      treeDataSource: [],
      treeViewRefName: 'tree-view',
      isTreeBoxOpened: false,
      selectedEmployeeId:"",
      // tableTitle:tableTitle,
      isSettingVisible:false,
      treeBoxValue: null,
      overTimeDataSource:{},
      selectedRecord:[],
      params:{
        keyWord:'',
        status:0,
        MISACode:'',
        pageSize: 50,
        offSet: 0
      },
      isShowLoading:true,
      closeButtonOptions: {
        text: 'Close',
        onClick: () => {
          this.popupVisible = false;
        },
      },
      popupVisible: true,
      showAcceptButton: false,
      showDenyButton: false,
      isUncheckedSelected:false
    };
  },
  methods: {
    /**
     * Đổi vị trí cột
     * author: VietDV(5/5/2023)
     * @param {*} e 
     */
    onTaskDrop(e) {
      var temp = this.tableTitleClone[e.fromIndex];
      this.tableTitleClone[e.fromIndex] = this.tableTitleClone[e.toIndex];
      this.tableTitleClone[e.toIndex] = temp;
    },

    /**
     * Lưu lại thay đổi của các cột
     * author: VietDV(5/5/2023)
     */
    saveColumn(){
      this.tableTitleArange = []
      this.tableTitleClone.forEach(element => {
        if(element.isDisplay){
          this.tableTitleArange.push(element)
        }
      })
      localStorage.setItem('tableTitle', JSON.stringify(this.tableTitleClone));
      this.isSettingVisible = false
    },
    
    /**
     * Đặt lại mặc định các cột
     * author: VietDV(5/5/2023) 
     */
    resetColumn(){
      this.tableTitleArange = []
      this.tableTitleClone = lodash.cloneDeep(tableTitle);
      this.tableTitleClone.forEach(element =>{
        if(element.isDisplay){
          this.tableTitleArange.push(element);
        }
      })
      localStorage.setItem('tableTitle', JSON.stringify(this.tableTitleClone));
      this.isSettingVisible = false
    },

    exportSelectedData: async function(){
      try {
        this.showLoading();
        const response = await exportSelectedData(this.selectedRecord); 
        const url = URL.createObjectURL(
          new Blob([response.data],
          {type:"application/vnd.ms-excel"}) 
          
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Danh sách đơn đăng ký làm thêm_${Date.now()}.xlsx`);
        document.body.appendChild(link);
        link.click();
        this.hideLoading();
      } catch (error) {
        this.hideLoading();
        console.log(error);
      }
    },

    /**
     * Xuất khẩu đơn đăng ký làm thêm theo filter
     * author: VietDV(5/5/2023)
     */
    exportFilterData: async function(){
      // debugger
      try {
        this.showLoading();
        const params = {
          keyword: this.params.keyWord,
          MISACode: this.params.MISACode,
          status: this.params.status,
          total: this.data.TotalRecord,
        }
        const response = await exportFilterData(params); 
        const url = URL.createObjectURL(
          new Blob([response.data],
          {type:"application/vnd.ms-excel"}) 
          
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Danh sách đơn đăng ký làm thêm_${Date.now()}.xlsx`);
        document.body.appendChild(link);
        link.click();
        this.hideLoading();
      } catch (error) {
        this.hideLoading();
        console.log(error);
      }
    },
    /**
     * Hiển thị loading layer
     * author: VietDV(28/4/2023)
     */
    showLoading(){
      this.isShowLoading = true;
    },

    /**
     * Ẩn loading layer
     * author: VietDV(28/4/2023)
     */
    hideLoading: _.debounce(function (){
      this.isShowLoading = false;
    },50),

    /**
     * Hiển thị form
     * author: VietDV(17/4/2023)
     */
    showDetail(mode,data){
      this.selectedEmployeeId = data;
      this.mode = mode
      this.showForm = true
    },

    /**
     * Đóng form
     * author: VietDV(17/4/2023)
     */
     hideDetail(){
      this.showForm = false
      this.mode = formMode.addNew
    },

    /**
     * Ẩn tuỳ chỉnh cột
     * author: VietDV(21/4/2023)
     */
    hideSettingPopup(){
      this.isSettingVisible = false
    },

    /**
     * Chọn trạng thái cập nhật vào params
     * author: VietDV(24/4/2023)
     * @param {*} data
     */
    changeStatus(data){
      this.params.status = data.selectedItem.value;
      this.params.offSet = valueDefault.offset;
    },

    /**
     * Chọn số bản ghi trên trang cập nhật params
     * author(VietDV(24/4/2023))
     * @param {*} data
     */
    changePageSize(data){
      this.params.pageSize = data;
      this.params.offSet = valueDefault.offset;
    },

    /**
     * Lưu giá trị id phòng ban vào params khi chọn item
     * author: VietDV(24/4/2023)
     * @param {*} e
     */
     changeDepartment(data) {
      this.params.MISACode = data;
      this.params.offSet = valueDefault.offset;
    },


    /**
     * chuyển trang thay đổi params
     * author: VietDV(26/4/2023)
     * @param {*} offset
     */
     changeOffSet(offset){
      this.params.offSet = offset;
      this.isChangePage = true;
    },

    /**
     * đổi keyword cập nhật params
     * author(VietDV(24/4/2023))
     * @param {*} data
     */
    changeKeyWord(data){
      this.params.keyWord = data;
      this.params.offSet = valueDefault.offset;
    },

    /**
     * thêm id vào danh sách các bản ghi được chọn
     * author: VietDV(30/4/2023)
     * @param {*} listIDs 
     */
    addSelectedRecord(listIDs){
      this.showDenyButton = false;
      this.showAcceptButton = false;
      listIDs.forEach(element => {
        let index = this.selectedRecord.findIndex(item => JSON.stringify(item) === JSON.stringify(element));
          if(index == -1){
            this.selectedRecord.push(element);
          }
      });
      for(let i in this.selectedRecord){
        //Hiển thị nút từ chối nếu có phần tử có trạng thái duyệt
        if(this.selectedRecord[i].Status == status.accept){
          this.showDenyButton = true;
        }
        //Hiển thị nút duyệt nếu có phần tử có trạng thái từ chối
        else if(this.selectedRecord[i].Status == status.deny){
          this.showAcceptButton = true;
        }
        //Hiển thị cả 2 nút nếu có phần tử có trạng thái chờ duyệt
        else{
          this.showDenyButton = true;
          this.showAcceptButton = true;
        }
      }
    },

    /**
     * xoá id trong danh sách các bản ghi được chọn
     * author: VietDV(30/4/2023)
     * @param {*} listIDs 
     */
    removeSelectedRecord(listIDs){
      this.showDenyButton = false;
      this.showAcceptButton = false;
      listIDs.forEach(element => {
          let index = this.selectedRecord.findIndex(item => JSON.stringify(item) === JSON.stringify(element));
          if(index > -1){
            this.selectedRecord.splice(index,1);
          }
      });
      for(let i in this.selectedRecord){
        //Hiển thị nút từ chối nếu có phần tử có trạng thái duyệt
        if(this.selectedRecord[i].Status == status.accept){
          this.showDenyButton = true;
        }
        //Hiển thị nút duyệt nếu có phần tử có trạng thái từ chối
        else if(this.selectedRecord[i].Status == status.deny){
          this.showAcceptButton = true;
        }
        //Hiển thị cả 2 nút nếu có phần tử có trạng thái chờ duyệt
        else{
          this.showDenyButton = true;
          this.showAcceptButton = true;
        }
      }
    },

    /**
     * Làm mới dữ liệu và quay về đầu trang\
     * author:VietDV(26/4/2023)
     */
    refreshData(){
      this.params.offSet = valueDefault.offset;
      this.getOverTimeData();
    },

    /**
     * Lấy thông tin làm thêm theo filter
     * author: VietDV(26/4/2023)
     */
     getOverTimeData: async function(){
      try {
        this.showLoading();
        const res = await getOverTimeFilter(this.params);
        if (res.status == 200) {
          this.data = res.data
          this.overTimeDataSource = this.data.Data;
          this.hideLoading();
        }
        else{
          console.log("error");
          this.hideLoading();
        }
      } catch (error) {
        console.log(error);
        this.showLoading = false;
        this.hideLoading();
      }
    },

    /**
     * Xoá thông tin làm thêm theo id
     * author: VietDV(29/4/2023)
     */
    deleteOverTime(id){
      this.$nextTick(function() {
        // tạo dialog
            let myDialog = custom({
                title: dialogText.warningTitlte,
                messageHtml: dialogText.deleteMessage,
                showCloseButton: true,
                buttons: [{
                  className: "cancel-button",
                    text: textButton.cancel,
                    onClick: (e) => {
                        return { buttonText: e.component.option("text") }
                    }
                },
                {
                    text: textButton.delete,
                    type: toastStatus.danger,
                    onClick: (e) => {
                        return { buttonText: e.component.option("text") }
                    }
                },
                ]
            });
            //Hiển thị dialog và bắt các sự kiện
            myDialog.show().then(async (dialogResult) => {
              if (dialogResult.buttonText === textButton.delete) {
                this.showLoading();
                try {
                  const res = await deleteEmoloyeeByID(id);
                  this.getOverTimeData();
                  if (res.status === 200) {
                    this.notifyMsg(toastStatus.success, dialogText.deleteSuccess);
                  } else {
                    console.log(res);
                    this.notifyMsg(toastStatus.error, dialogText.deleteFail);
                  }
                } catch (error) {
                  console.log(error);
                  this.notifyMsg(toastStatus.error, dialogText.deleteFail);
                } finally {
                  this.hideLoading();
                }
              } else {
                return;
              }
            });
        })
    },

    /**
     * Xoá các bản ghi được chọn
     * author: VietDV(30/4/2023)
     */
    multipleDelete(){
      this.$nextTick(function() {
        //Tạo dialog
            let myDialog = custom({
                title: dialogText.warningTitlte,
                messageHtml: this.selectedRecord.length>1? dialogText.multipleDeleteMessage: dialogText.deleteMessage,
                showCloseButton: true,
                buttons: [{
                  className: "cancel-button",
                    text: textButton.cancel,
                    onClick: (e) => {
                        return { buttonText: e.component.option("text") }
                    }
                },
                {
                    text: textButton.delete,
                    type: toastStatus.danger,
                    onClick: (e) => {
                        return { buttonText: e.component.option("text") }
                    }
                },
                ]
            });
            //Hiển thị dialog và bắt các sự kiện
            myDialog.show().then(async (dialogResult) => {
              if (dialogResult.buttonText === textButton.delete) {
                this.showLoading();
                try {
                  // debugger
                 var listIDs = this.selectedRecord.map(element => element.OverTimeId);
                  const res = await multipleDelete(listIDs);
                  this.getOverTimeData();
                  if (res.status === 200) {
                    this.selectedRecord = []
                    this.notifyMsg(toastStatus.success, dialogText.deleteSuccess);
                  } else {
                    console.log(res);
                    this.notifyMsg(toastStatus.error, dialogText.deleteFail);
                  }
                } catch (error) {
                  console.log(error);
                  this.notifyMsg(toastStatus.error, dialogText.deleteFail);
                } finally {
                  this.hideLoading();
                }
              } else {
                return;
              }
            });
        })
    },

    /**
     * Chuyển trạng thái nhiều bản ghi
     * author: VietDV(30/4/2023)
     * @param {*} status 
     */
    changeMultipleStatus(status){
      this.$nextTick(function() {
        //Tạo dialog
            let myDialog = custom({
                title: dialogText.warningTitlte,
                messageHtml: status == this.status.accept? dialogText.acceptStatusMessage: dialogText.denyStatusMessage,
                showCloseButton: true,
                buttons: [{
                  className: "cancel-button",
                    text: textButton.cancel,
                    onClick: (e) => {
                        return { buttonText: e.component.option("text") }
                    }
                },
                {
                    text: status == this.status.accept? textButton.accept: textButton.deny,
                    type: status == this.status.accept? toastStatus.success: toastStatus.danger,
                    onClick: (e) => {
                        return { buttonText: e.component.option("text") }
                    }
                },
                ]
            });
            //Hiển thị dialog và bắt các sự kiện
            myDialog.show().then(async (dialogResult) => {
              if (dialogResult.buttonText === textButton.accept || dialogResult.buttonText === textButton.deny) {
                this.showLoading();
                try {
                 var listIDs = this.selectedRecord.map(element => element.OverTimeId);
                  const res = await changeMultiple(listIDs,status);
                  this.getOverTimeData();
                  //toast message TH duyệt
                  if(status == this.status.accept){
                    if (res.status === 200) {     
                      this.selectedRecord = []             
                      this.notifyMsg(toastStatus.success, dialogText.acceptSuccess);
                    } else {
                      console.log(res);
                      this.notifyMsg(toastStatus.error, dialogText.acceptFail);
                    }
                  }
                  //toast message TH từ chối
                  else{
                    if (res.status === 200) {     
                      this.selectedRecord = []             
                      this.notifyMsg(toastStatus.success, dialogText.denySuccess);
                    } else {
                      console.log(res);
                      this.notifyMsg(toastStatus.error, dialogText.denyFail);
                    }
                  }
                } catch (error) {
                  console.log(error);
                  status == this.status.accept?
                  this.notifyMsg(toastStatus.error, dialogText.acceptFail)
                  : this.notifyMsg(toastStatus.error, dialogText.deleteFail)
                  ;
                } finally {
                  this.hideLoading();
                }
              } else {
                return;
              }
            });
        })
    },

    /**
     * Bỏ chọn các bản ghi đã chọn
     * author: VietDV(30/4/2023)
     */
    uncheckedSelectRows(){
      this.isUncheckedSelected = !this.isUncheckedSelected;
      this.selectedRecord = [];
    },

    /**
     * Toast message
     * author: VietDV(30/4/2023)
     * @param {*} type 
     * @param {*} message 
     */
    notifyMsg(type, message) {
      notify(
        {
          message: message,
          width: 230,
          height: 40,
          position: {
            at: "bottom right",
            my: "bottom right",
          },
        },
        type,
        500
      );
    },

  },
};
</script>

<style>
@import url(@/css/main.css);
</style>
