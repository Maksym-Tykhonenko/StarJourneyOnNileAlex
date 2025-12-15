import { Image, StyleSheet, Text, View } from 'react-native';

const Starjourneyonnilecustomhead = ({ headerTitle }) => {
  return (
    <View style={styles.headerBox}>
      <Image
        source={require('../../assets/images/nilejourneyheadlogo.png')}
        style={{ position: 'absolute', left: 10 }}
      />
      <Text style={styles.headerText}>{headerTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBox: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10232A',
    height: 45,
    marginBottom: 40,
    borderRadius: 2,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Inika-Bold',
    color: '#FFCB3E',
  },
});

export default Starjourneyonnilecustomhead;
