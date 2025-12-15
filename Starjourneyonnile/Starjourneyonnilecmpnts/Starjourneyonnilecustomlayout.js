import { ImageBackground, ScrollView } from 'react-native';

const Starjourneyonnilecustomlayout = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/nilejourneybg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

export default Starjourneyonnilecustomlayout;
