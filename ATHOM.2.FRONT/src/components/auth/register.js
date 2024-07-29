import { Alert, Button, Snackbar, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import registerStyles from './register.module.css';
import { submitRegister } from '../../services/auth'


function Register() {

  const [registerData, setRegisterData] = useState({
    userName: "",
    email: "",
    password: ""
  })

  const [open, setOpen] = useState(false)


  const [wrongData, setWrongData] = useState({
    status: true,
    infoText: ''
  })


  const handleForm = e => {
    const tempData = { ...registerData }
    tempData[e.target.id] = e.target.value
    setRegisterData(tempData)
  }


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  
  const register = () => {
    submitRegister({ registerData, setRegisterData, setWrongData, setOpen })
  }

  window.addEventListener("scroll", function () {
    const value = window.scrollY;
    const stars = document.getElementById("stars");
    const moon = document.getElementById("moon");
    //stars.style.left = value * 0.25 + "px";
    //moon.style.top = value * 1.05 + "px";
  });

  return (
    <div className={registerStyles.container}>

      <section className={registerStyles.section}>

        <img
          src={require("../client/images/stars.png")}
          id="stars"
          alt=""
          className={registerStyles.image}
        />
        <img
          src={require("../client/images/moon.png")}
          id="moon"
          alt=""
          style={{ mixBlendMode: "screen" }}
          className={registerStyles.image}
        />
        <img
          src={require("../client/images/mountains_behind.png")}
          alt=""
          className={registerStyles.image}
        />

        <br />

        <Stack spacing={2} className={registerStyles.card} justifyContent="center" alignItems="center">
          
          <Typography variant="h4" component="h2" fontWeight={600}>
            CREAR USUARIO
          </Typography>
          
          <TextField id="userName" onChange={e => handleForm(e)} value={registerData.userName} label="Solo su Nombre" variant="outlined" />
          
          <TextField id="email" onChange={e => handleForm(e)} value={registerData.email} label="Su Email" variant="outlined" />
          
          <TextField id="password" onChange={e => handleForm(e)} value={registerData.password} label="Cree Contraseña" variant="outlined" />
          
          <Button variant="contained" className='btn' onClick={() => { register() }}>Registrarse</Button>
          
          <Button variant="text" color='error' href='/'>Iniciar Sesión</Button>
          
          <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={handleClose} severity={wrongData.status ? "error" : "success"} sx={{ width: '100%' }}>
              {wrongData.infoText}
            </Alert>

          </Snackbar>
          
        </Stack>

        <img
          src={require("../client/images/mountains_front.png")}
          alt=""
          style={{ zIndex: "10", transform: "translateY(60px)" }}
          className={registerStyles.image}
        />
      </section>

    </div>
  )
}

export default Register