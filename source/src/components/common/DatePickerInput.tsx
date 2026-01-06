import React, { useMemo, useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, View } from 'react-native';
import { colorBackground, colorBorder, colorPrimary, colorShadow, colorTextPlaceholder, colorTextPrimary, colorTextSecondary } from '../../constants/colors';
import { Text } from './Text';
import { Language, useI18n } from '../../i18n';

export interface DatePickerInputProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

type CalendarCell = {
  key: string;
  day: number;
  monthOffset: -1 | 0 | 1;
};

const MONTH_NAMES: Record<Language, string[]> = {
  ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

const WEEK_DAYS: Record<Language, string[]> = {
  ru: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
  en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
};

const formatDate = (date: Date) => {
  const day = `${date.getDate()}`.padStart(2, '0');
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const parseDate = (value?: string) => {
  if (!value) {
    return null;
  }
  const parts = value.split('.');
  if (parts.length !== 3) {
    return null;
  }
  const [day, month, year] = parts.map((p) => Number(p));
  if (!day || !month || !year) {
    return null;
  }
  const parsed = new Date(year, month - 1, day);
  if (parsed.getFullYear() !== year || parsed.getMonth() !== month - 1 || parsed.getDate() !== day) {
    return null;
  }
  return parsed;
};

const buildCalendar = (date: Date): CalendarCell[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const startWeekday = (firstDay.getDay() + 6) % 7; // Monday start
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: CalendarCell[] = [];

  for (let i = 0; i < startWeekday; i++) {
    const day = daysInPrevMonth - startWeekday + i + 1;
    cells.push({ key: `p-${day}`, day, monthOffset: -1 });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ key: `c-${d}`, day: d, monthOffset: 0 });
  }

  const nextDays = 42 - cells.length;
  for (let d = 1; d <= nextDays; d++) {
    cells.push({ key: `n-${d}`, day: d, monthOffset: 1 });
  }

  return cells;
};

export function DatePickerInput({ value, onChange, placeholder = '14.01.1999' }: DatePickerInputProps) {
  const { language } = useI18n();
  const initial = parseDate(value) ?? new Date();
  const [visible, setVisible] = useState(false);
  const [cursorDate, setCursorDate] = useState<Date>(initial);

  const selectedDate = useMemo(() => parseDate(value), [value]);

  const calendarCells = useMemo(() => buildCalendar(cursorDate), [cursorDate]);

  const handleSelect = (cell: CalendarCell) => {
    const base = new Date(cursorDate);
    const target = new Date(base.getFullYear(), base.getMonth() + cell.monthOffset, cell.day);
    setCursorDate(target);
    if (onChange) {
      onChange(formatDate(target));
    }
    setVisible(false);
  };

  const goToPrevMonth = () => {
    setCursorDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCursorDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const renderValue = () => {
    if (value) {
      return <Text style={styles.valueText}>{value}</Text>;
    }
    return <Text style={styles.placeholder}>{placeholder}</Text>;
  };

  return (
    <>
      <Pressable style={styles.container} onPress={() => setVisible(true)}>
        <Image
          source={require('../../assets/images/calendar_3x.png')}
          style={styles.icon}
          resizeMode="contain"
        />
        {renderValue()}
      </Pressable>

      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Pressable style={styles.navButton} onPress={goToPrevMonth}>
                <Text style={styles.navText}>{'<'}</Text>
              </Pressable>
            <Text style={styles.monthLabel}>
                {MONTH_NAMES[language][cursorDate.getMonth()]} {cursorDate.getFullYear()}
              </Text>
              <Pressable style={styles.navButton} onPress={goToNextMonth}>
                <Text style={styles.navText}>{'>'}</Text>
              </Pressable>
            </View>

            <View style={styles.weekRow}>
              {WEEK_DAYS[language].map((day) => (
                <Text key={day} style={styles.weekDay}>
                  {day}
                </Text>
              ))}
            </View>

            <View style={styles.daysGrid}>
              {calendarCells.map((cell) => {
                const cellDate = new Date(cursorDate.getFullYear(), cursorDate.getMonth() + cell.monthOffset, cell.day);
                const isSelected =
                  selectedDate &&
                  cellDate.getFullYear() === selectedDate.getFullYear() &&
                  cellDate.getMonth() === selectedDate.getMonth() &&
                  cellDate.getDate() === selectedDate.getDate();

                const isCurrentMonth = cell.monthOffset === 0;

                return (
                  <Pressable
                    key={cell.key}
                    style={[
                      styles.dayCell,
                      isSelected && styles.dayCellSelected,
                      !isCurrentMonth && styles.dayCellOutside,
                    ]}
                    onPress={() => handleSelect(cell)}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        !isCurrentMonth && styles.dayTextOutside,
                        isSelected && styles.dayTextSelected,
                      ]}
                    >
                      {cell.day}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 10,
    width: '100%',
    height: 54,
    backgroundColor: colorBackground,
    borderWidth: 1,
    borderColor: colorBorder,
    borderRadius: 13,
    shadowColor: colorShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  icon: {
    width: 14,
    height: 14,
  },
  placeholder: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: -0.408,
    color: colorTextPlaceholder,
  },
  valueText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: -0.408,
    color: colorTextPrimary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    backgroundColor: colorBackground,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    shadowColor: colorShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colorBorder,
  },
  navText: {
    fontSize: 16,
    color: colorTextPrimary,
  },
  monthLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colorTextPrimary,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekDay: {
    width: `${100 / 7}%`,
    textAlign: 'center',
    fontSize: 12,
    color: colorTextSecondary,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayCell: {
    width: `${100 / 7 - 1}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    borderRadius: 8,
  },
  dayCellSelected: {
    backgroundColor: colorPrimary,
  },
  dayCellOutside: {
    opacity: 0.5,
  },
  dayText: {
    fontSize: 14,
    color: colorTextPrimary,
  },
  dayTextOutside: {
    color: colorTextSecondary,
  },
  dayTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

