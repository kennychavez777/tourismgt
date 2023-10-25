import React from 'react';
import styled from 'styled-components';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Container = styled.View`
  width: 100%;
  marginTop: 15px;
  marginBottom: 15px;
  flex-direction: row;
`;

const Picture = styled.Image`
  width: 65px;
  height: 65px;
  borderRadius: 55px;
`;

const UsernameContainer = styled.View`
  width: 100%;
  marginLeft: 10px;
  flex-direction: row;
`;

const PostedByLabel = styled.Text`
  color: grey;
  fontWeight: 700;
  fontSize: 14px;
`;

const UserNameLabel = styled.Text`
  color: black;
  fontWeight: 800;
  fontSize: 18px;
`;

const ActionItemContainer = styled.Text`
  color: grey;
  fontSize: 16px;
  fontWeight: 800;
`;

const DataContainer  = styled.View`
  width: 60%;
  flex-direction: column;
`;

const LikeContainer = styled.View`
  width: 40%;
  paddingTop: 15px;
`;

const PostedBy = ({by}) => {
  return (
    <Container>
      <Picture
        source={{ uri: by.profile_pic }}
      />
      <UsernameContainer>
        <DataContainer>
          <PostedByLabel>Publicado por</PostedByLabel>
          <UserNameLabel>@{by.userName}</UserNameLabel>
        </DataContainer>
        <LikeContainer>
          <ActionItemContainer>
            <FontAwesomeIcon icon={faHeart} size={30} color='red' style={{ paddingTop: 10 }} />
          </ActionItemContainer>
        </LikeContainer>
      </UsernameContainer>
    </Container>
  );
}

export default PostedBy;
