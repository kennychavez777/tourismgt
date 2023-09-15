import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import ImagePickerButton from '../components/ImagePickerButton';

const Container = styled.ScrollView`
  flex: 1;
  background: #FFFFFF;
  flex-direction: column;
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
  borderRadius: 15px;
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

function CreatePostScreen () {
  return (
    <Container contentContainerStyle={{ alignItems: 'center' }} >
      <FormContainer>
        <LabelInput>Título</LabelInput>
        <Input />
        <LabelInput>Descripción</LabelInput>
        <Input multiline numberOfLines={4} maxLength={400} />
        <LabelInput>Ubicación</LabelInput>
        <Input />
        <ImagePickerButton />
        <Button>
          <ButtonText>Publicar</ButtonText>
        </Button>
      </FormContainer>
    </Container>
  );
}

export default CreatePostScreen;