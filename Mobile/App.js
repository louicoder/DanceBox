import * as React from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Animated, Easing, Pressable } from 'react-native';

export default function App () {
  const [ state, setState ] = React.useState({ toggled: false });
  const [ height, setHeight ] = React.useState(0);
  const animValue = new Animated.Value(0);

  const animate = () => {
    // setState({ ...state, display: 'flex' });
    console.log('HEight after', height);

    Animated.spring(animValue, {
      toValue: height,
      duration: 1000,
      // easing: Easing.linear,
      useNativeDriver: false
    }).start(() => {
      // Animated.timing(animValue, {
      //   toValue: 0,
      //   duration: 1000,
      //   // easing: Easing.linear,
      //   useNativeDriver: false
      // }).start();
    });
  };

  console.log('HEight', height);

  return (
    <View style={styles.container}>
      <Pressable style={{ alignItems: 'center', borderWidth: 1, padding: 10 }} onPress={animate}>
        <Text>Press me here</Text>
      </Pressable>

      <Animated.View
        onLayout={(e) => {
          console.log('Width Layout--->', e.nativeEvent.layout);
          // setHeight(e.nativeEvent.layout.height);
          // setState({ ...state, height: 0 });
        }}
        style={{
          borderWidth: 1,
          borderColor: 'blue',
          // display: 'none',
          // overflow: 'hidden',
          // ...state
          // height: animValue
          transform: [ { scale: 1 } ]
          // opacity: animValue.current.interpolate({
          //   inputRange: [ 0, 0.5 * state.height, state.height ],
          //   outputRange: [ 0, 0.5, 1 ],
          //   extrapolate: 'identity'
          // })
          // zIndex: -10
          // opacity: state.height >= 0 ? 1 : 0
        }}
      >
        <Animated.Text
          style={[ styles.paragraph, {} ]}
          onLayout={(e) => {
            console.log('Width=====--->', e.nativeEvent.layout);
            // setState({ ...state, ...e.nativeEvent.layout, top: -e.nativeEvent.height, opacity: 0 });
          }}
        >
          Change code in the editor and watch it change on your phone! Save to get a shareable urlx.
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
