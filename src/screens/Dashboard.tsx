import React from 'react';
import { SafeAreaView, Text, View } from 'react-native'
import styled from 'styled-components';
import Avatar from '../components/ProfilePic';

const Container = styled.ScrollView`
	flex: 1;
	align-center: center;
  paddingLeft: 15px;
  paddingRight: 15px;
`;

const Post = styled.View`
  flex: 1;
  background: grey;
  height: 350px;
  marginTop: 5px;
  marginBottom: 5px;
`;

const HeaderPostContainer = styled.View`
  flex: 1;
  justify-content: left;
  flex-direction: row;
  height: 50px;
`;

const UserContainer = styled.View`
  flex: 1;
  justify-content: left;
  flex-direction: column;
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
            </Post>
          ))
      }
    </Container>
  );
}

export default Dashboard;