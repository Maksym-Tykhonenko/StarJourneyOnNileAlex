import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState } from 'react';

export const StoreContext = createContext(undefined);

export const useStorage = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({ children }) => {
  const [savedIdsStarJourney, setSavedIdsStarJourney] = useState([]);

  const loadStarJourneySaved = async () => {
    try {
      const json = await AsyncStorage.getItem('starjourney_saved_cards');
      if (json) {
        setSavedIdsStarJourney(JSON.parse(json));
      }
    } catch (e) {}
  };

  const contextValue = {
    loadStarJourneySaved,
    savedIdsStarJourney,
    setSavedIdsStarJourney,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
