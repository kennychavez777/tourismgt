import React, { useEffect, useState, useCallback } from 'react';
import { RefreshControl } from 'react-native';
import styled from 'styled-components';
import Avatar from '../components/ProfilePic';
import ImageCarousel from '../components/GalleryPost';
import ActionsButtons from '../components/ActionsButtons';
import { FIRESTORE as db } from '../firebase/config';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useSession } from '../hooks/useSession';
import { DEFAULT_PROFILE_PIC, getPostedTime } from '../utils/utilities';

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

const OpenDetailContainer = styled.TouchableOpacity`
`;

const DateText = styled.Text`
  fontSize: 10px;
  color: grey;
  fontWeight: bold;
  marginLeft: 10px;
`;

function Dashboard () {
  const [ posts, setPosts ] = useState([]);
  const navigation = useNavigation();
  const { getFullUser } = useSession();
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getAllPosts();
    }
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getAllPosts();
      setRefreshing(false);
    }, 100);
  }, []);

  const getAllPosts = async () => {
    setPosts([]);

    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc')); 
    const snapshot = await getDocs(q);

    snapshot.forEach(async (item) => {
      let p = item.data();
      p.id = item.id;
      
      const email = p.postedBy.email;
      const user = await getFullUser(email);
      p.profile_pic = user.profile_pic;
      
      setPosts(prev => ([
        ...prev, p
      ]));
    });
  }

  return (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {
        posts
          .map((item, index) => (
            <Post key={index}>
              <HeaderPostContainer>
                <Avatar imageSource={{uri: item.profile_pic ? item.profile_pic : DEFAULT_PROFILE_PIC }} />
                <UserContainer onPress={() => navigation.navigate('Perfil de', { userId: item.postedBy.id })}>
                  <UserNameText>@{item.postedBy.userName}</UserNameText>
                  <PlaceText>{item.location}</PlaceText>
                </UserContainer>
              </HeaderPostContainer>
              <GalleryContainer>
                <ImageCarousel images={item.selectedImages} />
              </GalleryContainer>
              <OpenDetailContainer onPress={() => navigation.navigate('Detalle', item)}>
                <PostTitle>{item.title}</PostTitle>
              </OpenDetailContainer>
              <ActionsButtons likes={item.likes} comments={item.comments} data={item} />
              <DateText>{getPostedTime(item.createdAt)}</DateText>
            </Post>
          ))
      }
    </Container>
  );
}

export default Dashboard;