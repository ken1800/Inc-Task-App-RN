import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FAB, Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import palette from '../../palette'
import TodoList from '../components/TodoList'
import { useNavigation } from '@react-navigation/core'

function OpenTodosScreen() {
  const navigation = useNavigation<any>()

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '2%' }}>
        <Text variant="headlineMedium" style={styles.header}>
          Hi, welcome back!
        </Text>
        <Icon name='emoticon-happy-outline' size={100} color={palette.defaultTheme} />
      </View>
      <TodoList />
      <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: '1%', marginRight: '5%' , marginTop:4}}>
        <FAB
          icon="plus"
          color='white'
          style={{
            position: 'absolute',
            bottom: 70,
            right: 0,
            backgroundColor: palette.defaultTheme,
          }}
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
  header: {
    marginBottom: 10,
    paddingTop: 30,
    paddingHorizontal: 35,
    textAlign: 'center',
    color: palette.defaultTheme,
  },
})