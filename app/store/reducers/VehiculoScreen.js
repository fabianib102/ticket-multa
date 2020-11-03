const initialState = {
    dominio: "",
    marca: "",
    modelo: "",
    titular: "",
    tipoDocumento: "",
    nroDocumento: "",
    calle: "",
    numero: "",
    piso: "",
    departamento: "",
    codigoPostal: "",
    provincia: "",
    localidad: "",
    pais: "",
}

export const VehiculoScreen = (state = initialState, action) => {
    switch (action.type) {
        case 'onSetDominio':
            return {
                ...state,
                dominio: action.data
            }
        case 'onSetMarca':
            return {
                ...state,
                marca: action.data
            }
        case 'onSetModelo':
            return {
                ...state,
                modelo: action.data
            }
        case 'onChangeTipo':
            return {
                ...state,
                tipo: action.data
            }
        case 'onSetTitularVehiculo':
            return {
                ...state,
                titular: action.data
            }
        case 'onChangeTipoDocumentoVehiculo':
            return {
                ...state,
                tipoDocumento: action.data
            }
        case 'onSetNroDocumentoVehiculo':
            return {
                ...state,
                nroDocumento: action.data
            }
        case 'onSetCalleVehiculo':
            return {
                ...state,
                calle: action.data
            }
        case 'onSetNumeroVehiculo':
            return {
                ...state,
                numero: action.data
            }
        case 'onSetPisoVehiculo':
            return {
                ...state,
                piso: action.data
            }
        case 'onSetDepartamentoVehiculo':
            return {
                ...state,
                departamento: action.data
            }
        case 'onSetCodigoPostalVehiculo':
            return {
                ...state,
                codigoPostal: action.data
            }
        case 'onSetLocalidadVehiculo':
            return {
                ...state,
                localidad: action.data
            }
        case 'onSetProvinciaVehiculo':
            return {
                ...state,
                provincia: action.data
            }
        case 'onSetPaisVehiculo':
            return {
                ...state,
                pais: action.data
            }
        case "clearForm":
            return initialState;
        default:
            return state
    }
}