import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../firebase/config';
import { FIRESTORE as db } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ActivityIndicator } from 'react-native';
import { messages, showError } from '../utils/errors';
import { addDoc, collection } from 'firebase/firestore';
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

function SignUpScreen() {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');
	const [ userName, setUserName ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const auth = FIREBASE_AUTH;
	const navigation = useNavigation();
	const { saveUser, session } = useSession();

	const createUser = async () => {
		setLoading(true);

		try {
			if (password === confirmPassword) {
				const response = await createUserWithEmailAndPassword(auth, email, password);
				const newUser = {
					email, password, userName
				}

				await addDoc(collection(db, 'users'), newUser);

				const { user } = response;
				saveUser({
					displayName: user.displayName,
					email: user.email,
					accessToken: user.accessToken
				});
			} else {
				showError('Error', 'Las contraseñas no son iguales.')
			}
		} catch( error ) {
			console.log('error', error)
			showError('Error', messages[error['code']]);
		} finally {
			setLoading(false);
		}
	}

	

	const changeToLogin = () => {
		console.log('going to sign up screen');
		navigation.navigate('Login');
	}

	return (
		<Container>
			<Title>Registrarse</Title>
			<TextInput
				placeholder="Correo electrónico"
				placeholderTextColor="#999999"
				value={email}
				onChangeText={(text: string) => setEmail(text)}
			/>
			<TextInput
				placeholder="Nombre de usuario"
				placeholderTextColor="#999999"
				value={userName}
				onChangeText={(text: string) => setUserName(text)}
			/>
			<TextInput
				placeholder="Contraseña"
				placeholderTextColor="#999999"
				value={password}
				secureTextEntry={true}
				onChangeText={(text: string) => setPassword(text)}
			/>
			<TextInput
				placeholder="Contraseña"
				placeholderTextColor="#999999"
				value={confirmPassword}
				secureTextEntry={true}
				onChangeText={(text: string) => setConfirmPassword(text)}
			/>
			{ 
				loading ? 
					<ActivityIndicator size="large" color="#0000ff" />
					:  
					<Button onPress={createUser}>
						<ButtonText>Entrar</ButtonText>
					</Button>
			}
			

			<FullRegisterText>
				¿Ya tienes cuenta?
				<RegisterText onPress={changeToLogin}> Inicia sesión.</RegisterText>
			</FullRegisterText>	
		</Container>
	);
}

export default SignUpScreen;