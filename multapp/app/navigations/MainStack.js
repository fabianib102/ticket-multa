import {createStackNavigator} from 'react-navigation-stack';
import MainSreen from '../screens/Main';

const MainScreenStack = createStackNavigator({
    Mains:{
        screen: MainSreen,
        navigationOptions: () => ({
            title: "Principal"
        })
    }
})

export default MainScreenStack;