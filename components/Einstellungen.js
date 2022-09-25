import React, { Component } from "react";
import { AsyncStorage, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ImagePicker = require('react-native-image-picker');

export default class Einstellungen extends Component {


    constructor(props) {
        super(props);
        this.state = {
            appPic: null,
            avoPic: null,
        };
    }

    componentDidMount(){
        this._loadAppPic().done();
        this._loadAvoPic().done();
    }

    _loadAppPic = async () => {

        const app = await AsyncStorage.getItem('appPic');
        if (app !== null) {
            this.setState({appPic: app});
        }

    };

    _loadAvoPic = async () => {

        const avo = await AsyncStorage.getItem('avoPic');
        if (avo !== null) {
            this.setState({avoPic: avo});
        }

    };

    _saveAppPic = async () => {
        await AsyncStorage.setItem("appPic", this.state.appPic);
    };
    _saveAvoPic = async () => {
        await AsyncStorage.setItem("avoPic", this.state.avoPic);
    };


    chooseApproach = () => {
        const options = {
            title: 'Will ich bevorzugt essen',
            cancelButtonTitle: 'Abbrechen',
            takePhotoButtonTitle: 'Benutze Kamera',
            chooseFromLibraryButtonTitle: 'Bild aus Gallery',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({appPic: response.uri});
                this._saveAppPic().done();
            }
        });
    };

    chooseAvoidance = () => {
        const options = {
            title: 'Will ich weniger essen',
            cancelButtonTitle: 'Abbrechen',
            takePhotoButtonTitle: 'Benutze Kamera',
            chooseFromLibraryButtonTitle: 'Bild aus Gallery',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({avoPic: response.uri});
                this._saveAvoPic().done();
            }
        });
    };

    _reset = async() => {
        await AsyncStorage.setItem('punkteGesamt','');
        await AsyncStorage.setItem('prz','');
        await AsyncStorage.setItem('lvl','');
    };



    render() {

        return (
            <View style={styles.container}>
                <ScrollView>

                <View style={[styles.boxContainer, styles.boxOne]}>

                    <Text style={styles.text}>Das will ich weniger essen</Text>
                    <TouchableOpacity style={styles.to} onPress={this.chooseAvoidance.bind(this)}>
                        <View style={styles.frame}>
                            {
                                this.state.avoPic === null ? (<Text style={styles.cross}>+</Text>) :
                                    (<Image
                                        style={{
                                            alignSelf: 'center',
                                            height: (200),
                                            width: (200),
                                            borderRadius: 5
                                        }}
                                        source={{uri: this.state.avoPic}}
                                        resizeMode="stretch"
                                    />)
                            }
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={[styles.boxContainer, styles.boxOne]}>

                    <Text style={styles.text}>Das will ich bevorzugt essen</Text>
                    <TouchableOpacity style={styles.to} onPress={this.chooseApproach.bind(this)}>
                        <View style={styles.frame}>
                            {
                                this.state.appPic === null ? (<Text style={styles.cross}>+</Text>) :
                                    (<Image
                                        style={{
                                            alignSelf: 'center',
                                            height: (200),
                                            width: (200),
                                            borderRadius: 5
                                        }}
                                        source={{uri: this.state.appPic}}
                                        resizeMode="stretch"
                                    />)
                            }
                        </View>
                    </TouchableOpacity>

                </View>
                {/*<View style={[styles.boxContainer, styles.boxOne]}>*/}
                    {/*<TouchableOpacity style={styles.to2} onPress={() => this._reset()}>*/}
                        {/*<Text style={styles.btntext}>RESET</Text>*/}
                    {/*</TouchableOpacity>*/}
                {/*</View>*/}

            </ScrollView>

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
        paddingBottom: 50,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 5,
    },
    boxOne:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom:20,
    },
    to: {
        flexWrap: 'wrap',
        alignItems: 'center',
        alignSelf: 'center',
    },
    to2: {
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
    cross:{
        fontSize: 24,
        textAlign:'center',
        color: '#ffffff',
        alignItems: 'center',
    },
    frame:{
        justifyContent: 'space-around',
        alignItems: 'center',
        height: (200),
        width: (200),
        borderRadius: 5,
        borderColor: '#fff',
        borderWidth: 1,
    }
});
