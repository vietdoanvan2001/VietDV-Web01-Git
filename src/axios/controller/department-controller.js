import axios from "../base-axios";
import {endPoint} from '@/axios/end-point.js';

/**
 * Hàm call api lấy toàn bộ danh sách Đơn vị
 * author: VietDV(3/3/2023)
 * @returns danh sách đơn vị
 */
export async function getAllDepartments(){
    const endpoint = endPoint.DEPARTMENTS;
    return await axios.getAxios(endpoint);
}

/**
 * Hàm call api lấy đơn vị theo id
 * author: VietDV(3/3/2023)
 * @param {*} id 
 * @returns object đơn vị
 */
export async function getDepartmentById(id){
    const endpoint = endPoint.DEPARTMENTS+"/"+id;
    return await axios.getAxios(endpoint);
}