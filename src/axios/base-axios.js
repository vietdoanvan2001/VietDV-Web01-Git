import axios from "axios";

const HTTP = axios.create({
    // baseURL: 'https://apidemo.laptrinhweb.edu.vn/api/v1/',
    baseURL:'https://localhost:44385/api/v1/',
    // timeout: 10000,
    headers: {"Content-Type": "application/json"}
  });

/**
 * Hàm base axios xử lí get request
 * author: VietDV(25/2/2023)
 * @param {*} endpoint 
 * @param {*} query 
 * @returns 
 */  
export const getAxios = async(endpoint,query) => {
    return await HTTP.get(endpoint,{
        params: {
            ...query
        }
    })
}  

/**
 * Hàm base axios xử lí get request blob
 * author: VietDV(27/3/2023)
 * @param {*} endpoint 
 * @param {*} query 
 * @returns 
 */
 export const getAxiosBlob = async (endpoint, query) => {
  return await HTTP.get(endpoint, {
    params: {
      ...query,
    },
    responseType: 'blob'
  });
};

/**
 * Hàm base axios xử lí post request
 * author: VietDV(25/2/2023)
 * @param {*} endpoint 
 * @param {*} body 
 * @returns 
 */
export const postAxios = async(endpoint,body) => {
    return await HTTP.post(endpoint,{
        ...body
    })
} 

/**
 * Hàm base axios xử lý put request
 * author: VietDV(25/2/2023)
 * @param {*} endpoint 
 * @param {*} body 
 * @returns 
 */
export const putAxios = async(endpoint,body) => {
    return await HTTP.put(endpoint,{
        ...body
    })
} 

/**
 * Hàm base axios xử lý delete request 
 * author: VietDV(25/2/2023)
 * @param {*} endpoint 
 * @param {*} query 
 * @returns 
 */
export const deleteAxios = async(endpoint,query) => {
    return await HTTP.delete(endpoint,{
        params: {
            ...query
        }
    })
} 

/**
 * Hàm base axios xử lý Multipledelete request 
 * author: VietDV(25/2/2023)
 * @param {*} endpoint 
 * @param {*} query 
 * @returns 
 */
export const multipleDeleteAxios = async(endpoint,query) => {
    return await HTTP.delete(
        endpoint,{
            params: {
                ...query
            }
        }
      );
} 

export default {getAxios, postAxios, putAxios, deleteAxios, multipleDeleteAxios,getAxiosBlob}