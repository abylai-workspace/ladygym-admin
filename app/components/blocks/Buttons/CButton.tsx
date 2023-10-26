import React, { ReactElement, isValidElement } from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

interface CustomButtonProps {
    label: string;
    variant: 'success' | 'warning' | 'danger' | 'fill' | 'outline';
    disabled?: boolean;
    loading?: boolean;
    icon?: ReactElement;
    iconPosition?: 'left' | 'right';
    style?: any;
    onPress: () => void;
}

export default function CButton({
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
                variant === 'success' && styles.buttonSucceed
            ]}
            onPress={onPress}
        >
            {iconPosition === 'left' && icon && isValidElement(icon) && icon}
            <Text style={[
                styles.buttonLabel,
                style?.title,
                variant === 'fill' && styles.buttonLabelFill,
                variant === 'outline' && styles.buttonLabelOutline,
                variant === 'success' && styles.buttonSucceed
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
        borderRadius: 5,
        height: 25,
       textAlign:'right',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    buttonSucceed: {
        backgroundColor: 'green',
    },
    buttonFill: {
        backgroundColor: 'green'
    },
    buttonOutline: {
        borderWidth: 1,
        borderColor: '#FFF',
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


