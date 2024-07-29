import { getApiUrl } from './apiConfig'
import axios from 'axios'


export const getAllCategories = ({ setCategoryList }) => {
    const categoryUrl = getApiUrl("category")
    axios.get(categoryUrl, { withCredentials: true }).then((response) => {
        setCategoryList(response.data)
    })
}

export const getSubCategoriesByCategoryName = async (categoryname) => {
    const productUrl = getApiUrl(`subcategory/${categoryname}`)
    const response = await axios.get(productUrl, { withCredentials: true })
    return response.data
}


export const getAllSubCategories = ({ setSubCategoryList }) => {
    const categoryUrl = getApiUrl("subcategory")
    axios.get(categoryUrl, { withCredentials: true }).then((response) => {
        setSubCategoryList(response.data)
    })
}