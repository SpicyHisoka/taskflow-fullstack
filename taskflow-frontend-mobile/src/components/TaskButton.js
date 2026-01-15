import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TaskButton = ({ onPress }) => {
  return (
    <View style={styles.buttonWrapper}>
      <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.buttonText}>Aggiungi Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'absolute',
    bottom: 22,
    alignSelf: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#7b6cff',   // viola pastello
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 18,
    alignItems: 'center',
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default TaskButton;