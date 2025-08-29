import { Modal, TouchableOpacity, View, StyleSheet, Text } from 'react-native';

/**
 * Props for RoomCodeModal component
 * 
 * @interface RoomCodeModalProps
 */
interface RoomCodeModalProps {
  /** Whether the modal is visible */
  visible: boolean;
  /** The room code to display and share */
  roomCode: string;
  /** Callback when room code is copied */
  onCopy: () => void;
  /** Callback when modal should close */
  onClose: () => void;
  /** Callback when room code is shared */
  onShare: () => void;
  /** Callback when user wants to join the room */
  onJoin: () => void;
}

/**
 * Modal component for displaying and sharing room codes
 * 
 * This component:
 * - Shows the generated room code prominently
 * - Provides copy, share, and join functionality
 * - Uses themed components for consistent styling
 * - Handles user interactions for room code management
 * 
 * @param {RoomCodeModalProps} props - Component props
 * @returns {JSX.Element} Room code modal
 * 
 * @example
 * <RoomCodeModal
 *   visible={showRoomCodeModal}
 *   roomCode="abc-123-def"
 *   onCopy={handleCopyRoomCode}
 *   onClose={() => setShowRoomCodeModal(false)}
 *   onShare={handleShareRoomCode}
 *   onJoin={() => handleJoinRoom(roomCode)}
 * />
 */
export function RoomCodeModal({ visible, roomCode, onCopy, onClose, onShare, onJoin }: RoomCodeModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Room Created!</Text>
          
          <Text style={styles.subtitle}>Share this code with others:</Text>
          
          <View style={styles.codeContainer}>
            <Text style={styles.roomCode}>{roomCode}</Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.copyButton]} onPress={onCopy}>
              <Text style={styles.buttonText}>Copy Code</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.button, styles.shareButton]} onPress={onShare}>
              <Text style={styles.buttonText}>Share</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.button, styles.joinButton]} onPress={onJoin}>
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
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  copyButton: {
    backgroundColor: '#3B82F6',
    flex: 1,
  },
  shareButton: {
    backgroundColor: '#10B981',
    flex: 1,
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