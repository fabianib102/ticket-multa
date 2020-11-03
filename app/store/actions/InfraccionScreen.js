export const onSetLugar = valueLugar => {
    return {
        type: "onSetLugar",
        data: valueLugar,
    }
}

export const onSetCodigo = valueCodigo => {
    return {
        type: "onSetCodigo",
        data: valueCodigo,
    }
}

export const onSetArticulo = valueArticulo => {
    return {
        type: "onSetArticulo",
        data: valueArticulo,
    }
}

export const onSetInciso = valueInciso => {
    return {
        type: "onSetInciso",
        data: valueInciso,
    }
}

export const onSetExtracto = valueExtracto => {
    return {
        type: "onSetExtracto",
        data: valueExtracto,
    }
}

export const onSetObservaciones = valueObservaciones => {
    return {
        type: "onSetObservaciones",
        data: valueObservaciones,
    }
}

export const onSetMontoPrimerVencimiento = valueMontoPrimerVencimiento => {
    return {
        type: "onSetMontoPrimerVencimiento",
        data: valueMontoPrimerVencimiento,
    }
}

export const onSetMontoSegundoVencimiento = valueMontoSegundoVencimiento => {
    return {
        type: "onSetMontoSegundoVencimiento",
        data: valueMontoSegundoVencimiento,
    }
}

export const onSetFoto = newFoto => {
    return {
        type: "onSetFoto",
        data: newFoto,
    }
}

export const onDeleteFoto = foto => {
    return {
        type: "onDeleteFoto",
        data: foto,
    }
}

// esto limpia todas las screens al guardar la multa
export const clearForm = () => {
    return {
        type: "clearForm",
    }
}