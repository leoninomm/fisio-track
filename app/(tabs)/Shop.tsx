import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import { Button, Surface } from "react-native-paper";

const Shop = () => {
    const [amount, setAmount] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');

    const getSessionValue = () => {
        const valueString = value.split('$')[1];
        const strArray = valueString.split('.');
        let numberString = strArray[0] + strArray[1];
        numberString = numberString.replace(',', '.');
        const numberValue = Number(numberString);

        return numberValue / Number(amount);
    };

    const getHelperText = () => {
        return amount && value ? 'R$' + getSessionValue() + ' por sessão.' : '';
    };

    return (
        <View style={styles.container}>
            <Surface style={styles.formContainer}>
                <Text style={styles.title}>Registrar compra de pacote</Text>
                <View style={styles.inputRow}>
                    <View style={styles.inputLabel}>
                        <Text style={styles.lable}>Qtd de sessões</Text>
                        <TextInput
                            style={styles.input}
                            id="amount"
                            keyboardType="numeric"
                            onChangeText={(value) => setAmount(value)}
                            placeholder="0"
                        />
                    </View>
                    <View style={styles.inputLabel}>
                        <Text style={styles.lable}>Valor</Text>
                        <MaskedTextInput
                            style={styles.input}
                            type="currency"
                            options={{
                                prefix: 'R$',
                                decimalSeparator: ',',
                                groupSeparator: '.',
                                precision: 2,
                            }}
                            keyboardType="numeric"
                            onChangeText={(value) => setValue(value)}
                        />
                    </View>
                </View>
    
                <Text style={styles.helperText}>{getHelperText()}</Text>

                <View style={styles.dateInputContainer}>
                    <View style={styles.inputLabel}>
                        <Text style={styles.lable}>Data da compra</Text>
                        <MaskedTextInput
                            mask="99/99/9999"
                            placeholder="dd/mm/aaaa"
                            onChangeText={(value) => setDate(value)}
                            keyboardType="numeric"
                            style={styles.dateInput}
                        />
                    </View>
                </View>
                <Button
                    mode="contained"
                    buttonColor="green"
                    style={{ width: 120, marginTop: 50 }}
                    labelStyle={{ color: 'white' }}
                >
                    Salvar
                </Button>
            </Surface>
        </View>
    )
};

export default Shop;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 50,
        backgroundColor: 'white',
        height: '100%',
    },
    formContainer: {
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
    },
    title: {
        fontSize: 20,
        marginBottom: 30,
    },
    inputRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    inputLabel: {
        justifyContent: 'flex-start',
    },
    lable: {
        fontSize: 12,
        marginBottom: 10,
    },
    input: {
        height: 40,
        minWidth: 120,
        borderRadius: 18,
        borderWidth: 2,
        borderColor: '#44cddc',
    },
    helperText: {
        marginTop: 15,
        marginBottom: 20,
    },
    dateInputContainer: {
        width: '100%',
        alignItems: 'flex-start',
        marginLeft: 40,
    },
    dateInput: {
        height: 40,
        minWidth: 180,
        borderRadius: 18,
        borderWidth: 2,
        borderColor: '#44cddc',
    }
});
