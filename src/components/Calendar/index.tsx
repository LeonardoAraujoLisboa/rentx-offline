import React from 'react';
import {Calendar as CustomCalendar, LocaleConfig, CalendarProps} from 'react-native-calendars'
import {Feather} from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { ptBR } from './localeConfig';

export interface DayProps {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
}

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

const Calendar = ({markedDates, onDayPress}: CalendarProps) => {
    const theme = useTheme()

    return (
        <CustomCalendar 
            renderArrow={(direction) => 
            <Feather name={direction === 'left' ? 'chevron-left' : 'chevron-right'} size={RFValue(24)} color={theme.colors.text} />
        }

            headerStyle={{
                backgroundColor: theme.colors.background_secondary, borderBottomWidth: 0.5, borderBottomColor: theme.colors.text_detail, paddingBottom: 10, marginBottom: 10
            }}

            theme={{
                textDayFontFamily: theme.fonts.primary_400,
                textDayFontSize: 15,
                dayTextColor: theme.colors.title,
                textMonthFontFamily: theme.fonts.secundary_600,
                textMonthFontSize: 20,
                monthTextColor: theme.colors.title,
                textDayHeaderFontFamily: theme.fonts.secundary_600,
                textDayHeaderFontSize: 10,
                arrowStyle: {
                    marginHorizontal: -15
                }
            }}

            firstDay={1}
            minDate={`${new Date()}`}
            markingType="period"
            markedDates={markedDates}
            onDayPress={onDayPress}
        />
    );
}

export default Calendar;