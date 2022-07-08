import {
  Col,
  Row,
  FormControl,
  Container,
  Form,
  Button,
} from "react-bootstrap";
import axios from "axios";
import styles from "./login.module.css";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import SpinnerLoading from "../general/spinnerLoading";
import Swal from "sweetalert2";
import { avisoError, avisoExito } from "../../funciones/avisos";

const urlApi = process.env.API_ROOT;

const Login = () => {
  const [datos, setDatos] = useState({
    user: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleNextPage = (response) => {
    localStorage.clear();

    if (response.Adscripcion) {
      localStorage.setItem("token", response.token);
      localStorage.setItem(
        "id_adscripcion",
        response.Adscripcion[0].id_adscripcion
      );
      localStorage.setItem("nombre", response.Adscripcion[0].responsable);
      localStorage.setItem(
        "adscripcion",
        JSON.stringify(response.Adscripcion[0])
      );

      router.push("/adscripcion/misPedidos");
    }

    if (response.Empleado) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("id_empleado", response.Empleado[0].id_empleado);
      localStorage.setItem("nombre", response.Empleado[0].nombre);
      localStorage.setItem("empleado", JSON.stringify(response.Empleado[0]));

      if (response.Empleado[0].id_tipo_empleado <= 5)
        router.push("/trabajador/misProyectos");
      if (response.Empleado[0].id_tipo_empleado == 6)
        router.push("/administrador/solicitudesServicios"); // admin
      if (response.Empleado[0].id_tipo_empleado == 7)
        router.push("/comunicacion/aprobaciones"); // cs
      if (response.Empleado[0].id_tipo_empleado == 8)
        router.push("/reproduccionesGraficas/impresiones"); // rg
    }
  };

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const enviarDatos = async () => {
    try {
      setLoading(true);
      /*const response = await axios.post(`${urlApi}/login`, {
        password: datos.password,
        correo: datos.user,
      });
      setLoading(false);*/
      //handleNextPage(response.data);
      setLoading(false);
      await Swal.fire({
        icon: "success",
        title: "Bienvenido",
        showConfirmButton: false,
        timer: 600,
      });
      router.push("/superAdmin/cuestionario");
    } catch (err) {
      setLoading(false);
      avisoError("El usuario o la contraseña es incorrecta");
      console.log(err);
    }
  };

  const handleTecla = (event) => {
    if (event.key === "Enter") {
      enviarDatos();
    }
  };

  return (
    <Container className={styles.center}>
      <div className={styles.contenedor}>
        <h1 style={{ margin: "3rem 3rem 2rem 3rem" }}>Iniciar sesión</h1>
        <Form className={styles.form}>
          <Row>
            <Col className="pb-3">
              <FormControl
                autoFocus
                name="user"
                onChange={handleInputChange}
                placeholder="Usuario"
              />
            </Col>
          </Row>
          <Row>
            <Col className="pb-1">
              <FormControl
                name="password"
                onChange={handleInputChange}
                placeholder="Contraseña"
                type="password"
                onKeyPress={handleTecla}
              />
            </Col>
          </Row>
          <Row className={styles.center}>
            {loading ? (
              <div className="m-4">
                <SpinnerLoading />
              </div>
            ) : (
              <Button onClick={enviarDatos} className={styles.btn} size="md">
                Ingresar
              </Button>
            )}
          </Row>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
