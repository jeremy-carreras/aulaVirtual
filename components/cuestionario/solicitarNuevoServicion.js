import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import { useRouter } from "next/dist/client/router";
import styles from "./solicitarNuevoServicio.module.css";

const SolicitarNuevoServicio = (props) => {
  const router = useRouter();

  const rute = props.ruta;

  const handleNextPage = () => {
    router.push("/" + rute);
  };

  return (
    <Container className={`${styles.buttonClick}`} onClick={handleNextPage}>
      <div>
        <h2>{props.text}</h2>
        <FontAwesomeIcon
          className={`fa-3x`}
          icon={faPlusCircle}
        />
      </div>
    </Container>
  );
};

export default SolicitarNuevoServicio;
