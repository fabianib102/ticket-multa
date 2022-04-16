/**
 * https://www.dnrpa.gov.ar/fabricantes/info/CODIGO_DEL_AUTOMOTOR.pdf
 * 
 * algunos nombres cambie porque eran cualquier cosa
 * 
 * ej: sedan 3 puertas (que no existe) por hatchback 3 puertas (que si existe)
*/
const carTypes = [
  { label: "Sedán 2 puertas", value: "Sedán 2 puertas" },
  { label: "Sedán 4 puertas", value: "Sedán 4 puertas" },
  { label: "Hatchback 3 puertas", value: "Hatchback 3 puertas" },
  { label: "Hatchback 5 puertas", value: "Hatchback 5 puertas" },
  { label: "Rural 2/3 puertas", value: "Rural 2/3 puertas" },
  { label: "Rural 4/5 puertas", value: "Rural 4/5 puertas" },
  { label: "Coupé", value: "Coupé" },
  { label: "Descapotable", value: "Descapotable" },
  { label: "Limusina", value: "Limusina" },
  { label: "Todo terreno", value: "Todo terreno" },
  { label: "Familiar", value: "Familiar" },
  { label: "Pick up", value: "Pick up" },
  { label: "Furgoneta/Utilitario", value: "Furgoneta/Utilitario" },
  { label: "Furgón", value: "Furgón" },
  { label: "Camión", value: "Camión" },
  { label: "Chasis sin cabina", value: "Chasis sin cabina" },
  { label: "Chasis con cabina", value: "Chasis con cabina" },
  { label: "Tractor de carretera", value: "Tractor de carretera" },
  { label: "Casa rodante con motor", value: "Casa rodante con motor" },
  { label: "Casa rodante sin motor", value: "Casa rodante sin motor" },
  { label: "Acoplado", value: "Acoplado" },
  { label: "Semirremolque", value: "Semirremolque" },
  { label: "Motor remolcado", value: "Motor remolcado" },
  { label: "Carretón", value: "Carretón" },
  { label: "Minibus", value: "Minibus" },
  { label: "Midibus", value: "Midibus" },
  { label: "Ómnibus", value: "Ómnibus" }
];

export default carTypes;
