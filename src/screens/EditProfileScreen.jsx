import React, { useState } from 'react';
import styled from 'styled-components';
import * as ImagePicker from 'react-native-image-picker';
import { messages, showError, showToast } from '../utils/errors';

import { FIREBASE_AUTH as auth, FIRESTORE as db, STORAGE as st } from '../firebase/config';
import { updatePassword } from 'firebase/auth';
import { useSession } from '../hooks/useSession';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { ActivityIndicator } from 'react-native';

const Container = styled.ScrollView`
  flex: 1;
  background: #FFFFFF;
  flex-direction: column;
  paddingTop: 15px;
`;

const ChangePictureButton = styled.TouchableOpacity`
  borderRadius: 65px;
  borderWidth: 2px;
  borderColor: lightgrey;
`;

const ProfilePic = styled.Image`
  width: 90px;
  height: 90px;
  borderRadius: 65px;
`;

const ChangePicLabel = styled.Text`
  color: black;
  fontSize: 12px;
  fontWeight: 500;
  marginTop: 5px;
  marginBottom: 25px;
`;

const FormContainer = styled.View`
  flex: 1;
  align-content: left;
  width: 80%;
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
  borderRadius: 25px;
  marginBottom: 15px;
  paddingLeft: 20px;
`;

const Button = styled.TouchableOpacity`
	alignSelf: center;
	width: 200px;
  background-color: #01c8fb; /* Color de fondo del botón */
  padding: 15px 30px;
  border-radius: 35px;
`;

const ButtonText = styled.Text`
  color: #FFFFFF; /* Color del texto del botón */
  font-size: 16px;
  text-align: center;
  font-weight: 600;
`;

function EditProfileScreen({ route, navigation }) {
  const [ fullUser, setFullUser ] = useState(route.params);
  const [ userName, setUserName ] = useState(fullUser.userName);
  const [ email, setEmail ] = useState(fullUser.email);
  const [ password, setPassword ] = useState('');
  const [ verifyPassword, setVerifyPassword ] = useState('')
  const [ profilePic, setProfilePic ] = useState(fullUser.profile_pic);
  const [ loading, setLoading ] = useState(false);

  const { session } = useSession();

  const handleImage = () => {
    const options = {
      mediaType: 'photo',
      allowsEditing: true,
      maxWidth: 800,
      maxHeight: 800,
      multiple: true, // Permite seleccionar múltiples fotos
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('El usuario canceló la selección de imágenes');
      } else if (response.error) {
        showError('Error', messages['img/error-selection']);
        console.log('Error al seleccionar imágenes:', response.error);
      } else {
        // Maneja las imágenes seleccionadas y agrega al estado
        setProfilePic(response.assets[0].uri);
        uploadImage(response.assets[0].uri, session.id);
        showToast('Imagen actualizada');
      }
    });
  }

  const uploadImage = async(uri, id) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(st, `users/${id}/` + new Date().getTime())
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // listen for events
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('progress ', progress);
      },
      (error) => {
        // handle error
        console.log('Storage Error in Edit Profile ', error);
        showError('Error', messages[error['code']]);
      },
      () => {
        // complete
        getDownloadURL(uploadTask.snapshot.ref).then(async(url) => {
          // creating the references
          const docRef = doc(db, 'users', id);
          const data = {
            profile_pic: url,
          }

          updateDoc(docRef, data);
          setProfilePic(url);
        })
      }
    )
  }

  const saveProfile = () => {
    setLoading(true);
    const user = auth.currentUser;
    if (password === verifyPassword) {
      if (password) {
        updatePassword(user, password);

        setPassword('');
        setVerifyPassword('');
      }
      
      if (userName) {
        const userId = session.id;
        const userRef = doc(db, 'users', userId);

        updateDoc(userRef, {
          userName: userName
        })
      } else {
        showError('El nombre de usuario no puede ir vacío.')
      }
    } else {
      showError('Error', 'Las contraseñas no son iguales.');
    }
    setLoading(false);
    showToast('Perfil actualizado.')
  }

  return (
    <Container contentContainerStyle={{ alignItems: 'center' }} >
      <ChangePictureButton onPress={handleImage}>
        <ProfilePic source={{ uri: profilePic }} />
      </ChangePictureButton>
      <ChangePicLabel>Cambiar foto de perfil</ChangePicLabel>
      <FormContainer>
        <LabelInput>Correo electrónico</LabelInput>
        <Input 
          keyboardType="email-address"
          placeholder={email}
          placeholderTextColor="#999999"
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          editable={false}
        />
        <LabelInput>Nombre de Usuario</LabelInput>
        <Input
          placeholder={userName}
          placeholderTextColor="#999999"
          value={userName}
          onChangeText={(text: string) => setUserName(text)}
        />
        <LabelInput>Cambia tu contraseña</LabelInput>
        <Input 
          placeholder="***********"
          secureTextEntry={true}
          placeholderTextColor="#999999"
          value={password}
          onChangeText={(text: string) => setPassword(text)}
        />
        <LabelInput>Verifica tu contraseña</LabelInput>
        <Input
          placeholder="***********"
          secureTextEntry={true}
          placeholderTextColor="#999999"
          value={verifyPassword}
          onChangeText={(text: string) => setVerifyPassword(text)}
        />
        {
          loading ?
          <ActivityIndicator size="large" color="#0000ff" />
          :
          <Button onPress={saveProfile}>
            <ButtonText>Guardar</ButtonText>
          </Button>
        }
      </FormContainer>
    </Container>
  );
}

export default EditProfileScreen;