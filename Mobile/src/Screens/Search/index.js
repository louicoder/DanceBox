import React from 'react';
import { View, Text, SafeAreaView, Pressable, ActivityIndicator, FlatList, Alert } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../Components/Input';
import LoadingModal from '../../Components/LoadingModal';
import { HelperFunctions } from '../../Utils';
import SingleBlog from '../Blogs/SingleBlog';
import SingleEvent from '../Events/SingleEvent';

const Search = ({ navigation, ...props }) => {
  const [ state, setState ] = React.useState({
    filterShowing: false,
    category: '',
    subCategory: '',
    mode: 'blogs',
    search: 'musa',
    currentPage: 1,
    nextPage: 1,
    totalPages: 1,
    done: false
  });

  const { events, blogs } = useSelector((state) => state.Search);
  const loading = useSelector((state) => state.loading.effects.Search);
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   searchHandler();
  // }, []);

  React.useEffect(
    () => {
      const sub = navigation.addListener('focus', () => {
        // setState({ ...state, search: '' });
        searchHandler();
      });

      return () => sub;
    },
    [ navigation ]
  );

  const searchHandler = () => {
    setState({ ...state, filterShowing: false });

    const { search, mode } = state;
    console.log('Searching first time', mode);
    if (!search)
      return Alert.alert(
        'Warning',
        'You cannot perform and empty search, please enter what you would like to search in the search box at the top and continue to search'
      );
    const payload = { search, route: mode, page: 1 };
    dispatch.Search.searchEventsAndBlogs({
      payload,
      callback: (res) => {
        // console.log('RES from search', res);
        const { success, result, ...rest } = res;
        if (success) {
          setState({ ...state, ...rest, done: rest.lastPage });
        }
      }
    });
  };

  const searchMore = () => {
    const { currentPage, search, nextPage, mode } = state;
    const payload = { search, route: mode, page: nextPage };

    dispatch.Search.searchEventsAndBlogs({
      payload,
      callback: (res) => {
        const { success, result, ...rest } = res;
        // console.log('ARE we done------', rest);
        if (res.success) {
          setState({ ...state, ...rest, done: rest.lastPage });
        }
      }
    });
  };

  // console.log('EVEVNTS', blogs);

  const MoreComponent = ({ onPress, loading }) => (
    <Pressable
      style={{ width: '100%', backgroundColor: '#fff', paddingVertical: RFValue(20), alignItems: 'center' }}
      onPress={onPress}
    >
      <Text style={{ color: 'blue' }}>{loading ? 'Loading, please wait...' : 'Load More...'}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: RFValue(10), flexDirection: 'row', marginTop: RFValue(10) }}>
        <Input
          onSubmitEditing={searchHandler}
          placeholder="Enter your search"
          extStyles={{ width: '85%', marginBottom: 0 }}
          inputStyles={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          value={state.search}
          onChangeText={(search) => setState({ ...state, search })}
        />
        <Pressable
          // rippleCentered
          style={{
            flexGrow: 1,
            borderTopRightRadius: RFValue(5),
            borderBottomRightRadius: RFValue(5),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000'
          }}
          onPress={searchHandler}
        >
          <Icon name="magnify" size={RFValue(25)} color="#fff" />
        </Pressable>
      </View>

      <Pressable
        style={{
          // paddingHorizontal: RFValue(10),
          width: '94%',
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#eee',
          paddingHorizontal: RFValue(10),
          paddingVertical: RFValue(10),
          marginTop: RFValue(10)
        }}
        onPress={() => setState({ ...state, filterShowing: !state.filterShowing })}
      >
        <Text style={{ fontSize: RFValue(14) }}>Set filters for your search</Text>
        <Icon name={state.filterShowing ? 'chevron-down' : 'chevron-up'} size={RFValue(20)} />
      </Pressable>

      {!state.filterShowing && (
        <View
          style={{
            backgroundColor: '#fff',
            padding: RFValue(10),
            width: '94%',
            alignSelf: 'center',
            borderWidth: 1,
            borderColor: '#eee',
            borderTopWidth: 0
          }}
        >
          <View style={{ width: '100%' }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
                // paddingVertical: RFValue(10)
              }}
            >
              {[
                { title: 'Events', disabled: false },
                { title: 'Blogs', disabled: false },
                { title: 'Profiles', disabled: true }
              ].map(({ title: item, disabled }) => (
                <Pressable
                  key={HelperFunctions.keyGenerator()}
                  style={{
                    width: '32%',
                    // borderWidth: 1,
                    borderColor: 'green',
                    marginBottom: RFValue(5),
                    flexDirection: 'row'
                  }}
                  // onPress={() =>
                  //   !disabled
                  //     ? setState({ ...state, mode: item.toLowerCase(), currentPage: 1, nextPage: 1, totalPages: 1 })
                  //     : null}
                  onPress={() => {
                    if (!disabled) {
                      setState({ ...state, mode: item.toLowerCase(), currentPage: 1, nextPage: 1, totalPages: 1 });
                      // searchHandler();
                    } else return;
                  }}
                >
                  <Icon
                    name={
                      state.mode.toLowerCase() === item.toLowerCase() ? 'checkbox-marked' : 'checkbox-blank-outline'
                    }
                    size={RFValue(20)}
                    color={disabled ? '#ccc' : '#000'}
                  />
                  <Text
                    style={{
                      fontSize: RFValue(14),
                      marginLeft: RFValue(10),
                      fontWeight: state.mode === item ? 'bold' : 'normal',
                      color: disabled ? '#ccc' : '#000'
                    }}
                  >
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      )}
      <View style={{ flexGrow: 1, marginTop: RFValue(10) }}>
        {state.mode === 'events' && (
          <FlatList
            ListFooterComponent={
              !state.done &&
              events &&
              events.length && <MoreComponent onPress={searchMore} loading={loading.searchEventsAndBlogs} />
            }
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, backgroundColor: '#eeeeee90' }}
            data={events}
            keyExtractor={() => HelperFunctions.keyGenerator()}
            renderItem={({ item, index }) => (
              <SingleEvent last={index + 1 === events.length} {...item} {...props} navigation={navigation} />
            )}
          />
        )}

        {state.mode === 'blogs' && (
          <FlatList
            ListFooterComponent={
              !state.done &&
              blogs &&
              blogs.length && <MoreComponent onPress={searchMore} loading={loading.searchEventsAndBlogs} />
            }
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, backgroundColor: '#eeeeee90' }}
            data={blogs}
            keyExtractor={() => HelperFunctions.keyGenerator()}
            renderItem={({ item, index }) => (
              <SingleBlog {...item} marginBottom={0} navigation={navigation} last={index + 1 === blogs.length} />
            )}
          />
        )}

        {/* <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#eeeeee90',
            flexDirection: 'row'
          }}
        >
          <Text style={{ color: '#aaa' }}> Loading...</Text>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default Search;
