import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  Modal,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { generateAiTasks } from '../services/api';

export default function TaskAi({ navigation }) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      await generateAiTasks(prompt);
      Alert.alert("Successo!", "Task generate",
        [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
      );

    } catch (error) {
      Alert.alert("Errore", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={'height'}
      style={styles.container}
    >
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color="#7b6cff" />
            <Text style={styles.loadingTitle}>Gemini sta lavorando</Text>
            <Text style={styles.loadingSubtitle}>
              Sto trasformando i tuoi pensieri in task organizzati
            </Text>
          </View>
        </View>
      )}

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
            (!prompt.trim() || isLoading) && styles.generateButtonDisabled,
          ]}
          onPress={handleGenerate}
          disabled={!prompt.trim() || isLoading}
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
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  loadingCard: {
    width: '85%',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  loadingTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333844',
    marginTop: 20,
    textAlign: 'center',
  },
  loadingSubtitle: {
    fontSize: 14,
    color: '#6b6f85',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
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