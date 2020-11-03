const initialState = {
    numero: "",
    clase: "",
    provincia: "",
    localidad: "",
    unicaProvincial: false,
    retenida: false,
    vencimiento: ""
}

export const LicenciaScreen = (state=initialState, action) => {
    switch (action.type){
        case 'onSetNumero':
            return {
                ...state,
                numero: action.data
            }
        case 'onChangeClase':
            return {
                ...state,
                clase: action.data
            }
        case 'onChangeProvincia':
            return {
                ...state,
                provincia: action.data
            }
        case 'onChangeLocalidad':
            return {
                ...state,
                localidad: action.data
            }
        case 'onSetUnicaProvincial':
            return {
                ...state,
                unicaProvincial: !(state.unicaProvincial)
            }
        case 'onSetRetenida':
            return {
                ...state,
                retenida: !(state.retenida)
            }
        case 'onSetVencimiento':
            return {
                ...state,
                vencimiento: action.data
            }
        case "clearForm":
            return initialState;
        default:
            return state
    }
}
