import React from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import Navig from './app/navigations/Navigation';
import store from './app/storeFile';

function App() {
    console.disableYellowBox = true;
    // esto es para que no muestre los errores molestos esos
    LogBox.ignoreLogs([
        'Setting a timer',
        "Require cycle",
        "Invalid prop `color` supplied to `Text`",
        "Animated: 'useNativeDriver'"
    ]);
    
    return (
        <Provider store={store}>
            <Navig/>
        </Provider>
    )
}

export default App;