import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Share,
} from 'react-native';
import { STARJOURNEY_FACTS } from '../Starjourneyonnileconsts/starjourneyonnilefacts';
import Starjourneyonnilecustomhead from '../Starjourneyonnilecmpnts/Starjourneyonnilecustomhead';
import Starjourneyonnilecustombtn from '../Starjourneyonnilecmpnts/Starjourneyonnilecustombtn';
import Starjourneyonnilecustomlayout from '../Starjourneyonnilecmpnts/Starjourneyonnilecustomlayout';

const Starjourneyonnilefacts = () => {
  const [indexStarJourney, setIndexStarJourney] = useState(0);
  const currentStarJourney = STARJOURNEY_FACTS[indexStarJourney];

  const nextStarJourney = () => {
    if (indexStarJourney < STARJOURNEY_FACTS.length - 1) {
      setIndexStarJourney(indexStarJourney + 1);
    } else {
      setIndexStarJourney(0);
    }
  };

  const shareStarJourney = () => {
    Share.share({
      message: `${currentStarJourney.title}\n\n${currentStarJourney.text}`,
    });
  };

  return (
    <Starjourneyonnilecustomlayout>
      <View style={stylesStarJourney.shellStarJourney}>
        <Starjourneyonnilecustomhead headerTitle="Life of the Nile" />

        <Image
          source={currentStarJourney.image}
          style={stylesStarJourney.visualStarJourney}
        />

        <Text style={stylesStarJourney.headingStarJourney}>
          {currentStarJourney.title}
        </Text>

        <Text style={stylesStarJourney.paragraphStarJourney}>
          {currentStarJourney.text}
        </Text>

        <View style={stylesStarJourney.clusterStarJourney}>
          <TouchableOpacity
            style={stylesStarJourney.shareBoxStarJourney}
            onPress={shareStarJourney}
          >
            <Image
              source={require('../../assets/images/nilejourneyshare.png')}
            />
          </TouchableOpacity>

          <Starjourneyonnilecustombtn
            onPress={nextStarJourney}
            btnTitle="Next"
          />
        </View>
      </View>
    </Starjourneyonnilecustomlayout>
  );
};

export default Starjourneyonnilefacts;

const stylesStarJourney = StyleSheet.create({
  shellStarJourney: {
    paddingTop: 70,
    paddingBottom: 120,
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  visualStarJourney: {
    width: '90%',
    height: 204,
    borderRadius: 4,
    resizeMode: 'cover',
    marginBottom: 20,
  },

  headingStarJourney: {
    fontFamily: 'Inika-Bold',
    fontSize: 22,
    color: '#FFF',
    marginBottom: 14,
    textAlign: 'center',
  },

  paragraphStarJourney: {
    fontFamily: 'Inika-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 22,
    width: '90%',
  },

  clusterStarJourney: {
    flexDirection: 'row',
    marginTop: 56,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
});
