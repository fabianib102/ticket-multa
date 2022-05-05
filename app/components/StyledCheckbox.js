import React from 'react';
import { TouchableNativeFeedback } from 'react-native';
import { CheckBox } from 'react-native-elements';

const StyledCheckbox = props => <CheckBox Component={TouchableNativeFeedback} {...props} />;

export default StyledCheckbox;
