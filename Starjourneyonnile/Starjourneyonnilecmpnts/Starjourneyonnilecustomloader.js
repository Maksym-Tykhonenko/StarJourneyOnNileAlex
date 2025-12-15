import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import Starjourneyonnilecustomlayout from './Starjourneyonnilecustomlayout';
import { useNavigation } from '@react-navigation/native';
import { Image, View } from 'react-native';

const customLoader = `
   <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body {
        margin: 0;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
      }

      .loader {
        height: 30px;
        display: flex;
      }

      .loader div {
        width: 10px;
        height: 10px;
        border-radius: 100%;
        box-shadow: 0 0 10px orange;
        background: #FFECBA;
        margin: 5px;
        transform: scale(2);
      }

      .loader div:nth-child(1) { animation: move1 1s infinite linear; }
      .loader div:nth-child(2) { animation: move2 1s infinite linear; animation-delay: .2s; }
      .loader div:nth-child(3) { animation: move3 1s infinite linear; animation-delay: .3s; }
      .loader div:nth-child(4) { animation: move4 1s infinite linear; animation-delay: .4s; }
      .loader div:nth-child(5) { animation: move5 1s infinite linear; animation-delay: .5s; }

      @keyframes move1 { 50% { background:#FFBB00; transform: scale(1); } }
      @keyframes move2 { 50% { background:#FFBB00; transform: scale(1); } }
      @keyframes move3 { 50% { background:#FFBB00; transform: scale(1); } }
      @keyframes move4 { 50% { background:#FFBB00; transform: scale(1); } }
      @keyframes move5 { 50% { background:#FFBB00; transform: scale(1); } }
    </style>
  </head>

  <body>
    <div class="loader">
      <div></div><div></div><div></div><div></div><div></div>
    </div>
  </body>
</html>
  `;

const Starjourneyonnilecustomloader = () => {
  const navigation = useNavigation();
  const [showStarJourneyCustomLogo, setShowStarJourneyCustomLogo] =
    useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowStarJourneyCustomLogo(true);

      setTimeout(() => {
        navigation.replace('Starjourneyonnileonbrd');
      }, 2000);

      () => clearTimeout();
    }, 3000);

    () => clearTimeout();
  }, []);

  return (
    <Starjourneyonnilecustomlayout>
      {showStarJourneyCustomLogo ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Image
            source={require('../../assets/images/nilejourneyapplogo.png')}
          />
        </View>
      ) : (
        <WebView
          originWhitelist={['*']}
          source={{ html: customLoader }}
          style={{ backgroundColor: 'transparent' }}
          scrollEnabled={false}
        />
      )}
    </Starjourneyonnilecustomlayout>
  );
};

export default Starjourneyonnilecustomloader;
