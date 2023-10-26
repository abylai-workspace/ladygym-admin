import React from 'react'
import { Text, TextInput, View, StyleSheet } from 'react-native'

interface UserInfoProps {
    values: Record<string, string | boolean>;
    errors: any;
    touched: any;
    onChange: any;
    onBlur: any;
}

export default function UserInfo({ values, errors, touched, onChange, onBlur }: UserInfoProps) {
    return (
        <View style={styles.userInfo}>
            <View style={{ marginBottom: 8 }}>
                <Text style={{ opacity: 0.3, fontSize: 12,color: '#000' }}>Name</Text>
                <TextInput
                    value={values.name as string}
                    onChangeText={onChange('name')}
                    style={styles.field}
                    placeholder='Name'
                    onBlur={()=>onBlur('name')}
                />
                {touched.name && errors?.name && <Text style={styles.error}>{errors.name}</Text>}
            </View>
            <View>
                <Text style={{ opacity: 0.3, fontSize: 12,color:'gray' }}>Surname</Text>
                <TextInput
                    value={values.surname as string}
                    onChangeText={onChange('surname')}
                    defaultValue='Konstantinople'
                    style={styles.field}
                    placeholder='Surname'
                    onBlur={()=>onBlur('surname')}
                />
                {touched?.suname && errors?.suname && <Text style={styles.error}>{errors.suname}</Text>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    userInfo: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
    },
    field: {
        fontSize: 16,
        paddingVertical: 0,
        color: '#000',
        fontWeight:'500'
    },
    error: {
        color: 'red',
        fontSize: 10
    }
})
