import { View, Text } from 'react-native';
import React from 'react';
import { DesignIcon, Header, Typo } from '../../Components';
import { BROWN, GRAY, HEIGHT, SHADOW, WIDTH } from '../../Utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';

const Favorites = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: (props) => (
        <Header title="Favorites" backEnabled={false} {...props} rightComp={() => null} extStyles={{ ...SHADOW }} />
      )
    });
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <DesignIcon
        name="bookmark"
        pkg="ft"
        size={0.5 * WIDTH}
        color={BROWN}
        style={{ alignSelf: 'center', marginBottom: 0.05 * HEIGHT }}
      />
      <View style={{ paddingHorizontal: RFValue(10) }}>
        <Typo text="All your saved posts and events in one place" color="#aaa" size={16} />
        <Typo
          text={`How to save items: \n1. View a post of event you want to save\n2. Hit the bookmark icon\n3. Your item is saved and can be viewed later!\n\nStart saving and read later🎉`}
          color={GRAY}
          style={{ marginTop: RFValue(20) }}
        />
      </View>
    </View>
  );
};

export default Favorites;
