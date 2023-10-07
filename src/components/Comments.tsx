import React from 'react';
import styled from 'styled-components';
import { Text } from 'react-native';

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

const ContentContainer = styled.View`
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

const Comments = () => {
  return (
    <Container>
      <Title>6 Comentarios</Title>
      {
        Array(6)
          .fill(true)
          .map((item, index) => (
            <CommentContainer key={index}>
              <Picture
                source={{ uri: 'https://yt3.googleusercontent.com/ytc/AOPolaTqtKeqkDGtMCiXSyCnLcYRMGggZIz9L-Gpt5i4CA=s900-c-k-c0x00ffffff-no-rj' }}
              />
              <ContentContainer>
                <NameLabel>melirodrigz</NameLabel>
                <CreatedAtLabel>Hace 7 horas</CreatedAtLabel>
                <CommentText>El lugar es muy bonito, demasiado llamativo, tiene unos paisajes impresionantes. No tenía idea de que ese tipo de lugares estén tan cerca y al alcance de todos en esta ciudad.</CommentText>
              </ContentContainer>
            </CommentContainer>
          ))
      }
    </Container>
  );
}

export default Comments;