import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart as NoLike, faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart as Liked } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { useActionsButtons } from '../hooks/useActionsButtons';
import { useSession } from '../hooks/useSession';
// import { faHeart as heart } from '@fortawesome/'

const ActionButtonsContainer = styled.View`
  width: 100%;
  height: 25px;
  flex-direction: row;
  marginLeft: 10px;
`;

const IndividualContainer = styled.TouchableOpacity`
  width: 15%;
  flex-direction: row;
  gap: 5px;
`;

const ActionItemContainer = styled.Text`
  color: grey;
  fontSize: 18px;
  fontWeight: 800;
`;

function ActionsButtons ({likes, comments, data}) {
  let total_comments = Array.from(comments).length;
  let total_likes = Array.from(likes).length;
  const navigation = useNavigation();
  const [ allLikes, setAllLikes ] = useState([]);
  const [ isLiked, setIsLiked ] = useState(false);

  const { getPost, updateLikes } = useActionsButtons();
  const { session } = useSession();

  useEffect(() => {
    getPostLikes();
  }, []);

  const getPostLikes = async () => {
    const l = await getPost(data.id);
    const isThere = l.likes.includes(session.id);

    if (isThere) {
      setIsLiked(isThere);
    }
    
    setAllLikes(l.likes);
  }

  const handleLikes = () => {
    let newLikes = [...allLikes];
    const isThere = newLikes.includes(session.id);
    if (isThere) {
      newLikes.splice(newLikes.indexOf(session.id), 1);
    } else {
      newLikes.push(session.id);
    }
    
    updateLikes(newLikes, data.id);
    setAllLikes(newLikes);
    setIsLiked(!isThere);
  }

  return (
    <ActionButtonsContainer>
      <IndividualContainer onPress={handleLikes}>
        {
          isLiked ?
            <FontAwesomeIcon icon={Liked} size={25} color='red' style={{ paddingTop: 10 }} /> 
          : 
            <FontAwesomeIcon icon={NoLike} size={25} color='grey' style={{ paddingTop: 10 }} /> 
        }
        <ActionItemContainer>{allLikes.length}</ActionItemContainer>
      </IndividualContainer>
      <IndividualContainer onPress={() => navigation.navigate('Detalle', data)}>
        <FontAwesomeIcon icon={faComment} size={25} color='grey'  />
        <ActionItemContainer>{total_comments}</ActionItemContainer>
      </IndividualContainer>
    </ActionButtonsContainer>
  )
}

export default ActionsButtons;