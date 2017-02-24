import React, { Component, PropTypes } from 'react';
import { Dimensions, PixelRatio, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import theme from '../../../../theme';
import { lighten } from '../../../../utils/color';
import { TalkStatusBar } from '../Talk';

const gradientSteps = 14;
const gradientJump = 1.05;

export default class Break extends Component {
	render () {
		const { endTime, startTime, status } = this.props;

		return (
			<View style={[styles.base, styles['base__' + status]]}>
				<TalkStatusBar status={status} />
				<LinearGradient
					start={{ x: 0.0, y: 0.0 }}
					end={{ x: 1.0, y: 0.125 }}
					locations={generateGradientLocations(gradientSteps)}
					colors={generateGradientColors(gradientSteps)}
					style={styles.gradient}
					>
					<Text style={[styles.text, styles['text__' + status]]}>
						{startTime}&mdash;{endTime} Break
					</Text>
				</LinearGradient>
			</View>
		);
	}
};

Break.propTypes = {
	endTime: PropTypes.string,
	startTime: PropTypes.string,
	status: PropTypes.oneOf(['future', 'past', 'present']),
};

function generateGradientLocations (steps) {
	let locations = [];

	const smallWidth = 0.005;

	for (let i = 0; i < steps; i++) {
		const start = gradientJump / steps * i;
		const end = gradientJump / steps * (i + 1);

		locations.push(start); // big start
		locations.push(end - smallWidth); // big end
		locations.push(end - smallWidth); // small start
		locations.push(end); // small end
	}

	return locations;
};
function generateGradientColors (steps) {
	const { sceneBg, gray10} = theme.color;
	let colors = [];

	for (let i = 0; i < steps; i++) {
		colors.push('white');
		colors.push('white');
		colors.push(gray10);
		colors.push(gray10);
	}

	return colors;
};

const styles = StyleSheet.create({
	base: {
		alignItems: 'stretch',
		backgroundColor: 'white',
		flexDirection: 'row',
	},
	gradient: {
		alignItems: 'center',
		backgroundColor: 'white',
		flexGrow: 1,
		height: 44,
		left: theme.fontSize.default,
		justifyContent: 'center',
	},
	text: {
		backgroundColor: 'transparent',
		color: theme.color.text,
		fontSize: theme.fontSize.small,
		fontWeight: '300',
		left: -theme.fontSize.default,
	},
	text__past: {
		color: theme.color.gray40,
	},
});