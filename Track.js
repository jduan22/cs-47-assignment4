import { Text, Image, StyleSheet, View, Pressable} from "react-native"
import { Themes } from "./assets/Themes";
import { useNavigation } from '@react-navigation/native';


export default function Track( { trackNumber, cover, name, artists, album, duration, url, previewUrl } ) {
  const navigation = useNavigation();

  return (
   <View style={styles.item}>
    <Pressable style={styles.play} onPress={(e) => {
      e.stopPropagation();
      navigation.navigate('PreviewScreen', {previewUrl})
    }}>
      <Text>{trackNumber}</Text>
    </Pressable>
    <Pressable style={styles.pressableStyle} onPress={(e) => {
      e.stopPropagation();
      navigation.navigate('DetailsScreen', {url})
    }}>
    <Image
      style={styles.images}
      source={{uri:`${cover}`}}
      />
    <View style={styles.song}>
    <Text style={{color: 'white'}} numberOfLines={1}> {name} </Text>
    <Text style={{color: 'white'}} numberOfLines={1}> {artists} </Text>
    </View>


    <View style={styles.album}>
    <Text style={{color: 'white'}} numberOfLines={1}> {album} </Text>
    </View>

    <View style={styles.duration}>
    <Text style={styles.duration}> {duration} </Text>
    </View>
    </Pressable>

   </View>
    )
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
    item: {
        color: 'white',
        flexDirection: 'row',
        padding: 5,
    },
    song: {
        flexDirection: 'column',
        width: '65%',
        marginLeft: 5,
    },
    duration: {
     direction: 'rtl',
     marginRight: 390,
      color: 'white',
      position: 'absolute',
    },
    album: {
       width: '50%',
    },
    images: {
        marginLeft: 8,
        height: 65,
        width: 65,
    },
    play: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    pressableStyle: {
      flexDirection: 'row',
      width: '50%',
    },
  });
