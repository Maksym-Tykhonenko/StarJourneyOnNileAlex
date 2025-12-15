import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Starjourneyonnilecustomwlcbtn = ({ onPress, btnTitle }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <LinearGradient
        colors={['#E4C443', '#B49035']}
        style={styles.getStartedBtn}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.getStartedBtnText}>{btnTitle}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  getStartedBtnText: {
    fontSize: 15,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Inika-Bold',
  },
  getStartedBtn: {
    width: 139,
    alignSelf: 'center',
    height: 34,
    borderRadius: 1,
    marginTop: 20,
    justifyContent: 'center',
  },
  starjourneygradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 250,
  },
});

export default Starjourneyonnilecustomwlcbtn;
