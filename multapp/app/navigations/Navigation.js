import React from 'react';
import { Icon } from 'react-native-elements';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import MainScreenStack from './MainStack';

const NavigationStacks = createBottomTabNavigator({
    Main: {
        screen: MainScreenStack,
        navigationOptions: () => ({
            tabBarLabel: 'Principal',
            tabBarIcon: ({tintColor}) => (
                <Icon
                    type="material-community"
                    name="compass-outline"
                    size={22}
                    color={tintColor}
                />
            )
        })
    }
});

export default createAppContainer(NavigationStacks);