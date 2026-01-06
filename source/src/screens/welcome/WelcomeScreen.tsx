import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { colorPrimary } from '../../constants/colors';
import { Text } from '../../components/common/Text';

export function WelcomeScreen() {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    if (currentPage < 2) {
      setCurrentPage(currentPage + 1);
    } else {
      // Navigate to next screen (to be implemented)
    }
  };

  const handleSkip = () => {
    // Navigate to next screen (to be implemented)
  };

  return (
    <View style={styles.container}>
      {/* Page indicators */}
      <View style={styles.indicators}>
        {[0, 1, 2].map((index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentPage === index && styles.indicatorActive,
            ]}
          />
        ))}
      </View>

      {/* Page content */}
      <View style={styles.content}>
        {/* Page 1, 2, 3 content will be added here */}
        <Text style={styles.pageText}>Welcome Page {currentPage + 1}</Text>
      </View>

      {/* Navigation buttons */}
      <View style={styles.buttons}>
        {currentPage < 2 && (
          <Pressable style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Пропустить</Text>
          </Pressable>
        )}
        <Pressable style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>
            {currentPage === 2 ? 'Начать' : 'Далее'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPrimary,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingTop: 60,
    paddingBottom: 40,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  indicatorActive: {
    backgroundColor: '#FFFFFF',
    width: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pageText: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 16,
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  skipText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: {
    fontSize: 16,
    color: colorPrimary,
    fontWeight: '600',
  },
});

