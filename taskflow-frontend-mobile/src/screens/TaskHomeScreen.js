import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  Modal,
  TouchableOpacity
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../services/api';
import TaskItem from '../components/TaskItem';
import TaskButton from '../components/TaskButton';
import TaskNavbar from '../components/TaskNavbar';
import TaskForm from '../components/TaskForm';

export default function TaskHomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data.content);
    } catch (error) {
      console.error('Errore API', error);
    } finally {
      setLoading(false);
    }
  };

  const saveTask = async () => {
    if (newTaskTitle.trim().length === 0) {
      return;
    }

    try {
      const response = await api.post('/tasks', {
        title: newTaskTitle,
        description: newTaskDescription,
        status: 'TODO'
      });

      setTasks([response.data, ...tasks]);

      closeModal();
    } catch (error) {
      console.error(error);
      Alert.alert('Errore', 'Impossibile salvare la task');
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setNewTaskTitle('');
    setNewTaskDescription('');
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  const toggleTaskStatus = async (task) => {
    const newStatus = task.status === 'DONE' ? 'TODO' : 'DONE';

    try {
      // Patch al backend
      await api.patch(`/tasks/${task.id}`, {
        status: newStatus
      });

      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.id === task.id ? { ...t, status: newStatus } : t
        )
      );
    } catch (error) {
      console.error('Errore durante aggiornamento stato del task', error);
    }
  };

  const getFilteredTasks = () => {
    if (filter === 'ToDo') {
      return tasks.filter(t => t.status === 'TODO');
    }

    if (filter === 'Done') {
      return tasks.filter(t => t.status === 'DONE');
    }

    return tasks;
  }

  const renderTask = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Details', { task: item })}
    >
      <TaskItem
        item={item}
        onToggle={toggleTaskStatus}
      />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#7b6cff" />
      </View>
    );
  }

  return (
    <View style={filter === 'All' ? styles.containerAll : styles.container}>

      <TaskNavbar currentFilter={filter} onFilterChange={setFilter} />

      <FlatList
        data={getFilteredTasks()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTask}
      />

      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalWrapper}>
            <TaskForm
              title={newTaskTitle}
              setTitle={setNewTaskTitle}
              description={newTaskDescription}
              setDescription={setNewTaskDescription}
              onSave={saveTask}
              onCancel={closeModal}
            />
          </View>
        </View>
      </Modal>
      {
        filter === 'All' &&
        <TaskButton onPress={() => setIsModalVisible(true)} />
      }

    </View>
  );
}

const styles = StyleSheet.create({
  containerAll: {
    flex: 1,
    backgroundColor: '#f4f7fb',
    paddingBottom: 77,
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f7fb',
    paddingBottom: 5
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalWrapper: {
    height: '95%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ffffff'
  },
});