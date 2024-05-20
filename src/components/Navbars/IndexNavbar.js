import React from "react";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";

function IndexNavbar() {
  let navigate = useNavigate();
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const [tipoPersona, setTipoPersona] = React.useState(
    localStorage.getItem("TipoPersona")
  );
  const [personaId, setPersonaId] = React.useState(
    localStorage.getItem("PersonaID")
  );
  const [imagen, setImagen] = React.useState(localStorage.getItem("Imagen"));

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };


  const signOut = () => {
    localStorage.clear();
    let path = `/index`;
    navigate(path);
    window.location.reload();
  }

  const routeChangeById = () => {
    let path = `/my-profile-page/${personaId}`;
    navigate(path);
  }

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            href="/index"
            title="Coded by Fit Friends"
          >
            Fit Friends
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <NavItem>
              <NavLink
                data-placement="bottom"
                title="Follow us on Twitter"
              >
                <i className="fa fa-twitter" />
                <p className="d-lg-none">Twitter</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                title="Like us on Facebook"
              >
                <i className="fa fa-facebook-square" />
                <p className="d-lg-none">Facebook</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                title="Follow us on Instagram"
              >
                <i className="fa fa-instagram" />
                <p className="d-lg-none">Instagram</p>
              </NavLink>
            </NavItem>
            {tipoPersona ? (
              <NavItem>
                <NavLink id="popover">
                  <img
                    src={imagen}
                    alt="Perfil"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                  />
                </NavLink>
                <UncontrolledPopover placement="bottom" target="popover">
                  <PopoverBody>
                  <Button
                      className="btn-round"

                      color="neutral"
                      type="button"
                      onClick={routeChangeById}
                    >
                      Mi Perfil
                    </Button>
                    <Button
                      className="btn-round"

                      color="neutral"
                      type="button"
                      onClick={signOut}
                    >
                      Cerrar sesión
                    </Button>
                    
                  </PopoverBody>
                </UncontrolledPopover>
              </NavItem>
            ) : (
              <>
                <NavItem>
                  <Button className="btn-round" color="danger" href="/register-page">
                    <i className="nc-icon nc-spaceship"></i> Regístrate
                  </Button>
                </NavItem>
                <NavItem>
                  <Button className="btn-round" color="danger" href="/login-page">
                    <i className="nc-icon nc-badge"></i> Iniciar sesión
                  </Button>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default IndexNavbar;
