import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import TaskModal from '../components/TaskModal';
import Tasks from '../components/Tasks';
import { Plus } from '../components/Plus';
import { setTasksByDate, addTask, toggleTask, updateTaskText, deleteTask } from '../redux/TasksSlice';

const DayToDoScreen = ({ route, navigation }) => {
  const { selectedDate, isDarkMode } = route.params;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  
  // Використовуємо селектори для кольорів та задач
  const colors = useSelector((state) => state.theme.colors);
  const tasksByDate = useSelector((state) => state.tasks);
  const tasks = tasksByDate[selectedDate] || { incomplete: [], complete: [] };

  // Константи для стилів
  const backgroundColor = colors.background;
  const floatingButtonColor = colors.floating;
  const floatingButtonBorderColor = colors.floatingBorder;

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: 'none' },
    });

    return () => {
      navigation.setOptions({
        tabBarStyle: { display: 'flex' },
      });
    };
  }, [navigation]);

  useEffect(() => {
    dispatch(setTasksByDate({ selectedDate, tasks: tasks }));
  }, [dispatch, selectedDate, tasks]);

  // Абстрагована функція для роботи з задачами
  const handleTaskAction = (action, index, type, newText = '') => {
    switch (action) {
      case 'toggle':
        dispatch(toggleTask({ selectedDate, index, type }));
        break;
      case 'update':
        dispatch(updateTaskText({ selectedDate, index, section: type, text: newText }));
        break;
      case 'delete':
        dispatch(deleteTask({ selectedDate, index, section: type }));
        break;
      case 'add':
        dispatch(addTask({ selectedDate, newTask: newText }));
        setShowModal(false);
        break;
      default:
        break;
    }
  };

  const renderTasks = ({ item, index }) => (
    <Tasks
      tasks={tasks}
      toggleTask={(index, type) => handleTaskAction('toggle', index, type)}
      deleteTask={(index, type) => handleTaskAction('delete', index, type)}
      updateTaskText={(index, type, newText) => handleTaskAction('update', index, type, newText)}
      isDarkMode={isDarkMode}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Header
        incompleteCount={tasks.incomplete.length}
        completeCount={tasks.complete.length}
        navigation={navigation}
        selectedDate={selectedDate}
        isDarkMode={isDarkMode}
      />
      <FlatList
        data={[tasks]}
        renderItem={renderTasks}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContent}
      />
      <TouchableOpacity 
        style={[styles.floatingButton, {backgroundColor: floatingButtonColor}, {borderColor: floatingButtonBorderColor}]} 
        onPress={() => setShowModal(true)}
      >
        <Plus />
      </TouchableOpacity>
      <TaskModal visible={showModal} onAddTask={(newTask) => handleTaskAction('add', null, null, newTask)} onClose={() => setShowModal(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default DayToDoScreen;
