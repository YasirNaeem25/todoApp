import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DropdownMenu from './DropDownMenu';
import DateNoteInputModal from './DateNoteInputModal';
import CategoryInputModal from './CategoryInputModal'; 
const PrimaryColor = 'rgb(6, 116, 180)';
const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState('');
    const [filter, setFilter] = useState('All');
    const [sortByDueDate, setSortByDueDate] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [showDateNoteModal, setShowDateNoteModal] = useState(false);
    const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
    const [inputType, setInputType] = useState(null);
    const [showCategoryModal, setShowCategoryModal] = useState(false); 
    useEffect(() => {
        loadTasks();
    }, []);

    useEffect(() => {
        saveTasks();
    }, [tasks]);

    const loadTasks = async () => {
        try {
            const savedTasks = await AsyncStorage.getItem('tasks');
            if (savedTasks) {
                setTasks(JSON.parse(savedTasks));
            }
        } catch (error) {
            console.error('Error loading tasks from AsyncStorage:', error);
        }
    };

    const saveTasks = async () => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error('Error saving tasks to AsyncStorage:', error);
        }
    };

    const sortByDueDatefunction = (data) => {
        return data.sort((a, b) => {
            const dateA = a.dueDate ? new Date(a.dueDate) : null;
            const dateB = b.dueDate ? new Date(b.dueDate) : null;

            if (dateA && dateB) {
                return dateA - dateB;
            } else if (dateA) {
                return -1;
            } else if (dateB) {
                return 1;
            }

            return 0;
        });
    };

    const filteredTasks = () => {
        let filtered = tasks;

        if (filter === 'Completed') {
            filtered = filtered.filter(task => task.completed);
        } else if (filter === 'Incomplete') {
            filtered = filtered.filter(task => !task.completed);
        }

        if (sortByDueDate) {
            filtered = sortByDueDatefunction(filtered);
        }

        return filtered;
    };

    const addTask = () => {
        if (taskText.trim() !== '') {
            setTasks([...tasks, { text: taskText, completed: false, dueDate: null, note: '', category: 'Default' }]);
            setTaskText('');
        }
    };

    const markTaskCompleted = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    };

    const deleteTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    };

    const setDueDateNote = (index, date, note) => {
        const updatedTasks = [...tasks];
        if (note === 'date') {
            const datedata = new Date(date);
            const readableDate = datedata.toDateString();
            updatedTasks[index].dueDate = readableDate;
        } else if(note === 'note') {
            updatedTasks[index].note = date;
        }
        else {
            updatedTasks[index].category = date;
        }
        setTasks(updatedTasks);
    };

    const openDateNoteModal = (index, inputType) => {
        setSelectedTaskIndex(index);
        setInputType(inputType);
        setShowDateNoteModal(true);
    };

    const openCategoryModal = (index) => {
        setSelectedTaskIndex(index);
        setShowCategoryModal(true);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.header}>Todo List</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Add a new task"
                        value={taskText}
                        onChangeText={(text) => setTaskText(text)}
                    />
                    <TouchableOpacity onPress={addTask} style={styles.addButton}>
                        <FontAwesome name="plus" size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesome name="filter" size={22} color={PrimaryColor} />
                            <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 10, color: PrimaryColor }}>Filter: {filter}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => setSortByDueDate(!sortByDueDate)}
                        style={styles.sortButton}
                    >
                        <Text style={styles.sortButtonText}>
                            {sortByDueDate ? 'Sort by Date' : 'Sort by Date (Off)'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={filteredTasks()}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <View style={styles.taskCard}>
                            <View>
                                <Text style={styles.taskTitle}>{item.text}</Text>

                                <TouchableOpacity onPress={() => deleteTask(index)} style={styles.deleteButton}>
                                    <FontAwesome name="trash-o" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>

                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    style={{ flexDirection: 'row' }}
                                    onPress={() => openDateNoteModal(index, 'date')}
                                >
                                    <FontAwesome name="calendar" size={20} color={PrimaryColor} />
                                    <Text style={styles.inputText}>{item.dueDate || 'Select Due Date'}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => markTaskCompleted(index)}>
                                    <FontAwesome
                                        name={item.completed ? 'check-square-o' : 'square-o'}
                                        size={22}
                                        color={PrimaryColor}
                                    />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={{ flexDirection: 'row', marginTop: 10 }}
                                activeOpacity={0.9}
                                onPress={() => openDateNoteModal(index, 'note')}
                            >
                                {!item.note && <FontAwesome name="pencil-square-o" color={PrimaryColor} size={22} />}
                                <Text
                                    style={[
                                        styles.inputText,
                                        { fontWeight: !item.note ? '600' : '400', padding: !item.note ? 0 : 12 },
                                    ]}
                                >
                                    {item.note || 'Add a note'}
                                </Text>
                            </TouchableOpacity>

                            {/* Display and edit task category */}
                            <TouchableOpacity
                                style={{ flexDirection: 'row', marginTop: 10 }}
                                activeOpacity={0.9}
                                onPress={() => openCategoryModal(index)}
                            >
                                <FontAwesome name="folder" color={PrimaryColor} size={22} />
                                <Text style={styles.inputText}>{item.category}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
                <DateNoteInputModal
                    visible={showDateNoteModal}
                    inputType={inputType}
                    onDateNoteSelect={(value, inputType) => {
                        if (inputType === 'date' || inputType === 'note') {
                            setDueDateNote(selectedTaskIndex, value, inputType);
                        }
                        setShowDateNoteModal(false);
                    }}
                    onClose={() => setShowDateNoteModal(false)}
                />
                <CategoryInputModal
                    visible={showCategoryModal}
                    currentCategory={tasks[selectedTaskIndex]?.category}
                    onCategorySelect={(category) => {
                        setDueDateNote(selectedTaskIndex, category, 'category');
                        setShowCategoryModal(false);
                    }}
                    onClose={() => setShowCategoryModal(false)}
                />
                <DropdownMenu
                    visible={showFilters}
                    options={['All', 'Completed', 'Incomplete']}
                    selectedOption={filter}
                    onSelect={(selected) => {
                        setFilter(selected);
                        setShowFilters(false);
                    }}
                    onClose={() => setShowFilters(false)}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 30,
        color: 'rgb(6, 116, 180)',
    },
    taskCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginBottom: 10,
        elevation: 2,
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#fff',
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'rgb(6, 116, 180)',
    },
    deleteButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        height: 40,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
        marginTop: 10,
    },
    input: {
        flex: 1,
        height: 40,
        marginLeft: 10,
        color: 'gray',
    },
    inputText: {
        marginLeft: 10,
        color: PrimaryColor,
        fontSize: 14,
        fontWeight: '700'
    },
    addButton: {
        backgroundColor: PrimaryColor,
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
    sortButton: {
        backgroundColor: PrimaryColor,
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    sortButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TodoList;

