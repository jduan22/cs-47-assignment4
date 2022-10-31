import { Text, Image, StyleSheet, View} from "react-native"
import { Themes } from "./assets/Themes";

export default function Track( { trackNumber, cover, name, artists, album,duration, id } ) {
    return (
   <View style={styles.item}>
    <Text style={{color: 'white'}}> {trackNumber} </Text>

    {/* <View> */}
    <Image
          style={styles.images}
          source={{uri:`${cover}`}}
      />
    {/* </View> */}

    <View style={styles.song}>
    <Text style={{color: 'white'}} numberOfLines={1}> {name} </Text>
    <Text style={{color: 'white'}}> {artists} </Text>
    </View>


    <View style={styles.album}>
    <Text style={{color: 'white'}}> {album} </Text>
    </View>

    <View style={styles.duration}>
    <Text style={{color: 'white'}}> {duration} </Text>
    </View>

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
        width: '50%',
    },
    duration: {
      // alignItems: 'flex-end',
    },
    album: {
       // padding: 10,
    },
    images: {
        marginLeft: 10,
        height: 65,
        width: 65,
    }
  });
