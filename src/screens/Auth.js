import React, { Component } from 'react'
import {
    ImageBackground,
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native'

import AuthInput from '../components/AuthInput'
import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'

import { server, showError, showSuccess } from '../common'
import Axios from 'axios'

const initialState = {
    name: '',
    email: 'vinipsidonik@hotmail.com',
    password: 'gc896426',
    confirmPassword: '',
    stageNew: false
}

export default class Auth extends Component {

    state = {
        ...initialState
    }

    signup = async () => {
        try {
            await Axios.post(`${server}/signup`, {
                email: this.state.email,
                name: this.state.name,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            })

            showSuccess('Usuário cadastrado!!')
            this.setState({ ...initialState })
        } catch (err) {
            showError(err)
        }
    }

    signin = async () => {
        try {
            const res = await Axios.post(`${server}/singin`, {
                email: this.state.email,
                password: this.state.password,
            })

            Axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            this.props.navigation.navigate('Home')
        } catch (err) {
            showError(err)
        }
    }

    signInOrSignUp = () => {
        if (this.state.stageNew) {
            this.signup()
        } else {
            this.signin()
        }
    }

    render() {
        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 6)

        if (this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim().length >= 3)
            validations.push(this.state.confirmPassword === this.state.password)
        }
        validations.push(this.state.password && this.state.password.length >= 6)

        const validForm = validations.filter((val) => !val).length == 0

        return (
            <ImageBackground style={st.background} source={backgroundImage}>
                <Text style={st.title}>Tasks</Text>
                <View style={st.formContainer}>
                    <Text style={st.subtitle}>
                        {this.state.stageNew ? 'Crie a sua conta' : 'Informe os seus dados'}
                    </Text>
                    {this.state.stageNew &&
                        <AuthInput icon='user' placeholder='Nome'
                            value={this.state.name}
                            style={st.input}
                            onChangeText={name => this.setState({ name })} />
                    }
                    <AuthInput icon='at' placeholder='E-mail'
                        value={this.state.email}
                        style={st.input}
                        onChangeText={email => this.setState({ email })} />
                    <AuthInput icon='lock' placeholder='Senha'
                        value={this.state.password}
                        style={st.input} secureTextEntry
                        onChangeText={password => this.setState({ password })} />
                    {this.state.stageNew &&
                        <AuthInput icon='asterisk' placeholder='Confirmar Senha'
                            value={this.state.confirmPassword}
                            style={st.input}
                            secureTextEntry
                            onChangeText={confirmPassword => this.setState({ confirmPassword })} />
                    }
                    <TouchableOpacity disabled={!validForm}
                        onPress={this.signInOrSignUp}>
                        <View style={[st.button, validForm ? {} : {backgroundColor: '#AAA'}]} >
                            <Text style={st.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 10 }}
                        onPress={() => { this.setState({ stageNew: !this.state.stageNew }) }}>
                        <Text style={st.buttonText}>
                            {this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

const st = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer: {
        padding: 20,
        width: '90%'

    },
    input: {
        marginTop: 10,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',

    },
    buttonText: {
        fontSize: commonStyles.fontFamily,
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    }
})