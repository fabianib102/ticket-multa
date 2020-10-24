export const onSetDominio = valueDominio => {
    return {
      type: "onSetDominio",
      data: valueDominio
    }
}

export const onSetMarca = valueMarca => {
    return {
      type: "onSetMarca",
      data: valueMarca
    }
}

export const onSetModelo = valueModelo => {
    return {
      type: "onSetModelo",
      data: valueModelo
    }
}

export const onChangeTipo = valueTipo => {
    return {
      type: "onChangeTipo",
      data: valueTipo
    }
}