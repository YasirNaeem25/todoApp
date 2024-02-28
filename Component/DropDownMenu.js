import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const DropdownMenu = ({ visible,options, selectedOption, onSelect ,onClose}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => {
                  onSelect(option);
                  onClose;
                }}
              >
                <Text style={option === selectedOption ? styles.selectedOption : styles.option}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 5,
    marginTop: 5,
    padding: 10,
    width: 200, // Set the width based on your design
  },
  option: {
    paddingVertical: 8,
  },
  selectedOption: {
    paddingVertical: 8,
    fontWeight: 'bold',
    color: 'blue', // Change the color based on your design
  },
});

export default DropdownMenu;
