import React, { useState, useEffect } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

import {
  Button,
  Label,
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
} from "reactstrap";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ModalFooter,
  Modal,
  InputGroupAddon,
  InputGroupText,
  ModalHeader,
  ModalBody,
  InputGroup,
} from "reactstrap";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import ReactDatetime from "react-datetime";

export default function ProfilePage() {
  const { id } = useParams();
  const [personaData, setPersonaData] = useState([]);
  const [citasData, setCitasData] = useState([]);
  const [isLogged, setIsLogged] = useState(localStorage.getItem("TipoPersona"));
  const [loggedId, setLoggedId] = useState(localStorage.getItem("PersonaID"));
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleModal = () => setOpenModal(!openModal);
  const toggleDrop = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:3000/personas/" + id);
      setPersonaData(response?.data?.persona);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (isLogged != "ENTRENADOR") {
        const response = await axios.get(
          "http://localhost:3000/citas/persona/detalle/" + id
        );
        setCitasData(response?.data?.citas);
      } else{
        const response = await axios.get(
          "http://localhost:3000/citas/entrenador/detalle/" + id
        );
        setCitasData(response?.data?.citas);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <IndexNavbar />
      <section
        style={{
          backgroundImage: `url(${require("assets/img/login-image.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <MDBContainer className="py-5">
          <MDBRow style={{ marginTop: "5%" }}>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src={personaData.Imagen}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "150px" }}
                    fluid
                  />
                  <p className="text-muted mb-1">{personaData.Nombre}</p>
                  <p className="text-muted mb-4">{personaData.Correo}</p>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Nombre completo</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {personaData.Nombre} {personaData.Apellido}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Correo</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {personaData.Correo}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Celular</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {personaData.NumeroCelular}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Ciudad</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {personaData.Ciudad}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Sexo</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {personaData.Sexo == "M" ? "Femenino" : "Masculino"}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>

              <MDBRow>
                <MDBCol md="12">
                  <MDBCard className="mb-4 mb-md-0">
                    <MDBCardBody>
                      <MDBTable align="middle">
                        <MDBTableHead>
                          <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Celular</th>
                            <th scope="col">Lugar</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Información</th>
                          </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {citasData.map((cita, index) => (
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <img
                                    src={cita.Imagen}
                                    alt=""
                                    style={{ width: "45px", height: "45px" }}
                                    className="rounded-circle"
                                  />
                                  <div className="ms-3">
                                    <p className="fw-bold mb-1">
                                      {cita.Nombre} {cita.Apellido}
                                    </p>
                                    <p className="text-muted mb-0">
                                      {cita.Correo}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p className="fw-normal mb-1">
                                  {cita.NumeroCelular}
                                </p>
                              </td>
                              <td>
                                <p className="fw-normal mb-1">{cita.Lugar}</p>
                              </td>
                              {format(
                                new Date(cita.Fecha),
                                "dd/MM/yyyy HH:mm:ss"
                              )}
                              <td>
                                <MDBBtn
                                  color="link"
                                  rounded
                                  size="sm"
                                  onClick={() => {
                                    setModalData(cita);
                                    toggleModal();
                                  }}
                                >
                                  Ver
                                </MDBBtn>
                              </td>
                            </tr>
                          ))}
                        </MDBTableBody>
                      </MDBTable>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
          {modalData != null && (
            <Modal isOpen={openModal} toggle={toggleModal} size="xl">
              <ModalHeader
                className="modal-title text-center"
                id="exampleModalLabel"
              >
                Reservar cita
              </ModalHeader>
              <ModalBody>
                <div>
                  <Row>
                    <Col>
                      <label>Celular</label>
                      <Input
                        placeholder="Celular"
                        type="text"
                        name="Celular"
                        value={modalData.Celular}
                      />
                    </Col>
                    <Col>
                      <label>Lugar encuentro</label>
                      <Input
                        placeholder="Lugar"
                        type="text"
                        name="Lugar"
                        value={modalData.Lugar}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Row style={{ display: "contents" }}>
                      <Col lg="12">
                        <label>Fecha de Encuentro</label>
                        <FormGroup>
                          <InputGroup
                            className="date"
                            id="datetimepicker"
                            style={{ color: "black" }}
                          >
                            <ReactDatetime
                              inputProps={{
                                placeholder: "Seleccionar Fecha",
                              }}
                              dateFormat="YYYY-MM-DD"
                              timeFormat="HH:mm"
                              value={modalData.Fecha}
                            />
                            <InputGroupAddon addonType="append">
                              <InputGroupText>
                                <span className="glyphicon glyphicon-calendar">
                                  <i
                                    aria-hidden={true}
                                    className="fa fa-calendar"
                                  />
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
                      <label>Tipo de Pago</label>
                      <Dropdown
                        isOpen={dropdownOpen}
                        toggle={toggleDrop}
                        direction={"down"}
                      >
                        <DropdownToggle caret style={{ width: "100%" }}>
                          Tipo de Pago
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem
                            style={{
                              backgroundColor: "rgba(256, 256, 256, 1)",
                            }}
                          >
                            Efectivo
                          </DropdownItem>
                          <DropdownItem
                            style={{
                              backgroundColor: "rgba(256, 256, 256, 1)",
                            }}
                          >
                            Transferencia
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label>¿Algo que añadir?</label>
                      <Input
                        placeholder="Descripción"
                        type="textarea"
                        name="descripcion"
                        value={modalData.Descripcion}
                      />
                    </Col>
                  </Row>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary">Reservar Cita</Button>{" "}
                <Button color="secondary" onClick={toggleModal}>
                  Cancelar
                </Button>
              </ModalFooter>
            </Modal>
          )}
        </MDBContainer>
      </section>
    </>
  );
}
