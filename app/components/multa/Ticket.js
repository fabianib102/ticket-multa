const templateTicket = (cs, ls, vs, is, fecha, hora) => {
    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Ticket</title>
            <style>
                table, th, td {
                    border: 1px solid black;
                    border-collapse: collapse;
                    margin: 25px 0;
                    font-size: 0.9em;
                    min-width: 400px;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
                    font-family: 'Lucida Console';
        
                }
                .tabla {
                    margin: auto;
                    width: 100%;
        
                }
                .sep-bar {
                    text-align: center;
                    font-weight: bold;
                    background-color: #3C99DC;
                    color: #ffffff;
                    text-align: left;
                }
                .tabla tbody tr {
                    border-bottom: 1px solid #dddddd;
                }
                .tabla tbody tr:nth-of-type(even) {
                    background-color: #f3f3f3;
                }
                .header {
                    align-content: center;
                    font-family: 'Times New Roman', Georgia, 'Lucida Console';
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <img src="https://i.imgur.com/SUw60cR.png" alt="Multapp-Logo">
        
                <h1>Multapp<h1>
            </div>
            <table class="tabla">
                <tr>
                    <td colspan="3" class="sep-bar">Conductor</td>
                </tr>
                <tr>
                    <td>
                        Apellido y Nombre: ${ cs.apellido + ' ' + cs.nombre }
                    </td>
                    <td>
                        Sexo: ${ cs.sexo }
                    </td>
                    <td>
                        Tipo de documento: ${ cs.tipoDocumento }
                    </td>
                </tr>
                <tr>
                    <td>
                        Nro. de documento: ${ cs.nroDocumento }
                    </td>
                    <td>
                        Fecha de Nac.: ${ cs.fechaNacimiento }
                    </td>
                    <td>
                        Provincia: ${ cs.provincia }
                    </td>
                </tr>
                <tr>
                    <td>
                        Localidad: ${ cs.localidad }
                    </td>
                    <td>
                        Calle: ${ cs.calle }
                    </td>
                    <td>
                        Número: ${ cs.numero }
                    </td>
                </tr>
                <tr>
                    <td>
                        Departamento: ${ cs.departamento }
                    </td>
                    <td>
                        Piso: ${ cs.piso }
                    </td>
                    <td>
                        Código postal: ${ cs.codigoPostal }
                    </td>
                </tr>
                <tr>
                    <td colspan="3" class="sep-bar">Licencia</td>
                </tr>
                <tr>
                    <td>
                        Número: ${ ls.numeroLic }
                    </td>
                    <td>
                        Clase: ${ ls.clase }
                    </td>
                    <td>
                        Provincia: ${ ls.provincia }
                    </td>
                </tr>
                <tr>
                    <td>
                        Localidad: ${ ls.localidad }
                    </td>
                    <td>
                        Única Provincial: ${ ls.unicaProvincial ? 'Sí' : 'No' }
                    </td>
                    <td>
                        Retenida: ${ ls.retenida ? 'Sí' : 'No' }
                    </td>
                </tr>
                <tr>
                    <td>
                        Vencimiento: ${ ls.vencimiento }
                    </td>
                </tr>
                <tr>
                    <td colspan="3" class="sep-bar">Vehículo</td>
                </tr>
                <tr>
                    <td>
                        Dominio: ${ vs.dominio }
                    </td>
                    <td>
                        Marca: ${ vs.marca }
                    </td>
                    <td>
                        Modelo: ${ vs.modelo }
                    </td>
                </tr>
                <tr>
                    <td>
                        Nombre (titular): ${ vs.titular }
                    </td>
                    <td>
                        Tipo de documento (titular): ${ vs.tipoDocumento }
                    </td>
                    <td>
                        Nro. de documento (titular): ${ vs.nroDocumento }
                    </td>
                </tr>
                <tr>
                    <td>
                        Calle (titular): ${ vs.calle }
                    </td>
                    <td>
                        Número (titular): ${ vs.numero }
                    </td>
                    <td>
                        Piso (titular): ${ vs.piso }
                    </td>
                </tr>
                <tr>
                    <td>
                        Departamento (titular): ${ vs.departamento }
                    </td>
                    <td>
                        Código Postal (titular): ${ vs.codigoPostal }
                    </td>
                    <td>
                        Provincia (titular): ${ vs.provincia }
                    </td>
                </tr>
                <tr>
                    <td>
                        Localidad (titular): ${ vs.localidad }
                    </td>
                    <td>
                        País (titular): ${ vs.pais }
                    </td>
                </tr>
                <tr>
                    <td colspan="3" class="sep-bar">Infracción</td>
                </tr>
                <tr>
                    <td>
                        Lugar: ${ is.lugar }
                    </td>
                    <td>
                        ${ is.codigo }
                    </td>
                    <td>
                        ${ is.articulo }
                    </td>
                </tr>
                <tr>
                    <td>
                        Inciso: ${ is.inciso }
                    </td>
                    <td>
                        Extracto: ${ is.extracto }
                    </td>
                    <td>
                        Monto (primer vencimiento): $${ is.montoPrimerVencimiento }
                    </td>
                </tr>
                <tr>
                    <td>
                        Monto (segundo vencimiento): $${ is.montoSegundoVencimiento }
                    </td>
                    <td colspan="2">
                        Observaciones: ${ is.observaciones }
                    </td>
                </tr>
            </table>
            <br/>
            Fecha: ${fecha} - Hora: ${hora}
        </body>
        </html>`;
    }

export default templateTicket;