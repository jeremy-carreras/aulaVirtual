import Swal from "sweetalert2";
import { avisoError, avisoFalta } from "./avisos";

export const validacionData = (data) => {
  for (let campo in data) {
    if (
      data[campo] === "" ||
      data[campo] === null ||
      data[campo] === undefined ||
      data[campo] === []
    ) {
      Swal.fire({
        icon: "question",
        title: "Algún campo está vacío",
        confirmButtonText: "OK",
        confirmButtonColor: "#1e3c70",
      });
      return true;
    }
  }
  return false;
};

export const validacionVar = (dato, textFalta) => {
  if (dato === null || dato === "" || dato === undefined) {
    Swal.fire({
      icon: "question",
      title: "Algún campo está vacío",
      text: textFalta,
      confirmButtonText: "OK",
      confirmButtonColor: "#1e3c70",
    });
    return true;
  }
  return false;
};

export const validacionArray = (dato) => {
  if (dato.length === 0) {
    Swal.fire({
      icon: "question",
      title: "Algún campo está vacío",
      confirmButtonText: "OK",
      confirmButtonColor: "#1e3c70",
    });
    return true;
  }
  return false;
};

export const validacionAdscripcion = (router) => {
  if (!localStorage.getItem("id_adscripcion")) {
    router.push("/");
    avisoError("Usuario no permitido");
  }
};

export const validacionEmpleado = (idTipoEmpleado, router) => {
  if (
    localStorage.getItem("id_adscripcion") ||
    JSON.parse(localStorage.getItem("empleado")).id_tipo_empleado !=
      idTipoEmpleado
  ) {
    router.push("/");
    avisoError("Usuario no permitido");
  }
};

export const validacionEmpleadoGeneral = (router) => {
  if (
    localStorage.getItem("id_adscripcion") ||
    JSON.parse(localStorage.getItem("empleado")).id_tipo_empleado >= 6
  ) {
    router.push("/");
    avisoError("Usuario no permitido");
  }
};

export const validacionCantidad = (error) => {
  if (error) {
    Swal.fire({
      icon: "question",
      title: "La cantidad ingresada no es válida",
      confirmButtonText: "OK",
      confirmButtonColor: "#1e3c70",
    });
    return true;
  }
  return false;
};

export const validaTel = (telefono) => {
  if (!(/^([0-9]{10})$/i.test(telefono) || /^([0-9]{11})$/i.test(telefono))) {
    avisoFalta(
      "Número de teléfono inválido",
      "Intente con un número de teléfono válido"
    );
    return true;
  } else return false;
};
