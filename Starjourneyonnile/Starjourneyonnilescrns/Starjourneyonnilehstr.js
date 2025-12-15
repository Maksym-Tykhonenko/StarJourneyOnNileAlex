import React, { useState } from 'react';
import { STARJOURNEY_HISTORY } from '../Starjourneyonniledata/starjourneyonnilestories';
import Starjourneyonnilecustomhead from '../Starjourneyonnilecmpnts/Starjourneyonnilecustomhead';
import Starjourneyonnilecustombtn from '../Starjourneyonnilecmpnts/Starjourneyonnilecustombtn';
import Starjourneyonnilecustomlayout from '../Starjourneyonnilecmpnts/Starjourneyonnilecustomlayout';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Share,
} from 'react-native';

export const Starjourneyonnilehstry = () => {
  const [indexStarJourney, setIndexStarJourney] = useState(0);

  const currentStarJourney = STARJOURNEY_HISTORY[indexStarJourney];

  const handleNextStarJourney = () => {
    if (indexStarJourney < STARJOURNEY_HISTORY.length - 1) {
      setIndexStarJourney(indexStarJourney + 1);
    } else {
      setIndexStarJourney(0);
    }
  };

  const handleShareStarJourney = () => {
    Share.share({
      message: `${currentStarJourney.title}\n\n${currentStarJourney.text}`,
    });
  };

  return (
    <Starjourneyonnilecustomlayout>
      <View style={stylesStarJourney.wrapperStarJourney}>
        <Starjourneyonnilecustomhead headerTitle="History & Mythology" />

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

        <View style={stylesStarJourney.actionRowStarJourney}>
          <TouchableOpacity
            style={stylesStarJourney.shareBoxStarJourney}
            onPress={handleShareStarJourney}
          >
            <Image
              source={require('../../assets/images/nilejourneyshare.png')}
            />
          </TouchableOpacity>

          <Starjourneyonnilecustombtn
            onPress={handleNextStarJourney}
            btnTitle="Next"
          />
        </View>
      </View>
    </Starjourneyonnilecustomlayout>
  );
};

const stylesStarJourney = StyleSheet.create({
  wrapperStarJourney: {
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

  actionRowStarJourney: {
    flexDirection: 'row',
    marginTop: 56,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
});

export default Starjourneyonnilehstry;
