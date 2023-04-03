import 'devextreme/dist/css/dx.light.css';
import { createApp } from 'vue'
import App from './App.vue'
import VueClickAway from "vue3-click-away";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrash)



import { createRouter, createWebHistory } from "vue-router";
import EmployeeList from './views/employee/EmployeeList.vue';
import MButton from './components/base/button/MButton.vue';
import MSubButton from './components/base/button/MSubButton.vue'
import DialogButton from './components/base/button/MDialogButton.vue'
import SubDialogButton from './components/base/button/MSubDialogButton.vue'
import MInput from './components/base/input/MInput.vue'
import IconInput from './components/base/input/MIconInput.vue'
import MTable from './components/base/MTable'
import MPaging from './components/base/paging/MPaging.vue'
import MForm from './views/employee/EmployeeDetail'
import MPopup from './components/base/MPopup'
import ToastMessage from './components/base/MToastMessage'
import MCombobox from './components/base/combobox/MCombobox.vue'
import RadioInput from './components/base/input/MRadioInput.vue'
import LoadingLayer from './components/base/MLoadingLayer.vue'
import DetailCombobox from './components/base/combobox/MDetailCombobox.vue'

// Dinh nghia router
const routers = [
    {path:"", redirect: "tien-mat",name:""},
    {path:"/", redirect: "tien-mat",name:"/"},
    {path:"/tong-quan", component: {}},
    {path:"/tien-mat", component: EmployeeList},
    {path:"/tien-gui", component: {}},
    {path:"/mua-hang", component: {}},
    {path:"/ban-hang", component: {}},
    {path:"/quan-ly-hoa-don", component: {}},
    {path:"/kho", component: {}},
    {path:"/cong-cu-dung-cu", component: {}},
    {path:"/tai-san-co-dinh", component: {}},
    {path:"/tien-luong", component: {}},
    {path:"/thue", component: {}},
    {path:"/gia-thanh", component: {}},
    {path:"/tong-hop", component: {}},
    {path:"/ngan-sach", component: {}},
    {path:"/bao-cao", component: {}},
    {path:"/phan-tich-tai-chinh", component: {}},
]

// Khoi tao router 
const router = createRouter({
    history: createWebHistory(),
    routes: routers
})

//Routes
//Store
const app = createApp(App);
app.component("MButton",MButton);
app.component("MSubButton",MSubButton);
app.component("DialogButton",DialogButton);
app.component("SubDialogButton",SubDialogButton)
app.component("MInput",MInput)
app.component("IconInput",IconInput)
app.component("MTable",MTable)
app.component("MPaging",MPaging)
app.component("MForm",MForm)
app.component("MPopup",MPopup)
app.component("ToastMessage",ToastMessage)
app.component("MCombobox",MCombobox)
app.component("RadioInput",RadioInput)
app.component("LoadingLayer",LoadingLayer)
app.component("DetailCombobox",DetailCombobox)
app.component('font-awesome-icon', FontAwesomeIcon)

// Su dung router 
app.use(router)
app.use(VueClickAway)
app.mount('#app')
