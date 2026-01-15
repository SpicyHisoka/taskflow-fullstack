import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TaskDetailsButton = ({ status, toggleTaskStatus, onEdit, onDelete, isEditing }) => {

  return (
    <View style={styles.buttonWrapper}>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={onDelete}>
          <Icon
            name={isEditing ? "close" : "delete-outline"}
            size={26}
            color="#fff"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.pillButton,
            { backgroundColor: status === 'DONE' ? '#a8e6cf' : '#cfe5fb' }
          ]}
          onPress={toggleTaskStatus}
        >
          <Text style={styles.buttonText}>{status === 'DONE' ? 'DONE' : 'TODO'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionBtn, isEditing ? styles.saveBtn : styles.editBtn]} onPress={onEdit}>
          <Icon
            name={isEditing ? "check" : "edit"}
            size={26}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonWrapper: {
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 20,
  },
  pillButton: {
    flex: 1,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2f2f3a',   // antracite soft
    letterSpacing: 0.2,
  },
  actionBtn: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },
  editBtn: {
    backgroundColor: '#877bf3',   // viola pastello
  },
  saveBtn: {
    backgroundColor: '#6fbf9b',   // verde menta
  },
  deleteBtn: {
    backgroundColor: '#ee6d6d',   // rosso pastello
  }
});

export default TaskDetailsButton;