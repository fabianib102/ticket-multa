import React from 'react';
import Navig from './app/navigations/Navigation';
import {decode, encode} from 'base-64';

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode } 

function App() {
    return <Navig/>;
}

export default App;