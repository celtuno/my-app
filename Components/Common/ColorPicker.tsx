import { Pressable, StyleSheet, View, Text, Modal } from "react-native";
import { TriangleColorPicker } from "react-native-color-picker";
import React, { useEffect } from "react";
import { Dialog, PaperProvider } from "react-native-paper";
import { styles } from "../../styles/classStyles";

type Props = {
  currentColor;
  colorType: string;
  showdialog: boolean;
  colorCallback;
};

export const Colourpicker: React.FC<Props> = ({
  currentColor,
  colorType,

  colorCallback,
}) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  let first = false;
  const toggleDialog = () => {
    console.log(`Child toggle ${dialogOpen}`);
    setDialogOpen(!dialogOpen);
  };
  const handleColorChange = (color) => {
    // toggleDialog;
    colorCallback(color);
    //     setDialogOpen(true);
  };
  // useEffect(() => {
  //   if (showdialog && !first) {
  //     // toggleDialog;
  //     first = true;

  //     console.log(`InitChild  ${showdialog}`);
  //   }
  //   console.log(`2InitChild  ${showdialog}`);
  // });
  return (
    <PaperProvider>
      <View>
        {/* style={{ alignContent: "center" }}> */}
        <Pressable onPress={() => setDialogOpen(true)}>
          <Text style={styles.configData}>
            {currentColor ?? "No color chosen"}
          </Text>
        </Pressable>
        <Modal visible={dialogOpen}>
          <Dialog
            // style={{ zIndex: 100, elevation: 100 }}
            visible={dialogOpen}
            onDismiss={() => {
              setDialogOpen(false);
            }}
          >
            <Dialog.Title>Choose {colorType}</Dialog.Title>
            <Dialog.Content>
              <TriangleColorPicker
                oldColor={currentColor}
                onColorSelected={(color: any) => {
                  handleColorChange(color);
                  // alert(`Color: ${color}`);
                  setDialogOpen(false);
                }}
                style={styles.colorContainer}
              />
            </Dialog.Content>
          </Dialog>
        </Modal>
      </View>
    </PaperProvider>
  );
};

// export default Colourpicker;
