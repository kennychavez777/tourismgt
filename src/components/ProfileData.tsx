import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

import { useNavigation } from '@react-navigation/native';
import { useSession } from '../hooks/useSession';
import { useActionsButtons } from '../hooks/useActionsButtons';

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
  padding: 7px 30px;
  border-radius: 5px;
`;

const FollowedButton = styled.TouchableOpacity`
	alignSelf: center;
	width: 100%;
  background-color: #5db9d1; /* Color de fondo del botón */
  padding: 7px 30px;
  border-radius: 5px;
`;

const EditButton = styled.TouchableOpacity`
  flex-direction: row;
	alignItems: center;
  background-color: #7a7d7f; /* Color de fondo del botón */
  padding: 7px 30px;
  border-radius: 5px;
`;
// seguido #b9babb
const ButtonText = styled.Text`
  color: #FFFFFF; 
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  marginLeft: 7px;
`;

function ProfileData({ user, totalLikes, totalPosts, isMyProfile}) {
  const navigation = useNavigation();
  const { session, getUserById } = useSession();
  const { updateFollowers } = useActionsButtons();

  const [ allFollowers, setAllFollowers ] = useState([]);
  const [ isFollowing, setIsFollowing ] = useState(false);

  useEffect(() => {
    setParams();
  }, [user])

  const setParams = async() => {
    if (user && user.id) {
      const f = await getUserById(user.id);
      const isThere = f.followers.includes(session.id);
      
      if (isThere) {
        setIsFollowing(isThere);
      }

      setAllFollowers(f.followers);
    }
  }

  const handleFollow = () => {
    let newFollowers = [...allFollowers];
    const isThere = newFollowers.includes(session.id);

    if (isThere) {
      newFollowers.splice(newFollowers.indexOf(session.id), 1);
    } else {
      newFollowers.push(session.id);
    }

    updateFollowers(newFollowers, user.id);
    setAllFollowers(newFollowers);
    setIsFollowing(!isThere);
  }
  
  return (
    <Container>
      <Picture source={{ uri: user.profile_pic ? user.profile_pic : 'https://firebasestorage.googleapis.com/v0/b/tourism-gt.appspot.com/o/default%2Fuser-icon.jpg?alt=media&token=230702d9-c172-49ba-a410-037fdd019c7e&_gl=1*wn4unb*_ga*MTY5NzE4OTkyLjE2OTcwMDEyMTg.*_ga_CW55HF8NVT*MTY5OTAyMTIxMS44Mi4xLjE2OTkwMjI4MTYuNDAuMC4w' }} />
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
                <FontAwesomeIcon icon={faGear} color="#FFFFFF" size={16} />
                <ButtonText>Editar Perfil</ButtonText>
              </EditButton>
            :
              !isFollowing ?
                <FollowButton onPress={handleFollow}>
                  <ButtonText>Seguir</ButtonText>
                </FollowButton>
              :
                <FollowedButton onPress={handleFollow}>
                  <ButtonText>Dejar de seguir</ButtonText>
                </FollowedButton>
          }
          
        </ConfigContainer>
      </UserInfoContainer>
    </Container>
  );
}

export default ProfileData;