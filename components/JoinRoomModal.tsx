import React, { useState } from 'react';
import { Modal, TextInput, TouchableOpacity, View, StyleSheet, Alert, Text } from 'react-native';

/**
 * Props for JoinRoomModal component
 * 
 * @interface JoinRoomModalProps
 */
interface JoinRoomModalProps {
  /** Whether the modal is visible */
  visible: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Callback when user joins a room */
  onJoin: (code: string) => void;
}

/**
 * Modal component for joining existing video call rooms
 * 
 * This component:
 * - Provides a form for entering room codes
 * - Validates room code input before joining
 * - Handles user input and form submission
 * - Provides clear feedback for errors
 * 
 * @param {JoinRoomModalProps} props - Component props
 * @returns {JSX.Element} Join room modal
 * 
 * @example
 * <JoinRoomModal
 *   visible={showJoinModal}
 *   onClose={() => setShowJoinModal(false)}
 *   onJoin={handleJoinRoom}
 * />
 */
export function JoinRoomModal({ visible, onClose, onJoin }: JoinRoomModalProps) {
  const [roomCode, setRoomCode] = useState('');

  /**
   * Handles the join room action
   * 
   * Validates the room code and calls the onJoin callback if valid.
   * Shows an error alert if the room code is empty.
   */
  const handleJoin = () => {
    if (roomCode.trim()) {
      onJoin(roomCode.trim());
      setRoomCode('');
    } else {
      Alert.alert('Error', 'Please enter a room code');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Join Room</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Enter room code"
            value={roomCode}
            onChangeText={setRoomCode}
            autoCapitalize="none"
            autoCorrect={false}
          />
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.button, styles.joinButton]} onPress={handleJoin}>
              <Text style={styles.buttonText}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

/**
 * Styles for the join room modal
 * 
 * @type {StyleSheet.NamedStyles<any>}
 */
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#6B7280',
  },
  joinButton: {
    backgroundColor: '#10B981',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
