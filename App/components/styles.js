import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight;
const slideWidth = wp(75);

export const sliderWidth = viewportWidth;
export const itemHorizontalMargin = wp(4);
export const itemWidth = slideWidth + itemHorizontalMargin;

const entryBorderRadius = 8;

export default StyleSheet.create({
	tabContent: {
		flex: 1,
		alignItems: 'center'
	},
  text: {
    flex: .2
  },
	tabText: {
		color: 'white',
		margin: 50,
	},
	toolbar: {
		backgroundColor: '#E9EAED',
		height: 56,
	},
	profileBox: {
		backgroundColor: "white",
		flex: 1,
		borderStyle: 'solid',
		alignItems: 'center',
		justifyContent: 'center'
	},
	socialStatus: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 10,
		marginBottom: 0,
	  height: 0
	},
	innerbox: {
		flex: 1,
		flexDirection: 'column'
	},
	circle: {
	height: 60, width: 60, borderRadius: 30,
	alignItems: 'center',
	justifyContent: 'center'
	},
	textInCicle:{
		fontSize: 15,
		color: 'white',
		backgroundColor: "transparent",
	},
	bottomProfileContainer: {
		flex: 1, backgroundColor: "red", borderStyle: 'solid', flexDirection: 'row'
	},
	slide1top: {
		flex: 1, backgroundColor: "red", borderStyle: 'solid', flexDirection: 'column', justifyContent: 'center'
	},
	slide1bottom: {
		flex: 2, backgroundColor: "red", borderStyle: 'solid', flexDirection: 'column', justifyContent: 'flex-end'
	},
	slidepicture: {
	 backgroundColor: "purple", flexDirection: 'column', height: 90, width: 145, margin: 5
 },


  detaileventbox: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center'
  }

});
