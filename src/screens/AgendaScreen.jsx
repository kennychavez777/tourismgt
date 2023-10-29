import React, { useState, useEffect } from 'react';
import { Alert, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Agenda } from '@bas-software/react-native-calendars';
import testIDs from '../utils/testIDs';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { FIRESTORE as db } from '../firebase/config';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs, or, query, where } from 'firebase/firestore';
import { useSession } from '../hooks/useSession';

import styled from 'styled-components';

const AgendaScreen = () => {
  const TitleText = styled.Text`
    fontSize: 17px;
    fontWeight: bold;
    color: black;
  `;

  const BoldText = styled.Text`
    fontSize: 13px;
    fontWeight: bold;
    color: black;
  `;

  const ValueText = styled.Text`
    fontSize: 13px;
    color: black;
  `;

  const [items, setItems] = useState({});
  const current = new Date();

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { session } = useSession();

  useEffect(() => {
    if (isFocused) {
      loadItems({"dateString": "2023-10-15", "day": 15, "month": 10, "timestamp": 1698472889395, "year": 2023});
    }
  }, [isFocused])

  const generateDate = () => {
    const options = {
      timeZone: 'America/Guatemala',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };

    const gtDate = new Date().toLocaleDateString('es-GT', options);
    const newDate = gtDate.split('/').reverse();
    const fullDate = newDate.join('-');

    const dateObj = {
      dateString: fullDate,
      year: parseInt(newDate[0]),
      month: parseInt(newDate[1]),
      day: parseInt(newDate[2]),
      timestamp: Date.now()
    }

    return dateObj;
  }

  const loadItems = async (day) => {
    // firestore query
    const q = query(collection(db, "events"), 
      or(
        where('ownerEmail', '==', session.email),
        where('friends', 'array-contains', session.id)
      )
    );

    let events = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((item) => {
      const e = item.data();
      e.id = item.id;
      events.push(e);
    });

    const newItems = {};
    
    setTimeout(() => {
      for (let i = -5; i < 30; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        
        if (!newItems[strTime]) {
          newItems[strTime] = [];

          const e = events.filter(element => element.date.trim() === strTime.trim())
          e.forEach(item => {
            newItems[strTime].push({
              day: item.date,
              height: 100,
              name: item.title,
              time: item.time,
              description: item.description,
              location: item.location
            })
          });
        }
      }

      const newItemsData = {};
      Object.keys(newItems).forEach((key) => {
        newItemsData[key] = newItems[key];
      });
      setItems(newItemsData);
    }, 200);
  };

  const timeToString = (time: number) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  const renderItem = ( item, isFirst ) => {
    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, { height: 'auto' }]}
        // onPress={() => navigation.navigate('CreateEvent')}
      >
        <TitleText>{item.name}</TitleText>
        <ValueText><BoldText>Lugar: </BoldText> {item.location}</ValueText>
        <ValueText><BoldText>Hora: </BoldText> {item.time}</ValueText>
        <ValueText><BoldText>Descripción: </BoldText> {item.description}</ValueText>
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
      rowHasChanged={(r1, r2) => r1.name !== r2.name}
      showClosingKnob={true}
      onDayPress={day => navigation.navigate('Crear Evento', {selectedDay: day})}
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
