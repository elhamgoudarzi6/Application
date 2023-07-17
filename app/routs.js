import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Splash from './screens/splash';
import Auth from './screens/auth';

import Dashboard from './layouts/Dashboard';

const RootStack = createStackNavigator({
    Dashboard: {
        screen: Dashboard,
        navigationOptions: () => ({ headerShown: false })
    },
    Splash: {
        screen: Splash,
        navigationOptions: () => ({ headerShown: false })
    },
    Auth: {
        screen: Auth,
        navigationOptions: () => ({ headerShown: false })
    },
},
    {
        initialRouteName: 'Splash',
    },
    {
        defaultNavigationOptions: { headerShown: false }
    },
);
export default createAppContainer(RootStack);