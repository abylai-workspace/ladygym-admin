import React, { ReactElement, isValidElement } from 'react';
import { Text, TextInput, View, StyleSheet, TextInputProps } from 'react-native';

interface CustomTextInputProps {
    label: string;
    icon?: ReactElement;
    value: string;
    error?: any;
    style?: any;
    onChange?: (value: string) => void;
}

export default function CustomTextInput({ label, icon, value, error, style, onChange, ...props }: CustomTextInputProps & TextInputProps) {
    return (
        <View style={[styles.containerField, style]}>
            {icon && isValidElement(icon) && icon}
            <Text style={styles.fieldTitle}>{label}</Text>
            <TextInput
                style={styles.field}
                onChangeText={onChange}
                value={value}
                {...props}
            />
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    containerField: {
        padding: 16,
        backgroundColor: '#FFF',
        borderRadius: 16,
        marginTop: 2,
        flexDirection: 'row',
    },
    fieldTitle: {
        flex: 1,
        opacity: 0.47,
        color:'gray'

    },
    field: {
        flex: 1,
        color: '#000',
    },
    error: {
        position: 'absolute',
        bottom: 5,
        left: 20,
        color: 'red',
        fontSize: 10
    }
})


