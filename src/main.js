

// Cấu hình CSS cho giao diện ứng dụng
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import { createApp } from 'vue'
import App from './App.vue'
import VueClickAway from "vue3-click-away";
import { createRouter, createWebHistory } from "vue-router";



import EmployeeList from './views/EmployeeList.vue'
import EmployeeDetail from './views/EmployeeDetail.vue'
import EmployeeSelectionTable from './views/EmployeeSelectionTable.vue'
import MPaging from './components/base/MPaging.vue'
import MTable from './components/base/MTable.vue'
import MainButton from "./components/base/button/MainButton.vue";
import SubButton from "./components/base/button/SubButton.vue";
import SearchInput from "./components/base/input/SearchInput.vue";
import DepartmentDropdown from "./components/base/dropdown/DepartmentDropdown.vue";
import MDropdown from "./components/base/dropdown/MDropdown.vue"
import MLoading from "./components/base/MLoading.vue";
import MAvatar from "./components/base/MAvatar.vue";
import DetailName from './components/base/DetailName.vue';
import StatusCell from './components/base/StatusCell.vue'

//Định nghĩa router
const routers = [
    {
        path:"",
        redirect: "employee-list",
        name: ""
    },
    {
        path:"/employee-list",
        component: EmployeeList
    },
    {
        path:"/employee-detail",
        component: EmployeeDetail
    }
]

//Khởi tạo router
const router = createRouter({
    history: createWebHistory(),
    routes: routers
})

const app = createApp(App);

app.component("MPaging",MPaging)
app.component("MTable",MTable)
app.component("EmployeeDetail",EmployeeDetail)
app.component("EmployeeSelectionTable",EmployeeSelectionTable)
app.component("MainButton",MainButton)
app.component("SubButton",SubButton)
app.component("SearchInput",SearchInput)
app.component("DepartmentDropdown",DepartmentDropdown)
app.component("MDropdown",MDropdown)
app.component("MLoading",MLoading)
app.component("MAvatar",MAvatar)
app.component("DetailName",DetailName)
app.component("StatusCell",StatusCell)

app.use(VueClickAway)
app.use(router)
app.mount('#app')
