import React from 'react';
import { View, Text, Pressable, SafeAreaView, ScrollView, FlatList, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { BottomSheet, Buton, ComingSoon, DesignIcon, Filters, ScrollBubbles, Typo } from '../../Components';
import LoadingModal from '../../Components/LoadingModal';
import { Input } from '../../Components';
import { HelperFunctions } from '../../Utils';
import { BLACK, BROWN, GRAY, HALF_BROWN, HEIGHT, INTERESTS, THEME_COLOR, WHITE, WIDTH } from '../../Utils/Constants';
import SingleBlog from './SingleBlog';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKeyboard } from '../../Utils/useKeyboardHeight';

const Blogs = ({ navigation }) => {
  const dispatch = useDispatch();
  const [ state, setState ] = React.useState({ period: null, selectedBubble: '', isVisible: false });
  const { blogs } = useSelector((state) => state.Blogs);
  const loading = useSelector((state) => state.loading.effects.Blogs);

  // React.useEffect(
  //   // () => {
  //   //   const sub = navigation.addListener('focus', () => {
  //   //     getBlogs();
  //   //   });

  //   //   return () => sub;
  //   // },
  //   // [ navigation ]
  // );

  const getBlogs = () => {
    // dispatch.Blogs.getBlogs((response) => {});
  };

  const selectBubble = React.useCallback((selectedBubble) => setState({ ...state, selectedBubble }), [
    state.selectedBubble
  ]);

  const openModal = React.useCallback(() => setState({ ...state, isVisible: true }), [ state.isVisible ]);

  const closeModal = React.useCallback(() => setState({ ...state, isVisible: false }), [ state.isVisible ]);

  return (
    <View style={{ flex: 1 }}>
      {/* <BottomSheet isVisible={state.isVisible} closeModal={closeModal}>
        <View
          style={{
            paddingBottom: useSafeAreaInsets().bottom,
            height: HEIGHT,
            paddingHorizontal: RFValue(10),
            // height: HEIGHT - useSafeAreaInsets().top,
            paddingTop: useSafeAreaInsets().top
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <DesignIcon
              name={Platform.select({ ios: 'chevron-left', android: 'arrow-left' })}
              pkg={Platform.select({ ios: 'mc', android: 'mc' })}
              size={30}
              onPress={closeModal}
            />
            <Typo text="Post something" size={18} style={{ marginLeft: RFValue(10) }} />
          </View>
        </View>
      </BottomSheet> */}
      <Buton
        title="Create Event"
        extStyles={{
          position: 'absolute',
          bottom: RFValue(10),
          zIndex: 30,
          width: 0.4 * WIDTH,
          height: RFValue(40),
          right: RFValue(8),
          backgroundColor: THEME_COLOR
        }}
      >
        <DesignIcon name="calendar" color={WHITE} style={{ marginRight: RFValue(10) }} />
      </Buton>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            height: RFValue(30),
            // borderWidth: 1,
            // width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: RFValue(5),
            // paddingLeft: RFValue(10),
            backgroundColor: BROWN,
            marginBottom: RFValue(15),
            // borderBottomWidth: 1,
            borderColor: GRAY,
            paddingRight: 0,
            // position: 'relative',
            zIndex: 50
          }}
        >
          <DesignIcon name="md-search-outline" pkg="io" extStyles={{ marginHorizontal: RFValue(10) }} />
          <Input
            extStyles={{ height: RFValue(30), marginBottom: 0, flexShrink: 1 }}
            extInputStyles={{ height: RFValue(30), marginTop: 0, borderWidth: 0, paddingLeft: 0 }}
            placeholder="Search community posts..."
          />
          {/* <ScrollView
          style={{
            backgroundColor: THEME_COLOR,
            width: '100%',
            // borderWidth: 1,
            height: 2.5 / 4 * HEIGHT,
            position: 'absolute',
            top: RFValue(30.2),
            left: 0,
            zIndex: 40
          }}
        >
          {[
            ...new Array(50).fill().map((r, i) => (
              <View style={{ padding: RFValue(15), borderBottomWidth: 1, borderColor: GRAY }}>
                <Typo text={`New number - ${i + 1}`} color={WHITE} />
                <Typo
                  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nos paucis ad haec additis finem faciamus aliquando; Istam  "
                  color={WHITE}
                />
              </View>
            ))
          ]}
        </ScrollView> */}
        </View>
        <ScrollBubbles
          selected={state.selectedBubble}
          onPress={selectBubble}
          options={INTERESTS}
          extStyles={{ marginTop: 0 }}
        />

        <View style={{ flexGrow: 1, backgroundColor: WHITE }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, backgroundColor: HALF_BROWN }}
            data={[ ...new Array(15).fill() ]}
            keyExtractor={() => HelperFunctions.keyGenerator()}
            renderItem={({ item, index }) => (
              <SingleBlog {...item} navigation={navigation} last={index + 1 === blogs.length} index={index} />
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Blogs;
