import { createStore } from 'redux'
import rootReducer from './reducers/'
import { LicenciaScreen } from './reducers/LicenciaScreen'

const store = createStore(rootReducer)

export default store