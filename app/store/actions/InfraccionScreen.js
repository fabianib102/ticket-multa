import firebase from '../../utils/firebase';

export const onSetLugar = valueLugar => {
    return {
        type: "onSetLugar",
        data: valueLugar,
    }
}

export const onSetLey = valueLey => {
    return {
        type: "onSetLey",
        data: valueLey,
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

export const onSetOtroExtracto = data => {
    return {
        type: "onSetOtroExtracto",
        data,
    }
}

export const onSetUnidadesFijasMin = data => {
    return {
        type: "onSetUnidadesFijasMin",
        data,
    }
}

export const onSetUnidadesFijasMax = data => {
    return {
        type: "onSetUnidadesFijasMax",
        data,
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

export const setConductorNoEsTitular = value => {
    return {
        type: "setConductorNoEsTitular",
        value: value,
    }
}

export const onGuardarMultaRequest = () => ({
    type: 'onGuardarMultaRequest'
});

export const onGuardarMultaResponse = response => ({
    type: 'onGuardarMultaResponse',
    response
});

export const onGuardarMultaError = error => ({
    type: 'onGuardarMultaError',
    error
});

// NOTA: ESTO NO ESTA TERMINADO, PERO COMO LA OTRA FUNCION DE GUARDAR YA ANDA
// SE PUEDE SACAR ESTO
export const onGuardarMulta = () => async (dispatch, getState) => {
    try {
        dispatch(onGuardarMultaRequest());
        const ls = getState().LicenciaScreen;
        const cs = getState().ConductorScreen;
        const vs = getState().VehiculoScreen;
        const is = getState().InfraccionScreen;
        const date = new Date();
        const datosTitular = is.conductorNoEsTitular ? {} : {
            titular: cs.apellido + " " + cs.nombre,
            tipoDocumento: cs.tipoDocumento,
            nroDocumento: cs.nroDocumento,
            calle: cs.calle,
            numero: cs.numero,
            piso: cs.piso,
            departamento: cs.departamento,
            codigoPostal: cs.codigoPostal,
            provincia: cs.provincia,
            localidad: cs.localidad,
            pais: cs.pais,
        };
        if (vs.otraMarca) {
            await firebase.firestore().collection('vehiculos').add({
                marca: vs.otraMarca,
                modelos: [vs.otroModelo]
            });
        }
        if (!vs.otraMarca && vs.otroModelo) {
            const snapshot = await firebase.firestore().collection('vehiculos').where('marca', '==', vs.data.marca).get();
            const promises = []
            snapshot.forEach(s => {
                promises.push(
                    firebase.firestore().collection('vehiculos').doc(s.id).update({
                        marca: s.data().marca,
                        modelos: [...s.data().modelos, vs.otroModelo]
                    })
                );
            });
            await Promise.all(promises);
        }
        const createdMulta = await firebase.firestore().collection("multas").add({
            ubicacion: {
                fecha: `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`,
                hora: date.toLocaleTimeString(),
                lugar: is.lugar,
            },
            licencia: {
                ...ls,
                pais: "Argentina",
                departamento: "San Fernando",
            },
            conductor: {
                ...cs,
                pais: "Argentina",
            },
            vehiculo: {
                ...vs.data,
                ...datosTitular,
                pais: "Argentina",
            },
            infraccion: {
                ley: is.ley,
                codigo: is.codigo,
                articulo: is.articulo,
                inciso: is.inciso,
                extracto: is.extracto,
                observaciones: is.observaciones,
            },
            vencimientos: {
                fechaPrimerVencimiento: "",
                fechaSegundoVencimiento: "",
                montoPrimerVencimiento: is.montoPrimerVencimiento,
                montoSegundoVencimiento: is.montoSegundoVencimiento,
            },
            fotos: [],
            estado: "No resuelta",
            razon: "",
            idInspector: firebase.auth().currentUser.uid,
            idSupervisor: "",
        });
        if (is.fotos.length > 0) {

        }
    } catch (err) {
        console.log(err);
        dispatch(onGuardarMultaError(err));
    }
}
