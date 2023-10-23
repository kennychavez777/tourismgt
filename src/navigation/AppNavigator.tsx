import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faMagnifyingGlass, faPlus, faCalendarDays, faUser } from '@fortawesome/free-solid-svg-icons';

// Screens
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import Dashboard from '../screens/Dashboard';
import SearchScreen from '../screens/SearchScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PostDetailScreen from '../screens/PostDetail';
import EditProfileScreen from '../screens/EditProfileScreen';
import CreateEventsScreen from '../screens/CreateEventScreen';

/// Agenda testing
import AgendaScreen from '../screens/AgendaScreen';
import AddFriendsModal from '../screens/AddFriendsModal';

// Stack
const Stack = createNativeStackNavigator();

function StackGroup() {
	return (
		<Stack.Navigator
			screenOptions={{
				// headerShown: false
			}}
		>
			<Stack.Group>
				<Stack.Screen
					name="DashboardMain"
					component={ LoginScreen }
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="SignUp" component={SignUpScreen} />
				<Stack.Screen
					name="Search"
					component={SearchScreen}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen name="CreatePost" component={CreatePostScreen} />
				<Stack.Screen name="Schedule" component={AgendaScreen} />
				<Stack.Screen name="Profile" component={ProfileScreen} />
				<Stack.Screen name="PostDetail" component={PostDetailScreen} />
				<Stack.Screen name="Edit Profile" component={EditProfileScreen} />
				<Stack.Screen name="CreateEvent" component={CreateEventsScreen} />
			</Stack.Group>
			<Stack.Group screenOptions={{ presentation: 'modal' }}>
				<Stack.Screen name="AddFriendsModal" component={AddFriendsModal} />
			</Stack.Group>
		</Stack.Navigator>
	)
}

const Tab = createBottomTabNavigator();

function BottomTabGroup() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarShowLabel: false,
				tabBarIcon: ({ color, focused, size}) => {
					let myIcon = faHome;

					if (route.name === 'Dashboard') {
						myIcon = faHome;
					} else if (route.name === 'Search') {
						myIcon = faMagnifyingGlass;
					} else if ( route.name === 'CreatePost') {
						myIcon = faPlus
					} else if ( route.name === 'Schedule') {
						myIcon = faCalendarDays;
					}else if ( route.name === 'Profile') {
						myIcon = faUser;
					}

					return <FontAwesomeIcon icon={myIcon} color={color} size={size} />;
				}
			})}
		>
			<Tab.Screen
				name="Dashboard" component={StackGroup} options={{headerShown: false}}
			/>
			<Tab.Screen
				name="Search" component={SearchScreen}
			/>
			<Tab.Screen 
				name="CreatePost" component={CreatePostScreen} 
			/>
			<Tab.Screen 
				name="Schedule" component={AgendaScreen} 
			/>
			<Tab.Screen 
				name="Profile" component={ProfileScreen}
			/>
		</Tab.Navigator>
	);
}

export default function AppNavigator () {
	return (
		<NavigationContainer>
			<BottomTabGroup />
		</NavigationContainer>
	)
}