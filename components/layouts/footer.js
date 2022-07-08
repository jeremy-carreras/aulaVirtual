import styles from "../../styles/default.module.css";

function Footer() {
  return (
    <footer className={`container-fluid ${styles.azulUnam} ${styles.footer} py-3`}>
      <p className="my-0">
        Hecho en México. Todos los derechos reservados 2021.
      </p>
      <p className="my-0 ">
        Esta página puede ser reproducida con fines no lucrativos, siempre y
        cuando no se mutile, se cite la fuente
      </p>
      <p className="my-0">
        completa y su dirección electrónica. De otra forma, requiere permiso
        previo por escrito de la institución.
      </p>
    </footer>
  );
}

export default Footer;
