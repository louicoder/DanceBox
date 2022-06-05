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
  NewEventComment,
  // UserBlogs,
  // UserEvents,
  // EditAccount,
  Calendar,
  OrganiserProfile,
  AllOrganisers,
  Voting,
  Intro,
  Signup,
  AddProfilePhoto
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import AllEvents from '../Screens/Account/AllEvents';
// import AllBlogs from '../Screens/Account/AllBlogs';
import {
  BLACK,
  BROWN,
  GRAY,
  HALF_WHITE,
  SHADOW,
  THEME_COLOR,
  THEME_COLOR2,
  THEME_COLOR3,
  WHITE
} from '../Utils/Constants';
import { DesignIcon, Typo } from '../Components';
import { CONSTANTS } from '../Utils';
import { showAlert } from '../Utils/HelperFunctions';
import NewPost from '../Screens/Blogs/NewPost';
import CommunityChat from '../Screens/Search/CommunityChat';
import HomeHeader from '../Screens/Home/HomeHeader';
import VotingRoom from '../Screens/Voting/VotingRoom';

const Stacks = createStackNavigator();
const LoginStack = createStackNavigator();
const HomeStack = createStackNavigator();
const EventStack = createStackNavigator();
const BlogStack = createStackNavigator();
const SearchStack = createStackNavigator();
const AccountStack = createStackNavigator();
const CalendarStack = createStackNavigator();
const DefaultStack = createDrawerNavigator();

const BottomStack = createBottomTabNavigator();

const LoginScreen = () => (
  <LoginStack.Navigator>
    <LoginStack.Screen name="Login" component={Login} />
  </LoginStack.Navigator>
);

const CalendarScreens = () => (
  <CalendarStack.Navigator headerMode="screen">
    <CalendarStack.Screen
      component={Calendar}
      name="Calendar"
      options={{
        header: (props) => (
          // <View style={{ backgroundColor: 'green', width: '100%', height: 40, top: useSafeAreaInsets().top }} />
          <Header back {...props} title="Events Calendar" />
        )
      }}
    />
  </CalendarStack.Navigator>
);

const HomeScreens = ({ socket }) => (
  <HomeStack.Navigator screenOptions={{ header: (props) => null }} headerMode="screen">
    <HomeStack.Screen
      name="Home"
      component={Home}
      socket={socket}
      options={{ header: () => <HomeHeader />, cardStyle: { backgroundColor: '#fff' } }}
    />
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
      name="NewEventComment"
      component={NewEventComment}
      options={{ header: (props) => <Header title="Add Event Comment" iconName="pencil" {...props} /> }}
    />
    <HomeStack.Screen
      name="OrganiserProfile"
      component={OrganiserProfile}
      options={{
        header: (props) => (
          <Header
            title="Organiser"
            iconName="pencil"
            {...props}
            rightIconName="share-a"
            rightIconPkg="fot"
            showRightIcon
            rightIconSize={18}
          />
        )
      }}
    />
    <HomeStack.Screen
      name="AllOrganisers"
      component={AllOrganisers}
      options={{ header: (props) => <Header title="Event Organisers" iconName="pencil" {...props} /> }}
    />
    <HomeStack.Screen
      name="Voting"
      component={Voting}
      options={(props) => ({
        header: () => (
          <Header
            title="Event Voting"
            iconName="pencil"
            {...props}
            // showRightIcon
            // rightIconName="plus"
            // rightIconPkg="ad"
            extStyles={{ backgroundColor: THEME_COLOR }}
            iconProps={{ color: WHITE }}
            titleStyles={{ color: WHITE }}
            // rightIconOnPress={() => props.route.params.openModal()}
          />
        )
      })}
    />

    <HomeStack.Screen
      name="VotingRoom"
      component={VotingRoom}
      options={(props) => ({
        header: () => (
          <Header
            title="Voting Room"
            // iconName="pencil"
            {...props}
            // showRightIcon
            // rightIconName="plus"
            // rightIconPkg="ad"
            extStyles={{ backgroundColor: THEME_COLOR }}
            iconProps={{ color: WHITE }}
            titleStyles={{ color: WHITE }}
            // rightIconOnPress={() => props.route.params.openModal()}
          />
        )
      })}
    />
    <HomeStack.Screen
      name="EventProfile"
      component={EventProfile}
      options={{
        header: (props) => (
          <Header
            {...props}
            title="Event details"
            titleStyles={{ color: BLACK }}
            extStyles={{ backgroundColor: WHITE }}
            iconProps={{ color: BLACK }}
            onBackPress={() => props.navigation.goBack()}
          />
        )
      }}
    />
    <CalendarStack.Screen
      component={Calendar}
      name="Calendar"
      options={{
        header: (props) => (
          <Header
            {...props}
            title="Events Calendar"
            titleStyles={{ color: WHITE }}
            extStyles={{ backgroundColor: THEME_COLOR }}
            iconProps={{ color: WHITE }}
            // onBackPress={() => props.navigation.goBack()}
          />
        )
      }}
    />
  </HomeStack.Navigator>
);

