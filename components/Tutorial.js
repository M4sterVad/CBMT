import React, { Component } from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";


export default class Tutorial extends Component {


    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {

        return (
            <View style={styles.container}>
                <View style={[styles.boxContainer, styles.boxOne]}>
                    <ScrollView>
                        <Text style ={styles.headline}>Anleitung</Text>
                        <Text style={styles.instructions}>{"\n"}Healthy Choice ist ein Spiel, bei dem Sie Ihr Gehirn trainieren
                            gesunde Nahrung ungesunder vorzuziehen.{"\n"}{"\n"}Für das Spiel müssen Sie im Hauptmenü unter
                            Einstellungen jeweils ein Bild von ungesundem Essen und ein
                            Bild von gesundem Essen einfügen.{"\n"}{"\n"}Ungesunde Lebensmittel haben einen hohen Fett-
                            und Zuckergehalt z.b. Fast Food, Süßwaren und so weiter.{"\n"}{"\n"}Bitte informieren Sie sich bei
                            Ihrem Arzt welche Lebensmittel für Sie am besten geeignet sind.
                            {"\n"}{"\n"}Das Ziel des Spiels ist es möglichst viel Wasser zu sammeln und die Blume
                            zum Blühen zu bringen.{"\n"}{"\n"}Der Clip im unteren Bereich zeigt Ihnen die Bewegungen
                            für das Spiel.{"\n"}{"\n"}
                        </Text>
                    </ScrollView>
                </View>
                <View style={[styles.boxContainer, styles.boxTwo]}>
                    <Image source={require('./aat.gif')} style={{width: 300, height: 200, }}/>
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
    },
    boxOne:{
        flex: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    boxTwo:{
        flexWrap: 'wrap'
    },
    circle: {
        width: 25,
        height: 25,
        borderRadius: 100/2,
        backgroundColor: 'black'
    },
    headline: {
        fontSize: 30,
        textAlign: "center",
        margin: 10,
        color: '#fff',
    },
    instructions: {
        textAlign: "center",
        fontSize: 20,
        color: '#fff',
        marginBottom: 5,

    },

    to: {
        flexWrap: 'wrap',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        backgroundColor: "#000000",
        padding: 15,
        marginTop:15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
    },
    btntext: {
        fontSize: 15,
        color: '#fff',
    },

    valueContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    valueValue: {
        width: 200,
        fontSize: 20,
        color: '#fff',
    },
    valueName: {
        width: 50,
        fontSize: 20,
        fontWeight: "bold",
        color: '#fff',
    },

});
