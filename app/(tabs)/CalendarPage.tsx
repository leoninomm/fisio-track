import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Button, Modal, Portal } from "react-native-paper";

type Session = {
    date: string,
    present: boolean,
};

type MarkedDate = {
    customStyles: {
        container: {
            borderColor: string,
            borderRadius: number,
            borderWidth: number,
        }
    }
};

type MarkedDatesObject = Record<string, MarkedDate>

const sessions = [
    {
        date: '2025-06-02',
        present: true,
    },
    {
        date: '2025-06-09',
        present: true,
    },
    {
        date: '2025-06-16',
        present: false,
    },
    {
        date: '2025-06-23',
        present: true,
    },
];

const getMarkedDateColor = (present: boolean): string => {
    return present ? '#7ED888' :  '#E44E4E'
};

const getMarkedDatesObject = (dates: Array<Session>) => {
    const markedDates: MarkedDatesObject = {};
    dates.forEach((d) => {
        markedDates[d.date] = {
            customStyles: {
                container: {
                    borderColor: getMarkedDateColor(d.present),
                    borderRadius: 20,
                    borderWidth: 2,
                }
            }
        }
    });

    return markedDates;
};

const CalendarPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const handlePressDate = (day: string) => {
        setSelectedDate(day);
        setShowModal(true);
    };

    const handlePressModalButton = (value: boolean) => {
        sessions.push({
            date: selectedDate,
            present: value,
        });

        setShowModal(false);
    }

    return (
        <View style={styles.container}>
            <Calendar
                onDayPress={(day) => handlePressDate(day.dateString)}
                theme={{
                    arrowColor: '#000000',
                    calendarBackground: '#E9EBF0',
                    dayTextColor: '#000000',
                    'stylesheet.calendar.header': {
                        dayTextAtIndex0: {
                            color: 'red'
                        },
                        dayTextAtIndex1: {
                            color: 'black'
                        },
                        dayTextAtIndex2: {
                            color: 'black'
                        },
                        dayTextAtIndex3: {
                            color: 'black'
                        },
                        dayTextAtIndex4: {
                            color: 'black'
                        },
                        dayTextAtIndex5: {
                            color: 'black'
                        },
                        dayTextAtIndex6: {
                            color: 'red'
                        }
                    }
                }}
                headerStyle={{
                    backgroundColor: '#F7DD40',
                    borderRadius: 18,
                }}
                style={{
                    borderRadius: 18,
                    paddingBottom: 20,
                    paddingLeft: -10,
                    paddingRight: -10,
                }}
                markingType={'custom'}
                markedDates={getMarkedDatesObject(sessions)}
            />
            <Portal>
                <Modal
                    visible={showModal}
                    onDismiss={() => setShowModal(false)}
                    contentContainerStyle={styles.modalContainer}
                >
                    <Text style={styles.modalText}>Você foi sofrer?</Text>
                    <View style={styles.modalButtonsContainer}>
                        <Button
                            mode="contained"
                            buttonColor="green"
                            style={styles.modalButton}
                            labelStyle={{ color: 'white' }}
                            onPress={() => handlePressModalButton(true)}
                        >
                            Sim
                        </Button>
                        <Button
                            mode="contained"
                            buttonColor="red"
                            style={styles.modalButton}
                            labelStyle={{ color: 'white' }}
                            onPress={() => handlePressModalButton(false)}
                        >
                            Não
                        </Button>
                    </View>
                </Modal>
            </Portal>
        </View>
    )
};

export default CalendarPage;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 50,
        backgroundColor: 'white',
        height: '100%',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 18,
        alignItems: 'center',
        minHeight: 200,
        marginLeft: 30,
        marginRight: 30,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 15,
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    modalButton: {
        height: 50,
        width: 120,
        margin: 10,
    }
})
