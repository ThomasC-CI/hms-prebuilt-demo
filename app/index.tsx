import { Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { JoinRoomModal } from '@/components/JoinRoomModal';
import { RoomCodeModal } from '@/components/RoomCodeModal';
import { hmsService } from '@/lib/hms-service';
import * as Clipboard from 'expo-clipboard';
import { router } from 'expo-router';
import * as Sharing from 'expo-sharing';
import React, { useState } from 'react';

/**
 * Home screen component with room creation and joining functionality
 * 
 * This component:
 * - Allows users to create new video chat rooms
 * - Provides interface for joining existing rooms
 * - Handles room code sharing and copying
 * - Demonstrates 100ms Prebuilt UI integration
 * 
 * @returns {JSX.Element} Home screen component
 */
export default function HomeScreen() {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showRoomCodeModal, setShowRoomCodeModal] = useState(false);
  const [roomCode, setRoomCode] = useState('');

  /**
   * Creates a new video chat room
   * 
   * This method:
   * - Calls the HMS service to create a room
   * - Shows the room code modal on success
   * - Handles errors gracefully with user feedback
   */
  const handleCreateRoom = async () => {
    try {
      const result = await hmsService.createRoom();
      
      if (result.success && result.guestCode) {
        setRoomCode(result.guestCode);
        setShowRoomCodeModal(true);
      } else {
        Alert.alert('Error', result.error || 'Failed to create room');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create room. Please try again.');
    }
  };

  /**
   * Handles joining a room with the provided code
   * 
   * @param {string} code - The room code to join
   */
  const handleJoinRoom = (code: string) => {
    if (code.trim()) {
      router.push(`/${code}` as any);
    }
  };

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
      Alert.alert('Success', 'Room code copied to clipboard!');
    } catch (error) {
      Alert.alert('Error', 'Failed to copy room code');
    }
  };

  /**
   * Shares the room code using device sharing
   * 
   * This method:
   * - Uses device's native sharing functionality
   * - Creates a shareable message with room code
   * - Handles sharing errors gracefully
   */
  const handleShareRoomCode = async () => {
    try {
      const message = `Join my video chat room! Use code: ${roomCode}`;
      await Sharing.shareAsync(message);
    } catch (error) {
      Alert.alert('Error', 'Failed to share room code');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>100ms Prebuilt Demo</Text>
        <Text style={styles.subtitle}>Video Chat Application</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.createButton]} onPress={handleCreateRoom}>
          <Text style={styles.buttonText}>Create Room</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.joinButton]} onPress={() => setShowJoinModal(true)}>
          <Text style={styles.buttonText}>Join Room</Text>
        </TouchableOpacity>
      </View>

      <JoinRoomModal
        visible={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        onJoin={handleJoinRoom}
      />

      <RoomCodeModal
        visible={showRoomCodeModal}
        roomCode={roomCode}
        onCopy={handleCopyRoomCode}
        onClose={() => setShowRoomCodeModal(false)}
        onShare={handleShareRoomCode}
        onJoin={() => {
          setShowRoomCodeModal(false);
          handleJoinRoom(roomCode);
        }}
      />
    </View>
  );
}

/**
 * Styles for the home screen
 * 
 * @type {StyleSheet.NamedStyles<any>}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#64748B',
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createButton: {
    backgroundColor: '#3B82F6',
  },
  joinButton: {
    backgroundColor: '#10B981',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
