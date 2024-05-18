import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

const Button = (props) => {
    const { title, onPress, isLoading, backgroundColor } = props; // Destructure props

    return (
        <TouchableOpacity
            style={{
                ...styles.btn,
                backgroundColor: backgroundColor || COLORS.primary, // Apply custom background color or use default primary color
                ...props.style,
            }}
            onPress={onPress}
        >
            {isLoading && isLoading == true ? (
                <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
                <Text style={{ ...FONTS.body2, color: COLORS.white }}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding,
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: SIZES.padding,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Button;
