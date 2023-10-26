import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const StarRating = (props) => {

    // This array will contain our star tags. We will include this
    // array between the view tag.
    let stars = [];
    // Loop 5 times
    for (var i = 1; i <= 5; i++) {
        // set the path to filled stars
        let name = 'star' as never;
        // If ratings is lower, set the path to unfilled stars
        if (i > props.ratings) {
            name = 'star-outline' as never;
        }

        stars.push((<Ionicons name={name as never} size={15} style={styles.star} key={i as never} /> as never));
    }

    return (
        <View style={ styles.container }>
            { stars }
            <Text style={[styles.text,props.styles]}>{props.reviews}</Text>
        </View>
    );
	
}

export default StarRating;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	star: {
		color: 'rgba(207, 84, 144, 1)'
	},
	text: {
		fontSize: 12,
        marginLeft: 5,
        color: '#444',
	}
});