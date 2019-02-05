import React from 'react'
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TouchableWithoutFeedback,
	TextInput,
	Keyboard,
	KeyboardAvoidingView,
	ScrollView,
	Dimensions,
	LayoutAnimation,
	NativeModules,
} from 'react-native'

const { UIManager } = NativeModules

const WIDTH = Dimensions.get('window').width

UIManager.setLayoutAnimationEnabledExperimental &&
	UIManager.setLayoutAnimationEnabledExperimental(true)

const CustomLayoutAnimation = {
	duration: 300,
	create: {
		type: LayoutAnimation.Types.linear,
		property: LayoutAnimation.Properties.opacity,
	},
	update: {
		type: LayoutAnimation.Types.linear,
		property: LayoutAnimation.Properties.opacity,
	},
	delete: {
		duration: 300,
		type: LayoutAnimation.Types.linear,
		property: LayoutAnimation.Properties.opacity,
	},
}

export default class App extends React.Component {
	constructor() {
		super()

		this.state = {
			isLogin: true,
		}
	}

	componentDidMount() {
		this._keyboardDidShowSub = Keyboard.addListener(
			'keyboardDidShow',
			event => {
				setTimeout(() => {
					if (this.state.isLogin) {
						this._scrollView.scrollTo({ y: 20, animated: true })
					} else {
						this._scrollView.scrollToEnd({ animated: true })
					}
				}, 100)
			}
		)
	}

	componentWillUnmount() {
		this._keyboardDidShow.remove()
	}

	_onPressLogin = () => {
		if (!this.state.isLogin) {
			Keyboard.dismiss()
			LayoutAnimation.configureNext(CustomLayoutAnimation)
			this.setState({ isLogin: true })
		}
	}

	_onPresssignup = () => {
		if (this.state.isLogin) {
			Keyboard.dismiss()
			LayoutAnimation.configureNext(CustomLayoutAnimation)
			this.setState({ isLogin: false })
		}
	}

	_renderSwitcher() {
		return (
			<View style={styles.switcherContainer}>
				<TouchableOpacity
					style={[
						styles.switcherButton,
						this.state.isLogin
							? { backgroundColor: '#3CB371' }
							: { backgroundColor: '#808080' },
					]}
					onPress={this._onPressLogin}
				>
					<Text
						style={[
							styles.switcherButtonText,
							this.state.isLogin ? { color: '#FFF' } : { color: '#A9A9A9' },
						]}
					>
						Log In
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.switcherButton,
						this.state.isLogin
							? { backgroundColor: '#808080' }
							: { backgroundColor: '#3CB371' },
					]}
					onPress={this._onPresssignup}
				>
					<Text
						style={[
							styles.switcherButtonText,
							this.state.isLogin ? { color: '#A9A9A9' } : { color: '#FFF' },
						]}
					>
						Sign Up
					</Text>
				</TouchableOpacity>
			</View>
		)
	}

	_renderForm() {
		return (
			<View style={styles.formList}>
				{this.state.isLogin && (
					<View style={styles.formContainer}>
						<View style={styles.formLabelContainer}>
							<Text style={styles.formLabelText}>Welcome Back!</Text>
						</View>
						<View style={styles.formInputContainer}>
							<TextInput
								placeholder="Email Adress"
								style={styles.formInput}
								autoFocus={false}
							/>
						</View>
						<View style={styles.formInputContainer}>
							<TextInput
								placeholder="Password"
								style={styles.formInput}
								autoFocus={false}
							/>
						</View>
						<View style={{ paddingTop: 50 }}>
							<TouchableOpacity onPress={() => {}} style={styles.formButton}>
								<Text style={styles.formButtonText}>LOG IN</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
				<View style={styles.formContainer}>
					<View style={styles.formLabelContainer}>
						<Text style={styles.formLabelText}>Sign Up for Free</Text>
					</View>
					<View style={styles.formInputContainer}>
						<TextInput
							placeholder="First Name"
							style={styles.formInput}
							autoFocus={false}
						/>
					</View>
					<View style={styles.formInputContainer}>
						<TextInput
							placeholder="Last Name"
							style={styles.formInput}
							autoFocus={false}
						/>
					</View>
					<View style={styles.formInputContainer}>
						<TextInput
							placeholder="Email Adress"
							style={styles.formInput}
							autoFocus={false}
						/>
					</View>
					<View style={styles.formInputContainer}>
						<TextInput
							placeholder="Password"
							style={styles.formInput}
							autoFocus={false}
						/>
					</View>
					<View style={{ paddingTop: 50 }}>
						<TouchableOpacity onPress={() => {}} style={styles.formButton}>
							<Text style={styles.formButtonText}>JOIN US</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		)
	}

	render() {
		return (
			<KeyboardAvoidingView
				behavior="padding"
				keyboardVerticalOffset={5}
				style={{ flex: 1, backgroundColor: '#13222C' }}
			>
				<ScrollView
					keyboardShouldPersistTaps="always"
					ref={ref => (this._scrollView = ref)}
				>
					<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
						<View style={styles.container}>
							{this._renderSwitcher()}
							{this._renderForm()}
						</View>
					</TouchableWithoutFeedback>
				</ScrollView>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#13222C',
		paddingHorizontal: 20,
		paddingTop: 40,
	},
	switcherContainer: {
		flexDirection: 'row',
	},
	switcherButton: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '50%',
		paddingVertical: 10,
	},
	switcherButtonText: {
		fontSize: 24,
	},
	formLabelContainer: {
		paddingVertical: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},
	formLabelText: {
		fontSize: 30,
		color: '#FFF',
	},
	formList: {
		flexDirection: 'row',
		width: WIDTH,
	},
	formContainer: {
		width: WIDTH,
		justifyContent: 'flex-start',
		paddingHorizontal: 20,
	},
	formInputContainer: {
		paddingVertical: 10,
	},
	formInput: {
		borderColor: '#FFF',
		borderWidth: 1,
		paddingVertical: 5,
		paddingHorizontal: 10,
	},
	formButton: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		paddingVertical: 10,
		backgroundColor: '#3CB371',
	},
	formButtonText: {
		fontSize: 24,
		color: '#FFF',
	},
})
