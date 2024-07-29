import {
  Grid,
  Alert,
  Button,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginStyles from "./login.module.css";
import { submitLogin } from "../../services/auth";
import { getAllCategories } from '../../services/category'//, getBestProducts

function Login() {

  
  const [categoryList, setCategoryList] = useState([]) //Aquí tengo mi variable y mi función.

  useEffect(() => {
    getAllCategories({ setCategoryList })
    //getBestProducts({ setBestProductList })
  },[])


  
  var navigate = useNavigate();

  const [loginData, setLoginData] = useState({ userName: "", password: "" });
  const [wrongCredentials, setWrongCredentials] = useState({
    wrongData: false,
    infoText: "",
  });
  const [open, setOpen] = useState(false);

  


  
  const handleForm = (e) => {
    const tempData = { ...loginData };
    tempData[e.target.id] = e.target.value;
    setLoginData(tempData);
  };

  

  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  

  /*window.addEventListener("scroll", function () {
    const value = window.scrollY;
    const stars = document.getElementById("stars");
    const moon = document.getElementById("moon");
    stars.style.left = value * 0.25 + "px";
    moon.style.top = value * 1.05 + "px";
  });*/

  return (
    <div className={loginStyles.container}>
      
      <div className={loginStyles.sec}>{/*este es el div del quienes somos -- container-fluid*/}

        
        
        <div className="d-flex justify-content-center align-items-center">
          <h2 className="col-sm-6 col-xs-4 mx-auto text-center text-white">
            Soluciones tecnológicas en investigación
          </h2>
        </div>

        <div className="d-flex justify-content-center align-items-center">
          <h2 className="col-sm-6 col-xs-4 mx-auto text-center text-white">
            y equipamiento
          </h2>
        </div>

        <Grid className={loginStyles.cajaC}>
          {categoryList.map(categoryItem => (

            <a href={'http://localhost:3000/store/subcategory/' 
            + categoryItem.name} className={loginStyles.caja} key={categoryItem.id}>
              {/*http://localhost:3000, https://frontathomlab-production.up.railway.app/store/subcategory/*/}
              <div className={loginStyles.header}>
              <h4 className={loginStyles.neon}>{categoryItem.name}</h4>
              </div>
              <div className={loginStyles.cuerpo}>
                <img src={categoryItem.image} alt=""/>
              </div>
            </a>

          ))}
        </Grid>


        <Stack
            spacing={1}
            className={loginStyles.card}
            justifyContent="center"
            alignItems="center"
            display="table-cell"
          >

            <Typography variant="h4" component="h2" fontWeight={600}>
              ACCESO DE USUARIO
            </Typography>

            <img
              src={require("../client/images/logo.png")}
              alt="logo"
              height={100}
            />

            <TextField
              id="userName"
              label="Usuario"
              variant="outlined"
              onChange={(e) => handleForm(e)}
              value={loginData.userName}
            />

            <TextField
              type="password"
              id="password"
              label="Contraseña"
              variant="outlined"
              onChange={(e) => handleForm(e)}
              value={loginData.password}
            />

            <Button
              variant="contained"
              className="btn"
              onClick={() => {
                submitLogin({
                  loginData,
                  setWrongCredentials,
                  navigate,
                  setOpen,
                });
              }}
            >
              Iniciar Sesión
            </Button>

            <Button variant="text" color="success" href="/register">
              Crear cuenta
            </Button>

            <Snackbar
              open={open}
              autoHideDuration={1500}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {wrongCredentials.infoText}
              </Alert>

            </Snackbar>

        </Stack>   

      </div>{/*este es el div del quienes somos*/}
      
    </div>
  );
}

export default Login;


/*


      
      <section className={loginStyles.section}>

        <div>
          <img
            src={require("../client/images/stars.png")}
            id="stars"
            alt=""
            className={loginStyles.image}
          />
          <img
            src={require("../client/images/moon.png")}
            id="moon"
            alt=""
            style={{ mixBlendMode: "screen" }}
            className={loginStyles.image}
          />
          <img
            src={require("../client/images/mountains_behind.png")}
            alt=""
            className={loginStyles.image}
          />

          <img
            src={require("../client/images/mountains_front.png")}
            alt=""
            style={{ zIndex: "10", transform: "translateY(10px)" }}
            className={loginStyles.image}
          />

        </div>

      </section>

*/