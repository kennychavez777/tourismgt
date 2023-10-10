import React, { useState, useEffect } from 'react';
import { Alert, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Agenda, DateData } from '@bas-software/react-native-calendars';
import testIDs from '../utils/testIDs';
import { useNavigation } from '@react-navigation/native';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';

const AgendaScreen = () => {
  const [items, setItems] = useState({});
  const navigation = useNavigation();
  const current = new Date();

  const loadItems = (day: DateData) => {
    const newItems = { ...items };

    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        //const time = new Date(day).getTime() + i * 24 * 60 * 60 * 1000;
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!newItems[strTime]) {
          newItems[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 0);
          for (let j = 0; j < numItems; j++) {
            newItems[strTime].push({
              name: `Hey`,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime,
            });
          }
        }
      }

      const newItemsData = {};
      Object.keys(newItems).forEach((key) => {
        newItemsData[key] = newItems[key];
      });
      setItems(newItemsData);
    }, 1000);
  };

  const timeToString = (time: number) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  const renderItem = ({ item, index }) => {
    const isFirst = index === 0;
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';
    // Descomenta la línea siguiente si necesitas navegar a otra pantalla
    // const navigation = useNavigation();

    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, { height: item ? item.height : 0 }]}
        onPress={() => Alert.alert("hey!")}
        // onPress={() => navigation.navigate('CreateEvent')}
      >
        <Text style={{ fontSize, color }}>{"Heey"}</Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('CreateEvent') }
      >
        <Text style={{ textAlign: 'center' }}>
          <FontAwesomeIcon icon={faCalendarPlus} size={30} color='grey' />
          {"\n"}
          Presiona para agregar un evento.
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Agenda
      testID={testIDs.agenda.CONTAINER}
      items={items}
      loadItemsForMonth={loadItems}
      selected={current.toISOString()}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      rowHasChanged={(r1, r2) => r1.name !== r2.name}
      showClosingKnob={true}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
});

export default AgendaScreen;
