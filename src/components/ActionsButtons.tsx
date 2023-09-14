import React from 'react';
import styled from 'styled-components';
import { Text } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
// import { faHeart as heart } from '@fortawesome/'

const ActionButtonsContainer = styled.View`
  width: 100%;
  height: 25px;
  flex-direction: row;
`;

const ActionItemContainer = styled.Text`
  marginRight: 15px;
  color: grey;
  fontSize: 16px;
  fontWeight: 800;
`;

function ActionsButtons () {
  return (
    <ActionButtonsContainer>
      <ActionItemContainer>
        <FontAwesomeIcon icon={faHeart} size={25} color='grey' style={{ paddingTop: 10 }} /> 4500
      </ActionItemContainer>
      <ActionItemContainer>
        <FontAwesomeIcon icon={faComment} size={25} color='grey' /> 60
      </ActionItemContainer>
    </ActionButtonsContainer>
  )
}

export default ActionsButtons;