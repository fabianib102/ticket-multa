export const onSetApellido = (valueApellido) => {
    return {
        type: "onSetApellido",
        data: valueApellido
    }
};

export const onSetNombre = (valueNombre) => {
    return {
        type: "onSetNombre",
        data: valueNombre
    }
};

export const onSetSexo = (valueSexo) => {
    return {
        type: "onSetSexo",
        data: valueSexo
    }
};

export const onChangeValueTipoDocumento = (valueType) => {
    return {
        type: "onChangeValueTipoDocumento",
        data: valueType
    }
};

export const onChangeValueProvincia = (valueProvince) => {
    return {
        type: "onChangeValueProvincia",
        data: valueProvince
    }
};

export const onChangeValueLocalidad = (valueLocalidad) => {
    return {
        type: "onChangeValueLocalidad",
        data: valueLocalidad
    }
};

export const onSetNroDocumento = (valueDocumento) => {
    return {
        type: "onSetNroDocumento",
        data: valueDocumento
    }
}

export const onSetFechaNacimiento = (valueBDay) => {
    return {
        type: "onSetFechaNacimiento",
        data: valueBDay
    }
}

export const onSetCalle = (streetValue) => {
    return {
        type: "onSetCalle",
        data: streetValue
    }
}
  
export const onSetNumero = (streetNumber) => {
    return {
        type: "onSetNumero",
        data: streetNumber
    }
}

export const onSetDepartamento = (apartmentValue) => {
    return {
        type: "onSetDepartamento",
        data: apartmentValue
    }
}

export const onSetPiso = (floorValue) => {
    return {
        type: "onSetPiso",
        data: floorValue
    }
}

export const onSetCodigoPostal = (postalValue) => {
    return {
        type: "onSetCodigoPostal",
        data: postalValue
    }
}