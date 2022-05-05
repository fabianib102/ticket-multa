import React from 'react';
import { LogBox } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import Navig from './app/navigations/Navigation';

function App() {
    console.disableYellowBox = true;
    // esto es para que no muestre los errores molestos esos
    LogBox.ignoreLogs([
        'Setting a timer',
        "Require cycle",
        "Invalid prop `color` supplied to `Text`",
        "Animated: 'useNativeDriver'"
    ]);

    const theme = {
        CheckBox: {
            containerStyle: {
                borderColor: 'rgba(0, 0, 0, 0)',
                marginLeft: 0,
                marginRight: 0,
                paddingHorizontal: 0,
                backgroundColor: 'rgba(0, 0, 0, 0)'
            },
            textStyle: {
                fontSize: 16,
                fontWeight: 'normal'
            }
        },
        Input: {
            containerStyle: {
                marginBottom: 16,
                borderWidth: 1,
                borderColor: '#c4c4c4',
                borderRadius: 4,
                backgroundColor: 'white'
            },
            inputContainerStyle: {
                borderBottomColor: 'rgba(0, 0, 0, 0)'
            },
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Navig />
        </ThemeProvider>
    )
}

export default App;