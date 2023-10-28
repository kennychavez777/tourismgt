import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useSession } from '../hooks/useSession';

import { FIRESTORE as db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const AddFriendsModalContainer = styled.ScrollView`
  flex: 1;
  
  background-color: #FFFFFF;
`;

const ContactItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px;
  border-bottom-width: 1px;
  border-color: #e0e0e0;
`;

const ContactImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 8px;
`;

const ContactName = styled.Text`
  font-size: 16px;
`;

const ToggleContainer = styled.View`
  margin-left: auto;
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

const MessageText = styled.Text`
  width: 100%;
  textAlign: center;
  fontSize: 15px;
  fontWeight: bold;
  marginTop: 15px;
`;

const AddFriendsModal = ({route, navigation}) => {
  const { getUserById, session } = useSession();

  const [contacts, setContacts] = useState([]);
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    getFriends();

  }, [])

  const getFriends = async () => {
    const snapshot = await getDoc(doc(db, 'users', session.id));

    if (snapshot.exists()) {
      const followed = snapshot.data().followed;
      const friends = await Promise.all(
        followed.map(async(userId) => {
          let user = await getUserById(userId);

          return {
            id: user.id,
            userName: user.userName,
            profile_pic: user.profile_pic,
            selected: false,
          };
        }
      ));

      setContacts(friends);
    }
  }

  const toggleContactSelection = (contact) => {
    let c = contacts.map((item) => {
      if (item.id === contact.id) {
        item.selected = !item.selected;
      }

      return item;
    });

    setContacts(c);

    let g = [];

    c.forEach(item => {
      if (item.selected) {
        g.push(item);
      }
    })

    setGuests(g);
    route.params.closeModal(g);
  };

  const goBack = () => {
    navigation.goBack();
  }

  return (
    <AddFriendsModalContainer>
      {
        contacts.length > 0 ?
          contacts.map((contact) => (
            <TouchableOpacity
              key={contact.id}
              onPress={() => toggleContactSelection(contact)}
            >
              <ContactItem>
                <ContactImage source={{ uri: contact.profile_pic }} />
                <ContactName>{contact.userName}</ContactName>
                <ToggleContainer>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderWidth: 2,
                      borderColor: contact.selected
                        ? 'blue'
                        : 'gray',
                      borderRadius: 12,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {contact.selected && (
                      <View
                        style={{
                          width: 12,
                          height: 12,
                          backgroundColor: 'blue',
                          borderRadius: 6,
                        }}
                      />
                    )}
                  </View>
                </ToggleContainer>
              </ContactItem>
            </TouchableOpacity>
          ))
        :
        <MessageText>No hay usuarios para invitar</MessageText>
      }
      {
        contacts.length > 0 ? 
          <Button onPress={goBack}>
            <ButtonText>Guardar</ButtonText>
          </Button>
        :
        null
      }
    </AddFriendsModalContainer>
  );
};

export default AddFriendsModal;
