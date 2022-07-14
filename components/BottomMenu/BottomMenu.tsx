import { StyleSheet, useWindowDimensions, View } from "react-native"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { BottomMenuItem } from "./BottomMenuItem"
import Layout from "../../constants/Layout"
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated"

const { bottomTab: bottomLayout, animationConfig } = Layout

export function BottomMenu({ navigation, descriptors, insets, state }: BottomTabBarProps) {
  const { routes = [], index: indexRoute } = state
  const { width } = useWindowDimensions()
  const indicatorMoving = useSharedValue(0)

  const itemWidth = (width - bottomLayout.horizontalPadding) * (1 / routes.length)

  const goTo = (screen: string) => {
    navigation.navigate(screen)
  }

  const renderMenuItem = (route, id) => {
    const { options = {} } = descriptors[route.key]
    const { title, tabBarInactiveTintColor = "", iconName = "" } = options
    const focused = indexRoute === id
    const color = tabBarInactiveTintColor
    return (
      <BottomMenuItem
        key={route.key}
        itemWidth={itemWidth}
        onPress={() => goTo(route.name)}
        iconName={iconName}
        color={color}
        title={title || route.name}
        focused={focused}
      />
    )
  }

  const containerStyle = [
    styles.container,
    {
      paddingBottom: insets.bottom,
    },
  ]

  const coordinates = routes.map((i, _index) => {
    return (
      bottomLayout.horizontalPadding +
      (itemWidth / 2) * (2 * _index + 1) -
      bottomLayout.indicatorSize / 2
    )
  })

  const indicatorStyle = [
    styles.indicator,
    useAnimatedStyle(
      () => ({
        transform: [
          {
            translateX: withTiming(coordinates[indexRoute], animationConfig),
          },
        ],
      }),
      [indexRoute]
    ),
  ]

  return (
    <View style={containerStyle}>
      <Animated.View style={indicatorStyle} />
      {routes.map((route, id) => renderMenuItem(route, id))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "white",
    borderTopColor: "#0002",
    borderTopWidth: 1,
    paddingHorizontal: bottomLayout.horizontalPadding,
  },
  indicator: {
    position: "absolute",
    height: bottomLayout.indicatorSize,
    width: bottomLayout.indicatorSize,
    borderRadius: 99,
    backgroundColor: "#51557E",
    left: 0,
    top: -bottomLayout.indicatorSize * 0.5,
  },
})
