import React, { useState, useEffect, useCallback, useRef } from 'react';
import { starjourneyonnileplaces } from '../Starjourneyonniledata/starjourneyonnileplaces';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import { useFocusEffect } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import Starjourneyonnilecustomhead from '../Starjourneyonnilecmpnts/Starjourneyonnilecustomhead';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Share,
} from 'react-native';

const parseStarJourneyCoords = coords => {
  try {
    const parcedStarJorneyCoord = coords
      .replace(/°/g, '')
      .replace(/N|S|E|W/g, '')
      .trim();
    const [lat, lng] = parcedStarJorneyCoord
      .split(',')
      .map(v => parseFloat(v.trim()));
    return { lat, lng };
  } catch {
    return { lat: 0, lng: 0 };
  }
};

const Starjourneyonnilemap = ({ route }) => {
  const [openedStarJourney, setOpenedStarJourney] = useState(null);
  const [savedStarJourneyIds, setSavedStarJourneyIds] = useState([]);
  const mapStarJourneyRef = useRef(null);

  const initialPlaceStarJourney = route?.params?.place || null;

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();
      return () => {
        Orientation.unlockAllOrientations();
        setOpenedStarJourney(null);
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const starJourneySavedData = await AsyncStorage.getItem(
          'starjourney_saved_cards',
        );
        if (starJourneySavedData)
          setSavedStarJourneyIds(JSON.parse(starJourneySavedData));
      })();
    }, []),
  );

  useEffect(() => {
    if (initialPlaceStarJourney) {
      const { lat, lng } = parseStarJourneyCoords(
        initialPlaceStarJourney.coordinates,
      );

      const starJourneyMap = { ...initialPlaceStarJourney, lat, lng };
      setOpenedStarJourney(starJourneyMap);

      setTimeout(() => {
        mapStarJourneyRef.current?.animateToRegion(
          {
            latitude: lat,
            longitude: lng,
            latitudeDelta: 2,
            longitudeDelta: 2,
          },
          800,
        );
      }, 300);
    }
  }, [initialPlaceStarJourney]);

  const toggleStarJourneySave = async id => {
    let starJourneyMapUpdatedLoc;

    if (savedStarJourneyIds.includes(id)) {
      starJourneyMapUpdatedLoc = savedStarJourneyIds.filter(x => x !== id);
    } else {
      starJourneyMapUpdatedLoc = [...savedStarJourneyIds, id];
    }

    setSavedStarJourneyIds(starJourneyMapUpdatedLoc);
    await AsyncStorage.setItem(
      'starjourney_saved_cards',
      JSON.stringify(starJourneyMapUpdatedLoc),
    );
  };

  const shareStarJourneyCard = () => {
    if (!openedStarJourney) return;

    Share.share({
      message: `${openedStarJourney.title}\n\n${openedStarJourney.description}\n\nAddress: ${openedStarJourney.address}\nCoordinates: ${openedStarJourney.coordinates}`,
    });
  };

  const isStarJourneySaved =
    openedStarJourney && savedStarJourneyIds.includes(openedStarJourney.id);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          position: 'absolute',
          top: 70,
          left: 0,
          right: 0,
          zIndex: 10,
          paddingHorizontal: 20,
        }}
      >
        <Starjourneyonnilecustomhead headerTitle="Nile Map" />
      </View>

      <MapView
        ref={mapStarJourneyRef}
        style={{ flex: 1 }}
        provider={Platform.OS === 'ios' ? 'default' : 'google'}
        initialRegion={{
          latitude: 26.5,
          longitude: 31.2,
          latitudeDelta: 15,
          longitudeDelta: 15,
        }}
        mapType="hybrid"
      >
        {starjourneyonnileplaces.map(item => {
          const { lat, lng } = parseStarJourneyCoords(item.coordinates);
          return (
            <Marker
              key={item.id}
              coordinate={{ latitude: lat, longitude: lng }}
              onPress={() => {
                setOpenedStarJourney({ ...item, lat, lng });
                mapStarJourneyRef.current?.animateToRegion(
                  {
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 2,
                    longitudeDelta: 2,
                  },
                  500,
                );
              }}
            >
              <Image
                source={require('../../assets/images/nilejourneymarker.png')}
              />
            </Marker>
          );
        })}
      </MapView>

      {openedStarJourney && (
        <View style={stylesStarJourney.panelWrapStarJourney}>
          <View style={stylesStarJourney.panelCardStarJourney}>
            <TouchableOpacity
              style={stylesStarJourney.panelCloseStarJourney}
              onPress={() => setOpenedStarJourney(null)}
            >
              <Image
                source={require('../../assets/images/nilejourneyclose.png')}
              />
            </TouchableOpacity>

            <Image
              source={openedStarJourney.image}
              style={stylesStarJourney.panelImgStarJourney}
            />

            <Text style={stylesStarJourney.panelTitleStarJourney}>
              {openedStarJourney.title}
            </Text>

            <Text style={stylesStarJourney.panelLabelStarJourney}>
              Description:
            </Text>
            <Text style={stylesStarJourney.panelTextStarJourney}>
              {openedStarJourney.description}
            </Text>

            <Text style={stylesStarJourney.panelLabelStarJourney}>
              Address:
            </Text>
            <Text style={stylesStarJourney.panelTextStarJourney}>
              {openedStarJourney.address}
            </Text>

            <Text style={stylesStarJourney.panelLabelStarJourney}>
              Coordinates:
            </Text>
            <Text style={stylesStarJourney.panelTextStarJourney}>
              {openedStarJourney.coordinates}
            </Text>

            <View style={stylesStarJourney.panelActionsStarJourney}>
              <TouchableOpacity onPress={shareStarJourneyCard}>
                <LinearGradient
                  colors={['#E4C443', '#B49035']}
                  style={stylesStarJourney.panelShareBtnStarJourney}
                >
                  <Text style={stylesStarJourney.panelShareTextStarJourney}>
                    Share
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => toggleStarJourneySave(openedStarJourney.id)}
              >
                <Image
                  source={
                    isStarJourneySaved
                      ? require('../../assets/images/nilejourneysvd.png')
                      : require('../../assets/images/nilejourneysv.png')
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Starjourneyonnilemap;

const stylesStarJourney = StyleSheet.create({
  panelWrapStarJourney: {
    position: 'absolute',
    top: 140,
    left: 20,
    right: 20,
    alignItems: 'center',
  },

  panelCardStarJourney: {
    width: '90%',
    backgroundColor: '#09171A',
    borderWidth: 2,
    borderColor: '#E4C443',
    padding: 16,
    borderRadius: 2,
  },

  panelCloseStarJourney: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },

  panelImgStarJourney: {
    width: '80%',
    height: 110,
    borderRadius: 4,
    marginBottom: 14,
  },

  panelTitleStarJourney: {
    fontFamily: 'Inika-Bold',
    color: '#fff',
    fontSize: 18,
    marginBottom: 6,
  },

  panelLabelStarJourney: {
    fontFamily: 'Inika-Bold',
    color: '#fff',
    fontSize: 15,
    marginTop: 10,
  },

  panelTextStarJourney: {
    fontFamily: 'Inika-Regular',
    color: '#fff',
  },

  panelActionsStarJourney: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    marginTop: 34,
  },

  panelShareBtnStarJourney: {
    width: 120,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },

  panelShareTextStarJourney: {
    fontFamily: 'Inika-Bold',
    color: '#000',
  },
});
