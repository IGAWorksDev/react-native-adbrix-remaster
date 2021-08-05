import React from 'react';
import { StyleSheet, View} from 'react-native';

const Separator = () => (
    <View style={styles.separator} />
);

const styles = StyleSheet.create({
    separator: {
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginHorizontal: 24,
      marginVertical: 8,
    },
  });
export default Separator;