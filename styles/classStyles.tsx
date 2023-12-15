import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  image: {
    width: 360,
    height: 140,
    resizeMode: "contain",
    margin: 15,
    borderColor: "#f0f0f0",
  },
  button: {
    marginTop: 12,
    // flexDirection:'column'
  },
  imagetext: {
    textAlign: "center",
  },
  textBlock: {
    marginBottom: 5,
    flexDirection: "column",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 2,
  },
  configContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 32,
  },
  userContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
    paddingBottom: 54,
  },
  configData: {
    color: "#01010199",
  },
  textColumn: {
    flex: 0.55,
    // width: 150, //using fixed item width instead of flex: 0.5 works
    height: 47,
    // flexGrow: 1,
    // flexShrink: 0,
    padding: 7,
    marginBottom: 1,
    // backgroundColor: 'red'
  },
  profileColumn: {
    flex: 0.75,
    // width: 150, //using fixed item width instead of flex: 0.5 works
    height: 107,
    // flexGrow: 1,
    // flexShrink: 0,
    padding: 3,
    marginBottom: 3,
    // backgroundColor: 'red'
  },
  userTextColumn: {
    flex: 0.3,
    // width: 150, //using fixed item width instead of flex: 0.5 works
    height: 147,
    // flexGrow: 1,
    // flexShrink: 0,
    padding: 17,
    marginBottom: 12,

    // backgroundColor: 'red'
  },
  titleTextColumn: {
    flex: 0.3,
    // width: 150, //using fixed item width instead of flex: 0.5 works
    height: 47,
    // flexGrow: 1,
    // flexShrink: 0,
    padding: 7,
    marginBottom: 1,

    // backgroundColor: 'red'
  },
  containerLogin: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 56,
    backgroundColor: "#FF55F5",
  },

  textColumnLogin: {
    flex: 0.55,
    // width: 150, //using fixed item width instead of flex: 0.5 works
    height: 107,
    // flexGrow: 1,
    // flexShrink: 0,
    padding: 6,
    marginBottom: 14,
    // backgroundColor: 'red'
  },
  subheading: {
    fontWeight: "normal",
    fontSize: 20,
    flexDirection: "column",
  },
  configheading: {
    fontWeight: "normal",
    fontSize: 16,
    flexDirection: "column",
  },
  heading: {
    fontWeight: "400",
    fontSize: 28,
    flexDirection: "column",
    marginBottom: 4,
  },
  colorContainer: {
    width: 300,
    height: 445,
  },
});
