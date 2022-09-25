import React, { Component } from "react";
import {Animated, AsyncStorage, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import Progressbar from './Progressbar';

const fBox = [{image:require('./flower/f1.png')},{image:require('./flower/f2.png')},{image:require('./flower/f3.png')},
    {image:require('./flower/f4.png')},{image:require('./flower/f5.png')},{image:require('./flower/f6.png')},
    {image:require('./flower/f7.png')},{image:require('./flower/f8.png')},];

export default class Tama extends Component {


    constructor(props) {
        super(props);
        this.state = {
            punkteGesamt: '',
            prozent: '',
            lvl: '',
            aniLvl: '',
            fadeValue: new Animated.Value(0),
        };
    }

    async componentWillMount(){
        this._init().done();
    }

    componentDidMount(){
        this._fadeAnimation();
    }

    async componentWillUnmount() {
        await AsyncStorage.setItem('prz', this.state.prozent.toString());
        await AsyncStorage.setItem('lvl', this.state.aniLvl.toString());
    }

    _init = async() => {

        let lvl = await AsyncStorage.getItem('lvl');
        this.setState({lvl: Number(lvl)});
        this.setState({aniLvl: Number(lvl)});

        let prz = await AsyncStorage.getItem('prz');
        this.setState({prozent: Number(prz)});

        let pg = await AsyncStorage.getItem('punkteGesamt');
        this.setState({punkteGesamt: pg});

    };

    _setLvl = async() => {
        await AsyncStorage.setItem('prz', this.state.prozent.toString());
        await AsyncStorage.setItem('lvl', this.state.aniLvl.toString());
    };

    _fadeAnimation = () => {
        Animated.timing(this.state.fadeValue, {
            toValue: 1,
            duration: 2000,
        }).start();
    };

    _checkScore = async() => {
        if(this.state.punkteGesamt >= 5000 && this.state.punkteGesamt < 10000){
            this.setState({prozent: ((this.state.punkteGesamt - 5000) / 5000) * 100});
            this.setState({aniLvl: 1});
            this._fadeAnimation();
            this._setLvl().done();
        }
        if(this.state.punkteGesamt >= 10000 && this.state.punkteGesamt < 15000){
            this.setState({prozent: ((this.state.punkteGesamt - 10000) / 5000) * 100});
            this.setState({aniLvl: 2});
            this._fadeAnimation();
            this._setLvl().done();
        }
        if(this.state.punkteGesamt >= 15000 && this.state.punkteGesamt < 20000){
            this.setState({prozent: ((this.state.punkteGesamt - 15000) / 5000) * 100});
            this.setState({aniLvl: 3});
            this._fadeAnimation();
            this._setLvl().done();
        }
        if(this.state.punkteGesamt >= 20000 && this.state.punkteGesamt < 25000){
            this.setState({prozent: ((this.state.punkteGesamt - 20000) / 5000) * 100});
            this.setState({aniLvl: 4});
            this._fadeAnimation();
            this._setLvl().done();
        }
        if(this.state.punkteGesamt >= 25000 && this.state.punkteGesamt < 30000){
            this.setState({prozent: ((this.state.punkteGesamt - 25000) / 5000) * 100});
            this.setState({aniLvl: 5});
            this._fadeAnimation();
            this._setLvl().done();
        }
        if(this.state.punkteGesamt >= 30000 && this.state.punkteGesamt < 35000){
            this.setState({prozent: ((this.state.punkteGesamt - 30000) / 5000) * 100});
            this.setState({aniLvl: 6});
            this._fadeAnimation();
            this._setLvl().done();
        }
        if(this.state.punkteGesamt >= 35000 && this.state.punkteGesamt < 40000){
            this.setState({prozent: ((this.state.punkteGesamt - 35000) / 5000) * 100});
            this.setState({aniLvl: 7});
            this._fadeAnimation();
            this._setLvl().done();
        }
        if(this.state.punkteGesamt >= 20000){
            await AsyncStorage.setItem('punkteGesamt','');
            await AsyncStorage.setItem('prz','');
            await AsyncStorage.setItem('lvl','');
            await AsyncStorage.setItem("avoPic", '');
            await AsyncStorage.setItem("appPic", '');
            this.setState({prozent: 0});
            this.setState({aniLvl: 0});
            this._fadeAnimation();
        }
    };

    _lvlUp = async() => {

        if(this.state.lvl === 0){
            let c = (this.state.punkteGesamt / 5000) * 100;
            if (c <= 100){
                this.setState({prozent: c});
                this._setLvl().done();
            }
            else{
                this._checkScore().done();
            }
        }
        if(this.state.lvl === 1){
            let c = ((this.state.punkteGesamt - 5000) / 5000) * 100;
            if (c <= 100){
                this.setState({prozent: c});
                this._setLvl().done();
            }
            else{
                this._checkScore().done();
            }
        }
        if(this.state.lvl === 2){
            let c = ((this.state.punkteGesamt - 10000) / 5000) * 100;
            if (c <= 100){
                this.setState({prozent: c});
                this._setLvl().done();
            }
            else{
                this._checkScore().done();
            }
        }
        if(this.state.lvl === 3){
            let c = ((this.state.punkteGesamt - 15000) / 5000) * 100;
            if (c <= 100){
                this.setState({prozent: c});
                this._setLvl().done();
            }
            else{
                this._checkScore().done();
            }
        }
        if(this.state.lvl === 4){
            let c = ((this.state.punkteGesamt - 20000) / 5000) * 100;
            if (c <= 100){
                this.setState({prozent: c});
                this._setLvl().done();
            }
            else{
                this._checkScore().done();
            }
        }
        if(this.state.lvl === 5){
            let c = ((this.state.punkteGesamt - 25000) / 5000) * 100;
            if (c <= 100){
                this.setState({prozent: c});
                this._setLvl().done();
            }
            else{
                this._checkScore().done();
            }
        }
        if(this.state.lvl === 6){
            let c = ((this.state.punkteGesamt - 30000) / 5000) * 100;
            if (c <= 100){
                this.setState({prozent: c});
                this._setLvl().done();
            }
            else{
                this._checkScore().done();
            }
        }
        if(this.state.lvl === 7){
            let c = ((this.state.punkteGesamt - 35000) / 5000) * 100;
            if (c <= 100){
                this.setState({prozent: c});
                this._setLvl().done();
            }
            else{
                await AsyncStorage.setItem('punkteGesamt','');
                await AsyncStorage.setItem('prz','');
                await AsyncStorage.setItem('lvl','');
                await AsyncStorage.setItem("avoPic", '');
                await AsyncStorage.setItem("appPic", '');
                this.setState({prozent: 0});
                this.setState({aniLvl: 0});
                this._fadeAnimation();
            }
        }
    };

    startAni = () => {
        if(this.state.aniLvl === 0 ){
            return fBox[0].image;
        }
        if(this.state.aniLvl === 1){
            return fBox[1].image;
        }
        if(this.state.aniLvl === 2){
            return fBox[2].image;
        }
        if(this.state.aniLvl === 3){
            return fBox[3].image;
        }
        if(this.state.aniLvl === 4 ){
            return fBox[4].image;
        }
        if(this.state.aniLvl === 5){
            return fBox[5].image;
        }
        if(this.state.aniLvl === 6){
            return fBox[6].image;
        }
        if(this.state.aniLvl === 7){
            return fBox[7].image;
        }
    };

    render() {

        return (
            <View style={styles.container}>
                <View style={[styles.boxContainer, styles.boxOne]}>
                    {/*<Text style={styles.headline}>-=[ Stufe: {this.state.aniLvl} ]=-*/}
                        {/*{"\n"}Gesamtpunktzahl: {this.state.punkteGesamt}*/}
                    {/*</Text>*/}
                    <React.Fragment>
                        <View style={styles.fbar}>
                            <Progressbar value={this.state.prozent}/>
                        </View>
                    </React.Fragment>
                    <Animated.View style={[{opacity: this.state.fadeValue}]}>
                        <Image source={this.startAni()} style={{width: 150, height: 300, }}/>
                    </Animated.View>

                    <TouchableOpacity style={styles.to} onPress={() => this._lvlUp()}>
                        <Text style={styles.btntext}>Blume gießen</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
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
        justifyContent: 'space-around',
    },
    boxOne:{
        flex: 1,
    },
    fbar: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 0.75,
        borderColor: '#fff',
    },
    to: {
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: "#0c393d",
        marginTop:10,
        marginBottom:15,
        padding: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
    },
    btntext: {
        fontSize: 20,
        color: '#fff',
    },
    headline: {
        fontSize: 18,
        textAlign: "center",
        margin: 10,
        color: '#fff',
    },
});
