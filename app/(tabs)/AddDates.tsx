import { useState } from "react";
import { ColorValue, Pressable, StyleSheet, Text, View } from "react-native";
import { Button, Surface } from "react-native-paper";
import { TimerPickerModal } from "react-native-timer-picker";

const days: Array<WeekDays> = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

type WeekDays = 'Domingo' | 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta' | 'Sábado';

type DateTime = {
    day: WeekDays,
    time: string
}

const AddDates = () => {
    const [selectedDays, setSelectedDays] = useState(new Set());
    const [lastSelectedDay, setLastSelectedDay] = useState<WeekDays>('Domingo');
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [dateTimes, setDateTimes] = useState<Set<DateTime>>(new Set());

    const handlePress = (day: WeekDays) => {
        setLastSelectedDay(day);
        const days = new Set([...selectedDays]);
        const removed = days.delete(day);
        if (!removed) {
            setShowTimePicker(true);
        } else {
            const newDateTimes = new Set([...dateTimes]);
            console.log(newDateTimes);
            const toDelete = [...newDateTimes].find((i) => i.day === day);
            if (toDelete) {
                newDateTimes.delete(toDelete);
                setDateTimes(newDateTimes);
            }
        }

        setSelectedDays(days);
    }

    const getButtonColor = (day: WeekDays): ColorValue => {
        if (selectedDays.has(day)) return '#44cddc'
        else return '#ebf4f5'
    }

    const formatTime = ({
        hours,
        minutes,
        seconds,
    }: {
        hours?: number;
        minutes?: number;
        seconds?: number;
    }) => {
        const timeParts = [];

        if (hours !== undefined) {
            timeParts.push(hours.toString().padStart(2, "0"));
        }
        if (minutes !== undefined) {
            timeParts.push(minutes.toString().padStart(2, "0"));
        }
        if (seconds !== undefined) {
            timeParts.push(seconds.toString().padStart(2, "0"));
        }

        return timeParts.join(":");
    };

    const handleConfirmTimePicker = (time) => {
        const newDateTimes = new Set([...dateTimes]);
        const newDays = new Set([...selectedDays]);

        newDateTimes.add({ day: lastSelectedDay, time: formatTime(time) });
        newDays.add(lastSelectedDay);

        setDateTimes(newDateTimes);
        setSelectedDays(newDays);
        setShowTimePicker(false);
    }

    const handleCancelTimePicker = () => {
        const days = new Set([...selectedDays]);
        days.delete(lastSelectedDay);

        setSelectedDays(days);
        setShowTimePicker(false);
    }

    return (
        <View style={styles.container}>
            <Text style={{ marginBottom: 20 }}>Selecione os dias da semana em que você vai sofrer:</Text>
            <Surface elevation={1} style={styles.buttonsContainer}>
                {days.map((day) => (
                    <Pressable onPress={() => handlePress(day)} key={day}>
                        <Surface elevation={selectedDays.has(day) ? 0: 3} style={buttonStyle(getButtonColor(day)).button}>
                            <Text style={{ color: 'black' }}>{day[0]}</Text>
                        </Surface>
                    </Pressable>
                ))}
            </Surface>
            <TimerPickerModal
                visible={showTimePicker}
                setIsVisible={setShowTimePicker}
                onConfirm={(pickerDuration) => handleConfirmTimePicker(pickerDuration)}
                modalTitle="Selecione o horário:"
                onCancel={() => handleCancelTimePicker()}
                styles={{ theme: 'light' }}
                hideSeconds
                confirmButtonText="Confirmar"
                cancelButtonText="Cancelar"
            />
            <Text style={{ marginTop: 50 }}>Meus Horários</Text>
            <Surface style={styles.showDates}>
                {[...dateTimes].length ? (
                    <View>
                        <Text>Eu vou sofrer</Text>
                        {[...dateTimes].map((dt, i) => <Text key={i}>{dt.day} às {dt.time}</Text>)}
                    </View>
                ) : (
                    <Text>Eu ainda não vou sofrer!</Text>
                )}
            </Surface>
            <Button
                mode="contained"
                buttonColor="green"
                style={{ width: 120 }}
                labelStyle={{ color: 'white' }}
            >
                Salvar
            </Button>
        </View>
    );
};

export default AddDates;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 50,
        backgroundColor: 'white',
        height: '100%',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 18,
        backgroundColor: 'white',
        height: 70,
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    showDates: {
        minHeight: 100,
        backgroundColor: 'white',
        borderRadius: 18,
        padding: 20,
        marginTop: 20,
        marginBottom: 50,
    }
});

const buttonStyle = (color: ColorValue) => StyleSheet.create({
    button: {
        height: 40,
        width: 40,
        borderRadius: 20,
        padding: 8,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
