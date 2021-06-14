import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { HelperFunctions } from '../../Utils';
import SingleBlog from '../Blogs/SingleBlog';

const AllBlogs = ({ navigation }) => {
  const { blogs } = useSelector((state) => state.Account);
  return (
    <View style={{ flex: 1 }}>
      {blogs && blogs.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, backgroundColor: '#eeeeee90' }}
          data={blogs}
          keyExtractor={() => HelperFunctions.keyGenerator()}
          renderItem={({ item, index }) => (
            <SingleBlog
              {...item}
              header={false}
              marginBottom={0}
              navigation={navigation}
              last={index + 1 === blogs.length}
            />
          )}
        />
      ) : null}

      {blogs && !blogs.length ? (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Text style={{ fontSize: RFValue(14), color: '#aaa' }}>You have no blogs</Text>
        </View>
      ) : null}
    </View>
  );
};

export default AllBlogs;
