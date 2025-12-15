import { NavigationContainer } from '@react-navigation/native';
import Starjourneyonnilestck from './Starjourneyonnile/Starjourneyonnilenav/Starjourneyonnilestck';
import { StoreProvider } from './Starjourneyonnile/Starjourneyonnilestorage/starjourneyonnilecontext';

const App = () => {
  return (
    <NavigationContainer>
      <StoreProvider>
        <Starjourneyonnilestck />
      </StoreProvider>
    </NavigationContainer>
  );
};

export default App;
