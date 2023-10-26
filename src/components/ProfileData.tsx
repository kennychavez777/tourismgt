import React from 'react';
import styled from 'styled-components';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

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
  marginTop: 5px;
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

const ConfigContainer = styled.View`
  flex-direction: row;
  width: 68%;
  marginTop: 8px;
`;

const FollowButton = styled.TouchableOpacity`
	alignSelf: center;
	width: 100%;
  background-color: #01c8fb; /* Color de fondo del botón */
  padding: 10px 30px;
  border-radius: 5px;
`;

const EditButton = styled.TouchableOpacity`
	alignSelf: center;
	width: 100%;
  background-color: grey; /* Color de fondo del botón */
  padding: 7px 30px;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: #FFFFFF; /* Color del texto del botón */
  font-size: 16px;
  text-align: center;
`;


function ProfileData({ user, totalLikes, totalPosts, isMyProfile}) {
  const navigation = useNavigation();
  
  return (
    <Container>
      <Picture source={{ uri: 'https://yt3.googleusercontent.com/ytc/AOPolaTqtKeqkDGtMCiXSyCnLcYRMGggZIz9L-Gpt5i4CA=s900-c-k-c0x00ffffff-no-rj' }} />
      <UserInfoContainer>
        <NameText>@{user.userName}</NameText>
        {/* <UserNameText>@melirodriguez</UserNameText> */}
        <StatisticsContainer>
          <Label><StatisticsText>{totalLikes} </StatisticsText>Me gusta </Label>
          <Label><StatisticsText>{totalPosts} </StatisticsText> Publicaciones</Label>
        </StatisticsContainer>
        <ConfigContainer>
          {
            isMyProfile ?
            <EditButton onPress={() => navigation.navigate('Editar Perfil', user)}>
              <ButtonText><FontAwesomeIcon icon={faGear} color="#FFFFFF" size={20} /> Editar Perfil</ButtonText>
            </EditButton>
            :
            <FollowButton onPress={() => navigation.navigate('Editar Perfil', user)}>
              <ButtonText>Editar</ButtonText>
            </FollowButton>
          }
          
        </ConfigContainer>
      </UserInfoContainer>
    </Container>
  );
}

export default ProfileData;