import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Modal  } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const onLoginPressed = () => {

    const handleLogin = async () => {
      try {
       
        const response = await fetch('https://4aba-118-69-233-176.ngrok-free.app/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: username.value,password: password.value }),
        });
  
        if (response.ok) {
          const data = await response.json();
          // Handle successful login (e.g., store authentication token)
          // For example, you might store the token in AsyncStorage
          // AsyncStorage.setItem('authToken', token);
           navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard', params: {token: data.token, username: username.value} }],
          })
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
    handleLogin();
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Dashboard' }],
    // })
  }


  

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Hello.</Header>
      <TextInput
        label="Username"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: '' })}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={onLoginPressed}>
        Log in
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