import React, { useState, useRef } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  colorPrimary,
  colorBackground,
  colorTextPrimary,
  colorShadow,
  colorWelcomeTitle,
  colorWelcomeCategoryText,
  colorWelcomeDescription,
  colorWelcomeProfileDescription,
  colorWelcomeAchievement,
  colorWelcomeCategoryButton,
  colorWelcomeCategoryIcon,
  colorWelcomeIndicatorInactive,
  colorWelcomeIndicatorActive,
  colorWelcomeCategoryBorder,
  colorWelcomeImageShadow,
  colorWelcomeIconShadow,
  colorWhite,
} from '../../constants/colors';
import { letterSpacing } from '../../constants/fonts';
import { Text } from '../../components/common/Text';
import { ButtonRed } from '../../components/common/ButtonRed';
import { ButtonWhite } from '../../components/common/ButtonWhite';
import { useI18n } from '../../i18n';

function Welcome1({ onNext, onSkip, insets }: { onNext: () => void; onSkip: () => void; insets: any }) {
  const { t } = useI18n();
  
  const styles1 = StyleSheet.create({
    welcomeContent: {
      alignSelf: 'stretch',
      alignItems: 'center',
      backgroundColor: colorPrimary,
      paddingHorizontal: 16,
      paddingBottom: 44,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    title: {
      alignSelf: 'stretch',
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 29,
      letterSpacing,
      color: colorWelcomeTitle,
      textAlign: 'center',
      marginBottom: 18,
    },
    imageArea: {
      alignSelf: 'stretch',
      height: 266,
      position: 'relative',
      marginBottom: 30,
    },
    imageBox: {
      position: 'absolute',
      alignSelf: 'stretch',
      width: '100%',
      height: 214,
      bottom: 0,
      backgroundColor: colorBackground,
      borderRadius: 50,
      zIndex: 1,
      shadowColor: colorWelcomeImageShadow,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 1,
      shadowRadius: 3,
      elevation: 3,
    },
    welcomeImage: {
      position: 'absolute',
      alignSelf: 'stretch',
      width: '100%',
      height: 266,
      left: 0,
      bottom: 0,
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      zIndex: 2,
    },
    description: {
      alignSelf: 'stretch',
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 21,
      letterSpacing,
      color: colorWelcomeDescription,
      textAlign: 'center',
    },
    buttonsContainer: {
      position: 'absolute',
      bottom: 40,
      left: 0,
      right: 0,
      paddingHorizontal: 16,
      paddingTop: 24,
      alignItems: 'center',
    },
    buttonsWrapper: {
      width: '100%',
      gap: 12,
    },
  });
  
  return (
    <>
      <View style={styles1.welcomeContent}>
        <Text style={styles1.title}>{t('welcome.page1.title')}</Text>
        <View style={styles1.imageArea}>
          <View style={styles1.imageBox} />
          <Image
            source={require('../../assets/images/welcome1.png')}
            style={styles1.welcomeImage}
            resizeMode="cover"
          />
        </View>
        <Text style={styles1.description}>{t('welcome.page1.description')}</Text>
      </View>
      {/* Navigation buttons */}
      <View style={[styles1.buttonsContainer, { bottom: insets.bottom + 12 }]}>
        <View style={styles1.buttonsWrapper}>
          <ButtonRed text={t('welcome.next')} onPress={onNext} />
          <ButtonWhite text={t('welcome.skip')} onPress={onSkip} />
        </View>
      </View>
    </>
  );
}

function Welcome2({ onNext, onSkip, insets }: { onNext: () => void; onSkip: () => void; insets: any }) {
  const { t } = useI18n();
  
  const styles2 = StyleSheet.create({
    welcomeContent: {
      alignSelf: 'stretch',
      alignItems: 'center',
      backgroundColor: colorPrimary,
      paddingHorizontal: 20,
      paddingBottom: 44,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    title: {
      alignSelf: 'stretch',
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 29,
      letterSpacing,
      color: colorWelcomeTitle,
      textAlign: 'center',
    },
    profileCard: {
      alignSelf: 'stretch',
      height: 101,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 5,
      paddingRight: 20,
      paddingTop: 5,
      paddingBottom: 5,
      gap: 12,
      backgroundColor: colorBackground,
      borderRadius: 80,
      marginTop: 36,
      marginBottom: 25,
      shadowColor: colorShadow,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 1,
      shadowRadius: 6.05,
      elevation: 4,
      overflow: 'hidden',
    },
    profileImageContainer: {
      width: 93,
      minWidth: 93,
      height: 91,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 0,
      gap: 10,
      backgroundColor: colorBackground,
      borderRadius: 500,
      shadowColor: colorShadow,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.48,
      shadowRadius: 8.1,
      elevation: 4,
    },
    profileImage: {
      width: 93,
      height: 93,
      borderRadius: 500,
    },
    profileTextContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: 0,
      gap: 4,
      flex: 1,
      height: 57,
    },
    profileName: {
      alignSelf: 'stretch',
      height: 19,
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 19,
      letterSpacing,
      color: colorTextPrimary,
    },
    profileDescription: {
      alignSelf: 'stretch',
      height: 34,
      fontSize: 13,
      fontWeight: '400',
      lineHeight: 17,
      letterSpacing,
      color: colorWelcomeProfileDescription,
    },
    achievementsScrollView: {
      alignSelf: 'stretch',
      flex: 1,
    },
    achievementsScrollContent: {
      flexGrow: 1,
    },
    achievementsContainer: {
      alignSelf: 'stretch',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: 0,
      gap: 16,
    },
    achievementItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: 0,
      gap: 7,
      alignSelf: 'stretch',
    },
    starContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
      gap: 10,
      width: 15,
      height: 19,
      flexShrink: 0,
    },
    starIcon: {
      width: 15,
      height: 15,
    },
    achievementText1: {
      flex: 1,
      fontSize: 15,
      fontWeight: '600',
      lineHeight: 21,
      letterSpacing,
      color: colorWelcomeAchievement,
    },
    achievementText2: {
      flex: 1,
      fontSize: 15,
      fontWeight: '700',
      lineHeight: 21,
      letterSpacing,
      color: colorWelcomeAchievement,
    },
    buttonsContainer: {
      position: 'absolute',
      bottom: 40,
      left: 0,
      right: 0,
      paddingHorizontal: 16,
      paddingTop: 24,
      alignItems: 'center',
    },
    buttonsWrapper: {
      width: '100%',
      gap: 12,
    },
  });
  
  return (
    <>
      <View style={styles2.welcomeContent}>
        <Text style={styles2.title}>{t('welcome.page2.title')}</Text>
        <View style={styles2.profileCard}>
          <View style={styles2.profileImageContainer}>
            <Image
              source={require('../../assets/images/welcome2.png')}
              style={styles2.profileImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles2.profileTextContainer}>
            <Text style={styles2.profileName}>{t('welcome.page2.name')}</Text>
            <Text style={styles2.profileDescription}>{t('welcome.page2.role')}</Text>
          </View>
        </View>
        {/* <ScrollView
          style={styles2.achievementsScrollView}
          contentContainerStyle={styles2.achievementsScrollContent}
          showsVerticalScrollIndicator={false}
        > */}
          <View style={styles2.achievementsContainer}>
            <View style={styles2.achievementItem}>
              <View style={styles2.starContainer}>
                <Image
                  source={require('../../assets/images/asterisk_3x.png')}
                  style={styles2.starIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles2.achievementText1}>{t('welcome.page2.achievement1')}</Text>
            </View>
            <View style={styles2.achievementItem}>
              <View style={styles2.starContainer}>
                <Image
                  source={require('../../assets/images/asterisk_3x.png')}
                  style={styles2.starIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles2.achievementText2}>{t('welcome.page2.achievement2')}</Text>
            </View>
            <View style={styles2.achievementItem}>
              <View style={styles2.starContainer}>
                <Image
                  source={require('../../assets/images/asterisk_3x.png')}
                  style={styles2.starIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles2.achievementText2}>{t('welcome.page2.achievement3')}</Text>
            </View>
            <View style={styles2.achievementItem}>
              <View style={styles2.starContainer}>
                <Image
                  source={require('../../assets/images/asterisk_3x.png')}
                  style={styles2.starIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles2.achievementText2}>{t('welcome.page2.achievement4')}</Text>
            </View>
          </View>
        {/* </ScrollView> */}
      </View>
      {/* Navigation buttons */}
      <View style={[styles2.buttonsContainer, { bottom: insets.bottom + 12 }]}>
        <View style={styles2.buttonsWrapper}>
          <ButtonRed text={t('welcome.next')} onPress={onNext} />
          <ButtonWhite text={t('welcome.skip')} onPress={onSkip} />
        </View>
      </View>
    </>
  );
}

