import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
const PrimaryColor = 'rgb(6, 116, 180)';
const CategoryInputModal = ({ visible, currentCategory, onCategorySelect, onClose }) => {
    const [category, setCategory] = useState(currentCategory);

    const handleSaveCategory = () => {
        onCategorySelect(category);
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeaderText}>Edit Category</Text>
                        <TextInput
                            style={styles.input}
                            value={category}
                            onChangeText={(text) => setCategory(text)}
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={handleSaveCategory}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: PrimaryColor,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 5,
    },
    saveButton: {
        backgroundColor: PrimaryColor,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    cancelButton: {
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        borderColor: PrimaryColor,
        borderWidth: 1,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CategoryInputModal;
