<template>
  <DxDataGrid
    ref="table"
    :data-source="dataSubTable?dataSubTable:dataSource"
    :remote-operations="false"
    :allow-column-reordering="true"
    :row-alternation-enabled="true"
    :show-borders="true"
    :hover-state-enabled="true"
    :allow-column-resizing="true"
    :noDataText="placeholderInput.noData"
    column-resizing-mode="widget"
    column-min-width="50"
    column-max-width="200"
    sorting="false"
    v-model:selected-row-keys="selectedRowKeys"
    @content-ready="onContentReady"
    @rowClick="emitRequest($event)"
  >
    <DxColumn
      v-for="(item, index) in dataTitle"
      :key="index"
      :data-field="item.dataField"
      :caption="item.caption"
      :data-type="item.dataType"
      :alignment="item.alignment"
      :format="item.format"
      :width="item.width"
      :cell-template="item.cellTemplate"
      :allow-selection="item.allowSelection"
    />
    <template #cell-avatar-name="{data}">
      <div style="display: flex; align-items: center;">
        <m-avatar :name="data.value" :tableStyle="true"></m-avatar>
        <div>{{ data.value }}</div>
      </div>
    </template>
    <template #cell-status="{data}">
      <status-cell :cellData="data"></status-cell>
    </template>
    <DxColumn
    v-if="modeProp == formMode.fix || modeProp == formMode.addNew"
      caption="Chức năng"
      alignment="center"
      cell-template="cell-template"
      :allow-selection="false"
    />
    <template #cell-template>
      <DxButton
        v-if="!dataSubTable"
        id="edit"
        class="command-button table-edit-button"
        type="normal"
        visible="true"
        @click="fixOverTime($event)"
      />
      <DxButton
        v-if="!dataSubTable"
        id="delete"
        class="command-button table-delete-button"
        type="normal"
        visible="true"
        @click="deleteOverTime($event)"
      />
      <DxButton
        v-if="dataSubTable"
        id="clear"
        class="command-button table-delete-button"
        type="normal"
        visible="true"
        @click="clearEmployee($event)"
      />
    </template>
    />
    <DxPaging :enabled="false" />
    <DxSelection
      v-if="modeProp==formMode.detail?false:true"
      mode="multiple"
      select-all-mode="page"
      show-check-boxes-mode="always"
      :width="50"
    />
  </DxDataGrid>
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxSelection,
  DxEditing
} from "devextreme-vue/data-grid";
import { tableTitle,placeholderInput } from "@/js/resource.js";
import { formMode } from "@/js/enum.js";
import { DxButton } from "devextreme-vue/button";
import { DxTooltip } from 'devextreme-vue/tooltip';
import MAvatar from './MAvatar.vue';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
    DxButton,
    DxEditing,
    DxTooltip,
    MAvatar
  },
  props: {
    //Dữ liệu bảng
    dataSource: Object,
    //Dữ liệu cột
    dataTitle: Object,
    //Danh sách các bản ghi được chọn
    selectedRowProps: [],
    //Cờ theo dõi đổi trang
    changePage: Number,
    //Cờ theo dõi sự kiện ấn nút bỏ chọn
    isUncheckedSelected:Boolean,
    //Dữ liệu bảng nhân viên làm thêm
    dataSubTable:[],
    //Kiểu form
    modeProp:Number
  },
  data() {
    return {
      tableTitle: tableTitle,
      placeholderInput:placeholderInput,
      formMode: formMode,
      nullData: "-",
      isDeleteButton:false,
      isFixedButton:false,
      selectedRowKeys:[],
      changePageData: false,
      isClearEmployee:false
    };
  },
  watch:{
    dataTitle:{
      handler() {
        // const tableRef = this.$refs.table;
        // console.log(tableRef);
        console.log(this.dataTitle);
        
        // tableRef.refresh();
      },
      deep: true,
      immediate: true
    },
    /**
     * Bắt sự kiện ấn bỏ chọn để bỏ các hàng đang chọn
     * author: VietDV(3/5/2023)
     */
    isUncheckedSelected:{
      handler() {
        this.selectedRowKeys = []
      },
      deep: true,
      immediate: true
    },
    /**
     * Xoá các hàng được chọn khi Danh sách các bản ghi được chọn component cha rỗng
     * author: VietDV(30/4/2023)
     */
     selectedRowProps: {
      handler() {
        if(this.selectedRowProps){
          if(this.selectedRowProps.length === 0){
            this.selectedRowKeys = []
          }
        }
      },
      deep: true,
      immediate: true
    },
    /*
     * Theo dõi thay đổi của các bản ghi được chọn trong trang để update lên EmployeeList
     * author: VietDV(30/4/2023)
     */
    selectedRowKeys: {
      handler(newValue, oldValue) {
        // debugger
        if(!oldValue || !newValue){
          return;
        }
          if(newValue.length < oldValue.length){
            if(this.dataSource){
              const index = this.dataSource.findIndex(element => JSON.stringify(element) === JSON.stringify(oldValue[0]))
              if(index === -1){
                return;
              }
            }
            const unCheckedRows = oldValue.filter(element => {
              return !newValue.includes(element);
            })
            this.$emit("removeSelectedRecord",unCheckedRows);
          }
          else{
            this.$emit("addSelectedRecord",this.selectedRowKeys);
          }
      },
      deep: true,
      immediate: true
    },
    /**
     * Check các hàng có trong danh sách các hàng đang chọn khi đổi trang
     * author: VietDV(3/5/2023)
     */
    dataSource: {
      handler() {
        // debugger
        if(this.selectedRowProps){
          this.selectedRowProps.forEach( element => {
            let index = this.dataSource.findIndex(item => JSON.stringify(item) === JSON.stringify(element));
            if(index > -1){
              this.selectedRowKeys.push(element);
            }
          })
        }
      },
      deep: true,
      immmediate: true
    },
    /**
     * Theo dõi sự thay đổi của dữ liệu bảng nhân viên làm thêm để làm mới
     * author: VIetDV(2/5/2023)
     */
     modeProp:{
      handler() {
        const tableRef = this.$refs.table.instance;
        tableRef.refresh();
      },
      deep: true,
      immmediate: true
    },
    /**
     * Theo dõi dữ liệu bảng nhân viên làm thêm có thay đổi để làm mới bảng
     * author: VietDV(3/5/2023)
     */
    dataSubTable:{
      handler() {
        const tableRef = this.$refs.table.instance;
        tableRef.refresh();
      },
      deep: true,
      immmediate: true
    }
  },
  methods: {
    /**
     * Emit yêu cầu lên EmployeeList để xử lý
     * @param {*} e
     */
    emitRequest(e) {
      //Xem chi tiết đơn làm thêm
      if(!this.isDeleteButton && !this.isFixedButton){
        this.$emit("showDetail", this.formMode.detail, e.data.OverTimeId);
      }
      //Sửa thông tin đơn làm thêm
      else if(!this.isDeleteButton && this.isFixedButton){
        this.$emit("showDetail", this.formMode.fix, e.data.OverTimeId);
      }
      //Xoá đơn làm thêm
      else {
        this.$emit("deleteOverTime", e.data.OverTimeId);
      }
      //xoá nhân viên khỏi bảng nhân viên làm thêm
      if(this.isClearEmployee){
        this.$emit("clearEmployee",e.data);
      }
      this.isDeleteButton = false
      this.isClearEmployee = false
      this.isFixedButton = false
    },

    /**
     * Gán cờ phân chỉ định là nút xoá
     * author: VietDV(29/4/2023)
     */
    deleteOverTime(){
      this.isDeleteButton = true;
    },

    /**
     * Gán cờ chỉ định là nút sửa
     * author:VietDV(29/4/2023)
     */
    fixOverTime(){
      this.isFixedButton = true;
    },

    /**
     * Gán cờ chỉ định là nút sửa
     * author:VietDV(29/4/2023)
     */
     clearEmployee(){
      this.isClearEmployee = true;
    },
  },
};
</script>

<style>
@import url(@/css/components/base/table.css);
@import url(@/css/main.css);
</style>
