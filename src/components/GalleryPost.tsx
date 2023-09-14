import React from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const CarouselContainer = styled.View`
  flex: 1;
`;

const Image = styled.Image`
  width: 100%;
  height: 300px; /* Altura de las imágenes en el carrusel */
`;

const PaginationContainer = styled.View`
  flex-direction: row;
  justifyContent: center;
  alignItems: center;
  position: absolute;
  bottom: 25px;
  left: 0;
  right: 0;
`;

const PageNumber = styled.Text`
  color: black; /* Color de los puntos de paginación activos */
  font-size: 24px; /* Tamaño del punto de paginación */
  margin: 0 5px; /* Espaciado entre los puntos de paginación */
`;

function ImageCarousel({ images }) {
  const [activeSlide, setActiveSlide] = React.useState(0);

  const renderCarouselItem = ({ item }) => {
    return (
      <CarouselContainer>
        <Image source={{ uri: item }} />
        <PaginationContainer>
          {images.map((_, index) => (
            <PageNumber
              key={index}
              style={{ opacity: index === activeSlide ? 1 : 0.5 }}
            >
              &bull;
            </PageNumber>
          ))}
        </PaginationContainer>
      </CarouselContainer>
    );
  };

  return (
    <Container>
      <Carousel
        data={images}
        renderItem={renderCarouselItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
    </Container>
  );
}

export default ImageCarousel;
