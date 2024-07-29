import { getApiUrl } from './apiConfig'
import axios from 'axios'

export const addToCart = ({amountToAdd, productToAdd, setProductFeedback}) => {
    const addUrl = getApiUrl('shoppingList')
    const userDetailUrl = getApiUrl('auth/details')

    axios.get(userDetailUrl, { withCredentials: true }).then(userDetails => {
        
        let cartObject = {
            client: userDetails.data,
            product: productToAdd,
            amount: amountToAdd
        }

        axios.post(addUrl, cartObject, {withCredentials: true}).then(() => {
            let number = parseInt(localStorage.getItem("number")) + 1
            setProductFeedback({
                show: true,
                status: true,
                infoText: "AÑADIENDO PRODUCTO :)"
            })
            localStorage.setItem("number", number.toString())
            window.dispatchEvent(new Event('storage'))

        })
    }).catch(()=>
    {
        setProductFeedback({
        show: true,
        status: false,
        infoText: "ACCEDE O CREA TU USUARIO" + " AL FINAL DE ESTA PAGINA"
      });
    })
}

//separacion

export const deleteShoppingItem = ({ itemId }) => {
    const deleteUrl = getApiUrl(`shoppingList/clean/${itemId}`)
    return axios.delete(deleteUrl, { withCredentials: true })
}

//separacion

export const getShoppingList = ({ setProductList }) => {
    const listUrl = getApiUrl("shoppingList")

    axios.get(listUrl, { withCredentials: true }).then(response => {
        setProductList(response.data)
    }).catch(error => {
        if(error.response && error.response.status === 500){
            console.error("error gonzalo", error);
        }
        else{
            console.error("error 2 gonzalo", error);
        }
    })
}

//separacion

export const generateSale = async ({ setProductList }) => {
    const saleUrl = getApiUrl(`sale/create`)    
    await axios.post(saleUrl, null, { withCredentials: true }).then(response => {
        const listUrl = getApiUrl("shoppingList")
    
        axios.get(listUrl, { withCredentials: true }).then(response => {
            setProductList(response.data)
        })
    })
}

//separacion

export const getSaleList = ({ setSalesList }) => {
    const listUrl = getApiUrl("sale/client")
    axios.get(listUrl, { withCredentials: true }).then(response => {
        setSalesList(response.data)
    }).catch(error => {
        if(error.response && error.response.status === 500){
            console.error("error gonzalo", error);
        }
        else{
            console.error("error 2 gonzalo", error);
        }
    })
}

/*

const userDetailUrl = getApiUrl('auth/details')

    axios.get(userDetailUrl, { withCredentials: true }).then(userDetails => {
        
        let cartObject = {
            client: userDetails.data,
            product: productToAdd,
            amount: amountToAdd
        }

        axios.post(addUrl, cartObject, {withCredentials: true}).then(() => {
            let number = parseInt(localStorage.getItem("number")) + 1
            setProductFeedback({
                show: true,
                status: true,
                infoText: "Añandiendo producto..."
            })
            localStorage.setItem("number", number.toString())
            window.dispatchEvent(new Event('storage'))

        })
    }).catch(()=>
    {
        setProductFeedback({
        show: true,
        status: true,
        infoText: "Debe iniciar sesión...",
      });
    })

*/