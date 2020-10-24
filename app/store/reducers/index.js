import { combineReducers } from 'redux'
import { ConductorScreen } from './ConductorScreen'
import { LicenciaScreen } from './LicenciaScreen'
import { VehiculoScreen } from './VehiculoScreen'
import { InfraccionScreen } from './InfraccionScreen'

export default combineReducers({
    ConductorScreen,
    LicenciaScreen,
    VehiculoScreen,
    InfraccionScreen,
})