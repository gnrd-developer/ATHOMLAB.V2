import { Alert, Button, Divider, Grid, IconButton, Snackbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import homeStyle from './home.module.css'
import ProductCard from './productCard'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { getUserDetails } from '../../../services/auth'
import ProductForm from '../../client/components/productForm'

import { useParams } from "react-router-dom";
import { getProductsBySubCategory } from '../../../services/product'//, getBestProducts
import { addToCart } from '../../../services/shoppingCart'
import productListStyle from './productList.module.css'

import Register from "../../auth/register"
import Login from "../../auth/login"




function ProductList()
{
  const {name} = useParams();
  const [roles, setUserRole] = useState([{}])
  const [productList, setProductList] = useState([]) //Aquí tengo mi variable y mi función.
  //const [bestProductList, setBestProductList] = useState([])
  const [product, setProduct] = useState({ name: "", description: "", subCategory: "", image: "" })
  const [refresh, setRefresh] = useState(false) //este componente es para el formulario de creacion de productos.
  const [openModal, setOpenModal] = useState(false)
  const [showProductFeedback, setProductFeedback] = React.useState({ show: false, status: false, infoText: '' })

  const [mostrara, setMostrara] = useState(false);

  const mostrarAvisoa = () => {
    setMostrara(true);
  };

  const ocultarAvisoa = () => {
    setMostrara(false);
  };

  useEffect(() => {
    getUserDetails({ setUserRole })
    getProductsBySubCategory(name).then(data => {
      setProductList(data);
    })
    //getBestProducts({ setBestProductList })
  }, [refresh, name])

  
  const handleOpenModal = () => setOpenModal(true) //esto es lo que habre el formulario. para ingresar un producto.

  const closeProductFeedback = (event, reason) => {

    if (reason === 'clickaway') {
      return;
    }
    setProductFeedback({ show: false });
  };

  const addProduct = (productToAdd, amountToAdd) => {
    addToCart({amountToAdd, productToAdd, setProductFeedback})
  }

  return(
    <div className="container"> {/*className={homeStyle.container} */}

          <div className={homeStyle.title_container}>

              <div>
                {roles.length > 1 ? <Button variant="text" color='success'
                  id="button" onClick={handleOpenModal}>
                  Añadir nuevo producto
                </Button> : null}
              </div>

              <Typography variant="span" fontSize={35} component="h2" ml={1} fontWeight={600}>
                Athom Lab
              </Typography>

              <Typography variant="p" fontSize={20} component="h2" ml={1} fontWeight={400}>
                A Tu Servicio
              </Typography>

          </div>

          <Divider></Divider>

          <div className={homeStyle.title_container}>
            <Typography variant="span" fontSize={30} component="h2" ml={1} fontWeight={600}>
              Todos los productos
            </Typography>
          </div>

          
          <div className="container">
            <div className="row">
              <div className="col-12 text-center my-4">
                <button className="btn btn-primary btn-lg" 
                onClick={() => window.history.back()}>
                  Volver Atrás
                </button>
              </div>
            </div>
          </div>

          <Grid className="row">
            {productList.map(productItem =>

              <Grid onMouseOver={mostrarAvisoa} onMouseOut={ocultarAvisoa} 
              className="col-md-4" key={productItem.id}>
                      {mostrara && (
                        <div className={productListStyle.alert} role="alert">
                          Haga Clic.
                        </div>
                      )}
                      <ProductCard product={productItem} />
                

                      <IconButton aria-label="add to shopping cart" color='primary' 
                      onClick={() => {
                        addProduct(productItem, 1)
                        }}
                        className={homeStyle.add_button}>
                        <AddShoppingCartIcon />              
                      </IconButton>
                
              </Grid>)
            }
          </Grid>

          <br></br>

          <Snackbar open={showProductFeedback.show} autoHideDuration={7000} 
          onClose={closeProductFeedback}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
            <Alert onClose={closeProductFeedback} 
            severity={showProductFeedback.status ? "success" : "error"} 
            sx={{ width: '500%' }}>
              {showProductFeedback.infoText}
            </Alert>
          </Snackbar>
          
          
          <ProductForm setRefresh={setRefresh} openModal={openModal} setOpenModal={setOpenModal}
            setProductFeedback={setProductFeedback} edit={false}
            setProduct={setProduct} product={product}/>

          <Register/>
          <br>
          </br>
          <Login/>
          <br>
          </br>
    </div>
  )
}

export default ProductList

/*
color='primary' onClick={() => {
                addProduct(productItem, 1)
              }} 
<Snackbar open={showProductFeedback.show} autoHideDuration={2000} onClose={closeProductFeedback}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
        {showProductFeedback.show && <Alert onClose={closeProductFeedback} severity={showProductFeedback.status ? "success" : "error"} sx={{ width: '100%' }}>
          {showProductFeedback.infoText}
        </Alert>}
      </Snackbar>
---------------------------
esta la sque despues de la linea 65
<Grid container spacing={3} className={homeStyle.grid} mb={2}>
        {bestProductList.map(productItem =>

          <Grid item xs={12} md={3} style={{ position: 'relative' }} key={productItem.id}>
              <IconButton color='primary' onClick={() => {
                addProduct(productItem, 1)
              }} 
              className={homeStyle.add_button}>
              <AddShoppingCartIcon />
              </IconButton>
              <ProductCard product={productItem} />
          </Grid>)
        }
</Grid>
*/