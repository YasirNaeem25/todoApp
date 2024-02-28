import { StyleSheet} from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TodoList from '../Component/TodoList';

const Stack = createNativeStackNavigator();
export default function AppNavigation({ initialRouteName }) {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'TodoList'}>
            <Stack.Screen name='TodoList' component={TodoList} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({})