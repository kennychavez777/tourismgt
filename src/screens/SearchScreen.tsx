import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';

const Container = styled.ScrollView`
  flex: 1;
  background: #FFFFFF;
  flex-direction: column;
`;

const SearchInput = styled.TextInput`
	width: 90%;
	borderWidth: 1px;
	borderColor: grey;
	borderRadius: 15px;
	alignSelf: center;
	marginBottom: 10px;
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

const ResultItem = styled.View`
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
	return (
			<Container>
				<SearchInput />
				<ResultsContainer>
					<TopTitle>Top 10 Búsquedas</TopTitle>
					{
						Array(10)
						.fill(true)
						.map((item, index) => (
							<ResultItem key={index}>
								<Picture source={{ uri: 'https://assets.unileversolutions.com/recipes-v2/244028.jpg' }} />
								<PlaceDataContainer>
									<PlaceTitle>Crazy Pizza</PlaceTitle>
									<PlaceLocation>12 avenida 5-34 zona 6</PlaceLocation>
								</PlaceDataContainer>
							</ResultItem>
						))
					}
				</ResultsContainer>
			</Container>
	);
}

export default SearchScreen;