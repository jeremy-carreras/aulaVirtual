import Layout from "/components/layouts/layout";
import { Container } from "react-bootstrap";
import styles from "./cuestionario.module.css";
import { useState, useEffect } from "react";
import Tabla from "../../../components/cuestionario/tabla";
import SolicitarNuevoServicio from "../../../components/cuestionario/solicitarNuevoServicion";

const urlApi = process.env.API_ROOT;

const titutoNav = "Cuestionarios";

const Index = () => {
  useEffect(() => {
    async function fetchData() {
      console.log(urlApi);
    }
    fetchData();
  }, []);

  return (
    <Layout tituloNav={titutoNav} tipoUsuario={1}>
      <Container className={`${styles.contenedor}`}></Container>
    </Layout>
  );
};

export default Index;
