import React, { useState } from 'react';
import { useKeepAwake } from 'expo-keep-awake';

import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  FlatList
} from 'react-native'
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem } from '../redux/reducer';

import Header from '../components/Header';
import { Audio } from 'expo-av';

let abc = 'aa';

const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    alert(result.uri);
    console.log(result);
}

function ListView() {
  const listItems = useSelector(state => state.itemList)
  const source = {
    uri: 'https://freesound.org/data/previews/413/413854_4337854-hq.mp3',
  };
  console.log({ listItems })

  const dispatch = useDispatch()

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20
      }}>
      {listItems.length !== 0 ? (
        <FlatList
          data={listItems}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItemContainer}>
              <Text style={styles.itemTitle} numberOfLines={1}>
                {item.name}
              </Text>
              <TouchableOpacity
                onPress={() => dispatch(removeItem(item.id))}
                style={styles.button}>
                <Ionicons name='ios-trash' color='#fff' size={20} />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={{ fontSize: 30 }}>You list is empty :'(</Text>
      )}
    </View>
  )
}


const _storeData = async () => { 
  console.log('stored');
  try {
    await AsyncStorage.setItem('TASKS', 'I like to save it.');
  } catch (error) {
    // Error saving data
  }
}

const _retrieveData = async () => {

  try {
    const value = await AsyncStorage.getItem('URLPICK');
    if (value !== null) {
      // We have data!!
      console.log(value);
          console.log(this.state);
          console.log(abc);

    }
  } catch (error) {
    // Error retrieving data
  }
}



function tryCode() {
  const listItems = useSelector(state => state.itemList); 
  console.log(listItems);
}

function callalert() {
  _pickDocument();
  console.log(FileSystem.documentDirectory);
  alert('abc');
}

function ListScreen({ navigation }) {   

  useKeepAwake();

  const [roomName, setRoomName] = useState('');

  const [MusicUri, setMusicUri] = useState('');

  const ImgFunction = async () => {
      LoadMusicFunction();
      try {
        const value = await AsyncStorage.getItem('URLPICK');
        if (value !== null) {
          // We have data!!
          console.log(value); 
          console.log(roomName);  
          setRoomName(value);

        }  
      } catch (error) {
        // Error retrieving data

      }

  };

   const LoadMusicFunction = async () => {

      try {
        const valueMusic = await AsyncStorage.getItem('URLPICKMUSIC');
        if (valueMusic !== null) {
          // We have data!!

        }  
      } catch (error) {
        // Error retrieving data

      }
  };

  const _hornPlease = async () => { 
    const soundObject = new Audio.Sound();
    try {

      soundObject.setOnPlaybackStatusUpdate((status) => {
        if (!status.didJustFinish) return;
        soundObject.unloadAsync();
      });

      await soundObject.loadAsync({ uri: MusicUri});
      await soundObject.playAsync();
      // Your sound is playing!
      //await soundObject.unloadAsync();
    } catch (error) {
      // An error occurred!
    }
  }

  ImgFunction();
  LoadMusicFunction();

  return (
    <>
      <StatusBar barStyle='light-content' />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => _hornPlease()}>
         <Image 
              source={{uri:roomName}}  
              style={{width: 360, height: 617}} 
            />
        </TouchableOpacity>    
        <View style={styles.fabContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={styles.fabButton}>
            <Ionicons name='ios-add' color='#fff' size={70} />
          </TouchableOpacity>
        </View>
         <View style={styles.fabContainerone}>
          <TouchableOpacity
            onPress={() => ImgFunction()}
            style={styles.fabButtonone}>
            <Ionicons name='logo-chrome' color='#fff' size={70} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey'
  },
  fabContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    bottom: 10
  },
  fabContainerone: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'absolute',
    left: 10,
    bottom: 10
  },
  fabButton: {
    backgroundColor: '#E7E7E7',
    borderRadius: 35,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fabButtonone: {
    backgroundColor: '#E7E7E7',
    borderRadius: 35,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 5,
    paddingRight: 5,
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 0.25
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: '400'
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#ff333390',
    padding: 5
  }
})

export default ListScreen
