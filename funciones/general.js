export const formatoCompleto = (formato) => {
  let darkbox = {
    imp: "Impresión",
    dig: "Digital",
    amb: "Diseño para impresión",
  };
  return darkbox[formato];
};

export const acceptFiles = (variant) => {
  let data = {
    all: ".pdf,.doc,.docx,.png,.jpg,.jpeg,.xlsx,.pptx",
    ficha: ".pdf,.doc,.docx",
  };
  return data[variant];
};

export const aprobacion = (res) => {
  if (res === null) return "No";
  else return "Sí";
};
