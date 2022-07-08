import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Container,
  Table,
  Button,
  InputGroup,
  FormControl,
  Row,
} from "react-bootstrap";
import {
  faCaretDown,
  faSearch,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./tabla.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import SpinnerLoading from "/components/general/spinnerLoading";
import moment from "moment";
import { avisoError } from "../../funciones/avisos";
import axios from "axios";

const urlApi = process.env.API_ROOT;

const Tabla = () => {
  const [dataCompleta, setDataCompleta] = useState([]);
  const [data, setData] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [reverse, setReverse] = useState(false);
  const [caret] = useState([
    faCaretDown,
    faCaretDown,
    faCaretDown,
    faCaretDown,
    faCaretDown,
    faCaretDown,
  ]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleNextPage = (cuestionario) => {
    if (cuestionario.idTipoCuestionario === 2) {
      router.push({
        pathname: "/superAdmin/cuestionariosED",
        query: {
          idCuestionario: cuestionario.idCuestionario,
        },
      });
    } else {
      router.push({
        pathname: "/superAdmin/infoCuestionario",
        query: {
          idCuestionario: cuestionario.idCuestionario,
        },
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${urlApi}/Cuestionario/TraerTodos`);
        setLoading(false);
        setData(response.data);
        setDataCompleta(response.data);
      } catch (error) {
        setLoading(false);
        avisoError("No fue posible cargar los cuestionarios");
        console.log(error);
      }
    }
    fetchData();
  }, []);

  function predicateBy(array) {
    return function (a, b) {
      if (a[array] > b[array]) {
        return 1;
      } else if (a[array] < b[array]) {
        return -1;
      }
      return 0;
    };
  }

  const ordenar = (array, ordenarPor) => {
    array.sort(predicateBy(ordenarPor));
    if (reverse === true) {
      array.reverse();
    }
    setData([...array]);
  };

  const campos = [
    { nombre: "Usuario", nombreVar: "usuario" },
    { nombre: "Título", nombreVar: "titulo" },
    { nombre: "Dirigido a", nombreVar: "dirigido_a" },
    { nombre: "Tipo de cuestionario", nombreVar: "idTipoCuestionario" },
    {
      nombre: "Fecha de inicio",
      nombreVar: "fechaInicio",
    },
    { nombre: "Fecha de fin", nombreVar: "fechaFin" },
  ];

  const filtrarElementos = (terminoBusqueda) => {
    let search = dataCompleta.filter((item) => {
      if (item.titulo.toLowerCase().includes(terminoBusqueda.toLowerCase())) {
        return item;
      }
    });
    setData(search);
  };

  const changeCaret = (index, reverse) => {
    if (reverse) {
      caret[index] = faCaretUp;
    } else {
      caret[index] = faCaretDown;
    }
  };

  return (
    <Container style={{ minHeight: "17rem" }} className={`${styles.container}`}>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "10rem" }}>
          <SpinnerLoading width={"3rem"} height={"3rem"} fontSize={"1.7rem"} />
        </div>
      ) : (
        <div>
          {dataCompleta.length === 0 ? (
            <Row style={{ textAlign: "center", margin: "10rem 0 0 0" }}>
              <p className="h2">No hay cuestionarios</p>
            </Row>
          ) : (
            <div>
              <div style={{ textAlign: "left", width: "15rem" }}>
                <InputGroup className="mt-4" size="sm">
                  <FormControl
                    placeholder="Folio, producto, evento"
                    value={busqueda}
                    onChange={(value) => {
                      setBusqueda(value.target.value);
                      filtrarElementos(value.target.value);
                    }}
                  />
                  <InputGroup.Text>
                    <FontAwesomeIcon
                      className={`btnPrimario`}
                      icon={faSearch}
                    />
                  </InputGroup.Text>
                </InputGroup>
              </div>
              {data.length === 0 ? (
                <Row style={{ textAlign: "center", margin: "8rem 0 8rem 0" }}>
                  <p className="h2">No hay coincidencias</p>
                </Row>
              ) : (
                <div
                  style={{
                    marginTop: "2rem",
                    overflow: "auto",
                    maxHeight: "25rem",
                    minHeight: "5rem",
                  }}
                >
                  <Table responsive className="table table-striped">
                    <thead>
                      <tr>
                        {campos.map((campo, index) => (
                          <th style={{ textAlign: "center" }} key={index}>
                            {campo.nombre}{" "}
                            <FontAwesomeIcon
                              className={`mt-2 ${styles.caretDown}`}
                              icon={caret[index]}
                              onClick={() => {
                                ordenar(data, campo.nombreVar);
                                setReverse(!reverse);
                                changeCaret(index, reverse);
                              }}
                            />
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((cuestionario, index) => (
                        <tr
                          key={index}
                          onClick={() => {
                            handleNextPage(cuestionario);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <td style={{ textAlign: "center" }}>
                            <p className="m-2"></p> {cuestionario.idUsuario}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <p className="m-2"></p> {cuestionario.titulo}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <p className="m-2"></p>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {cuestionario.idTipoCuestionario === 1 ? (
                              <p className="m-2">Simple</p>
                            ) : (
                              <p className="m-2">Evaluación docente</p>
                            )}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <p className="m-2"></p>
                            {moment(cuestionario.fechaInicio).format(
                              "DD-MM-YYYY"
                            )}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <p className="m-2"></p>
                            {moment(cuestionario.fechaFin).format("DD-MM-YYYY")}
                          </td>
                          {/*<td style={{ textAlign: "center" }}>
                            <Button
                              className="px-3"
                              variant="success"
                              onClick={() => {
                                handleVer(cuestionario);
                              }}
                            >
                              Ver
                            </Button>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <Button
                              className="px-3"
                              onClick={() => {
                                handleEditar(cuestionario);
                              }}
                              variant="warning"
                            >
                              Editar
                            </Button>
                            </td>*/}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default Tabla;
