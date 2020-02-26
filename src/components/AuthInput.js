import React from 'react'
import {
    View,
    StyleSheet,
    TextInput
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

export default props => {
    return (
        <View style={[st.container, props.style]}>
            <Icon name={props.icon} size={20} style={st.icon}/>
            <TextInput {...props} style={st.input}/>
        </View>
    )
}

const st = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        backgroundColor: '#EEE',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        color: '#333',
        marginLeft: 20
    },
    input: {
        marginLeft: 20,
        width: '70%',
    }
})