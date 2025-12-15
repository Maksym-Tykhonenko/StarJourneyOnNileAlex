import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Starjourneyonnilecustombtn = ({ onPress, btnTitle }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#B49035', '#E4C443']}
        style={styles.nextBtn}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.nextBtnText}>{btnTitle}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  nextBtn: {
    width: 140,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },

  nextBtnText: {
    fontFamily: 'Inika-Bold',
    fontSize: 17,
    color: '#10232A',
  },
});

export default Starjourneyonnilecustombtn;
