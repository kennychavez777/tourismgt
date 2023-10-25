import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { useNavigation } from '@react-navigation/native';
// import { faHeart as heart } from '@fortawesome/'

const ActionButtonsContainer = styled.TouchableOpacity`
  width: 100%;
  height: 25px;
  flex-direction: row;
  marginLeft: 10px;
`;

const ActionItemContainer = styled.Text`
  marginRight: 15px;
  color: grey;
  fontSize: 16px;
  fontWeight: 800;
`;

function ActionsButtons ({likes, comments, data}) {
  let total_comments = Array.from(comments).length;
  const navigation = useNavigation();

  return (
    <ActionButtonsContainer onPress={() => navigation.navigate('Detalle de Post', data)}>
      <ActionItemContainer>
        <FontAwesomeIcon icon={faHeart} size={25} color='grey' style={{ paddingTop: 10 }} /> {likes}
      </ActionItemContainer>
      <ActionItemContainer>
        <FontAwesomeIcon icon={faComment} size={25} color='grey' /> {total_comments}
      </ActionItemContainer>
    </ActionButtonsContainer>
  )
}

export default ActionsButtons;