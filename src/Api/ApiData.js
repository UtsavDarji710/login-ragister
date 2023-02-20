import axios from "axios";

// Fetch Data from products API
export function getData () {
    return axios.get("https://dummyjson.com/products/")
}

// Fetch Data from products API By ID
export function getProductData (id) {
    return axios.get(`https://dummyjson.com/products/${id}`)
}