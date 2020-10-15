const initialState = {
    nroLicencia: "",
    classValue: "Seleccione Clase",
    provinciaValue: "Provincia",
    localidadValue: "Localidad",
    provinceUnique: false,
    detained: false,
    expirationDate: ""
}

export const LicenciaScreen = (state=initialState, action) => {
    switch (action.type){
        case 'onChangeValueClass':
            return {
                ...state,
                classValue: action.data
            }
        case 'onChangeValueProvince':
            return {
                ...state,
                provinciaValue: action.data
            }
        case 'onChangeValueLocaly':
            return {
                ...state,
                localidadValue: action.data
            }
        case 'onSetExpirationDate':
            return {
                ...state,
                expirationDate: action.data
            }
        case 'onSetNroLicencia':
            return {
                ...state,
                nroLicencia: action.data
            }
        case 'onSetProviceUnique':
            return {
                ...state,
                provinceUnique: !(state.provinceUnique)
            }
        case 'onSetDetained':
            return {
                ...state,
                detained: !(state.detained)
            }
        default:
            return state
    }
}
