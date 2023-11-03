import React, { useState } from 'react';
import styled from 'styled-components';
import ImageCarousel from '../components/GalleryPost';
import PostedBy from '../components/PostedBy';
import Comments from '../components/Comments';
import { useSession } from '../hooks/useSession';
import { deleteDoc, doc } from 'firebase/firestore';
import { FIRESTORE as db } from '../firebase/config';

const Container = styled.ScrollView`
  flex: 1;
	align-center: center;
  paddingLeft: 0px;
  paddingRight: 0px;
  background: white;
`;

const GalleryContainer = styled.View`
  flex: 1;
  width: 100%;
  marginBottom: 15px;
`;

const DetailContainer = styled.View`
  width: 90%;
  flex-direction: column;
  alignSelf: center;
  borderBottomWidth: 2px;
  borderColor: lightgrey;
`;

const PostTitle = styled.Text`
  fontSize: 28px;
  fontWeight: 800;
  width: 100%;
  text-align: center;
  color: black;
  marginBottom: 10px;
`;

const PostDescription = styled.Text`
  color: black;
  text-align: justify;
  marginBottom: 10px
`;

const DeleteButton = styled.TouchableOpacity`
  background-color: red;
  width: 100%;
  borderRadius: 5px;
  padding: 10px;
`;

const DeleteButtonText = styled.Text`
  color: white;
  fontSize: 14px;
  fontWeight: bold;
  textAlign: center;
`;

function PostDetailScreen ({ route, navigation }) {
  const detail = route.params;
  const { session } = useSession();

  const deletePost = async(postId: string) => {
    try {
      await deleteDoc(doc(db, 'posts', postId));
      navigation.goBack();
    } catch (error) {
      console.log('\n\nerror: ', error);
    }
  }

  return (
    <Container>
      <GalleryContainer>
        <ImageCarousel images={detail.selectedImages} />
      </GalleryContainer>
      <DetailContainer>
        <PostTitle>{detail.title}</PostTitle>
        <PostDescription>
          {detail.description}
        </PostDescription>
        <PostedBy by={detail.postedBy} />
        {
          detail.postedBy.email === session.email ?
            <DeleteButton onPress={() => deletePost(detail.id)}>
              <DeleteButtonText>Eliminar publicación</DeleteButtonText>
            </DeleteButton>
          :
            null
        }
      </DetailContainer>
      <Comments postId={detail.id} />
    </Container>
  );
}

export default PostDetailScreen;