import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useSession } from '../hooks/useSession.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useSearch } from '../hooks/useSearch.jsx';
import { useNavigation } from '@react-navigation/native';

const Container = styled.ScrollView`
  flex: 1;
  background: #FFFFFF;
  flex-direction: column;
`;

const ConfigContainer = styled.View`
  flex-direction: row;
  width: 90%;
  marginTop: 8px;
	alignSelf: center;
	marginBottom: 10px;
	
`;

const SearchInput = styled.TextInput`
	width: 85%;
	borderWidth: 1px;
	borderColor: grey;
	borderRadius: 15px;
	alignSelf: center;
	paddingLeft: 15px;
`;

const FollowButton = styled.TouchableOpacity`
	alignSelf: center;
  background-color: #01c8fb; /* Color de fondo del botón */
  padding: 10px;
  border-radius: 5px;
	margin-left:5px;
`;

const ButtonText = styled.Text`
  color: #FFFFFF; 
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  marginLeft: 7px;
`;

const TopTitle = styled.Text`
	color: black;
	text-align: right;
	fontSize: 12px;
`;

const ResultsContainer = styled.View`
	flex-direction: column;
	width: 90%;
	alignSelf: center;
`;

const ResultItem = styled.TouchableOpacity`
	flex-direction: row;
	width: 100%;
	marginTop: 10px;
`;

const Picture = styled.Image`
  width: 70px;
  height: 70px;
  borderRadius: 15px;
`;

const PlaceDataContainer = styled.View`
	marginLeft: 10px;
	flex-direction: column;
`;

const PlaceTitle = styled.Text`
	fontSize: 18px;
	fontWeight: 700;
	color: black;
`;

const PlaceLocation = styled.Text`
	fontSize: 14px;
	fontWeight: 600;
	color: grey;
`;

function SearchScreen () {
	const { getAllPosts } = useSearch();
	const navigation = useNavigation();

	const [ search, setSearch ] = useState('');
	const [ fullData, setFullData ] = useState([]);
	const [ posts, setPosts ] = useState([]);
	
	useEffect(() => {
		getAll();
	}, [])

	const getAll = async () => {
		const all = await getAllPosts();
		setPosts(all);
		setFullData(all);
	}

	const handleSearch = () => {
    const lowerSearchText = search.toLowerCase();

    const filteredResult = posts.filter((post) => {
		const title = post.title.toLowerCase();
		const description = post.description.toLowerCase();
		const location = post.location.toLowerCase();

      return title.includes(lowerSearchText) || description.includes(lowerSearchText) || location.includes(lowerSearchText);
    });

		console.log('filtered results', filteredResult);
    setPosts(filteredResult);
  };

	const handleTextChanges = (text) => {
		setSearch(text);
		
		if (text === '') {
			setPosts(fullData);
			console.log('full data => ', fullData);
		}
	}

	return (
			<Container>
				<ConfigContainer>
					<SearchInput
						placeholder="¡Busca los mejores lugares!"
						placeholderTextColor="#999999"
						value={search}
						onChangeText={(text) => handleTextChanges(text)}
					/>
					<FollowButton onPress={() => handleSearch()}>
						<FontAwesomeIcon icon={faMagnifyingGlass} color="#FFFFFF" size={27} />
					</FollowButton>
				</ConfigContainer>
				
				<ResultsContainer>
					<TopTitle>Top 10 Búsquedas</TopTitle>
					{
						posts
						.map((item, index) => (
							<ResultItem key={index} onPress={() => navigation.navigate('Detalle de Post', item)}>
								<Picture source={{ uri: item.selectedImages[0] }} />
								<PlaceDataContainer>
									<PlaceTitle>{item.title}</PlaceTitle>
									<PlaceLocation>{item.location}</PlaceLocation>
								</PlaceDataContainer>
							</ResultItem>
						))
					}
				</ResultsContainer>
			</Container>
	);
}

export default SearchScreen;