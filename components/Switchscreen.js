import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import {StackActions, NavigationActions} from "react-navigation";


const timer = require('react-native-timer');

export default class Switchscreen extends Component {


    constructor(props) {
        super(props);

        this.state = {
            x: 0,
            y: 0,
            z: 0,
            sws: true,
        };
    }

    componentWillMount() {
        this.setState({sws: true}, () => timer.setTimeout(
            this, 'MSG', () => this.checkScr(), 2000
        ));
    }

    componentWillUnmount() {
        timer.clearTimeout(this);
    }


    checkScr = () => {

        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                routeName: 'AAT',
            })],
        });
        this.props.navigation.dispatch(resetAction);

    };

    render() {

        return (
            <View style={styles.container}>
                <View style={[styles.boxContainer, styles.boxOne]}>
                    <Text style={styles.cross}>+</Text>
                </View>
            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#0d806f',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },
    boxContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 5,
        opacity: 5,
    },
    boxOne:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxTwo:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    cross:{
        fontSize: 52,
        textAlign:'center',
        color: '#000000',
    }
});
