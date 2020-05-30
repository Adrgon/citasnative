import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

const Formulario = ({
  citas,
  setCitas,
  guardarMostrarForm,
  guardarCitasStorage,
}) => {
  const [paciente, guardarPaciente] = useState('');
  const [propietario, guardarPropietario] = useState('');
  const [telefono, guardarTelefono] = useState('');
  const [fecha, guardarFecha] = useState('');
  const [hora, guardarHora] = useState('');
  const [sintoma, guardarSintoma] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = date => {
    const opciones = {year: 'numeric', month: 'long', day: '2-digit'};
    guardarFecha(date.toLocaleDateString('es-ES', opciones));
    //console.log(date);
    hideDatePicker();
  };

  // Muestra u oculta el TimePiker.

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmarHora = hora => {
    const opciones = {hour: 'numeric', minute: '2-digit'};
    guardarHora(hora.toLocaleString('en-US', opciones));
    console.log(hora);
    hideTimePicker();
  };

  const crearNuevaCita = () => {
    if (
      paciente.trim() == '' ||
      propietario.trim() == '' ||
      telefono.trim() == '' ||
      fecha.trim() == '' ||
      hora.trim() == '' ||
      sintoma.trim() == ''
    ) {
      // Falla la validacion
      mostrarAlerta();
      return;
    }

    // Mostrar una nueva cita

    const cita = {paciente, propietario, telefono, fecha, hora, sintoma};
    cita.id = shortid.generate();
    // Agregar al state

    const citasNuevo = [...citas, cita];
    setCitas(citasNuevo);

    // nuevas citas a storage
    guardarCitasStorage(JSON.stringify(citasNuevo));
    // Ocultar el formulario
    guardarMostrarForm(false);
    // Limpiar el formulario
  };

  // Muestra la alerta si falla la validacion
  const mostrarAlerta = () => {
    Alert.alert(
      'Error',
      'Todos los campos son obligatorios'[
        {
          text: 'OK', // Arreglo de Botones
        }
      ],
    );
  };

  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => {
              guardarPaciente(texto);
            }}
          />
        </View>
        <View>
          <Text style={styles.label}>Propietario</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => {
              guardarPropietario(texto);
            }}
          />
        </View>
        <View>
          <Text style={styles.label}>Telefono Contacto</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => {
              guardarTelefono(texto);
            }}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={styles.label}>Fecha</Text>
          <Button title="Seleccionar Fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideDatePicker}
            locale="es_ES"
            headerTextIOS="Elige una Fecha"
            confirmTextIOS="Confirmar"
            cancelTextIOS="Cancelar"
          />
          <Text>{fecha}</Text>
        </View>

        <View>
          <Text style={styles.label}>Hora</Text>
          <Button title="Seleccionar Hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmarHora}
            onCancel={hideTimePicker}
            locale="es_ES"
            headerTextIOS="Elige una Hora"
            confirmTextIOS="Confirmar"
            cancelTextIOS="Cancelar"
            is24Hour
          />
          <Text>{hora}</Text>
        </View>

        <View>
          <Text style={styles.label}>Sintomas</Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={texto => {
              guardarSintoma(texto);
            }}
          />
        </View>

        <View>
          <TouchableHighlight
            onPress={() => crearNuevaCita()}
            style={styles.btnSubmit}>
            <Text style={styles.textoSubmit}> Crear nueva cita </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  textoSubmit: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Formulario;
