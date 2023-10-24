import React, { useState } from 'react';
import styled from 'styled-components';
import ImagePickerButton from '../components/ImagePickerButton';

// firebase
import { STORAGE as st, FIRESTORE as db } from '../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const Container = styled.ScrollView`
  flex: 1;
  background: #FFFFFF;
  flex-direction: column;
`;

const FormContainer = styled.View`
  flex: 1;
  align-content: left;
  width: 90%;
`;

const LabelInput = styled.Text`
  color: grey;
  fontSize: 14px;
  textAlign: left;
  fontWeight: 600;
`;

const Input = styled.TextInput`
  width: 100%;
  borderWidth: 1px;
  borderColor: grey;
  borderRadius: 15px;
  marginBottom: 15px;
`;

const Button = styled.TouchableOpacity`
	alignSelf: center;
	width: 200px;
  background-color: #01c8fb; /* Color de fondo del botón */
  padding: 15px 30px;
  border-radius: 35px;
  marginTop: 20px;
`;

const ButtonText = styled.Text`
  color: #FFFFFF; /* Color del texto del botón */
  font-size: 16px;
  text-align: center;
  font-weight: 600;
`;

function CreatePostScreen () {
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] =  useState('');
  const [ location, setLocation ] =  useState('');
  const [ selectedImages, setSelectedImages ] = useState([]);
  const [ uploadedImages, setUploadedImages ] = useState<String []>([]);
  const navigation = useNavigation();

  const uploadPost = async() => {
    const post = {
      title, description, location, selectedImages: []
    }

    // save in db
    const firestore_response = await addDoc(collection(db, 'posts'), post);
    const id = firestore_response._key.path.segments[1];
    setUploadedImages([]);
    selectedImages.map((item, i) => {
      uploadImage(item['uri'], id)
    })
    console.log('====================================');
    console.log('post ', uploadedImages);
    console.log('====================================');
  }

  const uploadImage = async(uri: string, id: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(st, `posts/${id}/` + new Date().getTime())
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // listen for events
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('====================================');
        console.log('progress ', progress);
        console.log('====================================');
      },
      (error) => {
        // handle error
      },
      () => {
        // complete
        getDownloadURL(uploadTask.snapshot.ref).then(async(url) => {
          console.log('====================================');
          console.log('url', url);
          console.log('====================================');
          setUploadedImages(current => [
            ...current, url
          ])
          // creating the references
          const docRef = doc(db, 'posts', id);
          const data = {
            selectedImages: uploadedImages,
          }

          updateDoc(docRef, data);
        })
      }
    )
  }

  const getImages = (images: any) => {
    setSelectedImages(images);
  }

  return (
    <Container contentContainerStyle={{ alignItems: 'center' }} >
      <FormContainer>
        <LabelInput>Título</LabelInput>
        <Input
          value={title}
          onChangeText={(text: string) => setTitle(text)}
        />
        <LabelInput>Descripción</LabelInput>
        <Input
          multiline numberOfLines={4} 
          maxLength={500}
          value={description}
          onChangeText={(text: string) => setDescription(text)}
        />
        <LabelInput>Ubicación</LabelInput>
        <Input
          value={location}
          onChangeText={(text: string) => setLocation(text)}
        />
        <LabelInput>Seleccionar fotos</LabelInput>
        <ImagePickerButton getImages={getImages} />
        <Button onPress={uploadPost}>
          <ButtonText>Publicar</ButtonText>
        </Button>
      </FormContainer>
    </Container>
  );
}

export default CreatePostScreen;