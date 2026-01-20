import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

const TaskForm = ({
  title,
  setTitle,
  description,
  setDescription,
  onSave,
  onCancel
}) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={onCancel}>
          <Text style={styles.buttonText}>Annulla</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Nuova Task</Text>

        <TouchableOpacity
          style={[styles.button, !title.trim() && { opacity: 0.6 }]}
          onPress={onSave}
          disabled={!title.trim()}
        >
          <Text style={styles.buttonText}>Salva</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.titleInput}
          placeholder="Titolo"
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
          autoFocus={true}
        />

        <TextInput
          style={styles.descriptionInput}
          placeholder="Aggiungi dettagli (opzionale)..."
          placeholderTextColor="#bbb"
          value={description}
          onChangeText={setDescription}
          multiline={true}
          textAlignVertical="top"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#e3e8f2',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2f2f3a',
  },
  button: {
    backgroundColor: '#7b6cff',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    minWidth: 90,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputContainer: {
    padding: 20,
  },
  titleInput: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2f2f3a',
    borderBottomWidth: 1,
    borderBottomColor: '#dde2ee',
    paddingBottom: 10,
    marginBottom: 20,
  },
  descriptionInput: {
    fontSize: 20,
    color: '#6b6f85',
    height: '100%',
  },
});

export default TaskForm;