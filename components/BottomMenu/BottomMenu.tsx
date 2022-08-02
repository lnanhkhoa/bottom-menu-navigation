import { useCallback, useMemo } from "react"
import { StyleSheet, useWindowDimensions, View, ViewStyle } from "react-native"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { BottomMenuItem } from "./BottomMenuItem"
import Layout from "../../constants/Layout"
import Animated, { useAnimatedStyle, withTiming, useAnimatedProps } from "react-native-reanimated"
import Svg, { Circle, Rect, Mask, Defs } from "react-native-svg"

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const { bottomTab: bottomLayout, animationConfig } = Layout

export function BottomMenu({ navigation, descriptors, insets, state }: BottomTabBarProps) {
  const { routes = [], index: indexRoute } = state
  const { width } = useWindowDimensions()

  const itemWidth = useMemo(
    () => (width - 2 * bottomLayout.horizontalPadding) * (1 / routes.length),
    []
  )

  const heightBottom = Layout.bottomTab.iconContainer + 12 + insets.bottom
  const radius = Layout.bottomTab.indicatorSize / 2 + Layout.bottomTab.indicatorOutter

  const goTo = (screen: string) => {
    "worklet"
    navigation.navigate(screen)
  }

  const renderMenuItem = useCallback(
    (route, id) => {
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
    },
    [descriptors, goTo, itemWidth, indexRoute]
  )

  const containerStyle: ViewStyle[] = [
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

  const animatedProps = useAnimatedProps(() => {
    return {
      cx: withTiming(Layout.bottomTab.indicatorSize / 2 + coordinates[indexRoute], animationConfig),
    }
  })

  const indicatorStyle = [
    styles.indicator,
    useAnimatedStyle(
      () => ({
        transform: [
          {
            translateX: withTiming(coordinates[indexRoute], animationConfig),
          },
          { rotateZ: "-45deg" },
        ],
      }),
      [indexRoute]
    ),
  ]

  return (
    <View style={containerStyle}>
      <View style={{ position: "absolute" }}>
        <Svg
          width={width}
          height={heightBottom}
          viewBox={`0 0 ${width} ${heightBottom}`}
          fill="none"
        >
          <Defs>
            <Mask id="cut-off" maskContentUnits={"objectBoundingBox"}>
              <Rect fill="white" x="0" y="0" width={width} height="100%" />
              <AnimatedCircle
                animatedProps={animatedProps}
                cy="0"
                cx={radius}
                r={radius}
                fill="black"
              />
            </Mask>
          </Defs>
          <Rect width={width} height={heightBottom} y="0" fill="white" mask="url(#cut-off)" />
        </Svg>
        <Animated.View style={indicatorStyle} />
      </View>
      {routes.map((route, id) => renderMenuItem(route, id))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "transparent",
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
