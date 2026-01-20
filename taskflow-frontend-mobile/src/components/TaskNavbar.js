import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const TAB_WIDTH = (width - 30) / 3;
const filters = ['All', 'ToDo', 'Done'];

const TaskNavbar = ({ currentFilter, onFilterChange }) => {

  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const index = filters.indexOf(currentFilter);

    Animated.spring(translateX, {
      toValue: index * TAB_WIDTH,
      useNativeDriver: true,
      bounciness: 6,
    }).start();
  }, [currentFilter]);

  return (
    <View style={styles.navContainer}>
      <View style={styles.filterRow}>
        <Animated.View
          style={[
            styles.animatedBox,
            { width: TAB_WIDTH, transform: [{ translateX }] }
          ]}
        />

        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => onFilterChange(filter)}
            style={styles.filterButton}
          >
            <Text style={[
              styles.filterText,
              currentFilter === filter && styles.activeFilterText
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    paddingTop: 10,
    paddingBottom: 6,
    paddingHorizontal: 15,
    backgroundColor: '#f4f7fb',
  },
  filterRow: {
    flexDirection: 'row',
    backgroundColor: '#e3e8f2',
    borderRadius: 14,
    height: 50,
  },
  animatedBox: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#7b6cff',
    borderRadius: 14,
  },
  filterButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  filterText: {
    fontWeight: 'bold',
    color: '#6b6f85',
  },
  activeFilterText: {
    color: '#ffffff',
  },
});

export default TaskNavbar;