const BlogScreens = () => (
  <BlogStack.Navigator screenOptions={{ header: (props) => null }} headerMode="screen">
    <BlogStack.Screen
      name="Blogs"
      component={Blogs}
      options={{
        header: (props) => (
          <Header
            title="Community Discussions"
            backEnabled={false}
            {...props}
            titleStyles={{ color: WHITE }}
            extStyles={{ backgroundColor: THEME_COLOR, ...SHADOW, elevation: RFValue(8) }}
            // rightComp={() => <DesignIcon name="plus" pkg="ad" color="green" />}
          />
        ),
        cardStyle: { backgroundColor: WHITE }
      }}
    />
    <BlogStack.Screen
      name="NewBlog"
      component={NewPost}
      options={{
        header: (props) => (
          <Header
            title="Create New Post"
            extStyles={{ backgroundColor: THEME_COLOR, ...SHADOW, elevation: RFValue(8) }}
            titleStyles={{ color: WHITE }}
            iconProps={{ color: WHITE }}
            iconName="pencil"
            {...props}
          />
        )
      }}
    />
    <BlogStack.Screen
      name="NewBlogComment"
      component={NewBlogComment}
      options={{ header: (props) => <Header title="Add Blog Comment" iconName="pencil" {...props} /> }}
    />
    <BlogStack.Screen
      name="BlogProfile"
      component={BlogProfile}
      options={{
        header: (props) => (
          <Header
            {...props}
            title="Post details"
            extStyles={{ backgroundColor: THEME_COLOR, ...SHADOW, elevation: RFValue(8) }}
            titleStyles={{ color: WHITE }}
            iconProps={{ color: WHITE }}
          />
        )
      }}
    />
  </BlogStack.Navigator>
);

