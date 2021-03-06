import { StatusBar } from 'expo-status-bar'
import { StyleSheet} from 'react-native'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import MainRoot from './app/pages/MainRoot'
import MovieDetail from './app/pages/MovieDetail'

const Stack = createStackNavigator()

export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name='MainRoot'
          component={MainRoot}
          options={{ title: 'MainRoot' }}
        />
        <Stack.Screen
          name='MovieDetail'
          component={MovieDetail}
          options={{ title: 'MovieDetail' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
