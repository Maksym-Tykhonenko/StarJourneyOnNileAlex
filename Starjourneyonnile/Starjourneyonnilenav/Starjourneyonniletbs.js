import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform, StyleSheet } from 'react-native';
import Starjourneyonnilelctnns from '../Starjourneyonnilescrns/Starjourneyonnilelctnns';
import Starjourneyonnilehstr from '../Starjourneyonnilescrns/Starjourneyonnilehstr';
import Starjourneyonnilemp from '../Starjourneyonnilescrns/Starjourneyonnilemp';
import Starjourneyonnilefcts from '../Starjourneyonnilescrns/Starjourneyonnilefcts';
import Starjourneyonnilesvd from '../Starjourneyonnilescrns/Starjourneyonnilesvd';
import LinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator();

const Starjourneyonniletbs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.starjourneytabs,
        tabBarActiveTintColor: '#071317',
        tabBarInactiveTintColor: '#A58325',
        tabBarBackground: () => (
          <LinearGradient
            colors={['#E4C443', '#B49035']}
            style={{ borderRadius: 2 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <LinearGradient
              colors={['#10232A', '#10232A']}
              style={styles.starjourneytabsbg}
            ></LinearGradient>
          </LinearGradient>
        ),
      }}
    >
      <Tab.Screen
        name="Starjourneyonnilelctnns"
        component={Starjourneyonnilelctnns}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/nilejourneytab1.png')}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Starjourneyonnilehstr"
        component={Starjourneyonnilehstr}
        options={{ unmountOnBlur: true }}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/nilejourneytab2.png')}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Starjourneyonnilemp"
        component={Starjourneyonnilemp}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/nilejourneytab3.png')}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Starjourneyonnilefcts"
        component={Starjourneyonnilefcts}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/nilejourneytab4.png')}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Starjourneyonnilesvd"
        component={Starjourneyonnilesvd}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/nilejourneytab5.png')}
              tintColor={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  starjourneytabs: {
    marginHorizontal: 26,
    elevation: 0,
    paddingTop: 14,
    paddingBottom: 1,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 51,
    paddingHorizontal: 6,
    borderTopColor: 'transparent',
  },
  starjourneytabsbg: {
    height: 66,
    borderRadius: 2,
    padding: Platform.OS === 'ios' ? 1 : 0,
    margin: Platform.OS === 'ios' ? 0 : 1,
  },
});

export default Starjourneyonniletbs;
