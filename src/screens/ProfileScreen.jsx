import React, { useEffect, useState } from 'react';
import { Image, Text } from 'react-native';
import styled from 'styled-components';
import ProfileData from '../components/ProfileData';
import { useSession } from '../hooks/useSession';

import { FIRESTORE as db } from '../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const images = [
  'https://img.freepik.com/foto-gratis/hermoso-camino-madera-que-impresionantes-arboles-coloridos-bosque_181624-5840.jpg?w=1380&t=st=1694710282~exp=1694710882~hmac=bfde8b97a543726166c6789a9300601781a0db35a4621bfca62b7c885be70358',
  'https://w0.peakpx.com/wallpaper/224/496/HD-wallpaper-mountain-full-paisaje.jpg',
  'https://w0.peakpx.com/wallpaper/224/496/HD-wallpaper-mountain-full-paisaje.jpg',
  // Agrega más URL de imágenes según sea necesario
];

const Container = styled.ScrollView`
	flex: 1;
	align-center: center;
  paddingLeft: 0px;
  paddingRight: 0px;
  background: white;
  paddingBottom: 25px;
`;

const UserPostsContainer = styled.View`
  paddingLeft: 25px;
  paddingRight: 25px;
  width: 100%;
  height: auto;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 20px;
  column-gap: 20px;
`;

const PostContainer = styled.TouchableOpacity`
  width: 47%;
  flex-direction: column;
`;

const ImagePost = styled.Image`
  width: 100%;
  height: 150px;
  borderRadius: 18px
`;

const TitlePost = styled.Text`
  fontSize: 14px;
  fontWeight: 500;
  color: black;
  width: 100%;
  textAlign: center;
`;

const PlaceTitlePost = styled.Text`
  fontSize: 12px;
  fontWeight: 400;
  color: grey;
  textAlign: center;
`;

function ProfileScreen ({ route, navigation }) {
  const { session, getUserById } = useSession();
  const nav = useNavigation();

  const [ isMyProfile, setIsMyProfile ] = useState(false);
  const [ user, setUser ] = useState({});
  const [ posts, setPosts ] = useState([]);
  const [ totalLikes, setTotalLikes ] = useState(0);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async() => {
    let userId;
    if (route && route.params) {
      userId = route.params.userId;
      console.log('si hay params user ', userId)
    } else {
      userId = session.id;
      console.log('Nel params ', userId)
    }

    if (userId === session.id) {
      setIsMyProfile(true);
    } else {
      setIsMyProfile(false);
    }

    // get user
    const user = await getUserById(userId);
    setUser(user);
    
    // get posts
    const q = query(collection(db, 'posts'), where('postedBy.id', '==', userId));
    const snapshot = await(getDocs(q));
    let tlikes = 0;

    snapshot.forEach((item) => {
      const post = item.data();
      post.id = item.id;

      tlikes += post.likes.length;
      
      setPosts(current => ([
        ...current, post
      ]));
    });

    setTotalLikes(tlikes);
  }


  return (
    <Container>
      <ProfileData user={user} totalLikes={totalLikes} totalPosts={posts.length} isMyProfile={isMyProfile} />
      <UserPostsContainer>
        {
          posts
            .map((item, index) => (
              <PostContainer onPress={() => nav.navigate('Detalle de Post', item)} key={index}>
                <ImagePost source={{ uri: item.selectedImages[0] }}></ImagePost>
                <TitlePost>{ item.title }</TitlePost>
                <PlaceTitlePost>{ item.location }</PlaceTitlePost>
              </PostContainer>
            ))
        }
      </UserPostsContainer>
    </Container>
  );
}

export default ProfileScreen;