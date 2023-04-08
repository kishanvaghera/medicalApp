import React from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';
import { scale } from '../utils/scalling';

const Loader = (props) => {
    const { loading, ...attributes } = props;

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}
            onRequestClose={() => {
            }}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator
                        animating={true}
                        color="#f68b1f"
                        size="small"
                        style={styles.activityIndicator}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default Loader;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
        // marginTop:scale(45)
    },
    activityIndicatorWrapper: {
        backgroundColor: '#f6f7fb',
        height: 75,
        width: 75,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 75,
    },
});