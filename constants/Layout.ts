import { Dimensions } from "react-native"

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  animationDurationTime: 200,
  animationConfig: { duration: 300 },
  bottomTab: {
    horizontalPadding: 10,
    iconSize: 25,
    iconContainer: 44,
    textContainer: 12,
    indicatorSize: 50,
  },
}