const SearchScreens = () => (
  <SearchStack.Navigator screenOptions={{ header: (props) => null }} headerMode="screen">
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen
      name="CommunityChat"
      component={CommunityChat}
      options={{
        header: (props) => <Header {...props} title="Community Chat" extStyles={{ ...SHADOW, elevation: RFValue(8) }} />
      }}
    />

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
      options={{
        header: (props) => (
          <Header
            {...props}
            title="Event details"
            titleStyles={{ color: BLACK }}
            extStyles={{ backgroundColor: WHITE }}
            iconProps={{ color: BLACK }}
          />
        )
      }}
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
    <EventStack.Screen
      name="Events"
      component={Events}
      options={{
        header: (props) => (
          <Header
            title="Community Events"
            backEnabled={false}
            {...props}
            titleStyles={{ color: BLACK }}
            extStyles={{ backgroundColor: WHITE }}
            // rightComp={() => <DesignIcon name="plus" pkg="ad" />}
          />
        ),
        cardStyle: { backgroundColor: WHITE }
      }}
    />
    <EventStack.Screen
      name="NewEvent"
      component={NewEvent}
      options={{
        header: (props) => (
          <Header title="Create New Event" {...props} extStyles={{ ...SHADOW, elevation: RFValue(8) }} />
        )
      }}
    />
    <EventStack.Screen
      name="EventProfile"
      component={EventProfile}
      options={{
        header: (props) => (
          <Header
            {...props}
            title="Event details"
            titleStyles={{ color: WHITE }}
            extStyles={{ backgroundColor: THEME_COLOR }}
            iconProps={{ color: WHITE }}
          />
        )
      }}
    />
    <EventStack.Screen
      name="NewEventComment"
      component={NewEventComment}
      options={{ header: (props) => <Header title="Add Event Comment" iconName="pencil" {...props} /> }}
    />
    <EventStack.Screen
      name="Voting"
      component={Voting}
      options={(props) => ({
        header: () => (
          <Header
            title="Event Voting"
            iconName="pencil"
            {...props}
            showRightIcon
            rightIconName="plus"
            rightIconPkg="ad"
            rightIconOnPress={() => props.route.params.openModal()}
            extStyles={{ ...SHADOW, elevation: RFValue(8) }}
          />
        )
      })}
    />
  </EventStack.Navigator>
);

const AccountScreens = () => (
  <AccountStack.Navigator screenOptions={{ header: (props) => null }} headerMode="screen">
    <AccountStack.Screen name="Account" component={Account} />
    {/* <AccountStack.Screen
      name="UserBlogs"
      component={UserBlogs}
      options={{ header: (props) => <Header title="Your blogs" {...props} /> }}
    /> */}
    {/* <AccountStack.Screen
      name="UserEvents"
      component={UserEvents}
      options={{ header: (props) => <Header {...props} title="Your events" /> }}
    /> */}
    {/* <AccountStack.Screen
      name="EditAccount"
      component={EditAccount}
      options={{ header: (props) => <Header title="Edit account details" iconName="pencil" {...props} /> }}
    /> */}
    {/* <AccountStack.Screen
      name="NewBlogComment"
      component={NewBlogComment}
      options={{ header: (props) => <Header title="Add Blog Comment" iconName="pencil" {...props} /> }}
    /> */}
    {/* <AccountStack.Screen
      name="BlogProfile"
      component={BlogProfile}
      options={{ header: (props) => <Header {...props} title="Blog details" /> }}
    /> */}
    {/* <AccountStack.Screen
      name="EventProfile"
      component={EventProfile}
      options={{ header: (props) => <Header {...props} title="Event details" /> }}
    /> */}
    {/* <AccountStack.Screen
      name="NewEventComment"
      component={NewEventComment}
      options={{ header: (props) => <Header title="Add Event Comment" iconName="pencil" {...props} /> }}
    /> */}
    {/* <AccountStack.Screen
      name="MyEvents"
      component={AllEvents}
      options={{ header: (props) => <Header title="All your events" iconName="pencil" {...props} /> }}
    /> */}
    {/* <AccountStack.Screen
      name="MyBlogs"
      component={AllBlogs}
      options={{ header: (props) => <Header title="All your blogs" iconName="pencil" {...props} /> }}
    /> */}
  </AccountStack.Navigator>
);

