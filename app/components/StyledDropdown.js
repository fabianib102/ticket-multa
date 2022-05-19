import React from 'react';
import { Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const StyledDropdown = props => (
  <>
    {props.label && (
      <Text style={{
        fontSize: 12,
        color: '#6d6d6d',
        fontWeight: '500',
        textTransform: 'uppercase',
        paddingBottom: 4
      }}>
        {props.label}
      </Text>
    )}
    <DropDownPicker
      style={{
        backgroundColor: "white",
        marginBottom: 16,
        borderColor: "#c4c4c4",
        fontSize: 16
      }}
      itemStyle={{ justifyContent: "flex-start", fontSize: 16 }}
      labelStyle={{ fontSize: 16 }}
      {...props}
    />
  </>
);

export default StyledDropdown;
