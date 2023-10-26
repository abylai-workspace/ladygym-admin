import React, { ReactElement, isValidElement } from 'react';
import { Text, Switch, View, StyleSheet, SwitchProps } from 'react-native';

interface CustomSwitchProps {
    label?: string;
    value: boolean;
    icon?: ReactElement;
    style?: any;
    onChange?: (value: boolean) => void;
}

export default function CustomSwitch({ label, icon, value, style, onChange, ...props }: CustomSwitchProps & SwitchProps) {
    return (
        <View style={[styles.container, style]}>
            {/* {icon && isValidElement(icon) && icon}
            <Text style={styles.fieldTitle}>{label}</Text> */}
            <Switch
                style={styles.field}
                trackColor={{ false: '#858a8e', true: '#3650fe' }}
                onValueChange={onChange}
                value={value}
                {...props}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        // backgroundColor: '#FFF',
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
        transform: [{ scaleX: .9 }, { scaleY: .9 }],
        height: 28,
        width: 48
    }
})



