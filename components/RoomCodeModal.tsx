import { Modal, TouchableOpacity, View, StyleSheet, Text, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';

/**
 * Props for RoomCodeModal component
 * 
 * @interface RoomCodeModalProps
 */
interface RoomCodeModalProps {
  /** Whether the modal is visible */
  visible: boolean;
  /** The room code to display and copy */
  roomCode: string;
  /** Callback when modal should close */
  onClose: () => void;
  /** Callback when user wants to join the room */
  onJoin: () => void;
}

/**
 * Modal component for displaying and copying room codes
 * 
 * This component:
 * - Shows the generated room code prominently
 * - Provides copy functionality
 * - Handles user interactions for room code management
 * 
 * @param {RoomCodeModalProps} props - Component props
 * @returns {JSX.Element} Room code modal
 */
export function RoomCodeModal({ visible, roomCode, onClose, onJoin }: RoomCodeModalProps) {
  /**
   * Copies the room code to clipboard
   * 
   * This method:
   * - Copies the room code to device clipboard
   * - Shows success feedback to user
   * - Handles clipboard errors gracefully
   */
  const handleCopyRoomCode = async () => {
    try {
      await Clipboard.setStringAsync(roomCode);
      Alert.alert('Success', 'Room code copied to clipboard! You can now share it with others.');
    } catch (error) {
      Alert.alert('Error', 'Failed to copy room code');
    }
  };

  /**
   * Handles joining the room
   * 
   * This method:
   * - Closes the modal first
   * - Waits a moment for the modal to close
   * - Then triggers the join action
   */
  const handleJoinRoom = () => {
    // Close the modal first
    onClose();
    
    // Wait a moment for the modal to close, then join
    setTimeout(() => {
      onJoin();
    }, 300);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Room Created!</Text>
          
          <Text style={styles.subtitle}>Copy this code and share it with others:</Text>
          
          <View style={styles.codeContainer}>
            <Text style={styles.roomCode}>{roomCode}</Text>
          </View>
          
          <TouchableOpacity style={[styles.button, styles.copyButton]} onPress={handleCopyRoomCode}>
            <Text style={styles.buttonText}>Copy Code</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.joinButton]} onPress={handleJoinRoom}>
            <Text style={styles.buttonText}>Join Room Now</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

/**
 * Styles for the room code modal
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
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.7,
  },
  codeContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  roomCode: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    letterSpacing: 2,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  copyButton: {
    backgroundColor: '#3B82F6',
    width: '100%',
  },
  joinButton: {
    backgroundColor: '#8B5CF6',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    padding: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#6B7280',
  },
});