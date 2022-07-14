import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native"
import React, { useEffect } from "react"
import Layout from "../../constants/Layout"

import Animated, {
  withTiming,
  useAnimatedStyle,
  useDerivedValue,
  interpolateColor,
} from "react-native-reanimated"
import { Ionicons } from "@expo/vector-icons"

const { bottomTab: bottomLayout, animationConfig } = Layout
const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons)

interface BottomMenuItemProps {
  itemWidth: number
  onPress: () => void
  color: string
  title: string
  iconName: string
  focused: boolean
}

function useStyles({ focused, color }) {
  const progress = useDerivedValue(() =>
    focused ? withTiming(1, animationConfig) : withTiming(0, animationConfig)
  )

  const iconMoving = useDerivedValue(() =>
    focused
      ? withTiming(-bottomLayout.iconContainer * 0.5, animationConfig)
      : withTiming(0, animationConfig)
  )
  const iconContainerStyles = [
    useAnimatedStyle(() => ({
      transform: [
        {
          translateY: iconMoving.value,
        },
      ],
    })),
  ]
  const iconStyles = [
    useAnimatedStyle(() => ({
      color: interpolateColor(progress.value, [0, 1], ["black", "white"]),
    })),
  ]

  const textMoving = useDerivedValue(() =>
    focused
      ? withTiming(0, animationConfig)
      : withTiming(bottomLayout.textContainer * 0.2, animationConfig)
  )
  const textStyles = [
    styles.itemText,
    { color: color },
    useAnimatedStyle(() => ({
      transform: [
        {
          translateY: textMoving.value,
        },
      ],
      opacity: focused ? withTiming(1, animationConfig) : 0,
    })),
  ]

  return {
    textStyles,
    textMoving,
    iconContainerStyles,
    iconMoving,
    iconStyles,
  }
}

export function BottomMenuItem({
  itemWidth,
  onPress,
  color,
  title,
  focused,
  iconName,
}: BottomMenuItemProps) {
  const { textStyles, iconContainerStyles, iconStyles } = useStyles({
    focused,
    color,
  })

  return (
    <Pressable onPress={onPress}>
      <View style={[styles.item, { width: itemWidth }]}>
        <View style={styles.iconContainter}>
          <Animated.View style={iconContainerStyles}>
            <AnimatedIonicons name={iconName} size={bottomLayout.iconSize} style={iconStyles} />
          </Animated.View>
        </View>
        <View style={styles.textContainer}>
          <Animated.Text style={textStyles}>{title}</Animated.Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  itemText: {
    fontSize: 10,
    textAlign: "center",
  },
  item: {
    alignItems: "center",
  },
  iconContainter: {
    height: bottomLayout.iconContainer,
    width: bottomLayout.iconContainer,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    height: bottomLayout.textContainer,
    justifyContent: "center",
  },
})
