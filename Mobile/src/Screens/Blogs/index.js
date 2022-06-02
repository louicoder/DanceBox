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
import { showAlert } from '../../Utils/HelperFunctions';

const Blogs = ({ navigation }) => {
  const dispatch = useDispatch();
  const [ state, setState ] = React.useState({ isVisible: false });
  const [ momentum, setMomentum ] = React.useState(false);
  const { blogs, postsPagination: { nextPage, limit, totalDocuments, last, totalPages } } = useSelector(
    (state) => state.Blogs
  );
  const loading = useSelector((state) => state.loading.effects.Blogs);

  console.log('TOttal pages', totalPages, nextPage, last);
  React.useEffect(() => {
    const nav = navigation.addListener('focus', () => {
      getPosts();
    });

    return () => navigation.removeListener(nav);
  }, []);

  const selectBubble = React.useCallback((selectedBubble) => setState({ ...state, selectedBubble }), [
    state.selectedBubble
  ]);

  const openModal = React.useCallback(() => setState({ ...state, isVisible: true }), [ state.isVisible ]);

  const closeModal = React.useCallback(() => setState({ ...state, isVisible: false }), [ state.isVisible ]);

  const renderItem = ({ item, index }) => (
    <SingleBlog {...item} last={index + 1 === blogs.length} index={index} first={index === 0} blog={item} />
  );

  const RenderModalContent = ({ comp, createPost, closeModal }) => {
    switch (comp) {
      case 'newpost':
        return <NewPost closeModal={closeModal} />;
      case 'instructions':
        return <Instructions createPost={createPost} />;
    }
  };

  const keyExtractor = () => HelperFunctions.keyGenerator();

  const onMomentumScrollBegin = React.useCallback(() => setMomentum(false), [ momentum ]);

  const endReached = React.useCallback(
    () => {
      // console.log('StateXXXXXXXX', state);
      if (!momentum) setMomentum(true);
      getPosts();
    },
    [ setMomentum, getPosts ]
  );

  const getPosts = () =>
    dispatch.Blogs.getBlogs((res) => {
      // console.log('PSOSTS-------', res);
      if (!res.success) return showAlert('Something went wrong', `ERROR:: ${res.result}`, 'danger');
      // setState({ ...state, ...res });
    });

  const onRefresh = () => {
    dispatch.Blogs.setField('postsPagination', { limit, nextPage: 1, last: false, totalPages: 1 });
    dispatch.Blogs.setField('blogs', []);

    dispatch.Blogs.getBlogs((res) => {
      // console.log('PSOSTS-------', res);
      if (!res.success) return showAlert('Something went wrong', `ERROR:: ${res.result}`, 'danger');
      // setState({ ...state, ...res });
    });
  };

  const switchToCreatePost = () => {
    setState({ ...state, isVisible: false });
    return navigation.navigate('NewBlog');
  };

  return (
    <View style={{ flex: 1 }}>
      <BottomSheet
        isVisible={state.isVisible}
        closeModal={closeModal}
        extStyles={{
          height: 'auto'
          // top: 0
          // ...(![ 'instructions' ].includes(state.comp) && { top: 0, left: 0, bottom: 0, right: 0 })
        }}
      >
        {/* <Header
          title="Create Post"
          extStyles={{ backgroundColor: THEME_COLOR }}
          titleStyles={{ color: WHITE }}
          iconProps={{ color: WHITE }}
          onBackPress={closeModal}
        /> */}
        <View style={{ height: '100%' }}>
          <RenderModalContent {...state} createPost={switchToCreatePost} closeModal={closeModal} />
        </View>
      </BottomSheet>

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
      {/* <ScrollBubbles
        selected={state.selectedBubble}
        onPress={selectBubble}
        options={INTERESTS}
        extStyles={{ marginTop: 0 }}
      /> */}

      <View style={{ flexGrow: 1, backgroundColor: WHITE }}>
        <FlatList
          keyExtractor={keyExtractor}
          // onRefresh={getPosts}
          onRefresh={onRefresh}
          refreshing={loading.getBlogs}
          // initialNumToRender={8}
          // ListHeaderComponent={ListHeaderComponent}
          // ListEmptyComponent={ListEmptyComponent}
          // ListFooterComponent={ListFooterComponent}
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: '#eeeeee70', flex: 1 }}
          data={blogs}
          renderItem={renderItem}
          onEndReached={endReached}
          onEndReachedThreshold={0.01}
          onMomentumScrollBegin={onMomentumScrollBegin}
          // scrollEnabled={!loading.getPosts}
        />
      </View>
    </View>
  );
};

export default Blogs;
