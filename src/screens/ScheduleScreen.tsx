import React, { useState, useEffect } from 'react';
import { Alert, View, Text, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ItemContainer = styled.TouchableOpacity`
  background-color: white;
  flex: 1;
  border-radius: 5px;
  padding: 10px;
  margin-right: 10px;
  margin-top: 17px;
`;

const ItemText = styled.Text`
  font-size: ${(props) => (props.isFirst ? '16px' : '14px')};
  color: ${(props) => (props.isFirst ? 'black' : '#43515c')};
`;

function ScheduleScreen() {
  const [items, setItems] = useState({});
  const navigation = useNavigation();

  const goToDetail = () => {
    navigation.navigate('CreateEvent')
  }

  useEffect(() => {
    loadItems('2023-09-27');
  }, []);

  const loadItems = (day) => {
    const newItems = { ...items };

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = new Date(day).getTime() + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!newItems[strTime]) {
          newItems[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            newItems[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime,
            });
          }
        }
      }

      setItems(newItems);
    }, 1000);
  };

  const renderItem = ({ item, index }) => {
    const isFirst = index === 0;
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <ItemContainer
        style={{ height: item ? item.height : 0 }} // Agregar verificación de item
        onPress={goToDetail}
      >
        <ItemText isFirst={isFirst} style={{ fontSize, color }}>
          {item ? item.name : ''}
        </ItemText>
      </ItemContainer>
    );
  };

  const renderEmptyDate = () => {
    return (
      <ItemContainer>
        <ItemText>This is empty date!</ItemText>
      </ItemContainer>
    );
  };

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  return (
    <Container>
      <Agenda
        items={items}
        selected={'2023-09-27'}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
      />
    </Container>
  );
}

export default ScheduleScreen;
