import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    Text,
} from 'react-native';
import { VARIABLES } from '../../../utils/variables';
import { COLORS } from '../../../utils/colors';


import Feather from 'react-native-vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dateFormat from 'dateformat';
import { placeholder } from 'i18n-js';




interface IProps{
    icon?:any;
    title?:string;
    value?:string;
    mask?:string;
    onChangeText?:()=>void;
    onBlur?:()=>void;
    onFocus?:()=>void;
    style?:any;
    inputStyle?:any;
    disabled?:boolean;
    inputProps?:any;
    error?:any;
    placeholder?:string;
}
const Input = React.forwardRef(
    (
        {
            icon = null,
            title,
            value,
            mask,
            onChangeText,
            onBlur = () => {},
            style,
            inputStyle,
            disabled = false,
            inputProps = {},
            error = null,
            placeholder,
            onFocus
        }: IProps,
        ref
    ) => {
        const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
        const [isFocus, setIsFocus] = useState(false);
        
        const showDatePicker = () => {
            setDatePickerVisibility(true);
        };

        const hideDatePicker = () => {
            setDatePickerVisibility(false);
        };

        const confirmDatePicker = (date) => {
            if (onChangeText) {
                onChangeText(dateFormat(date, 'dd.mm.yyyy'));
            }
            hideDatePicker();
        };

        // const getDate = React.useCallback(
        //     () =>
        //         value && value.length === 10
        //             ? new Date(value.split('.').reverse())
        //             : new Date(),
        //     [value]
        // );

        return (
            <>
                <View style={[styles.wrap, title && { marginTop: 30 }, style]}>
                    {title && <Text style={styles.title}>{title}</Text>}
                    {icon && <Image source={icon} style={styles.icon} />}
                    <TextInput
                        ref={ref}
                        placeholderTextColor={COLORS.lightGray}
                        placeholder={placeholder}
                        {...inputProps}
                        style={{
                            ...styles.input,
                            ...(isFocus && { borderColor: COLORS.textBlue }),
                            ...(error && { borderColor: COLORS.red }),
                            ...(inputProps?.multiline && {
                                borderRadius: 24,
                                minHeight: 100,
                            }),
                            ...inputStyle,
                        }}
                        value={value}
                        onChangeText={onChangeText}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        editable={!disabled}
                    />
                    {inputProps?.type === 'date' && (
                        <>
                            <TouchableOpacity
                                disabled={disabled}
                                onPress={showDatePicker}
                                style={styles.dateIcon}
                            >
                                <Feather
                                    name="calendar"
                                    size={24}
                                    color={COLORS.textBlue}
                                />
                            </TouchableOpacity>
                            <DateTimePickerModal
                                date={new Date()}
                                minimumDate={
                                    typeof inputProps?.minimumDate !==
                                    'undefined'
                                        ? inputProps?.minimumDate
                                        : new Date()
                                }
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={confirmDatePicker}
                                onCancel={hideDatePicker}
                            />
                        </>
                    )}
                </View>
                {error && <Text>{error}</Text>}
            </>
        );
    }
);

const styles = StyleSheet.create({
    wrap: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        padding: 0,
        fontSize: VARIABLES.fs3,
        color: COLORS.white,
        paddingHorizontal: 20,
        paddingVertical: 5,
        height: 60,
        borderRadius: 10,
        backgroundColor: 'rgb(84, 84, 84)',
        textAlign: 'center',
    },
    icon: {
        height: 16,
        width: 16,
        resizeMode: 'contain',
        marginRight: 15,
    },
    title: {
        position: 'absolute',
        left: 0,
        bottom: '100%',
        fontSize: VARIABLES.fs1,
        color: COLORS.text,
        marginBottom: 5,
        marginLeft: 20,
        textAlign: 'center',
    },
    dateIcon: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 22,
    },
});



export default Input;
