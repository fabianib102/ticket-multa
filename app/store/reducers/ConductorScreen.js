const initialState = {
    apellido: "",
    nombre: "",
    sexo: "",
    tipoDocumento: "",
    nroDocumento: "",
    fechaNacimiento: "",
    provincia: "",
    localidad: "",
    calle: "",
    numero: "",
    departamento: "",
    piso: "",
    codigoPostal: ""
}

export const ConductorScreen = (state = initialState, action) => {
    switch (action.type){
        case 'onSetApellido':
            return {
                ...state,
                apellido: action.data
            }
        case 'onSetNombre':
            return {
                ...state,
                nombre: action.data
            }
        case 'onSetSexo':
            return {
                ...state,
                sexo: action.data
            }
        case 'onChangeValueTipoDocumento':
            return {
                ...state,
                tipoDocumento: action.data
            }
        case 'onChangeValueProvincia':
            return {
                ...state,
                provincia: action.data
            }
        case 'onChangeValueLocalidad':
            return {
                ...state,
                localidad: action.data
            }
        case 'onSetNroDocumento':
            return {
                ...state,
                nroDocumento: action.data
            }
        case 'onSetFechaNacimiento':
            return {
                ...state,
                fechaNacimiento: action.data
            }
        case 'onSetCalle':
            return {
                ...state,
                calle: action.data
            }
        case 'onSetNumero':
            return {
                ...state,
                numero: action.data
            }
        case 'onSetDepartamento':
            return {
                ...state,
                departamento: action.data
            }
        case 'onSetPiso':
            return {
                ...state,
                piso: action.data
            }
        case 'onSetCodigoPostal':
            return {
                ...state,
                codigoPostal: action.data
            }
        case "clearForm":
            return initialState;
        default:
            return state
    }
}