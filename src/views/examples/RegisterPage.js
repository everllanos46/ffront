/*!

=========================================================
* Paper Kit React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  PopoverBody,
  PopoverHeader,
  UncontrolledPopover, Card, Form, Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import axios from 'axios';
import PropTypes from 'prop-types';

import ReactDatetime from "react-datetime";


// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Compressor from 'compressorjs';


function RegisterPage() {

  const [completeData, setCompleteData] = useState(false);
  const [register, setRegister] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [imagenBase64, setImagenBase64] = useState(null);
  const [registroExitoso, setRegistroExitoso] = useState(false);
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    imagen: null,
    Identificacion: "",
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    NumeroCelular: "",
    ciudad: "",
    sexo: "",
    correo: "",
    pass: "",
    TipoPersona: "PERSONA"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFechaNacimientoChange = (date) => {
    // Convertir la fecha a un formato legible y actualizar el estado formData
    const formattedDate = date.toISOString().split("T")[0];
    setFormData({
      ...formData,
      fechaNacimiento: formattedDate,
    });
  };


  const toggle = () => {
    setRegistroExitoso(!registroExitoso)
    navigate("/index")
  };
  const toggleDrop = () => setDropdownOpen(!dropdownOpen);
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

  const changeState = () => {
    setCompleteData(true)
  }

  const showAlert = () => {
    setRegister(true)
  }


  const handleRegistro = async () => {

    try {
      const response = await axios.post("http://localhost:3000/personas", formData);

      if (response.status === 200) {
        setRegistroExitoso(true);
      } else {
        console.error("Error al enviar el formulario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const handleImagenSeleccionada = (event) => {
    const imagenSeleccionada = event.target.files[0];

    new Compressor(imagenSeleccionada, {
      quality: 0.6, // ajusta la calidad de la compresión (opcional)
      success(result) {
        const readerCompressed = new FileReader();
        readerCompressed.onloadend = () => {
          const base64Compressed = readerCompressed.result;
          setImagenBase64(base64Compressed);
          setFormData({
            ...formData,
            imagen: base64Compressed,
          });
        };
        readerCompressed.readAsDataURL(result);
      },
      error(err) {
        console.error('Error al comprimir la imagen:', err);
      },
    });

  };

  const handleImagenSeleccionada2 = (event) => {
    const imagenSeleccionada = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setImagenBase64(base64String)
      setFormData({
        ...formData,
        imagen: base64String,
      });
    };

    if (imagenSeleccionada) {
      reader.readAsDataURL(imagenSeleccionada);
    }
  };



  return (
    <>
      <ExamplesNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
        }}
      >
        <div className="filter" />
        <Container>
          {completeData == false ? (
            <Row>
              <Col className="ml-auto mr-auto" lg="4">
                <Card className="card-register ml-auto mr-auto">
                  <h3 className="title mx-auto">Bienvenido!</h3>
                  <div className="social-line text-center">
                    <Button
                      className="btn-neutral btn-just-icon mr-1"
                      color="facebook"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fa fa-facebook-square" />
                    </Button>
                    <Button
                      className="btn-neutral btn-just-icon mr-1"
                      color="google"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fa fa-google-plus" />
                    </Button>
                    <Button
                      className="btn-neutral btn-just-icon"
                      color="twitter"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fa fa-twitter" />
                    </Button>
                  </div>
                  <div className="register-form">
                    <label>Correo</label>
                    <Input placeholder="Email" type="text" name="correo" value={formData.correo} onChange={handleInputChange} />
                    <label>Contraseña</label>
                    <Input placeholder="Password" type="password" name="pass" value={formData.pass} onChange={handleInputChange} />
                    <Button block className="btn-round" color="danger" onClick={changeState}>
                      Siguiente
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col className="ml-auto mr-auto" lg="4">
                <Card className="card-register ml-auto mr-auto">
                  <h3 className="title mx-auto">Bienvenido!</h3>
                  <div className="register-form">
                    <div style={{ textAlign: 'center' }}>
                      {/* Botón para abrir el selector de archivos */}
                      <label htmlFor="imagenInput" style={{ display: 'inline-block' }}>
                        {imagenBase64 ? (
                          // Mostrar la imagen seleccionada si existe
                          <img src={imagenBase64} alt="Imagen seleccionada" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                          // Mostrar un botón con un signo más si no hay imagen seleccionada
                          <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#ddd', textAlign: 'center', lineHeight: '100px', cursor: 'pointer' }}>+</div>
                        )}
                      </label>
                      {/* Input oculto para seleccionar la imagen */}
                      <input id="imagenInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImagenSeleccionada} />
                    </div>
                    <Row>
                      <Col>
                        <label>Cédula</label>
                        <Input placeholder="Cédula" type="text" name="Identificacion" value={formData.Identificacion} onChange={handleInputChange} />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <label>Nombre</label>
                        <Input placeholder="Nombre" type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} />
                      </Col>
                      <Col>
                        <label>Apellido</label>
                        <Input placeholder="Apellido" type="text" name="apellido" value={formData.apellido} onChange={handleInputChange} />
                      </Col>
                    </Row>
                    <Row>

                      <Row style={{ display: 'contents' }}>
                        <Col lg="12">
                          <label>Fecha de Nacimiento</label>
                          <FormGroup>
                            <InputGroup className="date" id="datetimepicker" style={{ color: 'black' }}>
                              <ReactDatetime
                                inputProps={{
                                  placeholder: "Seleccionar Fecha",
                                }}
                                onChange={handleFechaNacimientoChange}
                                dateFormat="YYYY-MM-DD"
                              />
                              <InputGroupAddon addonType="append">
                                <InputGroupText>
                                  <span className="glyphicon glyphicon-calendar">
                                    <i aria-hidden={true} className="fa fa-calendar" />
                                  </span>
                                </InputGroupText>
                              </InputGroupAddon>
                            </InputGroup>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Row>

                    <Row>
                      <Col>
                        <label>Número</label>
                        <Input placeholder="Número" type="text" name="NumeroCelular" value={formData.NumeroCelular} onChange={handleInputChange} />
                      </Col>
                      <Col>
                        <label>Ciudad</label>
                        <Input placeholder="Ciudad" type="text" name="ciudad" value={formData.ciudad} onChange={handleInputChange} />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <label>Sexo</label>
                        <Dropdown isOpen={dropdownOpen} toggle={toggleDrop} direction={'down'}>
                          <DropdownToggle caret style={{ width: '100%' }}>Sexo</DropdownToggle>
                          <DropdownMenu >
                            <DropdownItem style={{
                              backgroundColor: "rgba(256, 256, 256, 1)",
                            }} onClick={() => setFormData({ ...formData, sexo: "H" })}>Hombre</DropdownItem>
                            <DropdownItem style={{
                              backgroundColor: "rgba(256, 256, 256, 1)",
                            }} onClick={() => setFormData({ ...formData, sexo: "M" })}>Mujer</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </Col>
                    </Row>

                    <Button block className="btn-round" color="danger" onClick={handleRegistro}>
                      Registrar
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
        <Modal isOpen={registroExitoso} toggle={toggle}>
          <div className="modal-header">
            <button
              aria-label="Close"
              className="close"
              type="button"
              onClick={toggle}
            >
              <span aria-hidden={true}>×</span>
            </button>
            <h5
              className="modal-title text-center"
              id="exampleModalLabel"
            >
              Registro!
            </h5>
          </div>
          <div className="modal-body">
            Ha sido registrado correctamente.
          </div>
          <div className="modal-footer">
            <div className="right-side">
              <Button className="btn-link" color="danger" type="button" onClick={toggle}  >
                Vale
              </Button>
            </div>
          </div>
        </Modal>
        <div className="footer register-footer text-center">
          <h6>
            © {new Date().getFullYear()}, made with{" "}
            <i className="fa fa-heart heart" /> by Fit Friends
          </h6>
        </div>
      </div>
    </>
  );
}

RegisterPage.propTypes = {
  direction: PropTypes.string,
};

export default RegisterPage;
