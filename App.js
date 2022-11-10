import { StyleSheet, SafeAreaView, Text, Pressable, FlatList, Image, View} from "react-native";
import { useSpotifyAuth } from "./utils";
import { Themes } from "./assets/Themes";
import { millisToMinutesAndSeconds } from "./utils";
import Track from "./Track";
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const SpotifyAuthButton = ({authFunction}) => {
  return (<Pressable onPress={authFunction} style={styles.button}>
  {<Image source={require('./assets/spotify-logo.png')} style={styles.image}/>}
  <Text style={styles.text}>CONNECT WITH SPOTIFY</Text>
  </Pressable>)
};

export default function App() {

  const HomeScreen = ({ navigation }) => {
    // const songPage = item[external_url];
    return (
      <SafeAreaView style={styles.container}>
      {contentDisplayed}
    </SafeAreaView>
      // <View>
      //   <Text>{contentDisplayed}</Text>
      //   <Pressable onPress={() => navigation.navigate('PreviewScreen', {songPage: item.artists.external_url})}/>
      // </View>
    );
  };
  
  const PreviewScreen = ({navigation, route }) =>  {
    // console.log(item.preview_url);
    const previewUrl = route.params.previewUrl;
    return (
      <WebView source={{uri: previewUrl}}/> 
    );
  };
  
  const DetailsScreen = ({ navigation, route}) => {
    // console.log(item.external_urls.spotify);
    const url = route.params.url
    return (
         <WebView source={{uri: url}}/>
    )
  }
  // Pass in true to useSpotifyAuth to use the album ID (in env.js) instead of top tracks
  // token: Boolean - authenticated or not
  // tracks: [{}] - tracks
  // getSpotifyAuth - function

  const { token, tracks, getSpotifyAuth } = useSpotifyAuth(); // static line

  const List = () => {

    const renderAlbum = ({ item }) => (
      <Track t
      trackNumber = {<Ionicons name="play-circle" size={18} color='green'></Ionicons>}
      cover = {item.album.images[0].url}
      name = {item.name}
      artists = {item.artists[0].name}
      album = {item.album.name}
      duration = {millisToMinutesAndSeconds(item.duration_ms)}
      id = {item.id}
      url = {item.external_urls.spotify} // default screen
      previewUrl = {item.preview_url}
      />
    );


    return (<View style={styles.main}>
       <View style={styles.header}>
       <Image source={require('./assets/spotify-logo.png')} style={styles.imageHeader}/>
        <Text style={styles.headerText}>My Top Tracks</Text>
        </View>
    <FlatList
    data={tracks}
    renderItem={renderAlbum}
    keyExtractor={item => item.id}
   />
   </View>
   );
  }

  let contentDisplayed = null;
  if (token) {
    contentDisplayed = <List/>
  } else {
    contentDisplayed = <SpotifyAuthButton authFunction={getSpotifyAuth}/>
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="PreviewScreen" component={PreviewScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  text: {
    color: 'white',
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'green',
    borderRadius: 99999,
    padding: 10,
  },
  image: {
    // position: 'absolute',
    width: 10,
    height: 10,
    padding: 6,
    marginRight: 5,
  },
  headerText: {
    // position: 'absolute',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  header: {
    paddingTop: 35,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 20,
    marginLeft: 130,
  },
  imageHeader: {
    height: 20,
    width: 20,
    marginRight: 5,
  },
  main: {
    width: '100%',

  }
});
