import React from 'react';
import styled from 'styled-components';
import { Text } from 'react-native';

const Container = styled.View`
  flex-direction: row;
  width: 100%;
  height: 120px;
  paddingLeft: 25px;
  paddingRight: 25px;
  marginTop: 25px;
`;

const Picture = styled.Image`
  width: 90px;
  height: 90px;
  borderRadius: 65px;
`;

const UserInfoContainer = styled.View`
  width: 100%;
  marginLeft: 15px;
`;

const NameText = styled.Text`
  fontSize: 22px;
  color: black;
  fontWeight: 700;
`;

const UserNameText = styled.Text`
  fontSize: 14px;
  color: black;
  fontWeight: 500;
`;

const StatisticsContainer = styled.View`
  flex-direction: row;
  width: 100%;
  marginTop: 10px;
`;

const StatisticsText = styled.Text`
  fontSize: 16px;
  color: black;
  fontWeight: 500;
`;

const Label = styled.Text`
  fontSize: 13px;
  color: grey;
  fontWeight: 700;
  marginRight: 5px;
`;

function ProfileData() {
  return (
    <Container>
      <Picture source={{ uri: 'https://yt3.googleusercontent.com/ytc/AOPolaTqtKeqkDGtMCiXSyCnLcYRMGggZIz9L-Gpt5i4CA=s900-c-k-c0x00ffffff-no-rj' }} />
      <UserInfoContainer>
        <NameText>Melissa Rodriguez</NameText>
        <UserNameText>@melirodriguez</UserNameText>
        <StatisticsContainer>
          <StatisticsText>855 </StatisticsText><Label>Me gusta </Label>
          <StatisticsText>4 </StatisticsText><Label> Publicaciones</Label>
        </StatisticsContainer>
      </UserInfoContainer>
    </Container>
  );
}

export default ProfileData;