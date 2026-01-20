import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Alert, TextInput } from 'react-native';
import api from '../services/api';
import TaskDetailsButton from '../components/TaskDetailsButton';

const TaskDetails = ({ route, navigation }) => {
  const { task } = route.params;

  const [status, setStatus] = useState(task.status);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const toggleTaskStatus = async () => {
    const newStatus = status === 'DONE' ? 'TODO' : 'DONE';

    try {
      await api.patch(`/tasks/${task.id}`, { status: newStatus });
      setStatus(newStatus);
    } catch (error) {
      console.error('Errore aggiornamento stato', error);
    }
  };

  const handleEdit = () => {
    if (isEditing) {
      saveEditedTask();
    } else {
      setIsEditing(true);
    }
  };

  const saveEditedTask = async () => {
    try {
      await api.patch(`/tasks/${task.id}`, { title, description });
      setIsEditing(false);
      Alert.alert('Successo!', 'Task modificata correttamente');
    } catch (error) {
      console.error('Errore salvataggio task modificata', error);
      Alert.error('Errore!', 'Impossibile salvare le modifiche, riprovare');
    }
  };

  const handleDelete = useCallback(async () => {
    if (isEditing) {
      setTitle(task.title);
      setDescription(task.description);
      setIsEditing(false);
    } else {
      Alert.alert(
        'Conferma eliminazione',
        'Vuoi davvero eliminare questa attività?',
        [
          { text: 'Annulla', style: 'cancel' },
          {
            text: 'Elimina',
            style: 'destructive',
            onPress: async () => {
              try {
                await api.delete(`/tasks/${task.id}`);
                navigation.goBack();
              } catch (err) {
                console.error('Errore eliminazione', err);
                Alert.alert('Errore', 'Impossibile eliminare attività');
              }
            },
          },
        ]
      );
    }

  }, [task, navigation, isEditing]);

  return (
    <View style={styles.container}>

      <View style={styles.textContainer}>
        {isEditing ? (
          <View>
            <TextInput
              style={[styles.title, styles.inputActive]}
              value={title}
              onChangeText={setTitle}
              autoFocus
            />
            <TextInput
              style={[styles.description, styles.descriptionInput]}
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>
        ) : (
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>
              {description || "Nessuna descrizione fornita."}
            </Text>
          </View>
        )}
      </View>

      <TaskDetailsButton
        isEditing={isEditing}
        status={status}
        toggleTaskStatus={toggleTaskStatus}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fb',
    padding: 20
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2f2f3a',
    marginBottom: 10
  },
  description: {
    fontSize: 18,
    color: '#6b6f85',
    lineHeight: 24
  },
  inputActive: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2f2f3a',
    marginBottom: 10,
    padding: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  descriptionInput: {
    fontSize: 18,
    color: '#6b6f85',
    lineHeight: 24,
    padding: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
    textAlignVertical: 'top',
    minHeight: 100,
  }
});

export default TaskDetails;