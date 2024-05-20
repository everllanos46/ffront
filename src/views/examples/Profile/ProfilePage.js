import React, { useState, useEffect } from "react";

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

import ReactDatetime from "react-datetime";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ProfilePage() {
  const [activeTab, setActiveTab] = React.useState("1");
  const { id } = useParams();
  const [personaData, setPersonaData] = useState([]);
  const [entrenadoresData, setEntrenadoresData] = useState([]);
  const [personasData, setPersonasData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loggedId, setLoggedId] = useState(localStorage.getItem("PersonaID"));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [reserva, setReserva] = useState(false);

  const [formData, setFormData] = useState({
    Lugar: "",
    Celular: "",
    Fecha: "",
    descripcion: "",
    TipoPago: "",
    PersonaID: loggedId,
    EntrenadorID: id,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFechaNacimientoChange = (date) => {
    debugger;
    const formattedDate = date.toISOString();
    setFormData({
      ...formData,
      Fecha: formattedDate,
    });
  };

  const toggleDrop = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:3000/personas/" + id);
      setPersonaData(response?.data?.persona);
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:3000/entrenadores/" + id
      );
      setEntrenadoresData(response?.data?.personas);
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:3000/personas");
      setPersonasData(response?.data?.personas);
    }
    fetchData();
  }, [id]);

  const handleRegistro = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/citas",
        formData
      );

      if (response.status === 200) {
        toggleModal();
        toggleModalSucess();
      } else {
        console.error("Error al enviar el formulario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  let navigate = useNavigate();
  const routeChangeById = (personaId) => {
    let path = `/profile-page/${personaId}`;
    navigate(path);
  };

  const routeWhatsapp = () => {
    const whatsappLink = `https://wa.me/15551234567`;
    window.open(whatsappLink, "_blank");
  };

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const toggleModal = () => setOpenModal(!openModal);
  const toggleModalSucess = () => setReserva(!reserva);

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });
  return (
    <>
      <IndexNavbar />
      <ProfilePageHeader />
      <div className="section profile-content">
        <Container>
          <div className="owner">
            <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={personaData.Imagen}
              />
            </div>
            <div className="name">
              <h4 className="title">
                {personaData.Nombre} {personaData.Apellido} <br />
              </h4>
              <h6 className="description">
                {personaData.Sexo == "M" ? "Entrenadora" : "Entrenador"}
              </h6>
            </div>
          </div>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="6">
              <p>{personaData.descripcion}</p>
              <br />
              {loggedId != undefined && (
                <Button
                  className="btn-round"
                  color="default"
                  outline
                  onClick={toggleModal}
                >
                  <i className="fa fa-bookmark" /> Reservar
                </Button>
              )}

              <Button
                className="btn-round"
                color="success"
                outline
                onClick={routeWhatsapp}
                style={{ marginLeft: "1%" }}
              >
                <i className="fa fa-whatsapp" /> Contactar
              </Button>
            </Col>
          </Row>
          <br />
          <div className="nav-tabs-navigation">
            <div className="nav-tabs-wrapper">
              <Nav role="tablist" tabs>
                <NavItem>
                  <NavLink
                    className={activeTab === "1" ? "active" : ""}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    Entrenadores
                  </NavLink>
                </NavItem>
                {personaData.TipoPersona != "PERSONA" && (
                  <NavItem>
                    <NavLink
                      className={activeTab === "2" ? "active" : ""}
                      onClick={() => {
                        toggle("2");
                      }}
                    >
                      Personas
                    </NavLink>
                  </NavItem>
                )}
              </Nav>
            </div>
          </div>
          {/* Tab panes */}
          <TabContent className="following" activeTab={activeTab}>
            <TabPane tabId="1" id="follows">
              <Row>
                <Col className="ml-auto mr-auto" md="6">
                  <ul className="list-unstyled follows">
                    {entrenadoresData.map((entrenador, index) => (
                      <li>
                        <Row
                          onClick={() => routeChangeById(entrenador.PersonaID)}
                          style={{ cursor: "pointer" }}
                        >
                          <Col className="ml-auto mr-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={entrenador.Imagen}
                            />
                          </Col>
                          <Col className="ml-auto mr-auto" lg="7" md="4" xs="4">
                            <h6>
                              {entrenador.Nombre} <br />
                              <small>
                                {entrenador.Sexo == "M"
                                  ? "Entrenadora"
                                  : "Entrenador"}
                              </small>
                            </h6>
                          </Col>
                        </Row>
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
            </TabPane>
            {personaData.TipoPersona != "PERSONA" && (
              <TabPane className="text-center" tabId="2" id="following">
                <Row>
                  <Col className="ml-auto mr-auto" md="6">
                    <ul className="list-unstyled follows">
                      {personasData.map((entrenador, index) => (
                        <li>
                          <Row
                            onClick={() =>
                              routeChangeById(entrenador.PersonaID)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <Col
                              className="ml-auto mr-auto"
                              lg="2"
                              md="4"
                              xs="4"
                            >
                              <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"
                                src={entrenador.Imagen}
                              />
                            </Col>
                            <Col
                              className="ml-auto mr-auto"
                              lg="7"
                              md="4"
                              xs="4"
                            >
                              <h6>
                                {entrenador.Nombre} <br />
                                <small>
                                  {entrenador.Sexo == "M"
                                    ? "Entrenadora"
                                    : "Entrenador"}
                                </small>
                              </h6>
                            </Col>
                          </Row>
                        </li>
                      ))}
                    </ul>
                  </Col>
                </Row>
              </TabPane>
            )}
          </TabContent>
        </Container>
      </div>
      <Modal isOpen={openModal} toggle={toggleModal} size="xl">
        <ModalHeader className="modal-title text-center" id="exampleModalLabel">
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
                  value={formData.Celular}
                  onChange={handleInputChange}
                />
              </Col>
              <Col>
                <label>Lugar encuentro</label>
                <Input
                  placeholder="Lugar"
                  type="text"
                  name="Lugar"
                  value={formData.Lugar}
                  onChange={handleInputChange}
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
                        onChange={handleFechaNacimientoChange}
                        dateFormat="YYYY-MM-DD"
                        timeFormat="HH:mm"
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
                      onClick={() => setFormData({ ...formData, TipoPago: 1 })}
                    >
                      Efectivo
                    </DropdownItem>
                    <DropdownItem
                      style={{
                        backgroundColor: "rgba(256, 256, 256, 1)",
                      }}
                      onClick={() => setFormData({ ...formData, TipoPago: 2 })}
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
                  value={formData.descripcion}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleRegistro}>
            Reservar Cita
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={reserva} toggle={toggleModalSucess}>
        <div className="modal-header">
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={toggleModalSucess}
          >
            <span aria-hidden={true}>×</span>
          </button>
          <h5 className="modal-title text-center" id="exampleModalLabel">
            Reserva!
          </h5>
        </div>
        <div className="modal-body">La reserva se ha hecho correctamente!!</div>
        <div className="modal-footer">
          <div className="right-side">
            <Button
              className="btn-link"
              color="danger"
              type="button"
              onClick={toggleModalSucess}
            >
              Vale
            </Button>
          </div>
        </div>
      </Modal>
      <DemoFooter />
    </>
  );
}

export default ProfilePage;
