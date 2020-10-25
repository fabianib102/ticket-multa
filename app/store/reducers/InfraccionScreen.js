const initialState = {
    lugar: "",
    codigo: "",
    articulo: "",
    inciso: "",
    extracto: "",
    observaciones: "",
    montoPrimerVencimiento: "",
    montoSegundoVencimiento: "",
    photoArr: []
}

export const InfraccionScreen = (state = initialState, action) => {
    console.log('SE VA A LOGGEAR STATE')
    console.log(state)
    switch (action.type) {
        case "onSetLugar":
            return {
                ...state,
                lugar: action.data,
            };
        case "onSetCodigo":
            return {
                ...state,
                codigo: action.data,
            };
        case "onSetArticulo":
            return {
                ...state,
                articulo: action.data,
            };
        case "onSetInciso":
            return {
                ...state,
                inciso: action.data,
            };
        case "onSetExtracto":
            return {
                ...state,
                extracto: action.data,
            };
        case "onSetObservaciones":
            return {
                ...state,
                observaciones: action.data,
            };
        case "onSetMontoPrimerVencimiento":
            return {
                ...state,
                montoPrimerVencimiento: action.data,
            };
        case "onSetMontoSegundoVencimiento":
            return {
                ...state,
                montoSegundoVencimiento: action.data,
            };
        case "onSetPhoto":
            return {
                ...state,
                photoArr: state.photoArr.concat(action.data)
            };
        default:
            return state;
    }
}