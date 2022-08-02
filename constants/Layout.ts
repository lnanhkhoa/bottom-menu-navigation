import { Dimensions } from "react-native"

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  animationDurationTime: 100,
  animationConfig: { duration: 250 },
  bottomTab: {
    horizontalPadding: 10,
    iconSize: 21,
    iconContainer: 44,
    textContainer: 12,
    indicatorSize: 50,
    indicatorOutter: 6
  },
}
