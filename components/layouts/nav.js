import Link from "next/link";
import { useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Offcanvas, Button } from "react-bootstrap";
import styles from "../../styles/nav.module.css";

const Nav = (props) => {
  const [tipoUsuario, setTipoUsusario] = useState(props.tipoUsuario);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 1- superAdmin
  // 2- admin
  // 3- sbAdmin
  // 4- profesor
  // 5- alumno

  return (
    <div className={`${styles.nav}`}>
      <div className={`${styles.centro} container`}>
        <div className="d-flex">
          <FontAwesomeIcon
            className={`${styles.bars} fa-2x d-inline-flex`}
            onClick={handleShow}
            icon={faBars}
          />
          <p className={`${styles.titulo} col-5 h4`}>{props.titulo}</p>
        </div>
        <div className={`w-100 d-inline-flex justify-content-end`}>
          <Button className="btn-danger" href="/">
            Cerrar sesión
          </Button>
        </div>
        <div className={styles.triangle}></div>
      </div>

      <Offcanvas className={styles.sidebar} show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <FontAwesomeIcon
            className={`fa-2x d-inline-flex`}
            onClick={handleShow}
            icon={faBars}
          />
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={styles.contenedor}>
          {tipoUsuario === 1 ? (
            <div>
              <br />
              <Link href="/superAdmin/cuestionario">
                <a className={`${styles.link} my-5`}>Cuestionarios</a>
              </Link>
              <br />
            </div>
          ) : (
            <></>
          )}
          <Link href="/">
            <a className={`${styles.link} ${styles.cerrar}`}>Cerrar sesión</a>
          </Link>
          <br />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Nav;
