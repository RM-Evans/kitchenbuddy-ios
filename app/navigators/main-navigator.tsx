/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack"
import {
  WelcomeScreen,
  DemoScreen,
  DemoListScreen,
  LoginScreen,
  SignupScreen,
  PasswordRecoveryScreen,
  MainMenu,
  ChooseDifficulty,
  ChooseTitle,
  ChooseTitleAndDifficulty,
  AssignMatches,
  GameLibrary,
  GameIndividual,
  GeneratedGame,
} from "../screens"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PrimaryParamList = {
  welcome: undefined
  demo: undefined
  demoList: undefined
  login: undefined
  // password_recovering: undefined
  signup: undefined
  // password_recovery: undefined
  // main_menu: undefined
  // choose_difficulty: undefined
  // choose_title: undefined
  // choose_title_difficulty: undefined
  assignMatches: { title: string; pairCount: number }
  gameLibrary: undefined
  setupGame: { gameId: number }
  playGame: { gameId: number }
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>()

export type AssignMatchesProps = StackScreenProps<PrimaryParamList, "assignMatches">
export type SetupGameProps = StackScreenProps<PrimaryParamList, "setupGame">
export type PlayGameProps = StackScreenProps<PrimaryParamList, "playGame">

export function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "transparent" },
        headerShown: false,
      }}
    >
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="demo" component={DemoScreen} />
      <Stack.Screen name="demoList" component={DemoListScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="signup" component={SignupScreen} />
      {/* <Stack.Screen name="password_recovery" component={PasswordRecoveryScreen} /> */}
      <Stack.Screen name="main_menu" component={MainMenu} />
      {/* <Stack.Screen name="choose_difficulty" component={ChooseDifficulty} /> */}
      {/* <Stack.Screen name="choose_title" component={ChooseTitle} /> */}
      <Stack.Screen name="choose_title_difficulty" component={ChooseTitleAndDifficulty} />
      <Stack.Screen name="assignMatches" component={AssignMatches} />
      <Stack.Screen name="gameLibrary" component={GameLibrary} />
      <Stack.Screen name="setupGame" component={GameIndividual} />
      <Stack.Screen name="playGame" component={GeneratedGame} />
    </Stack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
