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

  // Функції для дій з задачами
  const toggleTaskStatus = (index, type) => {
    dispatch(toggleTask({ selectedDate, index, type }));
  };

  const updateTask = (index, type, newText) => {
    dispatch(updateTaskText({ selectedDate, index, section: type, text: newText }));
  };

  const deleteTaskItem = (index, type) => {
    dispatch(deleteTask({ selectedDate, index, section: type }));
  };

  const addNewTask = (newTask) => {
    dispatch(addTask({ selectedDate, newTask }));
    setShowModal(false);
  };

  const renderTasks = ({ item, index }) => (
    <Tasks
      tasks={tasks}
      toggleTask={(index, type) => toggleTaskStatus(index, type)}
      deleteTask={(index, type) => deleteTaskItem(index, type)}
      updateTaskText={(index, type, newText) => updateTask(index, type, newText)}
      isDarkMode={isDarkMode}
    />
  );

  return (
    <View style={[styles.container(colors)]}>
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
        style={styles.floatingButton(colors)} 
        onPress={() => setShowModal(true)}
      >
        <Plus />
      </TouchableOpacity>
      <TaskModal 
        visible={showModal} 
        onAddTask={addNewTask} 
        onClose={() => setShowModal(false)} 
      />
    </View>
  );
};

const styles = StyleSheet.create = ({
  container: (colors) => ({
    flex: 1,
    backgroundColor: colors.background
  }),
  flatListContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  floatingButton: (colors) => ({
    backgroundColor: colors.floating,
    borderColor: colors.floatingBorder,
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }),
});

export default DayToDoScreen;
