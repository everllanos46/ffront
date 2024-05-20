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

function LoginPage() {
    let navigate = useNavigate();
    const [completeData, setCompleteData] = useState(false);
    const [register, setRegister] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [imagenBase64, setImagenBase64] = useState(null);
    const [registroExitoso, setRegistroExitoso] = useState(false);
    const [statusRegistro, setStatusRegistro] = useState(false);

    const [formData, setFormData] = useState({
        correo: "",
        pass: "",
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
        if(registroExitoso == true) {
            let path = `/index`;
                navigate(path);
        }
        setRegistroExitoso(!registroExitoso)
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
            const response = await axios.post("http://localhost:3000/auth", formData);
            setStatusRegistro(true);
            if (response.data.autenticado) {
                const { TipoPersona, PersonaID, Imagen } = response.data.autenticado;

                localStorage.setItem('TipoPersona', TipoPersona);
                localStorage.setItem('PersonaID', PersonaID);
                localStorage.setItem('Imagen', Imagen);
                
                setRegistroExitoso(true);

            } else {
                setStatusRegistro(false);
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
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
                                    <Button block className="btn-round" color="danger" onClick={handleRegistro}>
                                        Iniciar sesión
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    </Row>
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
                            Login!
                        </h5>
                    </div>
                    <div className="modal-body">
                        {statusRegistro ? (
                            <>
                                Sesión iniciada correctamente.
                            </>
                        ) : (
                            <>
                                Error al momento de iniciar sesión.
                            </>
                        )}

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

LoginPage.propTypes = {
    direction: PropTypes.string,
};

export default LoginPage;
