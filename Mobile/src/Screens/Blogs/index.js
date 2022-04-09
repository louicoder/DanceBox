import React from 'react';
import { View, Text, Pressable, SafeAreaView, ScrollView, FlatList, Alert, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { BottomSheet, Buton, ComingSoon, DesignIcon, Filters, Header, ScrollBubbles, Typo } from '../../Components';
import LoadingModal from '../../Components/LoadingModal';
import { Input } from '../../Components';
import { HelperFunctions } from '../../Utils';
import {
  BLACK,
  BROWN,
  GRAY,
  HALF_BROWN,
  HEIGHT,
  INTERESTS,
  SHADOW,
  THEME_COLOR,
  WHITE,
  WIDTH
} from '../../Utils/Constants';
import SingleBlog from './SingleBlog';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKeyboard } from '../../Utils/useKeyboardHeight';
import NewPost from './NewPost';
import Instructions from './Instructions';

const Blogs = ({ navigation }) => {
  const dispatch = useDispatch();
  const [ state, setState ] = React.useState({ isVisible: false });
  const { blogs } = useSelector((state) => state.Blogs);
  const loading = useSelector((state) => state.loading.effects.Blogs);

  const getBlogs = () => {
    // dispatch.Blogs.getBlogs((response) => {});
  };

  const selectBubble = React.useCallback((selectedBubble) => setState({ ...state, selectedBubble }), [
    state.selectedBubble
  ]);

  const openModal = React.useCallback(() => setState({ ...state, isVisible: true }), [ state.isVisible ]);

  const closeModal = React.useCallback(() => setState({ ...state, isVisible: false }), [ state.isVisible ]);

  const renderItem = ({ item, index }) => (
    <SingleBlog {...item} navigation={navigation} last={index + 1 === blogs.length} index={index} first={index === 0} />
  );

  const RenderModalContent = ({ comp, createPost, closeModal }) => {
    switch (comp) {
      case 'newpost':
        return <NewPost closeModal={closeModal} />;
      case 'instructions':
        return <Instructions createPost={createPost} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <BottomSheet
        isVisible={state.isVisible}
        closeModal={closeModal}
        extStyles={{
          height: 'auto',
          ...(![ 'instructions' ].includes(state.comp) && { top: 0, left: 0, bottom: 0, right: 0 })
        }}
      >
        {/* <Header
          title="Create Post"
          extStyles={{ backgroundColor: THEME_COLOR }}
          titleStyles={{ color: WHITE }}
          iconProps={{ color: WHITE }}
          onBackPress={closeModal}
        /> */}
        <View style={{ height: ![ 'instructions' ].includes(state.comp) ? '100%' : 'auto' }}>
          <RenderModalContent
            {...state}
            createPost={() => setState({ ...state, comp: 'newpost' })}
            closeModal={closeModal}
          />
        </View>
      </BottomSheet>
      <View
        style={{
          flexDirection: 'row',
          height: RFValue(35),
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: RFValue(10),
          backgroundColor: BROWN,
          marginVertical: RFValue(15),
          marginHorizontal: RFValue(8),
          // borderWidth: 1,
          borderColor: GRAY,
          zIndex: 50
        }}
      >
        <DesignIcon name="md-search-outline" pkg="io" extStyles={{ marginHorizontal: RFValue(0) }} />
        <View style={{ flexGrow: 1 }}>
          <Input
            extStyles={{ height: RFValue(35), marginBottom: 0 }}
            extInputStyles={{ height: RFValue(30), marginTop: 0, borderWidth: 0, padding: 0 }}
            placeholder="Search community posts..."
          />
        </View>
        <ActivityIndicator color={GRAY} style={{ flexShrink: 1 }} animating={false} />
      </View>

      <Pressable
        onPress={() => setState({ ...state, isVisible: true, comp: 'instructions' })}
        style={{
          width: RFValue(50),
          height: RFValue(50),
          borderRadius: RFValue(100),
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          backgroundColor: THEME_COLOR,
          ...SHADOW,
          shadowOpacity: 5,
          elevation: RFValue(10),
          shadowColor: '#000',
          position: 'absolute',
          bottom: RFValue(10),
          right: RFValue(10)
        }}
      >
        <DesignIcon
          name="plus"
          pkg="ad"
          color={WHITE}
          onPress={() => setState({ ...state, isVisible: true, comp: 'instructions' })}
        />
      </Pressable>
      <ScrollBubbles
        selected={state.selectedBubble}
        onPress={selectBubble}
        options={INTERESTS}
        extStyles={{ marginTop: 0 }}
      />

      <View style={{ flexGrow: 1, backgroundColor: WHITE }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, backgroundColor: BROWN }}
          data={[ ...new Array(15).fill() ]}
          keyExtractor={() => HelperFunctions.keyGenerator()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default Blogs;
