import React, { useState } from 'react'
import Background from '../components/Background'
import { TouchableOpacity, StyleSheet, View, Modal  } from 'react-native'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { useRoute } from '@react-navigation/native'
import { theme } from '../core/theme'

export default function Dashboard({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const route = useRoute();
  const token = route.params?.token;
  const username = route.params?.username;

  
  const onCheckPressed = (typeCheck) => {
    const handleCheck = async () => {
      try {
       
        const response = await fetch('https://4aba-118-69-233-176.ngrok-free.app/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: username, token: token, type: typeCheck }),
        });
  
        if (response.ok) {
          const data = await response.json();
          // Handle successful login (e.g., store authentication token)
          // For example, you might store the token in AsyncStorage
          // AsyncStorage.setItem('authToken', token);
          alert('ok');
        } else {
          toggleModal();
          // Handle login failure (e.g., incorrect credentials)
        //  Alert.alert('Login failed', 'Invalid username or password');
        }
      } catch (error) {
        toggleModal();
        console.error('Error:', error);
       // Alert.alert('Error', 'Something went wrong');
      }
    };
    handleCheck();
    
  }
  return (
    <Background>
      <Logo />
      <Header>Welcome 💫</Header>
      <Paragraph>
        Congratulations you are logged in.
      </Paragraph>

      <Button mode="contained" onPress={() =>onCheckPressed('i')}>
        Check In
      </Button>
      <Button mode="contained" onPress={() => onCheckPressed('o')}>
        Check Out
      </Button>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Show Modal" onPress={toggleModal} />
      <Modal
        animationType="slide" // You can change the animation type (slide, fade, none)
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            <Text>Login fail</Text>
            <Button title="Close" onPress={toggleModal} >Close</Button>
          </View>
        </View>
      </Modal>
    </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})