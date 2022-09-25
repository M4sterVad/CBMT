import React, { Component } from "react";
import { Alert, AsyncStorage, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { accelerometer, setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
import {StackActions, NavigationActions} from "react-navigation";
import Switchscreen from "./Switchscreen";

setUpdateIntervalForType(SensorTypes.accelerometer, 20);

const Value = ({ name, value }) => (
    <View style={styles.valueContainer}>
        <Text style={styles.valueName}>{name}:</Text>
        <Text style={styles.valueValue}>{new String(value).substr(0, 8)}</Text>
    </View>
);

const timer = require('react-native-timer');

const accfill = [];
const movpic = [];

const subscription = accelerometer;

export default class AAT extends Component {

    constructor(props) {
        super(props);

        this.state = {
            x: 0,
            y: 0,
            z: 0,
            timer: 6,
            aaPic: [],
            randomPic: null,
            randomInt: Math.floor(Math.random() * 2),
            pkt:'',
            lbMsg: '',
        };
    }

    componentWillMount() {
        subscription.subscribe(({ x, y, z}) => this.setState({ x, y, z }));
        this.setState({runAcc: true}, () => timer.setTimeout(
            this, 'MSG', () => this.timeoutMethod(), 3000
        ));
    }

    componentDidMount(){
        this.interval = setInterval(
            () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
            500
        );
        this._loadPics().done();
    }


    componentDidUpdate(){

        // /* Liner_ACCELERATION damit Neigungshaltung zu beginn egal ist.
        // Wenn neigung versus push dann mit den werten un d messgeschwindigkeit experementieren,
        // nicht mit LINEAR_Acceleration vs. ACCELEROMTER  /*

        accfill.push(this.state.z);
        const v = accfill.reduceRight(this.getSum);
        // const c = accfill.reduce(this.getSum);

        if (v > 15) {
            if(this.state.runAcc) {
                this.setState({runAcc: false});
                if (this.state.randomPic === this.state.aaPic[0] ) {
                    let p = v * this.state.timer;
                    this.setState({pkt: p});
                    if (this.state.timer < 5) {
                        this.setState({lbMsg: 'Gut!' + "\n" + p + ' ml Wasser erhalten'});
                    }
                    if (this.state.timer >= 5 && this.state.timer < 5.5) {
                        this.setState({lbMsg: 'Sehr Gut!' + "\n" +  p + ' ml Wasser erhalten'});
                    }
                    if (this.state.timer >= 5.5 && this.state.timer <= 6) {
                        this.setState({lbMsg: 'Ausgezeichnet!'  + "\n" + p + ' ml Wasser erhalten'});
                    }
                }
                else{
                    this.setState({pkt: 0});
                    this.setState({lbMsg: 'Falsche oder uneindeutige Bewegung!'});
                }
            }
        }

        if (v < -20) {
            if(this.state.runAcc){
                this.setState({runAcc : false});
                if (this.state.randomPic === this.state.aaPic[1]) {
                    let p = (v * this.state.timer) * -1;
                    this.setState({pkt: p});
                    if (this.state.timer < 5) {
                        this.setState({lbMsg: 'Gut!' + "\n" + p + ' ml Wasser erhalten'});
                    }
                    if (this.state.timer >= 5 && this.state.timer < 5.5) {
                        this.setState({lbMsg: 'Sehr Gut!' + "\n" +  p + ' ml Wasser erhalten'});
                    }
                    if (this.state.timer >= 5.5 &&this.state.timer <= 6) {
                        this.setState({lbMsg: 'Ausgezeichnet!'  + "\n" + p + ' ml Wasser erhalten'});
                    }
                }
                else{
                    this.setState({pkt: 0});
                    this.setState({lbMsg: 'Falsche oder uneindeutige Bewegung!'});
                }
            }
        }
    }

    componentWillUnmount() {

        if (this.state.runAcc) {
            this.setState({runAcc: false});
        }

        for (let i = 0; i < accfill.length; i++) {
            accfill.splice(i);
        }

        for (let i = 0; i < movpic.length; i++) {
            movpic.splice(i);
        }

        // unsubscribe() scheint nicht zu funktionieren
        subscription.subscribe(({ }) => this.setState());

        timer.clearTimeout(this);
        clearInterval(this.interval);

    }

    getSum(total, num) {
    // /* TODO - DIE LETZTEN WERTE DES ARRAYS NEHEMEN DA DAVOR ZUVIEL RAUSCHEN IST
        // WAHRSCHEINLICH MIT TOTAL +10 ODER SO BEI Methode getSum()  /*
        return parseInt(total + num * 2);
        //return parseInt(total + num);

    }

    startAcc = (p) => {

        this._punkteAddieren(p).done();

        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                routeName: 'Switchscreen'
                })],
        });
        this.props.navigation.dispatch(resetAction);

    };

    _loadPics = async () => {

        const app = await AsyncStorage.getItem('appPic');
        const avo = await AsyncStorage.getItem('avoPic');
        if (app !== null || avo !== null)  {
            this.state.aaPic.push(app);
            this.state.aaPic.push(avo);
            this.setState({randomPic: this.state.aaPic[this.state.randomInt]});
        } else {
            if (this.state.runAcc) {
                this.setState({runAcc: false});
            }
            Alert.alert(
                    'Achtung!', 'Bitte zunächst Bilder für das Spiel auswählen.',
                    [
                        {
                            text: 'weiter', onPress: () => this._endAcc()
                        }
                    ],
                    {cancelable: false}
            )
        }

    };

    _punkteAddieren = async(p) => {
        if(p >= 1) {
            const value = await AsyncStorage.getItem('punkteGesamt');
            if (value !== null) {
                const pktNeu = p + Number(value);
                await AsyncStorage.setItem('punkteGesamt', pktNeu.toString());
            } else {
                await AsyncStorage.setItem('punkteGesamt', p.toString());
            }
        }
    };

    _endAcc = async() => {

        const pktGesamt = await AsyncStorage.getItem('punkteGesamt');
        if (this.state.runAcc) {
            this.setState({runAcc: false});
        }

        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                routeName: 'TabNavigator',
            })],
        });
        this.props.navigation.dispatch(resetAction);

        if (pktGesamt !== null){
            Alert.alert(
                'Prima!', 'Du hast insgesamt schon ' + pktGesamt + ' ml Wasser gesammelt',
                [
                    {
                        text: 'Ok', onPress: () => console.log('OK Pressed')
                    }
                ],
                {cancelable: false}
            );
        }

    };

    timeoutMethod = () => {
        this.setState({runAcc: false});
    };

    // formula = (g = 0) => 0.9 * g + 0.1 * (this.state.z - g) * 10;
    // formula2 = (v) => v - this.formula(this.g);


    render() {
        if (this.state.runAcc) {
            movpic.push(this.state.z);
            const a = 10 * movpic.reduceRight(this.getSum);
            return (
                <View style={styles.container}>

                    {/*<Value name="c" value={c} />*/}
                    {/*<Value name="x" value={x} />*/}
                    {/*<Value name="z" value={this.state.z} />*/}

                    <View style={[styles.boxContainer, styles.boxOne]}>
                        <Image
                            style={{
                                alignSelf: 'center',
                                height: (200 + a),
                                width: (200 + a),
                                borderRadius: 5
                            }}
                            source={{uri: this.state.randomPic}}
                            // resizeMode="stretch"
                        />
                    </View>

                    <TouchableOpacity style={styles.to} onPress={() => this._endAcc()}>
                        <Text style={styles.btntext}>Spiel beenden</Text>
                    </TouchableOpacity>


                </View>


            );
        }
        if (this.state.runAcc === false) {
            if(this.state.timer === 0){
                this.startAcc(this.state.pkt)
            }
            return (
                <View style={styles.container}>
                    <Text style={styles.header}>{this.state.lbMsg}</Text>
                </View>


            );
        }
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    to: {
        flexWrap: 'wrap',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: "#0c393d",
        margin: 20,
        padding: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
    },
    btntext: {
        fontSize: 20,
        color: '#fff',
    },
    header: {
        fontSize: 24,
        textAlign:'center',
        fontWeight: 'bold',
        color: '#fff',
    },
});
