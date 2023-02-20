import axios from "axios";
export function getData () {
    return axios.get("https://dummyjson.com/products/")
}

export function getProductData (id) {
    return axios.get(`https://dummyjson.com/products/${id}`)
}