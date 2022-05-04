import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const StyledDropdown = props => (
  <DropDownPicker
    style={{
      backgroundColor: "white",
      marginVertical: 10,
      borderColor: "#c4c4c4",
      fontSize: 16
    }}
    itemStyle={{ justifyContent: "flex-start", fontSize: 16 }}
    labelStyle={{ fontSize: 16 }}
    {...props}
  />
);

export default StyledDropdown;
