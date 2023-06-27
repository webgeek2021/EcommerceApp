
import { preLoginApi, postLoginApi } from "../baseApi";
import axios from "axios";
import { toast } from "react-toastify"
import { RESET } from "../../utils/constants";
import { insertIntoProductList, insertProductData, setProductList } from "../../ReduxStore/slices/productDataSlice";

export const getAllProduct = async (dispatch) => {
    console.log("GetAllProduct")

    try {
        const res = await postLoginApi.get("/products/getProducts")
        console.log("Resp", res)
        dispatch(setProductList(res.data))
        // return res.data
    } catch (err) {
        console.log(err)
    }
    // console.log("Data" ,data)
}

export const getProductById = async (id) => {
    const data = id
    try {
        const res = await postLoginApi.get(`/products/${id}`)
        console.log("Product with id", res)

        return res.data
    } catch (err) {
        console.log(err)
    }
}
export const getProductById2 = async (id, dispatch) => {
    try {
        const res = await postLoginApi.get(`/products/${id}`)
        console.log("Product with id", res)
        if (res.data) {
            console.log("RES body", res.data)
            dispatch(insertProductData(res.data))
        }
    } catch (err) {
        console.log(err)
        toast.error(err)
    }
}
export const getProductList = async (id, dispatch, order) => {
    try {
        const res = await postLoginApi.get(`/products/${id}`)
        console.log("LIST", res)
        if (res.data) {
            res.data.orderQuantity = order
            dispatch(insertIntoProductList(res.data))
        }
    } catch (err) {
        console.log(err)
        toast.error(err)
    }
}
export const editProductData = async (data) => {

    try {
        const res = await postLoginApi.put("/products/edit/", data)
        console.log(res)
        if (!res.data.error) {
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message)
        }
    } catch (err) {
        toast.error(err.message)
    }
}

export const addProductApi = async (data) => {
    try {
        const res = await postLoginApi.post("/products/addproduct", data)
        console.log("AddProduct Response", res)
        if (!res.data.error) {
            toast.success(res.data.message)

        } else {
            toast.error(res.data.message)
        }
    } catch (err) {
        toast.error(err)
    }
}

export const deleteProduct = async (id, navigate) => {

    try {
        const res = await postLoginApi.delete(`/products/delete/${id}`)
        console.log("DEL RES", res)
        if (!res.data.error) {
            toast.success(res.data.message)
            navigate("/admin/add-product")
        } else {
            toast.error(res.data.message)
        }
    } catch (err) {
        console.log(err)
        toast.error(err)
    }
}

export const getProductByCategory = async (category, dispatch) => {
    try {

        if (category === RESET) {
            const result = await postLoginApi.get("/products/getProducts")
            dispatch(setProductList(result))
        } else {
            const result = await postLoginApi.get(`/products/getProduct/${category}`)
            dispatch(setProductList(result))
        }

        console.log(result)
    } catch (err) {
        console.log(err)
    }
}

export const filterProduct = async (data, dispatch) => {
    try {
        const result = await postLoginApi.post("/products/filterProduct", data)
        console.log(result)
        dispatch(setProductList(result.data.data))

    } catch (error) {
        console.log(err)
    }
}

export const addReview = async (data) => {
    try {
        const result = await postLoginApi.post("/products/review", data)

        console.log(result)
        if (result.data.error) {
            toast.error(result.data.message)
        } else {
            toast.success(result.data.message)
        }



    } catch (error) {
        console.log(error)
    }
}

export const searchProduct = async (data, setSearchList) => {
    try {
        const result = await preLoginApi.get(`/products/search/${data}`)

        if (result) {
            console.log("SearchResult ", result)
            setSearchList(result.data.data)
        }
    } catch (err) {
        console.log(err)
    }
}

export const productBySearch = async (data, setProductData) => {
    try {
        const result = await preLoginApi.get(`/products/search/product/${data}`)

        if (result) {
            console.log(result)
            setProductData(result.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const adminFilterProduct = async (data) => {
    try {
        const result = await postLoginApi.get(`/`)
    } catch (error) {
        console.log(error)
    }
}