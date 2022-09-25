import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class Welcome extends Component{

    constructor(props){
        super(props);
        this.state = {
            item: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={[styles.boxContainer, styles.boxOne]}>

                    <TouchableOpacity style={styles.to} onPress={() => this.props.navigation.navigate('TabNavigator')}>
                        <Text style={styles.btntext}>HEALTHY{"\n"}CHOICE</Text>
                    </TouchableOpacity>

                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    boxOne:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    to: {
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 100

    },
    btntext: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },

});