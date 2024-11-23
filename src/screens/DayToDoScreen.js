import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import TaskModal from '../components/TaskModal';
import Tasks from '../components/Tasks';
import { Plus } from '../components/Plus';
import { setTasksByDate, addTask, toggleTask, updateTaskText, deleteTask } from '../redux/TasksSlice'; 
// Тут не замінив на ScrollView тому що видає помилку
const DayToDoScreen = ({ route, navigation }) => {
  const { selectedDate, isDarkMode } = route.params;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const colors = useSelector((state) => state.theme.colors); 

  const tasksByDate = useSelector((state) => state.tasks);
  const tasks = tasksByDate[selectedDate] || { incomplete: [], complete: [] };

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

  const addNewTask = (newTask) => {
    dispatch(addTask({ selectedDate, newTask }));
    setShowModal(false);
  };

  const toggleTaskStatus = (index, type) => {
    dispatch(toggleTask({ selectedDate, index, type }));
  };

  const updateTaskText = (index, type, newText) => {
    dispatch(updateTaskText({ selectedDate, index, section: type, text: newText }));
  };

  const deleteTask = (index, type) => {
    dispatch(deleteTask({ selectedDate, index, section: type }));
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Header
        incompleteCount={tasks.incomplete.length}
        completeCount={tasks.complete.length}
        navigation={navigation}
        selectedDate={selectedDate}
        isDarkMode={isDarkMode}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Tasks 
          tasks={tasks} 
          toggleTask={toggleTaskStatus} 
          deleteTask={deleteTask} 
          updateTaskText={updateTaskText} 
          isDarkMode={isDarkMode}
        />
      </ScrollView>
      <TouchableOpacity style={styles.floatingButton} onPress={() => setShowModal(true)}>
        <View>
          <Plus />
        </View>
      </TouchableOpacity>
      <TaskModal visible={showModal} onAddTask={addNewTask} onClose={() => setShowModal(false)} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141419',
  },
  content: {
    paddingBottom: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: '#3F4EA0',
    borderWidth: 2,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#515CC6',
  },
});

export default DayToDoScreen;
