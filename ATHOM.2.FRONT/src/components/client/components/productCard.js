import React from 'react'
/*import cardStyle from './productCard.module.css'*/
import {Grid} from "@mui/material"
import subCategoryStyle from "./subCategory.module.css";

function ProductCard(props) {


    const { product } = props
    return (
        <div className={subCategoryStyle.container}>

            <Grid className={subCategoryStyle.cajaC}>


                <a className={subCategoryStyle.caja} href={'http://localhost:3000/store/detail/' 
                            + product.id + '/' + product.subCategory.name}>
                <div className={subCategoryStyle.header}>
                    <h4 className={subCategoryStyle.neon}>{product.name}</h4>
                </div>                      
                <h4 className={subCategoryStyle.categoria}>{product.subCategory.name}</h4>
                <div className={subCategoryStyle.cuerpo2}>
                    <div>
                        <img src={product.image} alt='logo'/>
                    </div>
                </div>
                
                </a>
            </Grid>

        </div>
    )
}

export default ProductCard

/*
esta la saque despues de la linea 17
<Typography mt={1} variant="p" fontSize={22} component="p" fontWeight={700}>
  ${product.price.toFixed(2)}
</Typography>

http://localhost:3000/

https://frontathomlab-production.up.railway.app/store/detail/
*/




/*
<div className={subCategoryStyle.container}>

<Grid className={subCategoryStyle.cajaC}>


    <Grid className={subCategoryStyle.caja}>
    <div className={subCategoryStyle.header}>
      <h4 className={subCategoryStyle.neon}>{product.name}</h4>
      <h4 className={subCategoryStyle.neon}>{product.name}</h4>
      <h4 className={subCategoryStyle.neon}>{product.subCategory.name}</h4>
      <h4 className={subCategoryStyle.neon}>{product.subCategory.name}</h4>
    </div>
    <div className={subCategoryStyle.cuerpo}>
      <a href={'http://localhost:3000/store/detail/' 
            + product.id + '/' + product.subCategory.name}>
        <img src={product.image} alt='logo' alt=""/>
      </a>
    </div>
      
    </Grid>
</Grid>

</div>
*/