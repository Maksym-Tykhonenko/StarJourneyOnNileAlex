import React, { useState, useCallback } from 'react';
import { starjourneyonnileplaces } from '../Starjourneyonniledata/starjourneyonnileplaces';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Starjourneyonnilecustomhead from '../Starjourneyonnilecmpnts/Starjourneyonnilecustomhead';
import Starjourneyonnilecustomlayout from '../Starjourneyonnilecmpnts/Starjourneyonnilecustomlayout';
import { useStorage } from '../Starjourneyonnilestorage/starjourneyonnilecontext';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
  Share,
} from 'react-native';

const Starjourneyonnilelocations = () => {
  const [activeCategoryStarJourney, setActiveCategoryStarJourney] =
    useState('All');
  const [openedCardStarJourney, setOpenedCardStarJourney] = useState(null);
  const navigationStarJourney = useNavigation();
  const { loadStarJourneySaved, savedIdsStarJourney, setSavedIdsStarJourney } =
    useStorage();

  useFocusEffect(
    useCallback(() => {
      loadStarJourneySaved();
    }, []),
  );

  const handleShareStarJourney = async place => {
    try {
      await Share.share({
        message: `Check out this place: ${place.title}\nDescription: ${place.description}\nAddress: ${place.address}\nCoordinates: ${place.coordinates}`,
      });
    } catch (err) {
      console.log('error:', err);
    }
  };

  const toggleStarJourneySave = async selectedid => {
    try {
      let starJourneyUpdated;

      if (savedIdsStarJourney.includes(selectedid)) {
        starJourneyUpdated = savedIdsStarJourney.filter(x => x !== selectedid);
      } else {
        starJourneyUpdated = [...savedIdsStarJourney, selectedid];
      }

      setSavedIdsStarJourney(starJourneyUpdated);
      await AsyncStorage.setItem(
        'starjourney_saved_cards',
        JSON.stringify(starJourneyUpdated),
      );
    } catch (e) {}
  };

  const isStarJourneySaved =
    openedCardStarJourney &&
    savedIdsStarJourney.includes(openedCardStarJourney.id);

  const filteredStarJourneyList =
    activeCategoryStarJourney === 'All'
      ? starjourneyonnileplaces
      : starjourneyonnileplaces.filter(
          starJourneyLoc =>
            starJourneyLoc.category === activeCategoryStarJourney,
        );

  return (
    <Starjourneyonnilecustomlayout>
      <View style={stylesStarJourney.screenShellStarJourney}>
        <View style={{ width: '90%' }}>
          <Starjourneyonnilecustomhead headerTitle="Location Cards" />
        </View>

        <View style={stylesStarJourney.categoryStripStarJourney}>
          {LOCATION_CATEGORIES.map(starJourneyCat => (
            <TouchableOpacity
              key={starJourneyCat}
              onPress={() => setActiveCategoryStarJourney(starJourneyCat)}
              style={[
                stylesStarJourney.categoryBtnStarJourney,
                activeCategoryStarJourney === starJourneyCat &&
                  stylesStarJourney.categoryBtnActiveStarJourney,
              ]}
            >
              <Text
                style={[
                  stylesStarJourney.categoryTextStarJourney,
                  activeCategoryStarJourney === starJourneyCat &&
                    stylesStarJourney.categoryTextActiveStarJourney,
                ]}
              >
                {starJourneyCat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {filteredStarJourneyList.map(loc => (
          <TouchableOpacity
            key={loc.id}
            style={stylesStarJourney.tileStarJourney}
            activeOpacity={0.7}
            onPress={() => setOpenedCardStarJourney(loc)}
          >
            <Image
              source={loc.image}
              style={stylesStarJourney.tileImgStarJourney}
            />

            <View style={stylesStarJourney.tileInfoStarJourney}>
              <Text style={stylesStarJourney.tileTitleStarJourney}>
                {loc.title}
              </Text>
              <Text style={stylesStarJourney.tileAddressStarJourney}>
                {loc.address}
              </Text>

              <LinearGradient
                colors={['#FFCB3E', '#FFCB3E']}
                style={stylesStarJourney.tileOpenStarJourney}
              >
                <Text style={stylesStarJourney.tileOpenTextStarJourney}>
                  Open
                </Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Modal visible={!!openedCardStarJourney} transparent animationType="fade">
        {Platform.OS === 'ios' && (
          <BlurView
            style={stylesStarJourney.blurLayerStarJourney}
            blurType="dark"
            blurAmount={1}
          />
        )}

        <View style={stylesStarJourney.popupShellStarJourney}>
          <View style={stylesStarJourney.popupCardStarJourney}>
            <TouchableOpacity
              style={stylesStarJourney.popupCloseStarJourney}
              onPress={() => setOpenedCardStarJourney(null)}
            >
              <Image
                source={require('../../assets/images/nilejourneyclose.png')}
              />
            </TouchableOpacity>

            {!!openedCardStarJourney && (
              <>
                <Image
                  source={openedCardStarJourney.image}
                  style={stylesStarJourney.popupImgStarJourney}
                />

                <View style={stylesStarJourney.popupInnerStarJourney}>
                  <Text style={stylesStarJourney.popupTitleStarJourney}>
                    {openedCardStarJourney.title}
                  </Text>

                  <Text style={stylesStarJourney.popupLabelStarJourney}>
                    Description:
                  </Text>
                  <Text style={stylesStarJourney.popupTextStarJourney}>
                    {openedCardStarJourney.description}
                  </Text>

                  <Text style={stylesStarJourney.popupLabelStarJourney}>
                    Address:
                  </Text>
                  <Text style={stylesStarJourney.popupTextStarJourney}>
                    {openedCardStarJourney.address}
                  </Text>

                  <Text style={stylesStarJourney.popupLabelStarJourney}>
                    Coordinates:
                  </Text>
                  <Text style={stylesStarJourney.popupTextStarJourney}>
                    {openedCardStarJourney.coordinates}
                  </Text>

                  <View style={stylesStarJourney.popupActionsStarJourney}>
                    <TouchableOpacity
                      style={stylesStarJourney.iconSlotStarJourney}
                      onPress={() =>
                        handleShareStarJourney(openedCardStarJourney)
                      }
                      activeOpacity={0.7}
                    >
                      <Image
                        source={require('../../assets/images/nilejourneyshare.png')}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        navigationStarJourney.navigate('Starjourneyonniletbs', {
                          screen: 'Starjourneyonnilemp',
                          params: { place: openedCardStarJourney },
                        });
                        setOpenedCardStarJourney(null);
                      }}
                    >
                      <LinearGradient
                        colors={['#E4C443', '#B49035']}
                        style={stylesStarJourney.popupMapBtnStarJourney}
                      >
                        <Text style={stylesStarJourney.popupMapTextStarJourney}>
                          Open Map
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={stylesStarJourney.iconSlotStarJourney}
                      onPress={() =>
                        toggleStarJourneySave(openedCardStarJourney.id)
                      }
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
              </>
            )}
          </View>
        </View>
      </Modal>
    </Starjourneyonnilecustomlayout>
  );
};

export default Starjourneyonnilelocations;

const stylesStarJourney = StyleSheet.create({
  screenShellStarJourney: {
    paddingBottom: 140,
    paddingTop: 70,
    alignItems: 'center',
  },

  categoryStripStarJourney: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 14,
  },

  categoryBtnStarJourney: {
    paddingVertical: 4,
    paddingHorizontal: 9,
    margin: 5,
    backgroundColor: '#10232A',
  },

  categoryBtnActiveStarJourney: {
    backgroundColor: '#FFCB3E',
  },

  categoryTextStarJourney: {
    color: '#FFCB3E',
    fontFamily: 'Inika-Bold',
    fontSize: 16,
  },

  categoryTextActiveStarJourney: {
    color: '#10232A',
    fontFamily: 'Inika-Bold',
    fontSize: 16,
  },

  tileStarJourney: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E4C443',
    marginVertical: 7,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#09171A',
    borderRadius: 6,
  },

  tileImgStarJourney: {
    width: '42%',
    height: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },

  tileInfoStarJourney: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },

  tileTitleStarJourney: {
    fontFamily: 'Inika-Bold',
    fontSize: 15,
    color: '#DFCB79',
  },

  tileAddressStarJourney: {
    fontFamily: 'Inika-Regular',
    fontSize: 12,
    color: '#fff',
    marginVertical: 6,
  },

  tileOpenStarJourney: {
    width: 83,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tileOpenTextStarJourney: {
    color: '#10232A',
    fontFamily: 'Inika-Bold',
    fontSize: 13,
  },

  popupShellStarJourney: {
    flex: 1,
    backgroundColor: Platform.OS === 'ios' ? '#ffffff04' : '#00000068',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  popupCardStarJourney: {
    backgroundColor: '#09171A',
    borderColor: '#E4C443',
    borderWidth: 2,
    paddingBottom: 20,
    padding: 20,
    maxHeight: '90%',
    borderRadius: 2,
    width: '90%',
    alignSelf: 'center',
  },

  popupCloseStarJourney: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },

  popupImgStarJourney: {
    width: '80%',
    height: 110,
    borderRadius: 3,
    resizeMode: 'cover',
  },

  popupTitleStarJourney: {
    fontFamily: 'Inika-Bold',
    color: '#fff',
    fontSize: 20,
    marginBottom: 6,
    marginTop: 8,
  },

  popupLabelStarJourney: {
    fontFamily: 'Inika-Bold',
    color: '#fff',
    marginBottom: 4,
    fontSize: 16,
    marginTop: 10,
  },

  popupTextStarJourney: {
    fontFamily: 'Inika-Regular',
    color: '#fff',
    fontSize: 16,
  },

  popupActionsStarJourney: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 34,
    gap: 5,
  },

  popupMapBtnStarJourney: {
    width: 140,
    alignItems: 'center',
    height: 27,
    justifyContent: 'center',
  },

  popupMapTextStarJourney: {
    color: '#000',
    fontFamily: 'Inika-Bold',
  },

  blurLayerStarJourney: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const LOCATION_CATEGORIES = [
  'All',
  'Historical Sites',
  'Modern Cities',
  'Dams',
  'Oases',
  'Nature Reserves',
];
