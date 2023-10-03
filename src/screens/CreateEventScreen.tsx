import React, { useState } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import DatePicker from 'react-native-date-picker';
import { CustomModal } from 'c'

const Container = styled.ScrollView`
  flex: 1;
  background: #FFFFFF;
  flex-direction: column;
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
  color: #FFFFFF; /* Color del texto del botón */
  font-size: 16px;
  text-align: center;
  font-weight: 600;
`;

const OpenModalButton = styled.Button`
  background-color: #007bff;
  color: #fff;
  padding: 12px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

function CreateEventScreen () {
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
        {/* <OpenModalButton onClick={handleOpenModal}>Abrir Modal</OpenModalButton> */}
        {/* <CustomModal isOpen={isModalOpen} onClose={handleCloseModal} /> */}
        <Button>
          <ButtonText>Publicar</ButtonText>
        </Button>
      </FormContainer>
    </Container>
  );
}

export default CreateEventScreen;