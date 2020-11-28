import React from 'react'
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  FlatList
} from 'react-native'
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem } from '../redux/reducer';
import * as MediaLibrary from 'expo-media-library';


import Headerone from '../components/Headerone';

const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    try {
      console.log(result);
        if (!result.cancelled) {
          console.log(result);
           try {
              await AsyncStorage.setItem('URLPICKMUSIC', result.uri);
              alert(result.uri);

            } catch (error) {
              // Error saving data
            }
        }
    } catch (error) {
      // Error saving data
    }
};

const _mediaLibraryAsync = async () => {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: ['photo', 'video'],
    })
    let video = await MediaLibrary.getAssetInfoAsync(media.assets[0])

    console.log(video);
};

function ListView() {
  const listItems = useSelector(state => state.itemList)
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

const _storeData = async () => { console.log('stored');
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
    }
  } catch (error) {
    // Error retrieving data
  }
}

function callalert() {
  _pickDocument();
  console.log(FileSystem.documentDirectory);
  alert('abc');
}

function SettingsScreen({ navigation }) {


    const _pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [5, 8],
            quality: 1,
          });
          if (!result.cancelled) {
            console.log(result);
             try {
                await AsyncStorage.setItem('URLPICK', result.uri);
                alert(result.uri);

              } catch (error) {
                // Error saving data
              }
          }

          console.log(result);
        } catch (E) {
          console.log(E);
        }
    };
    
  return (
    <>
      <StatusBar barStyle='light-content' />
      <View style={styles.container}>
        <Headerone title={'Settings'} />
       
        <View style={styles.fabContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('List')}
            style={styles.fabButton}>
            <Ionicons name='logo-model-s' color='#fff' size={70} />
          </TouchableOpacity>
        </View>
         <View style={styles.fabContainerone}>
          <TouchableOpacity
            onPress={() => _pickImage()}
            style={styles.fabButtonone}>
            <Ionicons name='md-images' color='#fff' size={70} />
          </TouchableOpacity>
        </View>
        <View style={styles.fabContainertwo}>
          <TouchableOpacity
            onPress={() => _pickDocument()}
            style={styles.fabButtontwo}>
            <Ionicons name='md-musical-notes' color='#fff' size={70} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  fabContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    position: 'absolute',
    right: 100,
    bottom: 50
  },
  fabContainerone: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'absolute',
    right: 100,
    bottom: 320
  },
  fabContainertwo: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'absolute',
    right: 100,
    bottom: 220
  },
  fabButton: {
    backgroundColor: 'blue',
    borderRadius: 15,
    width: 170,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fabButtonone: {
    backgroundColor: 'blue',
    borderRadius: 15,
    width: 170,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fabButtontwo: {
    backgroundColor: 'blue',
    borderRadius: 15,
    width: 170,
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

export default SettingsScreen
