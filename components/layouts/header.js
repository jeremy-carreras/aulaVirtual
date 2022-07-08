import Image from "next/image";
import LogoUnam from "./../../public/Logo-UNAM.png";
import LogoFes from "./../../public/logo_fesa.png";
import styles from "../../styles/default.module.css";
import { Container } from "react-bootstrap";

function Header() {
  return (
    <div
      className={`${styles.divMaster} container-fluid ${styles.header} cl-12 ${styles.azulUnam}`}
    >
      <Container className={`${styles.contenedor} d-flex`}>
        <div className={`${styles.logo_unam} col-4 d-inline-flex `}>
          <a
            className={`${styles.logoUnam} mt-3 pt-1`}
            href="https://www.unam.mx/"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={LogoUnam} alt="logo unam" />
          </a>
        </div>

        <div
          className={`${styles.logo_acatlan}  col-4 offset-4 d-inline-flex justify-content-end `}
        >
          <a
            className={`${styles.logoUnam} mt-3 pt-2`}
            href="https://www.acatlan.unam.mx/"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={LogoFes} alt="logo unam" />
          </a>
        </div>
      </Container>
    </div>
  );
}

export default Header;
