import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Formik } from 'formik'

const PasswordSchema = Yup.object().shape({
	passwordLength: Yup.number()
		.min(4, "Lenght should be Atleast 4")
		.max(16, "Length should not be more then 16")
		.required("Length is required")
})



export default function App() {

	const [password, setPassword] = useState("")
	const [isPasswordGenerated, setIsPasswordGenerated] = useState(false)
	const [lowerCase, useLowerCase] = useState(true)
	const [upperCase, useUpperCase] = useState(false)
	const [symbols, useSymbols] = useState(false)
	const [numbers, useNumbers] = useState(false)


	const generatedPasswordString = (passwordLength: number) => {
		//
		let passwordString = ""

		const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
		const lower = "abcdefghijklmnopqrstuvwxyz"
		const sym = "!@#$%^&*()?/|"
		const num = "1234567890"

		if (lowerCase) {
			passwordString += lower
		}
		if (upperCase) {
			passwordString += upper
		}
		if (symbols) {
			passwordString += sym
		}
		if (numbers) {
			passwordString += num
		}

		const passW = createPassword(passwordString, passwordLength)

		setPassword(passW)
		setIsPasswordGenerated(true)

	}
	const createPassword = (characters: string, passwordLength: number) => {
		//
		let random = "";
		for (let i = 0; i < passwordLength; i++) {
			random += characters.charAt(Math.round(Math.random() * characters.length))
		}
		return random
	}

	const resetPassword = () => {
		//
		setPassword("")
		setIsPasswordGenerated(false)
		useUpperCase(false)
		useLowerCase(true)
		useSymbols(false)
		useNumbers(false)
	}

	return (
		<ScrollView keyboardShouldPersistTaps='handled' style={{ backgroundColor: "black" }}>
			<SafeAreaView>
				<View>
					<View style={styles.title}>

						<Text style={styles.sub_title}>Password Generator</Text>
					</View>
					<View style={{ width: "100%", height: 3, backgroundColor: "#f14273" }}></View>
					<Formik
						initialValues={{ passwordLength: '' }}
						validationSchema={PasswordSchema}
						onSubmit={(values) => {
							generatedPasswordString(+values.passwordLength)
						}}
					>
						{({
							values,
							errors,
							touched,
							isValid,
							handleChange,
							handleSubmit,
							handleReset,
						}) => (
							<View>
								<View style={styles.input}>
									<Text style={styles.input_left}>
										<Text>Password Length </Text>

									</Text>
									<TextInput
										style={styles.input_right}
										value={values.passwordLength}
										onChangeText={handleChange('passwordLength')}
										placeholder='ex. 8'
										keyboardType='numeric'

									/>
								</View>
								<View >
									<View style={styles.checbox}>
										<View style={styles.uses}>
											<Text style={[styles.uses_text, { color: "green" }]}>LowerCase </Text>
											<BouncyCheckbox
												fillColor='green'
												isChecked={lowerCase}
												onPress={() => (
													useLowerCase(!lowerCase)
												)}
											/>
										</View>
										<View style={styles.uses}>
											<Text style={[styles.uses_text, { color: "yellow" }]}>UpperCase </Text>
											<BouncyCheckbox
												fillColor='yellow'
												isChecked={upperCase}
												onPress={() => (
													useUpperCase(!upperCase)
												)}
											/>
										</View>
										<View style={styles.uses}>
											<Text style={[styles.uses_text, { color: "pink" }]}>Numbers </Text>
											<BouncyCheckbox
												fillColor='pink'
												isChecked={numbers}
												onPress={() => (
													useNumbers(!numbers)
												)}
											/>
										</View>
										<View style={styles.uses}>
											<Text style={[styles.uses_text, { color: "orange" }]}>Symbols </Text>
											<BouncyCheckbox
												isChecked={symbols}
												onPress={() => (
													useSymbols(!symbols)
												)}
											/>
										</View>

									</View>
								</View>

								<View style={styles.footer}>
									<TouchableOpacity
										disabled={!isValid}
										onPress={() => handleSubmit()}
									>
										<Text style={[styles.gernator]}>Generate</Text>

									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => {
											handleReset()
											resetPassword()
										}}
									>
										<Text style={[styles.reset]}>Reset</Text>

									</TouchableOpacity>
								</View>

								{touched.passwordLength && errors.passwordLength && (
									<Text style={{ color: "red" }}>{errors.passwordLength}</Text>
								)}
							</View>
						)}


					</Formik>

					<View style={styles.password}>
						<Text selectable style={styles.text}>
							{password}

						</Text>
					</View>
				</View>
			</SafeAreaView>

		</ScrollView>
	)
}

const styles = StyleSheet.create({

	title: {

		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 80
	},
	sub_title: {
		fontWeight: 'bold',
		fontSize: 35,
		fontFamily: "serif",
		color: "#f91c4a"
	},
	input: {
		justifyContent: 'space-between',
		alignItems: "center",
		padding: 10,
		flexDirection: "row",


	},
	input_left: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",

	},
	input_right: {
		width: "50%",
		borderWidth: 2,
		borderColor: "#f14273",
		padding: 10,
		borderRadius: 5,
		color: "white",
		fontSize: 20
	},

	checbox: {
		width: "50%",

	},

	uses: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: "space-between",
		padding: 4,
		marginLeft: 8
	},
	uses_text: {
		fontSize: 20
	},

	footer: {
		flex: 1,
		flexDirection: "row",
		height: 100,
		justifyContent: "space-around",
		alignItems: "center",

	},

	gernator: {
		color: "white",
		fontSize: 20,
		padding: 10,
		borderRadius: 7,
		paddingHorizontal: 20,
		borderWidth: 2,
		backgroundColor: "#f14273",
	},

	reset: {
		color: "white",
		fontSize: 20,
		padding: 10,
		borderRadius: 7,
		paddingHorizontal: 35,
		borderWidth: 2,
		backgroundColor: "#f14273",
	},

	password: {
		height: 100,
		
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	text:{
		color: "#f14273",
		fontSize: 35,
	}



})