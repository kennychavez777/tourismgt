import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Avatar from '../components/ProfilePic';
import ImageCarousel from '../components/GalleryPost';
import ActionsButtons from '../components/ActionsButtons';
import { FIRESTORE as db } from '../firebase/config';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useSession } from '../hooks/useSession';

const Container = styled.ScrollView`
	flex: 1;
	align-center: center;
  paddingLeft: 0px;
  paddingRight: 0px;
  background: white;
`;

const Post = styled.View`
  flex: 1;
  height: 420px;
  marginBottom: 25px;
`;

const HeaderPostContainer = styled.View`
  width: 100%;
  height: 45px;
  flex-direction: row;
`;

const UserContainer = styled.TouchableOpacity`
  marginLeft: 10px;
`;

const UserNameText = styled.Text`
  fontWeight: 700;
  fontSize: 14px;
  color: #000000;
`;

const PlaceText = styled.Text`
  fontWeight: 500;
  fontSize: 12px;
  color: #30363d;
`;

const GalleryContainer = styled.View`
  flex: 1;
  width: 100%;
`;

const PostTitle = styled.Text`
  fontSize: 21px;
  fontWeight: 900;
  color: black;
  marginLeft: 10px;
`;


function Dashboard () {
  const [ posts, setPosts ] = useState([]);
  const navigation = useNavigation();
  const { getFullUser } = useSession();

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const collectionRef = collection(db, 'posts');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsuscribe = onSnapshot(q, querySnapshot => {
      setPosts(
        querySnapshot.docs.map(item => ({
          id: item.id,
          title: item.data().title,
          description: item.data().description,
          location: item.data().location,
          selectedImages: item.data().selectedImages,
          postedBy: item.data().postedBy,
          likes: item.data().likes,
          comments: item.data().comments,
        }))
      )
      
      setPictures()
      return unsuscribe;
    });
  }

  const setPictures = async() => {
    // setPosts([]);
    // posts.map(async (p) => {
    //   const email = p.postedBy.email;
    //   const user = await getFullUser(email);
    //   p.profile_pic = user.profile_pic;

    // });
    
    // const user = await getFullUser(email);
  }

  return (
    <Container>
      {
        posts
          .map((item, index) => (
            <Post key={index}>
              <HeaderPostContainer>
                <Avatar imageSource={{uri: 'https://firebasestorage.googleapis.com/v0/b/tourism-gt.appspot.com/o/default%2Fuser-icon.jpg?alt=media&token=230702d9-c172-49ba-a410-037fdd019c7e&_gl=1*1gfvdzj*_ga*MTY5NzE4OTkyLjE2OTcwMDEyMTg.*_ga_CW55HF8NVT*MTY5ODIxNjY5Mi4zMi4xLjE2OTgyMTczNjUuNTUuMC4w'}} />
                <UserContainer onPress={() => navigation.navigate('Perfil de', { userId: item.postedBy.id })}>
                  <UserNameText>@{item.postedBy.userName}</UserNameText>
                  <PlaceText>{item.location}</PlaceText>
                </UserContainer>
              </HeaderPostContainer>
              <GalleryContainer>
                <ImageCarousel images={item.selectedImages} />
              </GalleryContainer>
              <PostTitle>{item.title}</PostTitle>
              <ActionsButtons likes={item.likes} comments={item.comments} data={item} />
            </Post>
          ))
      }
    </Container>
  );
}

export default Dashboard;