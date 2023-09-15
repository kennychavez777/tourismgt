import React, { useState } from 'react';
import { View, Button, FlatList, Image } from 'react-native';
import styled from 'styled-components/native';
import * as ImagePicker from 'react-native-image-picker';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const UploadButton = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 15px 30px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  text-align: center;
`;

const SelectedImagesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const SelectedImage = styled.Image`
  width: 100px;
  height: 100px;
  margin: 8px;
`;

function ImagePickerButton() {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 800,
      multiple: true, // Permite seleccionar múltiples fotos
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('El usuario canceló la selección de imágenes');
      } else if (response.error) {
        console.log('Error al seleccionar imágenes:', response.error);
      } else {
        // Maneja las imágenes seleccionadas y agrega al estado
        setSelectedImages([...selectedImages, ...response.assets]);
      }
    });
  };

  return (
    <Container>
      <UploadButton onPress={handleImagePicker}>
        <ButtonText>Seleccionar Fotos</ButtonText>
      </UploadButton>
      <SelectedImagesContainer>
        <FlatList
          data={selectedImages}
          keyExtractor={(item) => item.uri}
          renderItem={({ item }) => (
            <SelectedImage source={{ uri: item.uri }} />
          )}
          numColumns={3} // Puedes ajustar el número de columnas según tus preferencias
        />
      </SelectedImagesContainer>
    </Container>
  );
}

export default ImagePickerButton;
