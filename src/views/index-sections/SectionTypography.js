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
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactDatetime from "react-datetime";

// reactstrap components
import {
  Container, Row, Col, Modal, Button, ModalHeader, ModalBody, ModalFooter, Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Input,
  FormGroup,
} from "reactstrap";
import axios from 'axios';

// core components

function SectionTypography() {
  const [entrenadoresData, setEntrenadoresData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [imagenBase64, setImagenBase64] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(localStorage.getItem("TipoPersona"));
  debugger
  const [formData, setFormData] = useState({
    imagen: null,
    Identificacion: "",
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    NumeroCelular: "",
    ciudad: "",
    sexo: "",
    fechaNacimiento: "",
    correo: "",
    pass: "",
    TipoPersona: "ENTRENADOR",
    descripcion: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleDrop = () => setDropdownOpen(!dropdownOpen);
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

  const handleFechaNacimientoChange = (date) => {
    // Convertir la fecha a un formato legible y actualizar el estado formData
    const formattedDate = date.toISOString().split("T")[0];
    setFormData({
      ...formData,
      fechaNacimiento: formattedDate,
    });
  };

  const handleImagenSeleccionada = (event) => {
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


  const toggle = () => setOpenModal(!openModal);


  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:3000/entrenadores')
      setEntrenadoresData(response?.data?.personas);
    }
    fetchData();
  }, []);

  const handleRegistro = async () => {

    try {
      const response = await axios.post("http://localhost:3000/personas", formData);

      if (response.status === 200) {
        toggle()
        async function fetchData() {
          const response = await axios.get('http://localhost:3000/entrenadores')
          setEntrenadoresData(response?.data?.personas);
        }
        fetchData();
      } else {
        console.error("Error al enviar el formulario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  let navigate = useNavigate();
  const routeChangeById = (id) => {
    let path = `/profile-page/${id}`;
    navigate(path);
  }
  return (
    <>
      <Container className="tim-container">
        <br />
        {(entrenadoresData.length > 0 || isLogged == "ADMIN") && (
          <>
            <div >
              <Container>
                <div className="title">
                  <h3>Entrenadores</h3>
                </div>
                <div id="images" style={{ overflowX: "auto", maxWidth: "100%" }}>
                  <div style={{ display: "flex", width: `${(entrenadoresData.length > 0 ? 3 : 5) * 320}px` }}>
                    <Row>
                      {entrenadoresData.map((entrenador, index) => (
                        <Col key={index} className="mr-auto ml-auto" md="2" sm="3" onClick={() => routeChangeById(entrenador.PersonaID)} style={{ cursor: "pointer" }}>
                          <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={entrenador.Imagen}
                          />
                          <p className="text-center">{entrenador.Nombre}</p>
                        </Col>
                      ))}
                      {isLogged == "ADMIN" && (

                      <Col className="mr-auto ml-auto" md="2" sm="3" style={{ cursor: "pointer" }} onClick={toggle}>
                        <img
                          alt="..."
                          className="img-circle img-no-padding img-responsive"
                          src={require("assets/img/faces/add.jpg")}
                        />
                        <p className="text-center">Agregar</p>
                      </Col>

                    )
                    }
                    </Row>
                    
                  </div>
                </div>
              </Container>
            </div>
          </>
        )}
        <Modal isOpen={openModal} toggle={toggle} size='xl'>
          <ModalHeader
            className="modal-title text-center"
            id="exampleModalLabel"
          >
            Agregar Entrenador
          </ModalHeader>
          <ModalBody>
            <div >
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
                  <label>Correo</label>
                  <Input placeholder="Correo" type="text" name="correo" value={formData.correo} onChange={handleInputChange} />
                </Col>
                <Col>
                  <label>Contraseña</label>
                  <Input placeholder="Contraseña" type="text" name="pass" value={formData.pass} onChange={handleInputChange} />
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
              <Row>

                <Col>
                  <label>Descripción</label>
                  <Input placeholder="Descripción" type="textarea" name="descripcion" value={formData.descripcion} onChange={handleInputChange} />
                </Col>
              </Row>

            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleRegistro}>
              Agregar entrenador
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
}

export default SectionTypography;
