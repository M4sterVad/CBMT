import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

function Progressbar (props) {

    return (
        <View style={styles.container}>
            <View style={[styles.progress_bar, {width: 300 * (props.value / 100)}]}></View>
            <Text style={styles.text}>Noch {parseInt(5000 - (props.value * (1/100))*5000)} ml Wasser benötigt</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: 300,
        justifyContent: 'center',
        backgroundColor: '#546D64',
        borderRadius: 5,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        color: '#ffffff',
    },
    progress_bar: {
        position: 'absolute',
        height: 40,
        alignSelf: 'flex-start',
        backgroundColor: '#11afb3',
        borderRadius: 5,
    }
});

export default Progressbar