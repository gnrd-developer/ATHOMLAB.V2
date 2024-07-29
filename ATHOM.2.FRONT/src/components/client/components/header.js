import React, { useEffect, useState } from 'react'
import HistoryIcon from '@mui/icons-material/History';
import GiteIcon from '@mui/icons-material/Gite';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/auth'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { IconButton, Badge } from '@mui/material';
import headerStyles from './header.module.css';
//import LocalMallIcon from '@mui/icons-material/LocalMall';

function Header() {
  var navigate = useNavigate()
  let [number, setNumber] = useState(0)
  const [scrolled, setScrolled] = useState(false);
  
  const [mostrar, setMostrar] = useState(false);

  const [mostrarw, setMostrarw] = useState(false);

  const [mostrarf, setMostrarf] = useState(false);

  const [mostrari, setMostrari] = useState(false);

  const [mostrars, setMostrars] = useState(false);

  const [mostrarc, setMostrarc] = useState(false);

  const mostrarAviso = () => {
    setMostrar(true);
  };

  const ocultarAviso = () => {
    setMostrar(false);
  };

  const mostrarAvisow = () => {
    setMostrarw(true);
  };

  const ocultarAvisow = () => {
    setMostrarw(false);
  };
  
  const mostrarAvisof = () => {
    setMostrarf(true);
  };

  const ocultarAvisof = () => {
    setMostrarf(false);
  };
  
  const mostrarAvisoi = () => {
    setMostrari(true);
  };

  const ocultarAvisoi = () => {
    setMostrari(false);
  };
  
  const mostrarAvisos = () => {
    setMostrars(true);
  };

  const ocultarAvisos = () => {
    setMostrars(false);
  };
  
  const mostrarAvisoc = () => {
    setMostrarc(true);
  };

  const ocultarAvisoc = () => {
    setMostrarc(false);
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])


  useEffect(() => {
    let shouldUpdate = true
    const getUserCart = () => {
      const item = localStorage.getItem('number')

      if (item) {
        setNumber(parseInt(item))
      }
    }

    if (shouldUpdate) {
      getUserCart()
    }
    
    window.addEventListener('storage', getUserCart)
    return () => {
      shouldUpdate = false;
    }
  }, [number])


  const closeSession = () => {
    logout({ navigate })
  }

  
  return (
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/store">
            <img src={require('../images/logo.png')} alt='logo' height={100}/>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav"
          style={{ color: "white", fontSize: "24px", opacity: 1 }}>
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">

              <IconButton onMouseOver={mostrarAvisoc} onMouseOut={ocultarAvisoc} className="active navbar-link" 
              href='/store/' size="large">
                <Badge>
                  {mostrarc && (
                      <div className={headerStyles.alert} role="alert">
                        Inicio
                      </div>
                  )}
                  <GiteIcon color="primary" />
                </Badge>
              </IconButton>

              <IconButton onMouseOver={mostrarAvisos} onMouseOut={ocultarAvisos} className="active navbar-link" 
              href='/store/cart' size="large">
                <Badge badgeContent={number}>
                  {mostrars && (
                    <div className={headerStyles.alert} role="alert">
                      Mi Carro.
                    </div>
                  )}
                  <ShoppingCartIcon color="primary" />
                </Badge>
              </IconButton>

              <IconButton onMouseOver={mostrarAvisoi} onMouseOut={ocultarAvisoi} className="active navbar-link" 
              href='/store/historial' size="large">
                {mostrari && (
                  <div className={headerStyles.alert} role="alert">
                    Mis Compras.
                  </div>
                )}
                <HistoryIcon color="primary" />
              </IconButton>

              <IconButton onMouseOver={mostrarAvisof} onMouseOut={ocultarAvisof} target="_blank" 
              rel="noopener noreferrer" href="https://www.facebook.com/profile.php?id=100068138528772">
                {mostrarf && (
                      <div className={headerStyles.alert} role="alert">
                        Valla A Facebook.
                      </div>
                )}
                <FacebookIcon color="primary"/>
              </IconButton>

              <IconButton onMouseOver={mostrarAvisow} onMouseOut={ocultarAvisow} target="_blank" 
              rel="noopener noreferrer" 
              href="https://wa.me/51933504373/?text=Hola,%20Muy%20buenas%20tardes.%20Le%20hablo%20para%20hacerle%20algunas%20consultas" size="large">
                {mostrarw && (
                    <div className={headerStyles.alert} role="alert">
                      Valla A WhatsApp.
                    </div>
                )}
                <WhatsAppIcon color="primary"/>
              </IconButton>

              <IconButton onMouseOver={mostrarAviso} onMouseOut={ocultarAviso} aria-label="delete" 
              color='error' size="large" onClick={closeSession}>
                {mostrar && (
                  <div className={headerStyles.alert} role="alert">
                    Ingrese o Regístrese.
                  </div>
                )}
                <LogoutIcon />
              </IconButton>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )

}

export default Header