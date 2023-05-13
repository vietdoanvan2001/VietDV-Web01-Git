

// Cấu hình CSS cho giao diện ứng dụng
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import { createApp } from 'vue'
import App from './App.vue'
import VueClickAway from "vue3-click-away";
import { createRouter, createWebHistory } from "vue-router";


import { createI18n } from 'vue-i18n';
import {Resource} from './js/language'
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
import StatusCell from './components/base/StatusCell.vue';
import HeaderCell from './components/base/HeaderCell.vue';


const messages = Resource.messages;

const i18n = createI18n({
    locale: 'vi',
    messages
})

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
app.component("HeaderCell",HeaderCell)

app.use(VueClickAway)
app.use(router)
app.use(i18n)
app.mount('#app')