const BottomStackScreens = ({ socket }) => (
  // <SafeAreaView style={{ flex: 1 }}>
  <BottomStack.Navigator
    // shifting={false}
    screenOptions={{
      // alignSelf: 'center'
    }}
    // activeColor="#ffffff"
    // inactiveColor="#ffffff70"
    activeColor={WHITE}
    inactiveColor={HALF_WHITE}
    initialRouteName="Events"
    // barStyle={{ backgroundColor: WHITE }}
    // labeled={false}
    // lazy={false}
    tabBarOptions={{
      showLabel: false,
      style: { backgroundColor: BLACK, borderWidth: 0 },
      inactiveTintColor: HALF_WHITE,
      activeTintColor: WHITE,
      keyboardHidesTabBar: true
    }}
    // sceneAnimationEnabled={false}
  >
    <BottomStack.Screen
      name="Home"
      component={HomeScreens}
      options={() => ({
        tabBarIcon: ({ color }) => <DesignIcon color={color} name="home-outline" pkg="io" />
        // tabBarIcon: ({ color }) => <DesignIcon color={color} name="home" pkg="fa" size={RFValue(20)} />
      })}
    />

    <BottomStack.Screen
      name="Events"
      component={EventScreens}
      options={() => ({
        tabBarIcon: ({ color }) => <DesignIcon color={color} name="calendar" pkg="si" />
        // tabBarIcon: ({ color }) => <DesignIcon color={color} name="calendar" pkg="ad" />
      })}
    />

    <BottomStack.Screen
      name="BlogScreens"
      component={BlogScreens}
      options={() => ({
        tabBarLabel: 'Community',
        // tabBarIcon: ({ color }) => <Ionicons color={color} name="chatbox-ellipses-outline" size={RFValue(20)} />
        tabBarIcon: ({ color }) => <DesignIcon name="rss-feed" pkg="mt" color={color} size={28} />
      })}
    />
    <BottomStack.Screen
      name="Favorites"
      component={SearchScreens}
      options={() => ({
        tabBarIcon: ({ color, focused }) => <DesignIcon color={color} name="chatbubble-ellipses-outline" pkg="io" />
      })}
    />
    <BottomStack.Screen
      name="Account"
      component={AccountScreens}
      options={() => ({
        // tabBarIcon: ({ color }) => <FeatherIcons color={color} name="user" size={RFValue(20)} />
        tabBarIcon: ({ color }) => <DesignIcon color={color} name="user" pkg="ad" />
      })}
    />
  </BottomStack.Navigator>
  // </SafeAreaView>
);

const AllStacks = (props) => (
  <Stacks.Navigator screenOptions={{}} initialRouteName="Splash" headerMode="screen">
    {/* <Stacks.Screen name="Home" component={DrawerScreens} options={{ header: () => null }} {...props} /> */}
    <Stacks.Screen name="Main" component={BottomStackScreens} options={{ header: () => null }} {...props} />
    <Stacks.Screen
      name="FinishRegistration"
      component={FinishRegistration}
      options={{
        header: (props) => (
          <Header
            title="Add Account details"
            backEnabled={false}
            rightComp={() => (
              <View>
                <Typo
                  pressable
                  onPress={() => props.scene.route.params.goToAddPhoto()}
                  text="Skip"
                  color="blue"
                  size={18}
                />
              </View>
            )}
          />
        )
      }}
      {...props}
    />
    <Stacks.Screen
      name="Login"
      component={Login}
      options={{
        header: (props) => (
          <Header title="" backEnabled={false} {...props} extStyles={{ backgroundColor: THEME_COLOR }} />
        )
      }}
      {...props}
    />
    <Stacks.Screen
      name="Signup"
      component={Signup}
      options={{
        header: (props) => <Header title="" {...props} backEnabled={false} extStyles={{ backgroundColor: WHITE }} />
      }}
      {...props}
    />
    {/* <Stacks.Screen name="Calendar" component={CalendarScreens} options={{ header: () => null }} {...props} /> */}
    <DefaultStack.Screen name="Splash" component={Splash} options={{ header: () => null }} {...props} />
    <DefaultStack.Screen name="SinglePost" component={SinglePost} options={{ header: () => null }} {...props} />
    <DefaultStack.Screen name="Interests" component={SelectInterests} options={{ header: () => null }} {...props} />
    <DefaultStack.Screen name="Intro" component={Intro} options={{ header: () => null }} {...props} />
    <DefaultStack.Screen
      name="AddProfilePhoto"
      component={AddProfilePhoto}
      options={{ header: () => null }}
      {...props}
    />
  </Stacks.Navigator>
);

export default (props) => {
  return (
    <NavigationContainer theme={{ colors: { background: '#fff' } }}>
      <AllStacks socket={props.socket} />
    </NavigationContainer>
  );
};
