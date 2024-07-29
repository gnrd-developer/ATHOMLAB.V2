import {
  Alert,
  Button,
  Divider,
  Grid,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import cartStyle from "./cart.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getShoppingList,
  getSaleList,
  deleteShoppingItem,
  generateSale,
} from "../../../services/shoppingCart";
/*import axios from "axios";*/

/*const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};*/

function Cart() {
  const [productList, setProductList] = useState([]);
  const [/*salesList*/, setSalesList] = useState([]);
  const [open, setOpen] = useState(false);
  /*const [details, setDetails] = useState([]);*/
  /*const [openDetail, setOpenDetail] = useState(false);*/

  const getList = () => {
    getShoppingList({ setProductList });
  };

  const getSales = () => {
    getSaleList({ setSalesList });
  };

  useEffect(() => {
    getList();
    getSales();
  }, []);

  const deleteItem = (itemId) => {
    deleteShoppingItem({ itemId }).then(() => {
      let number = parseInt(localStorage.getItem("number")) - 1;
      localStorage.setItem("number", number.toString());
      window.dispatchEvent(new Event("storage"));
      getShoppingList({ setProductList });
    });
  };

  /*const calculateTotal = (items) => {
        let total = 0
        items.forEach(item => {
            total = total + (item.amount * item.product.price)
        })
        return total
    }*/

  /*const getDate = (date) => {
    return new Date(date).toLocaleDateString();
  };*/

  const confirmSale = () => {
    generateSale({setProductList}).then(() => {
      setOpen(true);
      getSales();
      getList();
      let number = 0;
      localStorage.setItem("number", number.toString());
      window.dispatchEvent(new Event("storage"));
    });
  };

  /*function getDetail(id) {
    axios
      .get("http://localhost:8080/saleDetail/" + id, { withCredentials: true })
      .then((response) => {
        setDetails(response.data);
        setOpenDetail(true);
      });
  }*/

  const closeFeedback = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={cartStyle.container}>

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


      <Grid container spacing={1} className={cartStyle.grid}>
        <Grid item xs={12} md={8} justifyContent="center">
          <div className={cartStyle.title}>
            <Typography
              variant="span"
              ml={2}
              color={"#1976d2"}
              fontSize={40}
              component="h2"
              fontWeight={500}
            >
              Mi carrito
            </Typography>
          </div>

          <Stack className={cartStyle.cart_container} alignItems="center">
            {productList.map((item) => (
              <React.Fragment key={item.id}>
                <Grid
                  container
                  spacing={2}
                  mt={1}
                  mb={1}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  {/*<Grid item xs={4} md={2}>
                    <img
                      src={
                        "http://localhost:8080/product/uploads/" +
                        item.product.image
                      }
                      alt="logo"
                      height={"55"}
                    />
                  </Grid>*/}
                  <Grid item xs={4} md={2}>
                    <img
                      src={
                        item.product.image
                      }
                      alt="logo"
                      height={"55"}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography
                      variant="span"
                      fontSize={20}
                      component="h2"
                      fontWeight={500}
                    >
                      {item.product.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} md={2}>
                    <Typography
                      variant="span"
                      fontSize={20}
                      component="h2"
                      fontWeight={500}
                    >
                      {item.amount}
                    </Typography>
                  </Grid>

                  <Grid item xs={2} md={2}>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        deleteItem(item.id);
                      }}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Grid>
                </Grid>

                <Divider flexItem />
              </React.Fragment>
            ))}

            <Divider flexItem />

            <div className={cartStyle.total}>
              {productList.length ? (
                <>
                  <Button
                    variant="contained"
                    className="btn2"
                    onClick={() => {
                      confirmSale();
                    }}
                  >
                    Confirmar Orden De Compra
                  </Button>
                </>
              ) : null}
            </div>

          </Stack>
        </Grid>

      </Grid>


      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={closeFeedback}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={closeFeedback}
          severity="success"
          sx={{ width: "100%" }}
        >
          Se Le Contactará Para Concretar Su Orden
        </Alert>
      </Snackbar>

      
    </div>
  );
}

export default Cart;

/*


la saque de la linea despues de la 138
<Typography mt={2} variant="span" fontSize={25} component="h2" fontWeight={600}>
${sale.total.toFixed(2)}
</Typography>
-----
esta de la linea depues de la 114
<Typography variant="span" mr={4} fontSize={24} component="h2" fontWeight={700}>
Total: ${calculateTotal(productList).toFixed(2)}
</Typography>
--------
esta de la linea despues de la 92
<Grid item xs={9} md={2}>
<Typography variant="span" fontSize={24} component="h2" fontWeight={700}>
    ${item.product.price.toFixed(2)}
</Typography>
</Grid>



<Divider orientation="vertical" flexItem></Divider>

        <Grid item xs={12} md={3} justifyContent="center">
          <div className={cartStyle.prev_container}>
            <Typography
              variant="span"
              color={"#1976d2"}
              fontSize={15}
              component="h1"
              fontWeight={500}
            >
              Historial De Ordenes De Compra
            </Typography>
            {salesList.map((sale) => (
              <div className={cartStyle.prev_sales} key={sale.id}>
                <Typography
                  variant="span"
                  fontSize={20}
                  component="h2"
                  fontWeight={500}
                >
                  Fecha: {getDate(sale.date)}
                </Typography>

                <Button
                  variant="contained"
                  className="btn1"
                  onClick={() => {
                    getDetail(sale.id);
                  }}
                >
                  Detalle De Orden
                </Button>

                <Modal
                  open={openDetail}
                  onClose={() => {
                    setOpenDetail(false);
                  }}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >

                  <Box sx={style}>
                    <Stack
                      className={cartStyle.cart_container}
                      alignItems="center"
                    >
                      {details.map((item) => (
                        <React.Fragment key={item.id}>
                          <Grid
                            container
                            spacing={2}
                            mt={1}
                            mb={1}
                            justifyContent="center"
                            alignItems={"center"}
                          >
                            <Grid item xs={6} md={3}>
                              <Typography
                                variant="span"
                                fontSize={20}
                                component="h2"
                                fontWeight={500}
                              >
                                {item.product.name}
                              </Typography>
                            </Grid>
                            <Grid item xs={2} md={2}>
                              <Typography
                                variant="span"
                                fontSize={20}
                                component="h2"
                                fontWeight={500}
                              >
                                {item.amount}
                              </Typography>
                            </Grid>
                          </Grid>

                          <Divider flexItem />
                        </React.Fragment>
                      ))}

                    </Stack>
                  </Box>

                </Modal>
                
              </div>
            ))}
          </div>
        </Grid>
        
        
        
*/