function Welcome3({ onNext, insets }: { onNext: () => void; insets: any }) {
  const { t } = useI18n();
  
  const styles3 = StyleSheet.create({
    welcomeContent: {
      alignSelf: 'stretch',
      alignItems: 'center',
      backgroundColor: colorPrimary,
      paddingHorizontal: 16,
      paddingBottom: 16,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    title: {
      alignSelf: 'stretch',
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 29,
      letterSpacing,
      color: colorWelcomeTitle,
      textAlign: 'center',
    },
    introText: {
      alignSelf: 'stretch',
      marginTop: 10,
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 21,
      letterSpacing,
      color: colorWelcomeDescription,
      textAlign: 'center',
      marginBottom: 12,
    },
    imageArea3: {
      alignSelf: 'stretch',    
      width: '100%',
      marginBottom: 12,
      aspectRatio: 345 / 200,
      overflow: 'hidden',
    },
    welcomeImage3: {
      width: '100%',
      height: '100%',
    },
    categoriesContainer: {
      alignSelf: 'stretch',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: 0,
      gap: 5,
      marginBottom: 16,
    },
    categoryButton: {
      alignSelf: 'stretch',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 16,
      paddingRight: 4,
      paddingTop: 0,
      paddingBottom: 0,
      height: 39,
      backgroundColor: colorWelcomeCategoryButton,
      borderWidth: 1,
      borderColor: colorWelcomeCategoryBorder,
      borderRadius: 20,
    },
    categoryText: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
      letterSpacing,
      color: colorWelcomeCategoryText,
      textAlign: 'left',
      flex: 1,
    },
    categoryIconContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0,
      gap: 10,
      width: 31,
      height: 31,
      backgroundColor: colorWelcomeCategoryIcon,
      borderRadius: 100,
      shadowColor: colorWelcomeIconShadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 4,
    },
    categoryArrow: {
      width: '30%',
      height: '30%',
    },
    buttonsContainer: {
      position: 'absolute',
      bottom: 40,
      left: 0,
      right: 0,
      paddingHorizontal: 16,
      paddingTop: 24,
      alignItems: 'center',
    },
    buttonsWrapper: {
      width: '100%',
      gap: 12,
    },
  });
  
  return (
    <>
      <View style={styles3.welcomeContent}>
        <Text style={styles3.title}>{t('welcome.page3.title')}</Text>
        <Text style={styles3.introText}>{t('welcome.page3.intro')}</Text>
        <View style={styles3.imageArea3}>
          <Image
            source={require('../../assets/images/welcome3_3x.png')}
            style={styles3.welcomeImage3}
            resizeMode="cover"
          />
        </View>
        <View style={styles3.categoriesContainer}>
          <Pressable style={styles3.categoryButton}>
            <Text style={styles3.categoryText}>{t('welcome.page3.category1')}</Text>
            <View style={styles3.categoryIconContainer}>
              <Image
                source={require('../../assets/images/arrow_3x.png')}
                style={styles3.categoryArrow}
                resizeMode="contain"
              />
            </View>
          </Pressable>
          <Pressable style={styles3.categoryButton}>
            <Text style={styles3.categoryText}>{t('welcome.page3.category2')}</Text>
            <View style={styles3.categoryIconContainer}>
              <Image
                source={require('../../assets/images/arrow_3x.png')}
                style={styles3.categoryArrow}
                resizeMode="contain"
              />
            </View>
          </Pressable>
          <Pressable style={styles3.categoryButton}>
            <Text style={styles3.categoryText}>{t('welcome.page3.category3')}</Text>
            <View style={styles3.categoryIconContainer}>
              <Image
                source={require('../../assets/images/arrow_3x.png')}
                style={styles3.categoryArrow}
                resizeMode="contain"
              />
            </View>
          </Pressable>
        </View>
      </View>
      {/* Navigation buttons */}
      <View style={[styles3.buttonsContainer, { bottom: insets.bottom + 12 }]}>
        <View style={styles3.buttonsWrapper}>
          <ButtonRed text={t('welcome.start.catalog')} onPress={onNext} />
        </View>
      </View>
    </>
  );
}

