import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faMagnifyingGlass, faPlus, faCalendarDays, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

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
import { useSession } from '../hooks/useSession';

import styled from 'styled-components';

const EditButton = styled.TouchableOpacity`
  flex-direction: row;
	alignItems: center;
  padding: 10px;
  border-radius: 5px;
`;

// Tabs
const Tab = createBottomTabNavigator();

function BottomTabGroup() {
	const { logout } = useSession();
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarShowLabel: false,
				tabBarIcon: ({ color, focused, size}) => {
					let myIcon = faHome;

					if (route.name === 'Inicio') {
						myIcon = faHome;
					} else if (route.name === 'Buscar') {
						myIcon = faMagnifyingGlass;
					} else if ( route.name === 'Publicar') {
						myIcon = faPlus
					} else if ( route.name === 'Eventos') {
						myIcon = faCalendarDays;
					}else if ( route.name === 'Mi Perfil') {
						myIcon = faUser;
					}

					return <FontAwesomeIcon icon={myIcon} color={color} size={size} />;
				}
			})}
		>
			<Tab.Screen
				name="Inicio"
				component={Dashboard} 
				options={({ navigation, route }) => ({
					// headerTitle: (props) => <Text>hello</Text>,
					// Add a placeholder button without the `onPress` to avoid flicker
					headerRight: () => (
						<EditButton onPress={() => logout()}>
							<FontAwesomeIcon icon={faArrowRightFromBracket} color="grey" size={24} />
						</EditButton>
					),
				  })}
			/>
			<Tab.Screen
				name="Buscar" component={SearchScreen}
			/>
			<Tab.Screen 
				name="Publicar" component={CreatePostScreen} 
			/>
			<Tab.Screen 
				name="Eventos" component={AgendaScreen} 
			/>
			<Tab.Screen 
				name="Mi Perfil" component={ProfileScreen} options={{
					headerShown: false,
				}}
			/>
		</Tab.Navigator>
	);
}
// Stack
const Stack = createNativeStackNavigator();

function StackGroup() {
	// Session
	const { session } = useSession();
	console.log('====================================');
	console.log(session);
	console.log('====================================');
	return (
		<Stack.Navigator
		>
			{
				session.accessToken === '' ? (
					<Stack.Group>
						<Stack.Screen
							name="Login"
							component={LoginScreen}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="SignUp"
							component={SignUpScreen}
							options={{
								headerShown: false,
							}}
						/>
					</Stack.Group>
				) : (
					<Stack.Group>
						<Stack.Screen name="Dashboard" component={ BottomTabGroup } options={{
								headerShown: false,
							}}/>
						<Stack.Screen
							name="Search"
							component={SearchScreen}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen name="Publicar" component={CreatePostScreen} />
						<Stack.Screen name="Eventos" component={AgendaScreen} />
						<Stack.Screen name="Perfil de" component={ProfileScreen} />
						<Stack.Screen name="Detalle de Post" component={PostDetailScreen} />
						<Stack.Screen name="Editar Perfil" component={EditProfileScreen} />
						<Stack.Screen name="Crear Evento" component={CreateEventsScreen} />
					</Stack.Group>
				)
			}
			
			<Stack.Group screenOptions={{ presentation: 'modal' }}>
				<Stack.Screen name="Invitar Amigos" component={AddFriendsModal} />
			</Stack.Group>
		</Stack.Navigator>
	)
}

export default function AppNavigator () {
	return (
		<NavigationContainer>
			{/* <BottomTabGroup /> */}
			<StackGroup/>
		</NavigationContainer>
	)
}