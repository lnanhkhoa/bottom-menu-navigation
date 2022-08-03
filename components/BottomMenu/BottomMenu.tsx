import { useCallback, useMemo } from "react"
import { StyleSheet, useWindowDimensions, View, ViewStyle } from "react-native"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { BottomMenuItem } from "./BottomMenuItem"
import Layout from "../../constants/Layout"
import Animated, { useAnimatedStyle, withTiming, useAnimatedProps } from "react-native-reanimated"
import Svg, { Circle, Rect, Mask, Defs, Path, G } from "react-native-svg"

const AnimatedMask = Animated.createAnimatedComponent(G)

const { bottomTab: bottomLayout, animationConfig } = Layout

export function BottomMenu({ navigation, descriptors, insets, state }: BottomTabBarProps) {
  const { routes = [], index: indexRoute } = state
  const { width } = useWindowDimensions()

  const itemWidth = useMemo(
    () => (width - 2 * bottomLayout.horizontalPadding) * (1 / routes.length),
    []
  )
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

  const heightBottom = Layout.bottomTab.iconContainer + 12 + insets.bottom
  const radius = Layout.bottomTab.indicatorSize / 2 + Layout.bottomTab.indicatorOutter

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
              <AnimatedMask
                animatedProps={useAnimatedProps(() => ({
                  x: withTiming(coordinates[indexRoute], animationConfig),
                }))}
              >
                <Circle cx={Layout.bottomTab.indicatorSize / 2} cy="0" r={radius} fill="black" />
                <Path
                  x={Layout.bottomTab.indicatorOutter + Layout.bottomTab.indicatorSize - 2}
                  fill-rule="evenodd"
                  d="M15 0H0V8H1.08544C1.85925 3.50005 7.79381 0 15 0Z"
                  clip-rule="evenodd"
                  fill="black"
                />
                <Path
                  x={-Layout.bottomTab.indicatorOutter - 12}
                  d="M0 0.0226055C6.74876 0.328794 12.1769 3.71001 12.9146 8H15V0L0 0L0 0.0226055Z"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  fill="black"
                />
              </AnimatedMask>
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
