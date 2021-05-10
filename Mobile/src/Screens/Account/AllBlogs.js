import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { HelperFunctions } from '../../Utils';
import SingleBlog from '../Blogs/SingleBlog';

const AllBlogs = ({ navigation }) => {
  const { blogs } = useSelector((state) => state.Account);
  return (
    <View style={{ flex: 1 }}>
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
    </View>
  );
};

export default AllBlogs;
