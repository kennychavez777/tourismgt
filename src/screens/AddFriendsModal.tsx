import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';

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

const AddFriendsModal = () => {
  const [selectedContacts, setSelectedContacts] = useState([]);

  const toggleContactSelection = (contactId) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter((id) => id !== contactId));
    } else {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };

  const contacts = [
    { id: 1, name: 'Maria Gonzalez', image: 'https://yt3.googleusercontent.com/ytc/AOPolaTqtKeqkDGtMCiXSyCnLcYRMGggZIz9L-Gpt5i4CA=s900-c-k-c0x00ffffff-no-rj' },
    { id: 2, name: 'Rocio Fernandez', image: 'https://yt3.googleusercontent.com/ytc/AOPolaTqtKeqkDGtMCiXSyCnLcYRMGggZIz9L-Gpt5i4CA=s900-c-k-c0x00ffffff-no-rj' },
    { id: 3, name: 'Miguel Cosio', image: 'https://yt3.googleusercontent.com/ytc/AOPolaTqtKeqkDGtMCiXSyCnLcYRMGggZIz9L-Gpt5i4CA=s900-c-k-c0x00ffffff-no-rj' },
    { id: 4, name: 'Humberto Rodriguez', image: 'https://yt3.googleusercontent.com/ytc/AOPolaTqtKeqkDGtMCiXSyCnLcYRMGggZIz9L-Gpt5i4CA=s900-c-k-c0x00ffffff-no-rj' },
    { id: 5, name: 'Jenn Hernandez', image: 'https://yt3.googleusercontent.com/ytc/AOPolaTqtKeqkDGtMCiXSyCnLcYRMGggZIz9L-Gpt5i4CA=s900-c-k-c0x00ffffff-no-rj' },
  ];

  return (
    <AddFriendsModalContainer>
      {contacts.map((contact) => (
        <TouchableOpacity
          key={contact.id}
          onPress={() => toggleContactSelection(contact.id)}
        >
          <ContactItem>
            <ContactImage source={{ uri: contact.image }} />
            <ContactName>{contact.name}</ContactName>
            <ToggleContainer>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderWidth: 2,
                  borderColor: selectedContacts.includes(contact.id)
                    ? 'blue'
                    : 'gray',
                  borderRadius: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {selectedContacts.includes(contact.id) && (
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
      ))}
    </AddFriendsModalContainer>
  );
};

export default AddFriendsModal;
