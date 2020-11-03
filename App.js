import React from 'react';
import { LogBox } from 'react-native';
import Navig from './app/navigations/Navigation';

function App() {
    // esto es para que no muestre los errores molestos esos
    LogBox.ignoreLogs(['Setting a timer', "Require cycle", "Invalid prop `color` supplied to `Text`"]);
    
    return (
        <Navig/>
    )
}

export default App;