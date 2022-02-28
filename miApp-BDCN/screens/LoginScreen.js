import { useEffect } from "react"
import { KeyboardAvoidingView, TextInput, TouchableOpacity } from "react-native"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStataeChanged(user =>{
        if(user){
            navigation.navigate("UsersList")
        }
    })
    
    return unsubscribe

    },[])

    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email,password).then(userCredentials =>{
            const user = userCredentials.user;
            console.log('Registered with: ',user.email);
        })
        .catch(error => alert (error.message))
    }
    const handleLogin = () =>{
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with: ', user.email);
            })
            .catch(error => alert (error.message))
    }
    return(
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.inputcontainer}>
                <TextInput
                palceholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
                />
                <TextInput
                palceholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.buttonOutline]}>
                    <Text style={styles.buttonOutLineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

// const styles = StyleSheet.create({
//     container: {
//         felx: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     }, 
//     input: {
//         backgroundColor: 'white',
//         paddingHorizontal:15,
//         paddingVertical: 10,
//         borderRadius: 10,
//         marginTop: 5
//     },
//     inputcontainer: {
//         width: '80%'
//     },
//     button: {
//         backgroundColor:'#46C2E0',
//         width:200,
//         padding:15,
//         borderRadius:10,
//         alignItems: 'center'
//     },
//     buttonText: {
//         colro:'white',
//         fonWeight:'700',
//         fontSize: 16
//     },
//     buttoncontainer: {
//         width:'60%',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 40
//     },
//     buttonOutLine: {
//         backgroundColor: 'white',
//         marginTop: 5,
//         borderColor: '#46C2E0',
//         borderWidth: 2
//     },
//     buttonOutLineText: {
//         color: '#46C2E0',
//         fontWeight:'700',
//         fontSize:16
//     }
// })

export default Login 