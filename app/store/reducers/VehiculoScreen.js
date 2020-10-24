const initialState = {
    dominio: "",
    marca: "",
    modelo: "",
    tipo: "",
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
        default:
            return state
    }
}