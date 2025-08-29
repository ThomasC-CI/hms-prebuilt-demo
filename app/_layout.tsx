import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import React from 'react';

/**
 * Root layout component that wraps the entire app
 * 
 * This component:
 * - Loads required fonts (including Inter fonts for 100ms)
 * - Requests camera and microphone permissions
 * - Sets up navigation structure
 * - Wraps with GestureHandlerRootView for 100ms components
 */
export default function RootLayout() {
  const [loaded] = useFonts({
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
  });

  // Request permissions when app starts
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();

  React.useEffect(() => {
    if (cameraPermission?.status === 'undetermined') {
      requestCameraPermission();
    }
    if (microphonePermission?.status === 'undetermined') {
      requestMicrophonePermission();
    }
  }, [cameraPermission, microphonePermission, requestCameraPermission, requestMicrophonePermission]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen 
          name="[roomCode]" 
          options={{ 
            headerShown: false,
            animation: 'fade'
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}
