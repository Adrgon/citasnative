import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';

const App = () => {
  const [mostrarForm, guardarMostrarForm] = useState(false);
  const [citas, setCitas] = useState([]);

  // Eliminar los pacientes del state

  useEffect(() => {
    const obtenerCitasStorage = async () => {
      try {
        const citasStorage = await AsyncStorage.getItem('citas');
        // console.log(citasStorage);
        if (citasStorage) {
          setCitas(JSON.parse(citasStorage));
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCitasStorage();
  }, []);

  const eliminarPaciente = id => {
    const citasFiltradas = citas.filter(cita => cita.id !== id);
    setCitas(citasFiltradas);
    guardarCitasStorage(JSON.stringify(citasFiltradas))
  };

  // Muestra u oculta el formulario
  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  };

  const cerrarTeclado = () => {
    Keyboard.dismiss();
  };

  const guardarCitasStorage = async citasJson => {
    try {
      await AsyncStorage.setItem('citas', citasJson);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        cerrarTeclado();
      }}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de Citas</Text>

        <View>
          <TouchableHighlight
            onPress={() => mostrarFormulario()}
            style={styles.btnMostrarForm}>
            <Text style={styles.textoMostraForm}>
              {mostrarForm ? 'Cancelar Crear Cita' : 'Crear Cita'}{' '}
            </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.contenido}>
          {mostrarForm ? (
            <>
              <Text style={styles.titulo}>Crear Nueva Cita</Text>
              <Formulario
                citas={citas}
                setCitas={setCitas}
                guardarMostrarForm={guardarMostrarForm}
                guardarCitasStorage={guardarCitasStorage}
              />
            </>
          ) : (
            <>
              <Text style={styles.titulo}>
                {citas.length > 0 ? 'Administrador de Citas' : 'No hay citas'}
              </Text>
              <FlatList
                style={styles.listado}
                data={citas}
                renderItem={({item}) => (
                  <Cita item={item} eliminarPaciente={eliminarPaciente} />
                )}
                keyExtractor={cita => cita.id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1,
  },
  titulo: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1,
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  textoMostraForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
