import React from 'react';
import { Image, Text } from 'react-native';
import styled from 'styled-components';
import ProfileData from '../components/ProfileData';

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

const PostContainer = styled.View`
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

function ProfileScreen () {
  return (
    <Container>
      <ProfileData />
      <UserPostsContainer>
        {
          Array(10)
            .fill(true)
            .map((item, index) => (
              <PostContainer key={index}>
                <ImagePost source={{ uri: 'https://img.freepik.com/foto-gratis/hermoso-camino-madera-que-impresionantes-arboles-coloridos-bosque_181624-5840.jpg?w=1380&t=st=1694710282~exp=1694710882~hmac=bfde8b97a543726166c6789a9300601781a0db35a4621bfca62b7c885be70358' }}></ImagePost>
                <TitlePost>Increíble mi Guate</TitlePost>
                <PlaceTitlePost>Antigua Guatemala</PlaceTitlePost>
              </PostContainer>
            ))
        }
      </UserPostsContainer>
    </Container>
  );
}

export default ProfileScreen;