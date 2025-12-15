import React, { useCallback, useState } from 'react';
import { starjourneyonnileplaces } from '../Starjourneyonniledata/starjourneyonnileplaces';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Share,
} from 'react-native';
import Starjourneyonnilecustomhead from '../Starjourneyonnilecmpnts/Starjourneyonnilecustomhead';
import Starjourneyonnilecustomlayout from '../Starjourneyonnilecmpnts/Starjourneyonnilecustomlayout';

const Starjourneyonnilesaved = () => {
  const [savedIdsStarJourney, setSavedIdsStarJourney] = useState([]);
  const [savedPlacesStarJourney, setSavedPlacesStarJourney] = useState([]);
  const navigationStarJourney = useNavigation();

  useFocusEffect(
    useCallback(() => {
      loadStarJourney();
    }, []),
  );

  const loadStarJourney = async () => {
    try {
      const starJourneySavedData = await AsyncStorage.getItem(
        'starjourney_saved_cards',
      );

      if (starJourneySavedData) {
        const idsStarJourney = JSON.parse(starJourneySavedData);
        setSavedIdsStarJourney(idsStarJourney);

        setSavedPlacesStarJourney(
          starjourneyonnileplaces.filter(item =>
            idsStarJourney.includes(item.id),
          ),
        );
      }
    } catch (err) {
      console.log('error:', err);
    }
  };

  const toggleSaveStarJourney = async id => {
    try {
      let updatedStarJourneyLoc;

      if (savedIdsStarJourney.includes(id)) {
        updatedStarJourneyLoc = savedIdsStarJourney.filter(x => x !== id);
      } else {
        updatedStarJourneyLoc = [...savedIdsStarJourney, id];
      }

      setSavedIdsStarJourney(updatedStarJourneyLoc);
      await AsyncStorage.setItem(
        'starjourney_saved_cards',
        JSON.stringify(updatedStarJourneyLoc),
      );

      setSavedPlacesStarJourney(
        starjourneyonnileplaces.filter(item =>
          updatedStarJourneyLoc.includes(item.id),
        ),
      );
    } catch (err) {
      console.log('error:', err);
    }
  };

  const handleShareStarJourney = async place => {
    try {
      await Share.share({
        message: `Check out this place: ${place.title}\nDescription: ${place.description}\nAddress: ${place.address}\nCoordinates: ${place.coordinates}`,
      });
    } catch (err) {
      console.log('error:', err);
    }
  };

  return (
    <Starjourneyonnilecustomlayout>
      <View style={stylesStarJourney.scrollWrapStarJourney}>
        <Starjourneyonnilecustomhead headerTitle="Saved Places" />

        {savedPlacesStarJourney.length === 0 && (
          <Text style={stylesStarJourney.emptyStarJourney}>
            You don’t have any saved places yet.
          </Text>
        )}

        {savedPlacesStarJourney.map(place => (
          <View key={place.id} style={stylesStarJourney.frameStarJourney}>
            <Image
              source={place.image}
              style={stylesStarJourney.visualStarJourney}
            />

            <Text style={stylesStarJourney.titleStarJourney}>
              {place.title}
            </Text>

            <Text style={stylesStarJourney.labelStarJourney}>Description:</Text>
            <Text style={stylesStarJourney.valueStarJourney}>
              {place.description}
            </Text>

            <Text style={stylesStarJourney.labelStarJourney}>Address:</Text>
            <Text style={stylesStarJourney.valueStarJourney}>
              {place.address}
            </Text>

            <Text style={stylesStarJourney.labelStarJourney}>Coordinates:</Text>
            <Text style={stylesStarJourney.valueStarJourney}>
              {place.coordinates}
            </Text>

            <View style={stylesStarJourney.controlsStarJourney}>
              <TouchableOpacity
                onPress={() => handleShareStarJourney(place)}
                activeOpacity={0.7}
              >
                <Image
                  source={require('../../assets/images/nilejourneyshare.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigationStarJourney.navigate('Starjourneyonniletbs', {
                    screen: 'Starjourneyonnilemp',
                    params: { place },
                  })
                }
              >
                <LinearGradient
                  colors={['#E4C443', '#B49035']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={stylesStarJourney.mapBtnStarJourney}
                >
                  <Text style={stylesStarJourney.mapTextStarJourney}>
                    Open Map
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => toggleSaveStarJourney(place.id)}>
                <Image
                  source={require('../../assets/images/nilejourneysvd.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </Starjourneyonnilecustomlayout>
  );
};

export default Starjourneyonnilesaved;

const stylesStarJourney = StyleSheet.create({
  scrollWrapStarJourney: {
    paddingTop: 70,
    paddingBottom: 140,
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  emptyStarJourney: {
    marginTop: 80,
    fontFamily: 'Inika-Regular',
    fontSize: 16,
    color: '#c7c7c7',
    textAlign: 'center',
  },

  frameStarJourney: {
    width: '90%',
    borderWidth: 2,
    borderColor: '#E4C443',
    padding: 14,
    marginBottom: 20,
    backgroundColor: '#09171A',
    position: 'relative',
    paddingBottom: 20,
    alignSelf: 'center',
  },

  visualStarJourney: {
    width: '100%',
    height: 120,
    borderRadius: 4,
    marginBottom: 14,
  },

  titleStarJourney: {
    fontFamily: 'Inika-Bold',
    fontSize: 16,
    color: '#fff',
  },

  labelStarJourney: {
    fontFamily: 'Inika-Bold',
    color: '#fff',
    marginTop: 8,
  },

  valueStarJourney: {
    fontFamily: 'Inika-Regular',
    color: '#fff',
    marginBottom: 4,
  },

  controlsStarJourney: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    marginTop: 18,
    alignItems: 'center',
  },

  mapBtnStarJourney: {
    width: 120,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mapTextStarJourney: {
    fontFamily: 'Inika-Bold',
    color: '#000',
  },
});
