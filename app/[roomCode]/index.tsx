import { useLocalSearchParams, router, Stack } from 'expo-router';
import { HMSPrebuilt } from '@100mslive/react-native-room-kit';
import { View, StyleSheet, LogBox } from 'react-native';

/**
 * Suppress the known React Fragment style prop warning from 100ms components
 * 
 * This warning occurs due to internal implementation details in the 100ms room kit
 * where style props are inadvertently passed to React Fragments. The warning is
 * cosmetic and doesn't affect functionality - video calls work perfectly.
 * 
 * Known issue: "Invalid prop `style` supplied to `React.Fragment`"
 * Source: Internal 100ms component implementation
 * Impact: None - purely cosmetic console warning
 */
LogBox.ignoreLogs([
  'Invalid prop `style` supplied to `React.Fragment`',
]);

/**
 * Room screen component that displays the 100ms Prebuilt UI
 * 
 * This component:
 * - Extracts room code from URL parameters
 * - Renders HMSPrebuilt component in full screen
 * - Handles room leave events
 * - Provides full-screen video calling experience
 * 
 * @returns {JSX.Element | null} The room screen or null if no room code
 * 
 */
export default function RoomScreen() {
  const { roomCode } = useLocalSearchParams<{ roomCode: string }>();

  /**
   * Handles when a user leaves the room
   * 
   * @param {any} reason - The reason for leaving (provided by 100ms)
   * @example
   * // Called when user manually leaves or connection is lost
   * onLeave={(reason) => console.log('Left room:', reason)}
   */
  const handleRoomLeave = (reason: any) => {
    console.log(':: Reason for Leaving the Room > ', reason);
    
    // Force navigation back to prevent "Meeting Ended" state
    router.replace('/');
  };

  // Don't render if no room code is provided
  if (!roomCode) {
    return null;
  }

  return (
    <>
      <Stack.Screen 
        options={{ 
          headerShown: false,
          header: () => null,
          presentation: 'fullScreenModal'
        }} 
      />
      <View style={styles.container}>
        <HMSPrebuilt
          key={roomCode} // Add key to force re-mount when room code changes
          roomCode={roomCode as string}
          options={{
            userName: "User",
            userId: `user_${Date.now()}`,
          }}
          onLeave={handleRoomLeave}
          handleBackButton={true}
          autoEnterPipMode={true}
        />
      </View>
    </>
  );
}

/**
 * Styles for the room screen
 * 
 * @type {StyleSheet.NamedStyles<any>}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
