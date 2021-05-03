import React from 'react';
import { View, Text, Pressable, SafeAreaView, ScrollView, FlatList, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ComingSoon } from '../../Components';
import { HelperFunctions } from '../../Utils';
import SingleBlog from './SingleBlog';

const Blogs = ({ navigation }) => {
  const dispatch = useDispatch();
  const [ state, setState ] = React.useState({ period: null });
  const { blogs } = useSelector((state) => state.Blogs);
  const loading = useSelector((state) => state.loading.effects.Blogs);

  React.useEffect(() => {
    const sub = navigation.addListener('focus', () => {
      getBlogs();
    });

    return () => sub;
  }, []);

  const getBlogs = () => {
    dispatch.Blogs.getBlogs((response) => {
      console.log('Blogs', response);
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: RFValue(10),
            marginVertical: RFValue(10)
          }}
        >
          <Text style={{ fontSize: RFValue(30), fontWeight: '700' }}>Blogs</Text>
          <Pressable
            onPress={() => navigation.toggleDrawer()}
            style={{
              backgroundColor: '#000',
              width: RFValue(40),
              height: RFValue(40),
              borderRadius: RFValue(50),
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon name="menu" color="#fff" size={RFValue(20)} />
          </Pressable>
        </View>

        <Pressable
          // onPress={() => navigation.navigate('NewBlog')}
          onPress={() => Alert.alert('Coming soon', 'This feature is coming soon, watch the space')}
          style={{
            backgroundColor: '#000',
            borderRadius: RFValue(100),
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            position: 'absolute',
            bottom: RFValue(10),
            right: RFValue(10),
            paddingVertical: RFValue(10),
            paddingHorizontal: RFValue(15),
            zIndex: 20
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: RFValue(14),
              marginRight: RFValue(10),
              zIndex: 20
            }}
          >
            Create Blog
          </Text>
          <Icon name="plus" color="#fff" size={RFValue(20)} />
        </Pressable>
        <View style={{ height: RFValue(40), marginVertical: RFValue(10) }}>
          <ScrollView
            horizontal
            style={{ height: RFValue(40), paddingHorizontal: RFValue(10) }}
            showsHorizontalScrollIndicator={false}
          >
            {[ 'This week', 'This month', 'Next month', 'This year' ].map((period, index) => (
              <Pressable
                key={HelperFunctions.keyGenerator()}
                style={{
                  paddingHorizontal: RFValue(20),
                  backgroundColor: state.period === index ? '#000' : '#eee',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: RFValue(10),
                  borderRadius: RFValue(20),
                  flexDirection: 'row'
                }}
                onPress={() => setState({ ...state, period: index })}
              >
                {state.period === index && (
                  <Icon name="check" color="#fff" size={RFValue(14)} style={{ marginRight: RFValue(5) }} />
                )}
                <Text style={{ fontSize: RFValue(14), color: state.period === index ? '#fff' : '#000' }}>{period}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        <View style={{ flexGrow: 1 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            data={blogs}
            keyExtractor={() => HelperFunctions.keyGenerator()}
            renderItem={({ item }) => <SingleBlog {...item} navigation={navigation} />}
          />
        </View>
        {/* <ComingSoon extStyles={{ flexGrow: 1 }} /> */}
      </View>
    </SafeAreaView>
  );
};

export default Blogs;
