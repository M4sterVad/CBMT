import React from 'react';
import {Image} from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import home from "./components/icons/home.png"
import flower from "./components/icons/flower.png"

import Welcome from "./components/Welcome";
import Home from "./components/Home";
import Tama from "./components/Tama";
import Switchscreen from "./components/Switchscreen";
import AAT from "./components/AAT";
import Tutorial from "./components/Tutorial";
import Einstellungen from "./components/Einstellungen";


const TabNavigator = createBottomTabNavigator(
    {
        Home: Home,
        Tama: Tama,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                    return <Image source={home} style={{width: 25, height: 25, tintColor}}/>


                } else if (routeName === 'Tama') {
                    iconName = `ios-options${focused ? '' : '-outline'}`;
                    return <Image source={flower} style={{width: 25, height: 25, tintColor}}/>

                }

            },
        }),
        tabBarOptions: {
            activeTintColor: '#4097e9',
            showLabel: true,
        },
    }

);

const RootStack = createStackNavigator(
    {
        Welcome: Welcome,
        Home: Home,
        TabNavigator: TabNavigator,
        AAT: AAT,
        Switchscreen: Switchscreen,
        Einstellungen: Einstellungen,
        Tutorial:Tutorial

    },
    {
        headerMode: 'none',
        initialRouteName: 'Welcome',
    }
);

const AppContainer = createAppContainer(RootStack);


export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}