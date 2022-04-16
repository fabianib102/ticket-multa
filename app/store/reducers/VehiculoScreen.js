const initialState = {
    loadingVehiculos: false,
    error: null,
    vehiculos: [],
    otraMarca: '',
    otroModelo: '',
    data: {
        dominio: "",
        marca: "",
        modelo: "",
        tipo: "",
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
        vehiculoRetenido: false,
    }
}

export const VehiculoScreen = (state = initialState, action) => {
    switch (action.type) {
        case 'onGetVehiculosRequest':
            return {
                ...state,
                loadingVehiculos: true,
                error: null,
                vehiculos: []
            };
        case 'onGetVehiculosResponse': {
            const vehiculos = [];
            action.response.forEach(v => {
                vehiculos.push({
                    label: v.data().marca,
                    value: v.data().marca,
                    modelos: v.data().modelos.map(m => ({
                        label: m,
                        value: m
                    }))
                })
            });
            return {
                ...state,
                loadingVehiculos: false,
                vehiculos
            };
        }
        case 'onGetVehiculosError':
            return {
                ...state,
                loadingVehiculos: false,
                error: action.error
            };
        case 'onSetDominio':
            return {
                ...state,
                data: {
                    ...state.data,
                    dominio: action.data
                }
            }
        case 'onSetMarca':
            return {
                ...state,
                data: {
                    ...state.data,
                    marca: action.data
                }
            }
        case 'onSetOtraMarca':
            return {
                ...state,
                otraMarca: action.data
            };
        case 'onSetModelo':
            return {
                ...state,
                data: {
                    ...state.data,
                    modelo: action.data
                }
            }
        case 'onSetOtroModelo':
            return {
                ...state,
                otroModelo: action.data
            };
        case 'onChangeTipo':
            return {
                ...state,
                data: {
                    ...state.data,
                    tipo: action.data
                }
            }
        case 'onSetTitularVehiculo':
            return {
                ...state,
                data: {
                    ...state.data,
                    titular: action.data
                }
            }
        case 'onChangeTipoDocumentoVehiculo':
            return {
                ...state,
                data: {
                    ...state.data,
                    tipoDocumento: action.data
                }
            }
        case 'onSetNroDocumentoVehiculo':
            return {
                ...state,
                data: {
                    ...state.data,
                    nroDocumento: action.data
                }
            }
        case 'onSetCalleVehiculo':
            return {
                ...state,
                data: {
                    ...state.data,
                    calle: action.data
                }
            }
        case 'onSetNumeroVehiculo':
            return {
                ...state,
                data: {
                    ...state.data,
                    numero: action.data
                }
            }
        case 'onSetPisoVehiculo':
            return {
                ...state,
                data: {
                    ...state.data,
                    piso: action.data
                }
            }
        case 'onSetDepartamentoVehiculo':
            return {
                ...state,
                data: {
                    ...state.data,
                    departamento: action.data
                }
            }
        case 'onSetCodigoPostalVehiculo':
            return {
                ...state,
                data: {
                    ...state.data,
                    codigoPostal: action.data
                }
            }
        case 'onSetLocalidadVehiculo':
            return {
                ...state,
                data: {
                    ...state.data,
                    localidad: action.data
                }
            }
        case 'onSetProvinciaVehiculo':
            return {
                ...state,
                data: {
                    ...state.data,
                    provincia: action.data
                }
            }
        case 'onSetPaisVehiculo':
            return {
                ...state,
                data: {
                    ...state.data,
                    pais: action.data
                }
            }
        case 'onSetVehiculoRetenido':
            return {
                ...state,
                data: {
                    ...state.data,
                    vehiculoRetenido: !(state.data.vehiculoRetenido)
                }
            }
        case "clearForm":
            return initialState;
        default:
            return state
    }
}