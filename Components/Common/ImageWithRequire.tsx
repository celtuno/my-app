import React from "react";
import { styles } from "../../styles/classStyles";
import { Image } from "react-native";
export const ImageWithRequire = ({ name }) => {
    const image = name? Images[name] : Images['error'];
    return (
        <Image key={name} style={styles.image} source={image} />
    )
};

export const Images = {
    // image1: require('./assets/images/image1.png'),
    // image2: require('./assets/images/image2.png'),
    // image3: require('./assets/images/image3.png'),
    image4: require('../../assets/images/image4.png'),
    image5: require('../../assets/images/image5.png'),
    image6: require('../../assets/images/image6.png'),
    image7: require('../../assets/images/image7.png'),
    image8: require('../../assets/images/image8.png'),
    image9: require('../../assets/images/image9.png'),
    image10: require('../../assets/images/image10.png'),
    image11: require('../../assets/images/image11.png'),
    error: require('../../assets/images/error.png')    
    }
export default ImageWithRequire