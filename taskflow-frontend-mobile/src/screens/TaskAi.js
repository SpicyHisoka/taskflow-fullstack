import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { generateAiTasks } from '../services/api';

export default function TaskAiScreen({ navigation }) {
  const [prompt, setPrompt] = useState('');

  const handleGenerate = async () => {
    try {
      await generateAiTasks(prompt);
      Alert.alert("Successo!", "Task generate");
      navigation.navigate('Home');

    } catch (error) {
      Alert.alert("Errore", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Cosa devi fare oggi?</Text>
        <Text style={styles.subtitle}>
          Scrivi in modo naturale, l'AI crea le task per te
        </Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Es. Oggi devo chiamare il commercialista, finire il report e..."
            placeholderTextColor="#7e6b85"
            value={prompt}
            onChangeText={setPrompt}
            multiline
            maxLength={800}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          style={[
            styles.generateButton,
            !prompt.trim() && styles.generateButtonDisabled,
          ]}
          onPress={handleGenerate}
          disabled={!prompt.trim()}
          activeOpacity={0.85}
        >
          <Ionicons name="sparkles-outline" size={20} color="#ffffff" />
          <Text style={styles.buttonText}>Genera Task con AI</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fb',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#7b6cff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6b6f85',
    textAlign: 'center',
    marginBottom: 36,
  },
  inputWrapper: {
    backgroundColor: '#e3e8f2',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#d0d8e5',
    padding: 16,
    minHeight: 140,
    marginBottom: 28,
  },
  textInput: {
    fontSize: 16,
    color: '#333844',
    minHeight: 100,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7b6cff',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 10,
    shadowColor: '#7b6cff',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  generateButtonDisabled: {
    backgroundColor: '#a8b0c0',
    shadowOpacity: 0,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
});