import { getApiUrl } from './apiConfig'
import axios from 'axios'

export const getAllProducts = ({ setProductList }) => {
    const productUrl = getApiUrl("product/all")
    axios.get(productUrl, { withCredentials: true }).then((response) => {
        setProductList(response.data)
    })
}

export const createProduct = async (product) => {
    const productUrl = getApiUrl("product");
    console.log(productUrl);
    console.log(product)
    let formData = new FormData();
    formData.append("product", JSON.stringify(product));
    const data = await axios.post(productUrl, formData, { withCredentials: true }).then((v) => v.data);
    console.log(data);
    return data;
}

export const getProductById = async (id) => {
    const productUrl = getApiUrl(`product/${id}`)
    const response = await axios.get(productUrl, { withCredentials: true })
    return response.data
}

export const getRelatedProducts = async ({category, id}) => {
    const productUrl = getApiUrl(`product/related/${category}/${id}`)
    const response = await axios.get(productUrl, { withCredentials: true })
    return response.data
}


export const getProductsBySubCategory = async (sub) => {
    const productUrl = getApiUrl(`product/subcategory/${sub}`)
    const response = await axios.get(productUrl, { withCredentials: true })
    return response.data
}

/*export const searchProductsByName = async ({setProduct}) => {
    const productUrl = getApiUrl(`product/search?term=${setProduct}`);
    try {        
        const response = await axios.get(productUrl);
        if(response.status === 200){
            const products = response.data;
            return products;
        }
        else{
            const errorMessage = response.data?.message || "Error al obtener productos";
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error("error al obtener productos", error);
        throw error;
    }
}

/*export const getBestProducts = ({ setBestProductList }) => {
    const productUrl = getApiUrl("product/best")
    axios.get(productUrl, { withCredentials: true }).then((response) => {
        setBestProductList(response.data)
    })
}


    
    export const createProduct = async (product) => {
    const productUrl = getApiUrl("product");
    console.log(productUrl);

    const data = await axios.post(productUrl, product, { withCredentials: true }).then((v) => v.data);
    console.log(data);
    return data;
    };

    ·······································································································
    #ORIGINAL
    export const createProduct = async(product, file, file2) => {
        const productUrl = getApiUrl("product")
        console.log(productUrl);
        let formData = new FormData();
        formData.append("product", JSON.stringify(product));
        formData.append("file", file);
        formData.append("file2", file2);
        console.log(formData);
        const data = await axios.post(productUrl, formData, { withCredentials: true }).then((v) => v.data);
        console.log(data);
        return data
    }

    ························································································································


    export const saveProduct = ({ product, edit }) => {
    const productUpdateUrl = getApiUrl("product/update")
    const productCreateUrl = getApiUrl("product/create")
    return edit === true ? axios.put(productUpdateUrl, product, { withCredentials: true })
        : axios.post(productCreateUrl, product, { withCredentials: true })
    }

    */