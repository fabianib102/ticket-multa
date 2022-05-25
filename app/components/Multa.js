import React from 'react';
import { ListItem } from 'react-native-elements';

const Multa = props => {
  return (
    <ListItem
      key={props.id}
      leftAvatar={{ source: { uri: props.imagen }, rounded: false }}
      title={props.nombre + " (DNI " + props.dni + ")"}
      titleProps={{ numberOfLines: 1 }}
      subtitle={props.extracto}
      subtitleProps={{ numberOfLines: 1 }}
      chevron
      bottomDivider
      onPress={props.onPress}
    />
  );
}

export default Multa;
