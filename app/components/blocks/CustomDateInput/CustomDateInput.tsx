import React, { ReactElement, isValidElement, useState } from 'react';
import { Text, View, StyleSheet, TextInputProps, TextInput, Pressable } from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

interface CustomSwitchProps {
    label: string;
    datePickerLabel?: string;
    value: string;
    error?: any;
    icon?: ReactElement;
    style?: any;
    onChange?: (value: string) => void;
}

export default function CustomDateInput({ label, datePickerLabel, icon, value, error, style, onChange, ...props }: CustomSwitchProps & TextInputProps) {
    const [open, setOpen] = useState(false);

    return (
        <Pressable style={[styles.container, style]} onPress={() => setOpen(true)}>
            {icon && isValidElement(icon) && icon}
            <Text style={styles.fieldTitle}>{label}</Text>
            <Pressable onPress={() => setOpen(true)}>
                <TextInput
                    style={styles.field}
                    value={value}
                    editable={false}
                    onPressIn={() => setOpen(true)}
                    {...props}
                />
            </Pressable>
            <DatePicker
                modal
                title={datePickerLabel}
                mode='date'
                open={open}
                date={new Date()}
                onConfirm={(date) => {
                    setOpen(false);
                    onChange && onChange(moment(date).format('DD-MM-YYYY'));
                }}
                onCancel={() => {
                    setOpen(false)
                }}
                
            />
            {error && <Text style={styles.error}>{error}</Text>}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.4)',
        borderWidth: 1,
        borderRadius: 16,
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    fieldTitle: {
        flex: 1,
        opacity: 0.47,
        color:'gray'
    },
    field: {
        flex: 1,
        color: '#fff',
        top: 5,
        marginTop: -5
    },
    error: {
        position: 'absolute',
        bottom: 5,
        left: 20,
        color: 'red',
        fontSize: 10
    }
})


