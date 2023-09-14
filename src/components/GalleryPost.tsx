import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
`;

const CarouselContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Image = styled.Image`
  width: 100%;
  height: 300px; /* Altura de las imágenes en el carrusel */
`;

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const ImageCarousel = ({ images }) => {
  const [activeSlide, setActiveSlide] = React.useState(0);

  const renderCarouselItem = ({ item }) => {
    return (
      <CarouselContainer>
        <Image source={{ uri: item }} />
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
      <Pagination
        dotsLength={images.length}
        activeDotIndex={activeSlide}
        containerStyle={{ paddingTop: 10 }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(0, 0, 0, 0.92)',
        }}
        inactiveDotStyle={{
          width: 8,
          height: 8,
          borderRadius: 4,
          marginHorizontal: 8,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}
      />
    </Container>
  );
};

export default ImageCarousel;
