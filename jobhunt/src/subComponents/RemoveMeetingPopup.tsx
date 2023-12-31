import React, {SetStateAction, useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Spacer from '../atoms/Spacer';
import Popup from '../atoms/Popup';
import TertiaryButton from '../atoms/TertiaryButton';
import PrimaryButton from '../atoms/PrimaryButton';
import ThemeConfig from '../theme';
import {useIsDesktop} from '../utils/common';

interface RemoveMeetingPopupProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<SetStateAction<boolean>>;
  removeUserFromMeeting: () => void;
  username: string;
}
const RemoveMeetingPopup = (props: RemoveMeetingPopupProps) => {
  const isDesktop = useIsDesktop()('popup');
  const removeMeetingLabelHeading = 'Remove ' + props.username + '?';
  const removeMeetingLabelSubHeading = `Once removed, ${props.username} will still be able to rejoin the room later.`;

  const cancelBtnLabel = 'CANCEL';
  const removeBtnLabel = 'REMOVE';
  return (
    <Popup
      modalVisible={props.modalVisible}
      setModalVisible={props.setModalVisible}
      showCloseIcon={false}
      contentContainerStyle={styles.contentContainer}>
      <Text style={styles.heading}>{removeMeetingLabelHeading}</Text>
      <Spacer size={8} />
      <Text style={styles.subHeading}>{removeMeetingLabelSubHeading}</Text>
      <Spacer size={32} />
      <View style={isDesktop ? styles.btnContainer : styles.btnContainerMobile}>
        <View style={isDesktop && {flex: 1}}>
          <TertiaryButton
            containerStyle={{
              width: '100%',
              height: 48,
              paddingVertical: 12,
              paddingHorizontal: 12,
              borderRadius: ThemeConfig.BorderRadius.medium,
            }}
            textStyle={styles.btnText}
            text={cancelBtnLabel}
            onPress={() => props.setModalVisible(false)}
          />
        </View>
        <Spacer
          size={isDesktop ? 10 : 20}
          horizontal={isDesktop ? true : false}
        />
        <View style={isDesktop && {flex: 1}}>
          <PrimaryButton
            containerStyle={{
              minWidth: 'auto',
              width: '100%',
              borderRadius: ThemeConfig.BorderRadius.medium,
              height: 48,
              backgroundColor: $config.SEMANTIC_ERROR,
              paddingVertical: 12,
              paddingHorizontal: 12,
            }}
            textStyle={styles.btnText}
            text={removeBtnLabel}
            onPress={() => {
              props.removeUserFromMeeting();
              props.setModalVisible(false);
            }}
          />
        </View>
      </View>
    </Popup>
  );
};

export default RemoveMeetingPopup;

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 24,
    maxWidth: 342,
  },
  btnText: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  btnContainerMobile: {
    flexDirection: 'column-reverse',
  },
  heading: {
    fontFamily: ThemeConfig.FontFamily.sansPro,
    fontWeight: '600',
    fontSize: 22,
    color: $config.SEMANTIC_ERROR,
  },
  subHeading: {
    fontFamily: ThemeConfig.FontFamily.sansPro,
    fontWeight: '400',
    fontSize: 14,
    color: $config.FONT_COLOR,
  },
});
