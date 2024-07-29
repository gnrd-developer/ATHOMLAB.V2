import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material'; /* Input */
import React, {useEffect} from 'react'
import { createProduct } from '../../../services/product'
import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {getAllSubCategories} from "../../../services/category";

function ProductForm(props) {
    const { openModal, setOpenModal, edit, setProductFeedback, setProduct, product, setRefresh } = props;
    /*const [file, setFile] = useState(null);
    const [file2, setFile2] = useState(null);*/
    
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [subCategory, setSubCategory] = useState({});

    useEffect(() => {
        getAllSubCategories({ setSubCategoryList })
      }, [])
      
    

    const handleProductForm = e => {
        setProduct({ ...product, [e.target.id]: e.target.value });
    }
    
    const handleProductSubCategory = e => {
        setSubCategory(e.target.value);
    }

    const handleCloseModal = () => {
        setOpenModal(false)
        setProduct(edit ? product : { name: "", description: "", subCategory: "", image: "", pdf: "" })
    };

    const saveModalProduct = (event) => {
        setRefresh(false);
        event.preventDefault();
        
      
        // Utiliza tus funciones para actualizar el producto
        handleProductForm({ target: { id: 'name', value: product.name } });
        handleProductForm({ target: { id: 'description', value: product.description } });
        handleProductForm({ target: { id: 'image', value: product.image } });
        handleProductForm({ target: { id: 'pdf', value: product.pdf } });
      
        handleProductSubCategory({ target: { value: subCategory } });
      
        // Construir el objeto productData
        const productData = {
          name: product.name,
          description: product.description,
          image: product.image,
          pdf: product.pdf,
          subCategory: subCategory,
          // otros campos del producto si los hay
        };
      
        if (edit) {
          productData.id = product.id;
        }
      
        if (!product.subCategory) {
            setProduct({ ...product, subCategory: null });
        }
        console.log(productData);
      
        createProduct(productData)
          .then((response) => {
            console.log(response);
            setProduct(productData);
            setProductFeedback({ show: true, status: true, infoText: "Guardado" });
            handleCloseModal();
            setRefresh(true);
          })
          .catch((error) => {
            setProductFeedback({ show: true, status: false, infoText: "No guardado" });
          });
      };

    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box 
            onSubmit={saveModalProduct} component="form" sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 300,
                bgcolor: 'background.paper',
                border: '0px solid #000',
                borderRadius: '5px',
                boxShadow: 24,
                p: 2,
            }}>
                <Stack spacing={1}>

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {edit ? "Editar producto" : "Nuevo producto"}
                    </Typography>

                    <TextField
                        required
                        id="name"
                        label="Nombre"
                        name="name"
                        onChange={e => handleProductForm(e)}
                        value={product.name}
                    />
                    

                    <InputLabel id="demo-simple-select-label">Sub Categoria</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="subCategory"
                        value={subCategory}
                        label="category"
                        input={<OutlinedInput label="Name" />}
                        onChange={e => handleProductSubCategory(e)}
                    >
                                {subCategoryList.map(categoryItem =>

                                     <MenuItem 
                                     key={categoryItem.id} 
                                     value={categoryItem}>{categoryItem.name}
                                     </MenuItem>  
                                
                                )
                                }
                    </Select>

                    <TextField
                        required
                        id="description"
                        label="Descripción"
                        name="description"
                        multiline
                        rows={5} // Puedes ajustar este número según tus necesidades
                        variant="outlined"
                        onChange={e => handleProductForm(e)}
                        value={product.description}
                    />

                    <TextField 
                        required
                        id="image"
                        label="Imágen"
                        onChange={e => handleProductForm(e)}
                        value={product.image}
                    />

                    <TextField 
                        required
                        id="pdf"
                        label="pdf"
                        onChange={e => handleProductForm(e)}
                        value={product.pdf}
                    />
                    

                    <Button className='btn'
                        variant="contained"
                        id="button"
                        type="submit">
                        Guardar
                    </Button>

                    <Button
                        variant="outlined"
                        id="button"
                        color="error"
                        onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                </Stack>
            </Box>
        </Modal>
    )
}

export default ProductForm


