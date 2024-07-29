import { IconButton, Badge} from '@mui/material';
import React from "react";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import { ModalFooter } from "react-bootstrap";
import loginStyles from "../../auth/login.module.css";


const Footer = () => {

  
  return (    
    <ModalFooter className="text-center text-lg-start bg-black text-muted p-4">

      <section className="justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5">
          <span className="text-white">Get connected with us:</span>
        </div>
      </section>

      <section>
        <div className="text-center text-md-start mt-5">
          <div className="row mt-3">

            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-white">
                <i className="fas fa-gem me-3"></i>Dato Importante
              </h6>
              <p className="text-white">
                Creamos esta aplicación para que los clientes
                de AthomLab S.A.C gestionen sus pedidos.
                Y así poder agilizar sus ordenes de compra de forma simple.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">

              <h6 className="fw-bold mb-4 text-white">
                Descubre mas aquí ó Conversa con un asistente.
              </h6>

              <IconButton target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/profile.php?id=100068138528772">
                <FacebookIcon height={28} color="primary"/>
              </IconButton>

              <IconButton target="_blank" rel="noopener noreferrer" href="https://wa.me/51933504373/?text=Hola,%20Muy%20buenas%20tardes.%20Le%20hablo%20para%20hacerle%20algunas%20consultas" size="large">
                <Badge>
                  <WhatsAppIcon color="primary" height={25}/>
                </Badge>
              </IconButton>

            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-white">ESCRÍBENOS</h6>
              <p className="text-white">
                <i className="fas fa-envelope me-3"></i>
                ventas@athomlab.pe
              </p>
              <p className="text-white"><i className="fas fa-phone me-3"></i> + 51933504373</p>
            </div>
            
          </div>
        </div>
      </section>

      <section>
      
        <div className={loginStyles.sec2}>{/*este es el div del quienes somos -- container-fluid*/}
          <h2 className={loginStyles.somos}>Quienes somos?</h2>
          <p className={loginStyles.quienes}>
            Somos una empresa joven, fundada por profesionales entusiastas
            y con experiencia en el mercado de equipos y accesorios en investigacion y equipamiento.
            Buscamos  siempre los mejores productos hasta lograr la satisfacción total de nuestros clientes.
            Trabajamos con productos y servicios 100% confiables
            , buscando continuamente para nuestros clientes mejorar sus procesos
            de trabajo y el desarrollo de su recurso humano
            a través de una relación ética y transparente con el mercado.
            Nos esforzamos continuamente para encontrar los productos
            mas adecuados para el éxito de su proyecto con precios competitivos.
          </p>   

        </div>{/*este es el div del quienes somos*/}
      
      </section>

      <div className="text-center p-4 text-white">
        © Todos los derechos reservados Copyright: <a className="text-reset fw-bold" href="https://frontathomlab-production.up.railway.app/">  wwww.athomlab.pe</a>
      </div>

    </ModalFooter>
  );
};

export default Footer;