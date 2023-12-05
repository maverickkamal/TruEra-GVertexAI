import {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList,
  Animated,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Voice from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ChatLogo from "../images/chatLogo.png"

const {width, height} = Dimensions.get('window');

export const HomeScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const animatedValue = useRef(new Animated.Value(0)).current;

  const flatListRef = useRef(null);
  useEffect(() => {
    // Trigger animation when new message is added
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [messages]);
  const handleSend = () => {
    setMessages([...messages, {id: messages.length + 1, text: newMessage}]);
    setNewMessage('');

    // Scroll to the bottom of the FlatList after adding a new message
    flatListRef.current.scrollToEnd();
  };
  const renderItem = ({item}) => (
    <Animated.View style={{opacity: animatedValue}}>
      <View style={styles.messageParentDiv}>
      <Image source={ChatLogo} style={{height:45,width:45}}/>
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
      </View>
    </Animated.View>
  );
  return (
    <KeyboardAwareScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputDiv}>
            <TextInput
              style={styles.input}
              onChangeText={setNewMessage}
              value={newMessage}
              placeholder="Enter a prompt"
            />
            {newMessage.length ? (
              <TouchableOpacity style={styles.action}  onPress={handleSend}>
                <Icon name="send" size={30} color="#20319D" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.action}>
                <Voice name="keyboard-voice" size={30} color="#20319D" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    backgroundColor: '#fff',
  },
  contentContainer: {
    width: width,
    height: height * 0.8,
    backgroundColor: '#fff',
    // justifyContent:"flex-end"
  },
  inputContainer: {
    width: width,
    height: height * 0.13,
    alignItems: 'center',
    justifyContent: 'flex-start', // Adjust as needed
    paddingBottom: 16,
  },
  inputDiv: {
    width: width * 0.9,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#fff', // Set your background color
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 0.5,
    flexDirection: 'row',
  },
  input: {
    width: '85%',
    height: '99%',
    padding: 10,
  },
  action: {
    width: '15%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContainer: {
    backgroundColor: '#20319D',
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
    width:width-48
  },
  messageText: {
    fontSize: 16,
    color:"#fff"
  },
  messageParentDiv:{
    width:width,
   alignSelf:"center",
  flexDirection:"row"
  }
});
