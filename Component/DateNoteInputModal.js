import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import DatePicker from 'react-native-date-picker';


const DateNoteInputModal = ({ visible, inputType, onDateNoteSelect, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [note, setNote] = useState('');

  const handleDateChange = (date) => {
    
    setSelectedDate(date);
  };

  const handleNoteInputChange = (text) => {
    setNote(text);
  };

  const handleDateNoteSelect = () => {
    if (inputType === 'date') {
      onDateNoteSelect(selectedDate, inputType);
      // setSelectedDate(new Date());
    } else {
      onDateNoteSelect(note, inputType);
      setNote('');
    }

    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {inputType === 'date' && (
              <React.Fragment>
                <Text style={styles.modalTitle}>Select Due Date</Text>
                <DatePicker
                 
                  date={selectedDate}
                  mode="date"
                  placeholder="Select date"
                  format="YYYY-MM-DD"
                  minDate={new Date()}
                  maxDate="2100-12-31"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginLeft: 36,
                    },
                  }}
                  onDateChange={handleDateChange}
                />
              </React.Fragment>
            )}
            {inputType === 'note' && (
              <React.Fragment>
                <Text style={styles.modalTitle}>Add a Note</Text>
                <TextInput
                  style={styles.noteInput}
                  placeholder="Add a note"
                  value={note}
                  onChangeText={handleNoteInputChange}
                />
              </React.Fragment>
            )}
            <Button title="Select" onPress={handleDateNoteSelect} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noteInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default DateNoteInputModal;
