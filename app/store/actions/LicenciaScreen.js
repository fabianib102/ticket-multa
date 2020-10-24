export const onSetNumero = (valueLicencia) => {
    return {
      type: "onSetNumero",
      data: valueLicencia
    }
}

export const onChangeClase = (valueClass) => {
    return {
      type: "onChangeClase",
      data: valueClass
    }
};

export const onChangeProvincia = (valueProvince) => {
    return {
      type: "onChangeProvincia",
      data: valueProvince
    }
};

export const onChangeLocalidad = (valueLocalidad) => {
    return {
      type: "onChangeLocalidad",
      data: valueLocalidad
    }
};
  
export const onSetUnicaProvincial = () => {
    return {
      type: "onSetUnicaProvincial"
    }
}
  
export const onSetRetenida = () => {
    return {
      type: "onSetRetenida"
    }
}

export const onSetVencimiento = (valueExpiration) => {
    return {
      type: "onSetVencimiento",
      data: valueExpiration
    }
}