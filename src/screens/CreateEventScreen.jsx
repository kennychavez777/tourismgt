import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-native-date-picker';
import { useNavigation } from '@react-navigation/native';
import { useSession } from '../hooks/useSession';

import { FIRESTORE as db } from '../firebase/config';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { showError } from '../utils/errors';
import { getCurrentDateAndTime } from '../utils/utilities';
import { ActivityIndicator } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';

const Container = styled.ScrollView`
  flex: 1;
  background: #FFFFFF;
  flex-direction: column;
  paddingTop: 15px;
`;

const FormContainer = styled.ScrollView`
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
  paddingLeft: 12px;
`;

const Button = styled.TouchableOpacity`
	alignSelf: center;
	width: 200px;
  background-color: #01c8fb; /* Color de fondo del botón */
  padding: 15px 30px;
  border-radius: 35px;
  marginTop: 20px;
  marginBottom: 50px;
`;

const ButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  text-align: center;
  font-weight: 600;
`;

const AddFriendsButton = styled.TouchableOpacity`
  alignSelf: center;
  width: 180px;
  justify-content: center;
  background-color: orange; /* Color de fondo del botón */
  border-radius: 35px;
  marginTop: 20px;
  flex-direction: row;
	alignItems: center;
  height: 35px;
  gap: 5px;
`;

const FriendsMainContainer = styled.View`
  width: 100%;
  height: auto;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 20px;
  column-gap: 20px;
  justify-content: center;
  paddingTop: 15px;
`;

const FriendsContainer = styled.View`
  width: 29%;
  flex-direction: row;
  justify-content: center;
  borderWitdh: 2px;
  borderColor: red;
`;

const FriendsNameText = styled.Text`
 fontSize: 17px;
 fontWeight: bold;
`;

const Picture = styled.Image`
  width: 25px;
  height: 25px;
  borderRadius: 20px;
  marginRight: 3px;
`;

function CreateEventScreen ({ route, nav}) {
  const navigation = useNavigation();
  const { session } = useSession();
  const { selectedDay } = route.params;
  // {"selectedDay": {"dateString": "2023-10-28", "day": 28, "month": 10, "timestamp": 1698451200000, "year": 2023}}
  useEffect(() => {
    setLoading(false);
  }, [])

  // form state
  const [time, setTime] = useState(new Date());
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ location, setLocation ] = useState('');
  const [ friends, setFriends ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  const openModal = () => {
    navigation.navigate('Invitar Amigos', {
      closeModal: (data) => {
        setFriends(data);
      }
    });
  }

  const getFriends = () => {
    let f = [];

    friends.forEach(item => {
      f.push(item.id);
    });

    return f;
  }

  const createEventHandler = async() => {
    if (!title) {
      showError('Error', 'El título no puede quedar vacío.')
    }

    if (!description) {
      showError('Error', 'La descripción no puede quedar vacía.')
    }

    if (!location) {
      showError('Error', 'La ubicación no puede quedar vacía.')
    }

    setLoading(true);
    const options = {
      timeZone: 'America/Guatemala',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };

    const gtTime = time.toLocaleDateString('es-GT', options);
    const onlyTime = gtTime.split(' ')[1];

    let newEvent = {
      title: title,
      description: description,
      location: location,
      date: selectedDay.dateString,
      time: onlyTime,
      fullDateAndtime: `${selectedDay.dateString} ${onlyTime}`,
      ownerEmail: session.email,
      ownerId: session.id,
      createdAt: getCurrentDateAndTime(),
      friends: getFriends()
    }

    await addDoc(collection(db, 'events'), newEvent);
    navigation.goBack();

    setLoading(false)
  }

  return (
    <Container contentContainerStyle={{ alignItems: 'center' }} >
      <FormContainer>
        <LabelInput>Título del evento</LabelInput>
        <Input 
          placeholder={title}
          placeholderTextColor="#999999"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <LabelInput>Descripción</LabelInput>
        <Input 
          textAlignVertical="top"
          multiline={true} 
          numberOfLines={4} 
          maxLength={400} 
          placeholder={description}
          placeholderTextColor="#999999"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <LabelInput>Ubicación</LabelInput>
        <Input 
          placeholder={location}
          placeholderTextColor="#999999"
          value={location}
          onChangeText={(text) => setLocation(text)}
        />
        <LabelInput>Hora</LabelInput>
        <DatePicker style={{ alignSelf: 'center' }} mode='time' date={time} onDateChange={setTime} />
        <AddFriendsButton onPress={openModal}>
          <FontAwesomeIcon icon={faUserPlus} color="#FFFFFF" size={16} />
          <ButtonText>Invitar amigos</ButtonText>
        </AddFriendsButton>
        <FriendsMainContainer>
          {
            friends.map((f, i) => (
              <FriendsContainer key={i}>
                <Picture source={{
                  uri: f.profile_pic
                }} />
                <FriendsNameText>
                  {f.userName}
                </FriendsNameText>
              </FriendsContainer>
            ))
          }
        </FriendsMainContainer>
        { 
          loading ? 
            <ActivityIndicator size="large" color="#0000ff" />
            :  
            <Button onPress={createEventHandler}>
              <ButtonText>Guardar</ButtonText>
            </Button>
        }
      </FormContainer>
    </Container>
  );
}

export default CreateEventScreen;