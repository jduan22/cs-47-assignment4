import { StyleSheet, SafeAreaView, Text, Pressable, FlatList, Image, View} from "react-native";
import { useSpotifyAuth } from "./utils";
import { Themes } from "./assets/Themes";
import { millisToMinutesAndSeconds } from "./utils";
import Track from "./Track";
// import { Images } from "./assets/Images";


const SpotifyAuthButton = ({authFunction}) => {
  console.log(authFunction)
  return (<Pressable onPress={authFunction} style={styles.button}>
  {<Image source={require("/Users/jenny/Downloads/CS47/assignment-3-spotify-starter-main/assets/spotify-logo.png")} style={styles.image}/>}
  <Text style={styles.text}>CONNECT WITH SPOTIFY</Text>
  </Pressable>)
};

export default function App() {
  // Pass in true to useSpotifyAuth to use the album ID (in env.js) instead of top tracks
  // token: Boolean - authenticated or not
  // tracks: [{}] - tracks
  // getSpotifyAuth - function

  const { token, tracks, getSpotifyAuth } = useSpotifyAuth(true); // static line

  console.log(token);
  console.log(tracks);

  const List = () => {

    const renderAlbum = ({ item, index }) => (
      <Track 
      trackNumber = {item.track_number}
      cover = {item.album.images[0].url}
      name = {item.name}
      artists = {item.artists[0].name}
      album = {item.album.name}
      duration = {millisToMinutesAndSeconds(item.duration_ms)}
      id = {item.id}
      />
    );


    return (<View style={styles.main}>
       <View style={styles.header}>
       <Image source={require("/Users/jenny/Downloads/CS47/assignment-3-spotify-starter-main/assets/spotify-logo.png")} style={styles.imageHeader}/>
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
    <SafeAreaView style={styles.container}>
      {contentDisplayed}
    </SafeAreaView>
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
