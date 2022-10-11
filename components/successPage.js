import { SafeAreaView, StyleSheet, Button, View, Text, TextInput } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default function Success(){
	return (
		<View style={styles.container}>
			<Text>success</Text>
		</View>
	);
}