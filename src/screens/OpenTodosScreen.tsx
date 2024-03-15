import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FAB, Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import palette from '../../palette'
import TodoList from '../components/TodoList'
import { NavigationProp } from '@react-navigation/native'

interface Props {
  navigation: NavigationProp<any>
}

function OpenTodosScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text variant="headlineMedium" style={styles.header}>
          Hi, welcome back!
        </Text>
        <Icon name='emoticon-happy-outline' size={100} color={palette.defaultTheme} />
      </View>
      <TodoList />
      <View style={styles.fabContainer}>
        <FAB
          icon="plus"
          color='white'
          style={styles.fab}
          onPress={() => {
            navigation.navigate('Create Task')
          }}
        />
      </View>
    </View>
  )
}

export default OpenTodosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
  },
  header: {
    marginBottom: 10,
    paddingTop: 30,
    paddingHorizontal: 35,
    textAlign: 'center',
    color: palette.defaultTheme,
  },
  fabContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: '1%',
    marginRight: '5%',
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 70,
    right: 0,
    backgroundColor: palette.defaultTheme,
  },
})
