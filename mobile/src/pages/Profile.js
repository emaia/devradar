import React from 'react'
import { WebView } from 'react-native-webview'

function Profile({ navigation }) {
  const username = navigation.getParam('username')
  return <WebView source={{ uri: `https://github.com/${username}`}} style={{flex:1}} />
}

export default Profile
