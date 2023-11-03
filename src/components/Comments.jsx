import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { FIRESTORE as db } from '../firebase/config';
import { useSession } from '../hooks/useSession';
import { getPostedTime, getCurrentDateAndTime } from '../utils/utilities';

import { showError } from '../utils/errors';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
  width: 90%;
  alignSelf: center;
  marginBottom: 25px;
  marginTop: 10px;
`;

const Title = styled.Text`
  fontSize: 17px;
  fontWeight: 900;
  width: 100%;
  color: black;
`;

const CommentContainer = styled.View`
  width: 100%;
  flex-direction: row;
  marginTop: 15px;
`;

const Picture = styled.Image`
  width: 65px;
  height: 65px;
  borderRadius: 20px;
`;

const ContentContainer = styled.TouchableOpacity`
  width: 90%;
  flex-direction: row;
  marginLeft: 10px;
  flex-wrap: wrap;
`;

const NameLabel = styled.Text`
  fontSize: 17px;
  color: black;
  fontWeight: 700;
  width: 50%;
`;

const CreatedAtLabel = styled.Text`
  fontSize: 10px;
  color: grey;
  fontWeight: 700;
  width: 37%;
  text-align: right;
`;

const CommentText = styled.Text`
  fontSize: 13px;
  color: grey;
  width: 80%;
`;

const CommentInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  align-self: center;
`;

const CommentTextInput = styled.TextInput`
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
`;

const SendButton = styled.TouchableOpacity`
  background-color: #007AFF;
  border-radius: 5px;
  padding: 10px;
  margin-left: 10px;
`;

const SendButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

const Comments = ({ postId }) => {
  const [ comments, setComments ] = useState([]);
  const [comment, setComment] = useState('');
  const { session, getFullUser } = useSession();
  const [ loading, setLoading ] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    getAllComments();
  }, [])

  const getAllComments = async() => {
    const docRef = doc(db, 'posts', postId);
    const snapshot = await getDoc(docRef);
    
    // comment = picture, username, commentario, createdAt
    if (snapshot.exists()) {
      const c = snapshot.data().comments;
      c.forEach(async (item) => {
        const user = await getFullUser(item.email);
        
        setComments(prev => ([
          ...prev, {
            content: item.content,
            userName: user.userName,
            profile_pic: user.profile_pic,
            createdAt: item.createdAt,
            email: user.email,
            userId: user.id
          }
        ]))
      })
    }
  }

  const handleCommentSubmit = async () => {
    if (comment.trim() !== '') {
      setLoading(true)

      // save in database
      const saveComments = comments.map((item) => {
        return {
          email: item.email,
          createdAt: item.createdAt,
          content: item.content
        }
      });

      saveComments.push({
        email: session.email,
        createdAt: getCurrentDateAndTime(),
        content: comment
      });

      const docRef = doc(db, 'posts', postId);
      updateDoc(docRef, {
        comments: saveComments
      });
      
      // change state
      setComments(prev => [
        ...prev, ({
          content: comment,
          userName: session.userName,
          profile_pic: session.profile_pic,
          createdAt: getCurrentDateAndTime(),
          email: session.email,
          userId: session.id
        })
      ]);
      
      setComment('');
      setLoading(false);
    } else {
      showError('Error', 'Por favor escribe un comentario.');
    }
  };

  return (
    <Container>
      <Title>{comments.length} Comentarios</Title>
      {
        comments
          .map((item, index) => (
            <CommentContainer key={index}>
              <Picture
                source={{ uri: item.profile_pic }}
              />
              <ContentContainer onPress={() => navigation.navigate('Perfil de', { userId: item.userId })}>
                <NameLabel>{item.userName}</NameLabel>
                <CreatedAtLabel>{getPostedTime(item.createdAt)}</CreatedAtLabel>
                <CommentText>{item.content}</CommentText>
              </ContentContainer>
            </CommentContainer>
          ))
      }
      <CommentInputContainer>
        <CommentTextInput
          placeholder="Escribe un comentario..."
          value={comment}
          onChangeText={(text) => setComment(text)}
          multiline={true}
          numberOfLines={3}
          textAlignVertical="top"
        />
        { 
          loading ? 
            <ActivityIndicator size="large" color="#0000ff" />
            :  
            <SendButton onPress={handleCommentSubmit}>
              <SendButtonText>Comentar</SendButtonText>
            </SendButton>
        }
      </CommentInputContainer>
    </Container>
  );
}

export default Comments;