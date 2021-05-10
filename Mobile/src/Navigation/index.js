import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Header from '../Components/Header';
import {
  Home,
  Login,
  Account,
  Search,
  InfoTab,
  Doctors,
  SinglePost,
  SelectInterests,
  Events,
  EventProfile,
  Blogs,
  NewBlog,
  NewEvent,
  BlogProfile,
  NewBlogComment,
  NewEventComment
} from '../Screens';
import IconComp from '../Components/Icon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontIcons from 'react-native-vector-icons/FontAwesome5';
import FeatherIcons from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import Drawer from '../Screens/Drawer';
import FinishRegistration from '../Screens/FinishRegistration';
import Splash from '../Screens/Splash';

const Stacks = createStackNavigator();
const LoginStack = createStackNavigator();
const HomeStack = createStackNavigator();
const EventStack = createStackNavigator();
const BlogStack = createStackNavigator();
const SearchStack = createStackNavigator();
const DrawerStack = createDrawerNavigator();

const BottomStack = createMaterialBottomTabNavigator();

const LoginScreen = () => (
  <LoginStack.Navigator>
    <LoginStack.Screen name="Login" component={Login} />
  </LoginStack.Navigator>
);

const HomeScreens = () => (
  <HomeStack.Navigator screenOptions={{ header: (props) => null }}>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen
      name="BlogProfile"
      component={BlogProfile}
      options={{ header: (props) => <Header {...props} title="Blog details" /> }}
    />
    <HomeStack.Screen
      name="NewBlogComment"
      component={NewBlogComment}
      options={{ header: (props) => <Header title="Add Blog Comment" iconName="pencil" {...props} /> }}
    />
    <HomeStack.Screen
      name="EventProfile"
      component={EventProfile}
      options={{ header: (props) => <Header {...props} title="Event details" /> }}
    />
    <HomeStack.Screen
      name="NewEventComment"
      component={NewEventComment}
      options={{ header: (props) => <Header title="Add Event Comment" iconName="pencil" {...props} /> }}
    />
  </HomeStack.Navigator>
);

const BlogScreens = () => (
  <BlogStack.Navigator screenOptions={{ header: (props) => null }} headerMode="screen">
    <BlogStack.Screen name="Blogs" component={Blogs} />
    <BlogStack.Screen
      name="NewBlog"
      component={NewBlog}
      options={{ header: (props) => <Header title="New Blog Post" iconName="pencil" {...props} /> }}
    />
    <BlogStack.Screen
      name="NewBlogComment"
      component={NewBlogComment}
      options={{ header: (props) => <Header title="Add Blog Comment" iconName="pencil" {...props} /> }}
    />
    <BlogStack.Screen
      name="BlogProfile"
      component={BlogProfile}
      options={{ header: (props) => <Header {...props} title="Blog details" /> }}
    />
  </BlogStack.Navigator>
);

const SearchScreens = () => (
  <SearchStack.Navigator screenOptions={{ header: (props) => null }} headerMode="screen">
    <SearchStack.Screen name="Search" component={Search} />

    <SearchStack.Screen
      name="NewBlogComment"
      component={NewBlogComment}
      options={{ header: (props) => <Header title="Add Blog Comment" iconName="pencil" {...props} /> }}
    />
    <SearchStack.Screen
      name="BlogProfile"
      component={BlogProfile}
      options={{ header: (props) => <Header {...props} title="Blog details" /> }}
    />
    <SearchStack.Screen
      name="EventProfile"
      component={EventProfile}
      options={{ header: (props) => <Header {...props} title="Event details" /> }}
    />
    <SearchStack.Screen
      name="NewEventComment"
      component={NewEventComment}
      options={{ header: (props) => <Header title="Add Event Comment" iconName="pencil" {...props} /> }}
    />
  </SearchStack.Navigator>
);

const EventScreens = () => (
  <EventStack.Navigator screenOptions={{ header: (props) => null }} headerMode="screen">
    <EventStack.Screen name="Events" component={Events} />
    <EventStack.Screen
      name="NewEvent"
      component={NewEvent}
      options={{ header: (props) => <Header title="Create New Event" {...props} /> }}
    />
    <EventStack.Screen
      name="EventProfile"
      component={EventProfile}
      options={{ header: (props) => <Header {...props} title="Event details" /> }}
    />
    <EventStack.Screen
      name="NewEventComment"
      component={NewEventComment}
      options={{ header: (props) => <Header title="Add Event Comment" iconName="pencil" {...props} /> }}
    />
  </EventStack.Navigator>
);

const BottomStackScreens = ({}) => (
  // <SafeAreaView style={{ flex: 1 }}>
  <BottomStack.Navigator
    shifting={false}
    screenOptions={{}}
    activeColor="#ffffff"
    inactiveColor="#ffffff70"
    initialRouteName="Home"
    barStyle={{ backgroundColor: '#000' }}
    // labeled={false}
  >
    <BottomStack.Screen
      name="Home"
      component={HomeScreens}
      options={() => ({
        tabBarIcon: ({ color }) => <Ionicons color={color} name="home-outline" size={RFValue(20)} />
      })}
    />

    <BottomStack.Screen
      name="Events"
      component={EventScreens}
      options={() => ({
        tabBarIcon: ({ color }) => <Ionicons color={color} name="calendar-outline" size={RFValue(20)} />
      })}
    />
    <BottomStack.Screen
      name="Search"
      component={SearchScreens}
      options={() => ({
        tabBarIcon: ({ color }) => <Ionicons color={color} name="search-outline" size={RFValue(20)} />
      })}
    />
    <BottomStack.Screen
      name="BlogScreens"
      component={BlogScreens}
      options={() => ({
        tabBarLabel: 'Blogs',
        tabBarIcon: ({ color }) => <Ionicons color={color} name="chatbox-ellipses-outline" size={RFValue(20)} />
      })}
    />
    <BottomStack.Screen
      name="Account"
      component={Account}
      options={() => ({
        tabBarIcon: ({ color }) => <FeatherIcons color={color} name="user" size={RFValue(20)} />
      })}
    />
  </BottomStack.Navigator>
  // </SafeAreaView>
);

const AllStacks = () => (
  <Stacks.Navigator screenOptions={{}} initialRouteName="Splash">
    <Stacks.Screen name="Home" component={DrawerScreens} options={{ header: () => null }} />
    <Stacks.Screen name="Login" component={Login} options={{ header: () => null }} />
    <DrawerStack.Screen name="Splash" component={Splash} options={{ header: () => null }} />
    <DrawerStack.Screen name="SinglePost" component={SinglePost} options={{ header: () => null }} />
    <DrawerStack.Screen name="Interests" component={SelectInterests} options={{ header: () => null }} />
  </Stacks.Navigator>
);
const DrawerScreens = () => (
  <DrawerStack.Navigator
    // initialRouteName="Splash"
    statusBarAnimation="fade"
    drawerStyle={{ backgroundColor: '#fff' }}
    drawerContent={(props) => <Drawer {...props} />}
  >
    <Stacks.Screen
      name="Home"
      component={BottomStackScreens}
      options={{
        header: (props) => null
      }}
    />
    <DrawerStack.Screen name="FinishRegistration" component={FinishRegistration} />
  </DrawerStack.Navigator>
);

export default () => (
  <NavigationContainer theme={{ colors: { background: '#fff' } }}>
    <AllStacks />
  </NavigationContainer>
);