/*
de la linea 59 la siguiente la saqué
<TextField
required
id="price"
label="Precio"
type="number"
onChange={e => handleProductForm(e)}
value={product.price}
/>
*/


                    
                    /*<Input
                        required
                        type="file"
                        id="image"
                        accept="image/*"
                        label="Imágen"
                        name="image"
                        onChange={handleFilesChange}
                    />
                    
                    <Input
                        required
                        type="file"
                        id="pdf"
                        accept="pdf/*"
                        label="Pdf"
                        name="pdf"
                        onChange={handleFilesChange2}
                    />
                            
                    */


/*

    const saveModalProduct = (event) => {
        setRefresh(false);
        event.preventDefault();

        const formData = new FormData();
        formData.append("product", JSON.stringify(productData)); // Convierte el objeto a JSON y agrega al FormData

        if (edit) {
            formData.append("id", product.id);
        }

        console.log(formData);

        createProduct(formData)
            .then((response) => {
            console.log(response);
            setProduct(productData);
            setProductFeedback({ show: true, status: true, infoText: "Guardado" });
            handleCloseModal();
            setRefresh(true);
            })
            .catch((error) => {
            setProductFeedback({ show: true, status: false, infoText: "No guardado" });
            });
    };


    ···································································································

    //ORIGINAL
    const saveModalProduct = (event) => {
        setRefresh(false)
        event.preventDefault();
        console.log(event);
        const formData = new FormData(event.currentTarget);
        let productAux = {
            name: formData.get("name"),
            description: formData.get("description"),
            subCategory: subCategory,
        };
        if(edit){
            productAux.id = product.id
        }
        console.log(productAux);
        createProduct(productAux, file, file2).then(response => {
            console.log(response);
            setProduct(productAux)
            setProductFeedback({ show: true, status: true, infoText: "Guardado" })
            handleCloseModal()
            setRefresh(true)
        }).catch(error => {
            setProductFeedback({ show: true, status: false, infoText: "No guardado" })
        })
    }

    ··································································································


    const formData = new FormData(event.currentTarget);
    const requestOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json", // Asegúrate de que coincida con el tipo de medio esperado por el servidor.
    },
    body: JSON.stringify({
        name: formData.get("name"),
        description: formData.get("description"),
        image: formData.get("image"),
        pdf: formData.get("pdf"),
        subCategory: subCategory,
    }),
    };

    fetch("http://localhost:8080/product", requestOptions)
    .then((response) => {
        // Maneja la respuesta del servidor aquí
    })
    .catch((error) => {
        // Maneja errores
    });

    ·················································································································3

    const formData = new FormData(event.currentTarget);
    const productData = {
    name: formData.get("name"),
    description: formData.get("description"),
    image: formData.get("image"),
    pdf: formData.get("pdf"),
    subCategory: subCategory,
    };

    const requestOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json", // Asegúrate de que coincida con el tipo de medios esperado por el servidor.
    },
    body: JSON.stringify(productData),
    };
*/




    /*

    const handleProductForm = e => {
        const tempData = { ...product }
        tempData[e.target.id] = e.target.value
        setProduct(tempData)
    }

    const handleProductSubCategory = e => {
        const tempData = { ...product }
        tempData['subCategory'] = e.target.value
        setSubCategory(e.target.value)
        setProduct(tempData)
    }


    ································································································33
    const handleProductSubCategory = e => {
        setSubCategory(e.target.value); // Usa setSubCategory para actualizar subCategory en lugar de setProduct
    }

    ·······························································································3

    const handleProductSubCategory = e => {
        const tempData = { ...product }
        tempData['subCategory'] = e.target.value
        setSubCategory(e.target.value)
        setProduct(tempData)
    }

    ·······························································
    
    const [product, setProduct] = useState({
        name: "",
        description: "",
        image: "",
        pdf: "",
        subCategory: ""
      });
    

    ······························································

    const handleFilesChange = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);

    }
    
    ································································


    const handleFilesChange2 = (e) => {
        console.log(e.target.files[0]);
        setFile2(e.target.files[0]);
    };

    ·································································3

    if (!product.subCategory) {
        setProduct({ ...product, subCategory: null });
    }
    
    */