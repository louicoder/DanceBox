import React from 'react';
import { View, Text, FlatList, Alert, SafeAreaView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { HelperFunctions } from '../../Utils';
import SingleBlog from '../Blogs/SingleBlog';

const AllBlogs = ({ navigation }) => {
  const { userBlogs } = useSelector((state) => state.Blogs);
  const dispatch = useDispatch();
  const [ user, setUser ] = React.useState({});

  React.useEffect(() => {
    HelperFunctions.getUser(({ result, success }) => {
      if (success) {
        setUser(result);
        getUserBlogs(result._id);
      }
    });
    // getUserBlogs()
  }, []);

  const getUserBlogs = (uid) =>
    dispatch.Blogs.getUserBlogs({
      uid,
      callback: ({ success, result }) => !success && Alert.alert('error getting events', result)
    });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#eeeeee70' }}>
        <FlatList
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Text style={{ fontSize: RFValue(14), color: '#aaa' }}>You have no blogs</Text>
            </View>
          )}
          // contentContainerStyle={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          data={userBlogs}
          keyExtractor={() => HelperFunctions.keyGenerator()}
          renderItem={({ item, index }) => (
            <SingleBlog
              {...item}
              header={false}
              marginBottom={0}
              navigation={navigation}
              last={userBlogs && index + 1 === userBlogs.length}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default AllBlogs;
