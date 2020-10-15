const initialState = {
    typeDocument: "",
    documentValue: "",
    birthDay: "",
    provinciaValue: "",
    localidadValue: "",
    streetValue: "",
    numberStreetValue: "",
    appartmentValue: "",
    floorValue: "",
    postalCodeValue: ""
}

export const ConductorScreen = (state = initialState, action) => {
    switch (action.type){
        case 'onChangeValueTypeDocument':
            return {
                ...state,
                typeDocument: action.data
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
        case 'onSetDocumentValue':
            return {
                ...state,
                documentValue: action.data
            }
        case 'onSetBirthDay':
            return {
                ...state,
                birthDay: action.data
            }
        default:
            return state
    }
}