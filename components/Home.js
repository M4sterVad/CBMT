import React, { Component } from 'react';
import {StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            item: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.boxContainer, styles.boxTwo]}>
                    <Text style={styles.header}>Hauptmenü</Text>
                </View>

                <View style={[styles.boxContainer, styles.boxOne]}>

                    <TouchableOpacity style={styles.to} onPress={() => this.props.navigation.navigate('AAT')}>
                        <Text style={styles.btntext}>Spiel starten</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.to} onPress={() => this.props.navigation.navigate('Einstellungen')}>
                        <Text style={styles.btntext}>Einstellungen</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.to} onPress={() => this.props.navigation.navigate('Tutorial')}>
                        <Text style={styles.btntext}>Anleitung</Text>
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
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        borderRadius: 5,
        backgroundColor: "#0c393d60",
    },
    boxTwo:{
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        borderRadius: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#fff',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    header: {
        fontSize: 30,
        textAlign:'center',
        fontWeight: 'bold',
        color: '#fff',
    },
    to: {
        flexWrap: 'wrap',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: "#0c393d",
        margin: 30,
        padding: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
    },
    btntext: {
        fontSize: 20,
        color: '#fff',
    },

});