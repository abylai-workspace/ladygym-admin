import React, { ReactElement, isValidElement } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from 'utils/colors';

interface CustomButtonProps {
    label: string;
    variant: 'fill' | 'outline' |'default' | 'disable' |'deleted';
    disabled?: boolean;
    loading?: boolean;
    icon?: ReactElement;
    iconPosition?: 'left' | 'right';
    style?: any;
    onPress: () => void;
}

export default function CustomButton({
    label,
    variant,
    disabled,
    loading,
    icon,
    iconPosition = 'right',
    style,
    onPress
}: CustomButtonProps) {
    return (
        <TouchableOpacity
            disabled={disabled || loading}
            style={[
                styles.button,
                style,
                variant === 'fill' && styles.buttonFill,
                variant === 'outline' && styles.buttonOutline,
                variant === 'default' && styles.buttondDefault,
                variant==='disable' && styles.buttonDisable,
                variant=='deleted' && styles.buttonDeleted
            ]}
            onPress={onPress}
        >
            {iconPosition === 'left' && icon && isValidElement(icon) && icon}
            <Text style={[
                styles.buttonLabel,
                style?.title,
                variant === 'fill' && styles.buttonLabelFill,
                variant === 'outline' && styles.buttonLabelOutline,
                variant === 'default' && styles.buttonDefaultText,
                variant === 'disable' && styles.buttonDisableText,
                variant === 'deleted' && styles.buttonDeletedText
            ]}
            >
                {label}
            </Text>
            {iconPosition === 'right' && icon && isValidElement(icon) && icon}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 26,
        height: 50,
        marginLeft:5,
        marginRight:5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // marginVertical: 22,
        // paddingVertical: 8,
        paddingHorizontal: 20,
    },
    buttonFill: {
        backgroundColor: '#CF5490'
    },
    buttonDeleted:{
        backgroundColor:'rgba(255, 255, 255, 0.2)',
        borderColor:COLORS.LADY_GYB_BACKGROUND,
        borderWidth:1
    },
    buttonDeletedText:{
        color:COLORS.LADY_GYB_BACKGROUND
    },
    buttonOutline: {
        borderWidth: 1,
        borderColor: '#000',
    },
    buttonDisable:{backgroundColor:'rgba(255, 255, 255, 0.2)'},
    buttonDisableText:{
color:'rgba(255, 255, 255, 0.2)'
    },
    buttondDefault:{
backgroundColor:'#FFF',

    },
    buttonDefaultText:{
color:'#3651FE'
    },
    buttonLabel: {
        fontSize: 13,
        fontWeight: '700',
        // textTransform: 'uppercase',
    },
    buttonLabelFill: {
        color: '#fff',
    },
    buttonLabelOutline: {
        color: '#FFF',
    }
})


