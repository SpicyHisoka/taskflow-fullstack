import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated, Easing, TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TaskItem = ({ item, onToggle }) => {
  const animatedValue = useRef(new Animated.Value(item.status === 'DONE' ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: item.status === 'DONE' ? 1 : 0,
      duration: 600,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  }, [item.status]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e6f0fb', '#e6f7f1']   // azzurro → verde menta pastello
  });

  return (
    <Animated.View style={[styles.taskCard, { backgroundColor }]}>
      <TouchableOpacity onPress={() => onToggle(item)}>
        <Ionicons
          name={item.status === 'DONE' ? "checkbox" : "square-outline"}
          size={24}
          color={item.status === 'DONE' ? "#6fbf9b" : "#8b8fa5"}   // verde soft / grigio lilla
          style={styles.checkboxIcon}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={[
          styles.taskTitle,
          item.status === 'DONE' && { textDecorationLine: 'line-through', color: '#7a7a7a' }
        ]}>
          {item.title}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 12,
    elevation: 2,
  },
  checkboxIcon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2f2f3a'   // grigio antracite soft
  }
});

export default TaskItem;