export function WelcomeScreen() {
  const [currentPage, setCurrentPage] = useState(0);
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const screenWidth = Dimensions.get('window').width;

  const handleNext = () => {
    if (currentPage < 2) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      scrollViewRef.current?.scrollTo({ x: nextPage * screenWidth, animated: true });
    } else {
      // Navigate to next screen (to be implemented)
    }
  };

  const handleSkip = () => {
    // Navigate to next screen (to be implemented)
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / screenWidth);
    setCurrentPage(page);
  };

  const screenHeight = Dimensions.get('window').height;
  const buttonHeight = 46;
  const buttonGap = 12;
  const buttonBottom = insets.bottom + 12;
  const minSpacing = 24;
  const buttonAreaTotalHeight = buttonHeight + buttonGap + buttonBottom + minSpacing;

  return (
    <View style={styles.container}>
      {/* Content section with colorPrimary background */}
      <View style={[
        styles.contentSection
      ]}>
        {/* Logo and Indicators - Fixed */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.indicators}>
          <View style={[styles.indicator, currentPage === 0 && styles.indicatorActive]} />
          <View style={[styles.indicator, currentPage === 1 && styles.indicatorActive]} />
          <View style={[styles.indicator, currentPage === 2 && styles.indicatorActive]} />
        </View>
      </View>

      {/* Welcome Content - Swipeable */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={[styles.welcomePage, { width: screenWidth }]}>
          <Welcome1 onNext={handleNext} onSkip={handleSkip} insets={insets} />
        </View>
        <View style={[styles.welcomePage, { width: screenWidth }]}>
          <Welcome2 onNext={handleNext} onSkip={handleSkip} insets={insets} />
        </View>
        <View style={[styles.welcomePage, { width: screenWidth }]}>
          <Welcome3 onNext={handleNext} insets={insets} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorWhite,
  },
  contentSection: {
    alignSelf: 'stretch',
    paddingTop: 54,
    backgroundColor: colorPrimary,
    alignItems: 'center',
    overflow: 'hidden',
  },
  contentSectionFlex: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexDirection: 'row',
  },
  welcomePage: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 19,
  },
  logoImage: {
    width: 94.47,
    height: 28,
  },
  indicators: {
    alignSelf: 'center',
    width: 180,
    height: 4,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 11,
    marginBottom: 28,
  },
  indicator: {
    flex: 1,
    height: 4,
    backgroundColor: colorWelcomeIndicatorInactive,
    borderRadius: 5,
  },
  indicatorActive: {
    backgroundColor: colorWelcomeIndicatorActive,
  },
});
