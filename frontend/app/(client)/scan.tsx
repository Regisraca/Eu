import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ClientScan() {
  const router = useRouter();
  const [barberCode, setBarberCode] = useState('');

  const handleGoToBarber = () => {
    if (!barberCode.trim()) {
      Alert.alert('Erro', 'Por favor, insira o código do barbeiro');
      return;
    }

    // Extract barber ID from code (format: "barber:id" or just "id")
    const barberId = barberCode.includes(':') ? barberCode.split(':')[1] : barberCode;
    router.push(`/booking?barber_id=${barberId.trim()}`);
  };

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          <View style={styles.header}>
            <Ionicons name="qr-code" size={64} color="#00d4ff" />
            <Text style={styles.title}>Escanear QR Code</Text>
            <Text style={styles.subtitle}>
              Escaneie o QR Code do seu barbeiro ou digite o código manualmente
            </Text>
          </View>

          <View style={styles.scanArea}>
            <View style={styles.scanFrame}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
              <Ionicons name="scan" size={80} color="rgba(0, 212, 255, 0.5)" />
            </View>
            <Text style={styles.scanHint}>Câmera em breve!</Text>
          </View>

          <View style={styles.manualEntry}>
            <Text style={styles.manualTitle}>Ou insira o código do barbeiro:</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="key" size={20} color="#00d4ff" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Cole o código aqui"
                placeholderTextColor="#808080"
                value={barberCode}
                onChangeText={setBarberCode}
                autoCapitalize="none"
                testID="barber-code-input"
              />
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleGoToBarber}
              testID="submit-barber-code"
            >
              <Text style={styles.submitButtonText}>Ir para o Barbeiro</Text>
              <Ionicons name="arrow-forward" size={20} color="#1a1a2e" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  content: { flex: 1, padding: 24 },
  header: { alignItems: 'center', marginBottom: 32 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginTop: 16 },
  subtitle: {
    fontSize: 14,
    color: '#b0b0b0',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 24,
  },
  scanArea: { alignItems: 'center', marginBottom: 32 },
  scanFrame: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#00d4ff',
    borderWidth: 3,
  },
  topLeft: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  topRight: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  bottomLeft: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  bottomRight: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  scanHint: { fontSize: 12, color: '#808080', marginTop: 16 },
  manualEntry: { marginTop: 16 },
  manualTitle: { fontSize: 14, color: '#b0b0b0', marginBottom: 12 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.3)',
    marginBottom: 16,
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, color: '#ffffff', fontSize: 16, paddingVertical: 16 },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00d4ff',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  submitButtonText: { color: '#1a1a2e', fontSize: 16, fontWeight: 'bold' },
});
