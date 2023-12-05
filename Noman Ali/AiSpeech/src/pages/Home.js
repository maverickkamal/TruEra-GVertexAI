import {useState, useEffect, useCallback} from 'react';
import {
  // StyleSheet,
  View,
  // Dimensions,
} from 'react-native';
import ChatLogo from '../images/chatLogo.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import SendIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';

// const {width, height} = Dimensions.get('window');

export const HomeScreen = () => {
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: ChatLogo,
        },
      },
      {
        _id: 2,
        text: 'Hello developer are u working on AI',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: ChatLogo,
        },
      },
      {
        _id: 3,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          // avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);
  const renderSend = props => {
    return (
      <Send {...props}  >
        <View >
          <SendIcon
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#20319D"
          />
        </View>
      </Send>
    );
  };


  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#20319D',
          },
          left: {
            backgroundColor: '#FAF9F6',
            opacity: 0.9,
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };
  return ( 
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};
// const styles = StyleSheet.create({
//   mainContainer: {
//     width: width,
//     backgroundColor: '#fff',
//   },
//   contentContainer: {
//     width: width,
//     height: height * 0.8,
//     backgroundColor: '#fff',
//     // justifyContent:"flex-end"
//   },
//   inputContainer: {
//     width: width,
//     height: height * 0.13,
//     alignItems: 'center',
//     justifyContent: 'flex-start', // Adjust as needed
//     paddingBottom: 16,
//   },
//   inputDiv: {
//     width: width * 0.9,
//     height: 60,
//     borderRadius: 10,
//     backgroundColor: '#fff', // Set your background color
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 4},
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5,
//     borderWidth: 0.5,
//     flexDirection: 'row',
//   },
//   input: {
//     width: '85%',
//     height: '99%',
//     padding: 10,
//   },
//   action: {
//     width: 40,
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   messageContainer: {
//     backgroundColor: '#20319D',
//     padding: 10,
//     borderRadius: 8,
//     marginVertical: 4,
//     width: width - 48,
//   },
//   messageText: {
//     fontSize: 16,
//     color: '#fff',
//   },
//   messageParentDiv: {
//     width: width,
//     alignSelf: 'center',
//     flexDirection: 'row',
//   },
// });
