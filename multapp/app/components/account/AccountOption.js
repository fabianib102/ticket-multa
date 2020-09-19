import React, {useState} from "react";
import {StyleSheet, Text, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {map} from "lodash";
import Modal from "../Modal";
import ChangePassword from "./ChangePassword";

export default function AccountOption(props){

    const {userInfo, toastRef} = props;
    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);

    const selectComponent = (key) => {
        switch(key){
            case "NewMulta":   
                setRenderComponent(<Text>Cambiando a NewMulta</Text>);
                setShowModal(true);
                break;
            case "History":   
                setRenderComponent(<Text>Cambiando al historial</Text>);
                setShowModal(true);
                break;
            case "ChangePass":   
                setRenderComponent(
                    <ChangePassword 
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                    />
                );
                setShowModal(true);
                break;
            default:
                setRenderComponent(null);
                setShowModal(false);
                break;
        }
    }

    const menuOption = generateOption(selectComponent);

    return(
        <View>
            {map(menuOption, (menu, index)=>(
                <ListItem
                    key={index}
                    title={menu.title}
                    leftIcon={{
                        type: menu.iconType,
                        name: menu.iconNameLeft,
                        color: menu.iconColorLeft
                    }}
                    rightIcon={{
                        type: menu.iconType,
                        name: menu.iconNameRight,
                        color: menu.iconColorRight
                    }}
                    containerStyle={styles.menuItem}
                    onPress = {menu.onPress}
                />
            ))}

            {renderComponent && (
                <Modal isVisible={showModal} setIsVisible={setShowModal}>
                    {renderComponent}
                </Modal>)
            }

            
        </View>
    );
}

function generateOption (selectComponent) {
    return [
        {
            title: "Nueva Multa",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectComponent("NewMulta")
        },
        {
            title: "Ver Historial",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectComponent("History")
        },
        {
            title: "Cambiar contraseña",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectComponent("ChangePass")
        }
    ]
};

const styles = StyleSheet.create({
    menuItem:{
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3"
    }
})