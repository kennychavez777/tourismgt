import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../firebase/config';
import { ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { messages, showError } from '../utils/errors';
import { useSession } from '../hooks/useSession';

const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-center: center;
`;

const Title = styled.Text`
  font-size: 24px;
	fontWeight: 500;
  color: #000000; /* Color de texto blanco */
  margin-bottom: 20px;
	alignSelf: center;
`;

const TextInput = styled.TextInput`
  width: 80%;
	alignSelf: center;
  padding: 10px;
  border-radius: 5px;
  color: #000000; /* Color del texto del campo de entrada */
  margin-bottom: 20px;
	borderStyle: solid;
	borderColor: #dbdbdb;
	borderBottomWidth: 1px;
`;

const Button = styled.TouchableOpacity`
	alignSelf: center;
	width: 80%;
  background-color: #01c8fb; /* Color de fondo del botón */
  padding: 15px 30px;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: #FFFFFF; /* Color del texto del botón */
  font-size: 16px;
  text-align: center;
`;

const FullRegisterText = styled.Text`
	color: #000000;
	fontSize: 12px;
	text-align: center;
	paddingTop: 15px;
`;

const RegisterText = styled.Text`
	color: #01c8fb;
	fontWeight: 500;
`;

function LoginScreen() {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const auth = FIREBASE_AUTH;
	
	const navigation = useNavigation();
	const { saveUser, session } = useSession();

	const changeToSignUp = () => {
		console.log('going to sign up screen');
		navigation.navigate('SignUp');
	}

	const login = async () => {
		setLoading(true);
		try {
			const response = await signInWithEmailAndPassword(auth, email, password);

			const { user } = response;
			saveUser({
				displayName: user.displayName,
				email: user.email,
				accessToken: user.accessToken
			});
		} catch (error) {
			console.log('error ', error)
			showError('Error', messages[error['code']]);
		} finally {
			setLoading(false);
		}
		navigation.navigate('Dashboard');
	}

	return (
		<Container>
			<Title>Iniciar Sesión</Title>
			<TextInput
				placeholder="Correo electrónico"
				placeholderTextColor="#999999"
				value={email}
				autoCapitalize="none"
				onChangeText={(text: string) => setEmail(text)}
			/>
			<TextInput
				placeholder="Contraseña"
				secureTextEntry={true}
				placeholderTextColor="#999999"
				value={password}
				onChangeText={(text: string) => setPassword(text)}
			/>

			{ 
				loading ? 
					<ActivityIndicator size="large" color="#0000ff" />:  
				<Button onPress={login}>
					<ButtonText>Entrar</ButtonText>
				</Button>
			}

			<FullRegisterText>
				¿No tienes cuenta?
				<RegisterText onPress={changeToSignUp}> Regístrate.</RegisterText>
			</FullRegisterText>	
		</Container>
	);
}

export default LoginScreen;