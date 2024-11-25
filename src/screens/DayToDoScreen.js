import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import TaskModal from '../components/TaskModal';
import Tasks from '../components/Tasks';
import { Plus } from '../components/Plus';
import { setTasksByDate, addTask, toggleTask, updateTaskText, deleteTaskText } from '../redux/TasksSlice';

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

  const updateTask = (index, type, newText) => {
    dispatch(updateTaskText({ selectedDate, index, section: type, text: newText }));
  };

  const deleteTask = (index, type) => {
    dispatch(deleteTaskText({ selectedDate, index, section: type }));
  };

  const renderTaskSection = ({ item }) => (
    <Tasks
      tasks={item.tasks}
      toggleTask={toggleTaskStatus}
      deleteTask={deleteTask}
      updateTaskText={updateTask}
      isDarkMode={isDarkMode}
    />
  );

  const taskSections = [
    { key: 'incomplete', tasks: tasks.incomplete },
    { key: 'complete', tasks: tasks.complete },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        incompleteCount={tasks.incomplete.length}
        completeCount={tasks.complete.length}
        navigation={navigation}
        selectedDate={selectedDate}
        isDarkMode={isDarkMode}
      />
      <FlatList
        data={taskSections}
        renderItem={renderTaskSection}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.content}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={() => setShowModal(true)}>
          <Plus />
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

