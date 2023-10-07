import React from 'react';
import styled from 'styled-components';
import ImageCarousel from '../components/GalleryPost';
import PostedBy from '../components/PostedBy';
import Comments from '../components/Comments';

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

function PostDetailScreen () {
  const images = [
    'https://img.freepik.com/foto-gratis/hermoso-camino-madera-que-impresionantes-arboles-coloridos-bosque_181624-5840.jpg?w=1380&t=st=1694710282~exp=1694710882~hmac=bfde8b97a543726166c6789a9300601781a0db35a4621bfca62b7c885be70358',
    'https://w0.peakpx.com/wallpaper/224/496/HD-wallpaper-mountain-full-paisaje.jpg',
    'https://w0.peakpx.com/wallpaper/224/496/HD-wallpaper-mountain-full-paisaje.jpg',
    // Agrega más URL de imágenes según sea necesario
  ];

  return (
    <Container>
      <GalleryContainer>
        <ImageCarousel images={images} />
      </GalleryContainer>
      <DetailContainer>
        <PostTitle>Senderos Bella Vista</PostTitle>
        <PostDescription>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          {"\n\n"}Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          {/* {"\n\n"}Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. */}
        </PostDescription>
        <PostedBy />
      </DetailContainer>
      <Comments />
    </Container>
  );
}

export default PostDetailScreen;