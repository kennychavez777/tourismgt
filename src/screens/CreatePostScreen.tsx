import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ImagePickerButton from '../components/ImagePickerButton';

// firebase
import { STORAGE as st, FIRESTORE as db } from '../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { messages, showError } from '../utils/errors';
import { getCurrentDateAndTime } from '../utils/utilities';
import { useSession } from '../hooks/useSession';

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
  paddingLeft: 15px;
  paddingRight: 15px;
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
  const [ loading, setLoading ] = useState(false);
  const navigation = useNavigation();
  const { session } = useSession();

  const uploadPost = async() => {
    setLoading(true);
    const post = {
      title, description, location, selectedImages: [],
      createdAt: getCurrentDateAndTime(),
      postedBy: {
        id: session.id,
        userName: session.userName,
        email: session.email,
        profile_pic: session.profile_pic,
      },
      likes: [],
      comments: [],
    }
    console.log('post ', post);
    // save in db
    const firestore_response = await addDoc(collection(db, 'posts'), post);
    const id = firestore_response._key.path.segments[1];
    setUploadedImages([]);
    selectedImages.map((item, i) => {
      uploadImage(item['uri'], id)
    });

    setTimeout(() => {
      navigation.navigate('Inicio');
      cleanForm();
    }, 1500)
    setLoading(false);
  }

  const cleanForm = () => {
    setTitle('');
    setDescription('');
    setLocation('');
    setSelectedImages([]);
    setUploadedImages([]);
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
        console.log('progress ', progress);
      },
      (error) => {
        // handle error
        console.log('Storage Error in CreatePostScreen ', error);
        showError('Error', messages[error['code']]);
      },
      () => {
        // complete
        getDownloadURL(uploadTask.snapshot.ref).then(async(url) => {
          setUploadedImages(current => [
            ...current, url
          ])
          // creating the references
          const docRef = doc(db, 'posts', id);
          const data = {
            selectedImages: uploadedImages,
          }
          console.log('images ', uploadedImages, selectedImages)
          updateDoc(docRef, data);
        })
      }
    )
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
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
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
        <ImagePickerButton selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
        { 
          loading ? 
            <ActivityIndicator size="large" color="#0000ff" />
            :  
            <Button onPress={uploadPost}>
              <ButtonText>Publicar</ButtonText>
            </Button>
        }
        
      </FormContainer>
    </Container>
  );
}

export default CreatePostScreen;