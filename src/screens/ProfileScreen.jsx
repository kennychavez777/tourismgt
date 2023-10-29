import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import styled from 'styled-components';
import ProfileData from '../components/ProfileData';
import { useSession } from '../hooks/useSession';

import { FIRESTORE as db } from '../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useIsFocused, useNavigation } from '@react-navigation/native';

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
  borderTopWidth: 2px;
  borderColor: lightgrey;
  paddingTop: 15px;
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
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getUser();
    }
  }, []);

  const getUser = async() => {
    let userId;
    setPosts([]);
    setIsMyProfile(false);
    if (route && route.params) {
      userId = route.params.userId;
    } else {
      userId = session.id;
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getUser();
      setRefreshing(false);
    }, 100);
  }, []);

  return (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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