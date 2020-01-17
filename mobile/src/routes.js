import { createAppContainer, createNavigationContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Main from './pages/Main'
import Profile from './pages/Profile'

const Routes = createAppContainer(
  createStackNavigator({
    Main: {
      screen: Main,
      navigationOptions: {
        title: 'DevRadar',
        headerTitleAlign: 'center'
      }
    },
    Profile
  }, {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'red'
      },
      headerTintColor: '#fff'
    }
  })
)

export default Routes
