import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'
import * as ImagePicker from 'react-native-image-picker'

import { useTranslation } from 'react-i18next'
import { COLORS } from 'utils/colors'
interface UserPictureProps {
  value: any
  disabled: boolean
  onChange: (name: string, value: any) => void
}

export default function UserPicture({ value, disabled, onChange }: UserPictureProps) {
  const { t } = useTranslation();


  const onOpenImages = React.useCallback(() => {
    ImagePicker.launchImageLibrary({
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
      includeExtra: true,
      maxWidth: 64,
      maxHeight: 64,
      quality: 0.7,
    })
      .then((response) => {
        if (response?.assets?.length) {
          const assets = response.assets[0]
          onChange('avatar', `data:${assets?.type};base64,${assets?.base64}`)
        }
      })
      .catch((err) => {
        console.error('[ImagePicker] error', err)
      })
  }, [])

  const source = { uri: value as string }

  return (
    <TouchableOpacity activeOpacity={0.5} disabled={disabled} onPress={onOpenImages}>
      {value ? (
        <Image source={source} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.avatarBorder]}>
          <Text style={styles.text}>{t('Profile.ChoosePhoto')}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  avatar: {
    marginTop: Platform.OS === 'android' ? 5 : 0,
    marginRight: 16,
    width: 116,
    height: 116,
    borderRadius: 18,
    justifyContent: 'center',
  },
  avatarBorder: {
    paddingHorizontal: 15,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  text: {
    position: 'absolute',
    alignSelf: 'center',
    color: 'white',
    fontWeight: '400',
    fontFamily: 'Manrope',
    textAlign: 'center',
    fontSize: 16
  }
})
