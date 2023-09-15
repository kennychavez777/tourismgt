import React from 'react';
import styled from 'styled-components';
import { Text } from 'react-native';

const Container = styled.ScrollView`
  flex: 1;
  background: #FFFFFF;
  flex-direction: column;
`;

const ProfilePic = styled.Image`
  width: 90px;
  height: 90px;
  borderRadius: 65px;
`;

const ChangePicLabel = styled.Text`
  color: black;
  fontSize: 12px;
  fontWeight: 500;
  marginTop: 5px;
  marginBottom: 25px;
`;

const FormContainer = styled.View`
  flex: 1;
  align-content: left;
  width: 80%;
`;

const LabelInput = styled.Text`
  color: grey;
  fontSize: 14px;
  textAlign: left;
  fontWeight: 600;
  
`;

const Input = styled.TextInput`
  width: 100%;
  borderWidth: 1px;
  borderColor: grey;
  borderRadius: 25px;
  marginBottom: 15px;
`;

const Button = styled.TouchableOpacity`
	alignSelf: center;
	width: 200px;
  background-color: #01c8fb; /* Color de fondo del botón */
  padding: 15px 30px;
  border-radius: 35px;
`;

const ButtonText = styled.Text`
  color: #FFFFFF; /* Color del texto del botón */
  font-size: 16px;
  text-align: center;
  font-weight: 600;
`;

function EditProfileScreen() {
  return (
    <Container contentContainerStyle={{ alignItems: 'center' }} >
      <ProfilePic source={{ uri: 'https://yt3.googleusercontent.com/ytc/AOPolaTqtKeqkDGtMCiXSyCnLcYRMGggZIz9L-Gpt5i4CA=s900-c-k-c0x00ffffff-no-rj' }} />
      <ChangePicLabel>Cambiar foto de perfil</ChangePicLabel>
      <FormContainer>
        <LabelInput>Nombre de Usuario</LabelInput>
        <Input />
        <LabelInput>Nombre Completo</LabelInput>
        <Input />
        <LabelInput>Correo electrónico</LabelInput>
        <Input keyboardType="email-address" />
        <LabelInput>Cambia tu contraseña</LabelInput>
        <Input secureTextEntry={true}/>
        <LabelInput>Verifica tu contraseña</LabelInput>
        <Input secureTextEntry={true} />
        <Button>
          <ButtonText>Guardar</ButtonText>
        </Button>
      </FormContainer>
    </Container>
  );
}

export default EditProfileScreen;