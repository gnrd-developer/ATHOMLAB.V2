import {
    Button,
    Divider,
    Grid,
    Stack,
    Typography,
    Modal,
    Box,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import cartStyle from "./cart.module.css";
  import {
    getSaleList
  } from "../../../services/shoppingCart";
  import axios from "axios";
  import Table from '@mui/material/Table';
  import TableBody from '@mui/material/TableBody';
  import TableCell from '@mui/material/TableCell';
  import TableContainer from '@mui/material/TableContainer';
  import TableHead from '@mui/material/TableHead';
  import TableRow from '@mui/material/TableRow';
  import Paper from '@mui/material/Paper';
  import TablePagination from '@mui/material/TablePagination';
  import TableFooter from '@mui/material/TableFooter';

  const style = {
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
  };
  
  function Historial() {
    const [salesList, setSalesList] = useState([]);
    const [details, setDetails] = useState([]);
    const [openDetail, setOpenDetail] = useState(false);
  
    const getSales = () => {
      getSaleList({ setSalesList });
    };
  
    useEffect(() => {
      getSales();
    }, []);
  
    /*const calculateTotal = (items) => {
          let total = 0
          items.forEach(item => {
              total = total + (item.amount * item.product.price)
          })
          return total
      }*/
  
    const getDate = (date) => {
      return new Date(date).toLocaleDateString();
    };

    
    /* https://athomlab-production.up.railway.app/ , http://localhost:8080/*/

    function getDetail(id) {
      axios
        .get("http://localhost:8080/saleDetail/" 
        + id, { withCredentials: true })
        .then((response) => {
          setDetails(response.data);
          setOpenDetail(true);
        });
    };

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
  
    return (
      <div className={cartStyle.container}>

        <div className="container">
            <div className="row">
              <div className="col-12 text-center my-4">
                <button className="btn btn-primary btn-lg" onClick={() => window.history.back()}>
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
                Mis Ordenes De Compra
              </Typography>
            </div>
  
            <Stack className={cartStyle.cart_container} alignItems="center">

                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Fecha</TableCell>
                        <TableCell align="right">Cliente</TableCell>
                        <TableCell align="right">Detalle</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {(rowsPerPage > 0
            ? salesList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : salesList
          ).map((sale) => (
                        <TableRow
                        key={sale.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {getDate(sale.date)}
                        </TableCell>
                        <TableCell align="right">{sale.client.email}</TableCell>
                        <TableCell align="right">

                            <Button
                            variant="contained"
                            className="btn1"
                            onClick={() => {
                                getDetail(sale.id);
                            }}
                            >
                            Detalle De Orden
                            </Button>

                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>

                        <TableFooter>
                        <TableRow>
                            <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'Todo', value: -1 }]}
                            colSpan={3}
                            count={salesList.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                'aria-label': 'd',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                        </TableFooter>



                </Table>
                </TableContainer>

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
  
            </Stack>
          </Grid>
  
        </Grid>
  
        
      </div>
    );
  }
  
  export default Historial;
  
  /*la saque de la linea despues de la 138
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
  */
  