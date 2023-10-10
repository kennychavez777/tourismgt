import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-native-date-picker';
import { useNavigation } from '@react-navigation/native';

const Container = styled.ScrollView`
  flex: 1;
  background: #FFFFFF;
  flex-direction: column;
  paddingTop: 15px;
`;

const FormContainer = styled.View`
  flex: 1;
  align-content: left;
  width: 90%;
`;

const LabelInput = styled.Text`
  color: grey;
  fontSize: 14px;
  textAlign: left;
  fontWeight: 600;
  marginBottom: 5px;
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
  marginTop: 20px;
`;

const ButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  text-align: center;
  font-weight: 600;
`;

const AddFriendsButton = styled.TouchableOpacity`
  alignSelf: center;
  width: 200px;
  background-color: #01c8fb; /* Color de fondo del botón */
  padding: 15px 30px;
  border-radius: 35px;
  marginTop: 20px;
`;

function CreateEventScreen () {
  const [date, setDate] = useState(new Date());
  const navigation = useNavigation();

  const openModal = () => {
    navigation.navigate('AddFriendsModal');
  }

  return (
    <Container contentContainerStyle={{ alignItems: 'center' }} >
      <FormContainer>
        <LabelInput>Título del evento</LabelInput>
        <Input />
        <LabelInput>Descripción</LabelInput>
        <Input multiline numberOfLines={4} maxLength={400} />
        <LabelInput>Ubicación</LabelInput>
        <Input />
        <LabelInput>Hora</LabelInput>
        <DatePicker style={{ alignSelf: 'center' }} mode='time' date={date} onDateChange={setDate} />
        <AddFriendsButton onPress={openModal}>
          <ButtonText>Invitar amigos</ButtonText>
        </AddFriendsButton>
        <Button>
          <ButtonText>Publicar</ButtonText>
        </Button>
      </FormContainer>
    </Container>
  );
}

export default CreateEventScreen;