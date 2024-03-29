/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ColorSchemeName } from "react-native"
import { BottomMenu } from "../components/BottomMenu"

import Colors from "../constants/Colors"
import useColorScheme from "../hooks/useColorScheme"
import ModalScreen from "../screens/ModalScreen"
import NotFoundScreen from "../screens/NotFoundScreen"
import TabOneScreen from "../screens/TabOneScreen"
import TabTwoScreen from "../screens/TabTwoScreen"
import TabThreeScreen from "../screens/TabThreeScreen"
import TabFourScreen from "../screens/TabFourScreen"
import TabFiveScreen from "../screens/TabFiveScreen"
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from "../types"

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "transparent" } }}
    >
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <BottomMenu {...props} />}
      screenOptions={{
        headerTransparent: true,
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarInactiveTintColor: Colors[colorScheme].inactiveTint,
        tabBarStyle: { backgroundColor: "red" },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={TabOneScreen}
        options={{
          title: "Home",
          iconName: "home-outline",
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={TabTwoScreen}
        options={{
          title: "Profile",
          iconName: "person-outline",
        }}
      />
      <BottomTab.Screen
        name="Message"
        component={TabThreeScreen}
        options={{
          title: "Message",
          iconName: "chatbubble-outline",
        }}
      />
      <BottomTab.Screen
        name="Photos"
        component={TabFourScreen}
        options={{
          title: "Photos",
          iconName: "camera-outline",
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={TabFiveScreen}
        options={{
          title: "Settings",
          iconName: "settings-outline",
        }}
      />
    </BottomTab.Navigator>
  )
}
