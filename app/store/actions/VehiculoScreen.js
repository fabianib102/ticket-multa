export const onSetDominio = valueDominio => {
    return {
      type: "onSetDominio",
      data: valueDominio
    }
}

export const onSetMarca = valueMarca => {
    return {
      type: "onSetMarca",
      data: valueMarca
    }
}

export const onSetModelo = valueModelo => {
    return {
      type: "onSetModelo",
      data: valueModelo
    }
}

export const onChangeTipo = valueTipo => {
    return {
      type: "onChangeTipo",
      data: valueTipo
    }
}

// los type de estas actions tienen "Vehiculo" al final
// para que no se confundan con las actions de ConductorScreen

export const onSetTitular = valueTitular => {
    return {
      type: "onSetTitularVehiculo",
      data: valueTitular
    }
}

export const onChangeTipoDocumento = valueTipoDocumento => {
    return {
      type: "onChangeTipoDocumentoVehiculo",
      data: valueTipoDocumento
    }
}

export const onSetNroDocumento = valueNroDocumento => {
    return {
      type: "onSetNroDocumentoVehiculo",
      data: valueNroDocumento
    }
}

export const onSetCalle = valueCalle => {
    return {
      type: "onSetCalleVehiculo",
      data: valueCalle
    }
}

export const onSetNumero = valueNumero => {
    return {
      type: "onSetNumeroVehiculo",
      data: valueNumero
    }
}

export const onSetPiso = valuePiso => {
    return {
      type: "onSetPisoVehiculo",
      data: valuePiso
    }
}

export const onSetDepartamento = valueDepartamento => {
    return {
      type: "onSetDepartamentoVehiculo",
      data: valueDepartamento
    }
}

export const onSetCodigoPostal = valueCodigoPostal => {
    return {
      type: "onSetCodigoPostalVehiculo",
      data: valueCodigoPostal
    }
}

export const onSetLocalidad = valueLocalidad => {
    return {
      type: "onSetLocalidadVehiculo",
      data: valueLocalidad
    }
}

export const onSetProvincia = valueProvincia => {
    return {
      type: "onSetProvinciaVehiculo",
      data: valueProvincia
    }
}

export const onSetPais = valuePais => {
    return {
      type: "onSetPaisVehiculo",
      data: valuePais
    }
}