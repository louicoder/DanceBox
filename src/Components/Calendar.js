import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import styles from './Styles';
import moment from 'moment';

export default ({
  externalStyles,
  hideModal,
  isVisible,
  closeModal,
  opacity,
  backdropPress = true,
  date,
  setDate,
  ...rest
}) => {
  return (
    <Modal
      style={[ {} ]}
      isVisible={isVisible}
      backdropOpacity={opacity || 0.8}
      animationIn="fadeIn"
      animationInTiming={350}
      animationOut="fadeOut"
      animationOutTiming={100}
      onBackdropPress={closeModal}
      backdropTransitionOutTiming={0}
      // propagateSwipe
      // coverScreen
      swipeDirection={[ 'down' ]}
      swipeThreshold={20}
      onSwipeComplete={closeModal}
      hideModalContentWhileAnimating
      // onswi
      onBackButtonPress={closeModal}
      onModalHide={hideModal}
      // hasBackdrop={false}
      useNativeDriver
    >
      <Calendar
        current={moment(date).format('YYYY-MM-DD')}
        minDate={moment(new Date()).format('YYYY-MM-DD')}
        enableSwipeMonths={true}
        onDayPress={({ dateString }) => setDate(dateString)}
        markedDates={{ [moment(date).format('YYYY-MM-DD')]: { selected: true } }}
      />
    </Modal>
  );
};
