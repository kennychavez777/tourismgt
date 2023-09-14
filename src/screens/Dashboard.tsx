import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import styled from 'styled-components';
import Avatar from '../components/ProfilePic';
import ImageCarousel from '../components/GalleryPost';
import ActionsButtons from '../components/ActionsButtons';

const Container = styled.ScrollView`
	flex: 1;
	align-center: center;
  paddingLeft: 15px;
  paddingRight: 15px;
  background: white;
`;

const Post = styled.View`
  flex: 1;
  height: 450px;
  marginTop: 15px;
  marginBottom: 5px;
`;

const HeaderPostContainer = styled.View`
  width: 100%;
  height: 45px;
  flex-direction: row;
`;

const UserContainer = styled.View`
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

const Title = styled.Text`
  fontSize: 25px;
  fontWeight: 900;
  color: black;
`;

const images = [
  'https://img.freepik.com/foto-gratis/hermoso-camino-madera-que-impresionantes-arboles-coloridos-bosque_181624-5840.jpg?w=1380&t=st=1694710282~exp=1694710882~hmac=bfde8b97a543726166c6789a9300601781a0db35a4621bfca62b7c885be70358',
  'https://w0.peakpx.com/wallpaper/224/496/HD-wallpaper-mountain-full-paisaje.jpg',
  'https://w0.peakpx.com/wallpaper/224/496/HD-wallpaper-mountain-full-paisaje.jpg',
  // Agrega más URL de imágenes según sea necesario
];

function Dashboard () {
  return (
    <Container>
      {
        Array(6)
          .fill(true)
          .map((item, index) => (
            <Post key={index}>
              <HeaderPostContainer>
                <Avatar imageSource={{uri: 'https://images.rawpixel.com/image_png_1000/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3BmLWljb240LWppcjIwNjItcG9yLWwtam9iNzg4LnBuZw.png'}} />
                <UserContainer>
                  <UserNameText>@heykenny</UserNameText>
                  <PlaceText>Guatemala City</PlaceText>
                </UserContainer>
              </HeaderPostContainer>
              <GalleryContainer>
                <ImageCarousel images={images} />
              </GalleryContainer>
              <Title>Mi Guate es increíble</Title>
              <ActionsButtons />
            </Post>
          ))
      }
    </Container>
  );
}

export default Dashboard;