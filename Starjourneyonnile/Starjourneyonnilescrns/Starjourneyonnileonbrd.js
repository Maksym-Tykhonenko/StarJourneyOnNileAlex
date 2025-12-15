import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Starjourneyonnilecustomlayout from '../Starjourneyonnilecmpnts/Starjourneyonnilecustomlayout';
import Starjourneyonnilecustomwlcbtn from '../Starjourneyonnilecmpnts/Starjourneyonnilecustomwlcbtn';

const Starjourneyonnileonbrd = () => {
  const [starJourneyCurrIdx, setStarJourneyCurrIdx] = useState(0);
  const navigation = useNavigation();

  const handleNextStarJourneySlide = () => {
    if (starJourneyCurrIdx < 3) {
      setStarJourneyCurrIdx(starJourneyCurrIdx + 1);
    } else {
      navigation.replace('Starjourneyonniletbs');
    }
  };

  return (
    <Starjourneyonnilecustomlayout>
      <View
        style={[
          styles.starjourneycont,
          starJourneyCurrIdx === 1 && { paddingBottom: 55 },
        ]}
      >
        {starJourneyCurrIdx === 0 && (
          <View style={{ position: 'relative', width: '100%' }}>
            <Image
              source={require('../../assets/images/nilejourneyonboard1.png')}
              style={styles.starjourneybgimg}
            />
            <LinearGradient
              colors={['#09141700', '#091417']}
              style={styles.starjourneygradient}
            />
          </View>
        )}
        {starJourneyCurrIdx === 1 && (
          <View style={{ position: 'relative', width: '100%' }}>
            <Image
              source={require('../../assets/images/nilejourneyonb2.png')}
              style={{ alignSelf: 'center', marginBottom: 40 }}
            />
          </View>
        )}
        {starJourneyCurrIdx === 2 && (
          <View style={{ position: 'relative', width: '100%' }}>
            <Image
              source={require('../../assets/images/nilejourneyonb3.png')}
              style={styles.starjourneybgimg}
            />
            <LinearGradient
              colors={['#09141700', '#091417']}
              style={styles.starjourneygradient}
            />
          </View>
        )}
        {starJourneyCurrIdx === 3 && (
          <View style={{ position: 'relative', width: '100%' }}>
            <Image
              source={require('../../assets/images/nilejourneyonb4.png')}
              style={styles.starjourneybgimg}
            />
            <LinearGradient
              colors={['#09141700', '#091417']}
              style={styles.starjourneygradient}
            />
          </View>
        )}
        <View
          style={{
            borderWidth: 3,
            borderColor: '#E4C443',
            width: '90%',
            alignSelf: 'center',
            top: starJourneyCurrIdx !== 1 ? -73 : 0,
          }}
        >
          <View
            style={{
              padding: 9,
              backgroundColor: 'transparent',
            }}
          >
            <View style={styles.starjourneywlccnt}>
              <Text style={styles.starjourneytitle}>Star Journey on Nile</Text>
              <Text style={styles.starjourneysubtitle}>
                A star guide through the river that shaped history.
              </Text>
            </View>
          </View>
        </View>

        <View style={{ top: starJourneyCurrIdx !== 1 ? -73 : 0 }}>
          <Starjourneyonnilecustomwlcbtn
            onPress={handleNextStarJourneySlide}
            btnTitle={starJourneyCurrIdx !== 3 ? 'NEXT' : 'Start the Journey'}
          />

          <TouchableOpacity
            activeOpacity={0.7}
            style={{ padding: 18 }}
            onPress={() => navigation.replace('Starjourneyonniletbs')}
          >
            <Text style={[styles.getStartedBtnText, { color: '#fff' }]}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Starjourneyonnilecustomlayout>
  );
};

const styles = StyleSheet.create({
  starjourneycont: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  starjourneywlccnt: {
    width: '100%',
    padding: 12,
    backgroundColor: '#09171A',
    minHeight: 150,
    borderWidth: 1.5,
    borderColor: '#E4C443',
  },
  starjourneytitle: {
    fontSize: 16,
    color: '#DFCB79',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Inika-Bold',
  },
  starjourneysubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Inika-Regular',
    paddingHorizontal: 12,
  },
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
  starjourneybgimg: { width: '100%', height: 650, resizeMode: 'cover' },
});

export default Starjourneyonnileonbrd;
