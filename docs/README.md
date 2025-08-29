# HMS Prebuilt Demo

A comprehensive demo app showcasing **100ms Prebuilt UI** integration in **Expo SDK 53**.

## 🎯 What This Demo Shows

- ✅ **Room Creation & Joining**: Complete flow for creating and joining video call rooms
- ✅ **100ms Prebuilt UI**: Full video calling interface with minimal code
- ✅ **Expo Integration**: Native modules working seamlessly with Expo
- ✅ **Modern UI/UX**: Clean, responsive design with proper theming
- ✅ **TypeScript**: Full type safety and modern development experience
- ✅ **Permission Handling**: Automatic camera and microphone permission requests
- ✅ **Full Screen Video**: Professional video calling experience without custom UI

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/ThomasC-CI/hms-prebuilt-demo.git
cd hms-prebuilt-demo
npm install

# Install HMS dependencies
npx expo install @100mslive/react-native-room-kit @100mslive/react-native-hms @100mslive/types-prebuilt @react-native-community/blur @react-native-masked-view/masked-view @shopify/flash-list lottie-react-native react-native-gesture-handler react-native-linear-gradient react-native-modal react-native-reanimated react-native-safe-area-context react-native-simple-toast react-native-webview --legacy-peer-deps

# Install build tools
npx expo install expo-build-properties expo-camera expo-font --legacy-peer-deps

# Run the app
npx expo prebuild --clean
npx expo run:android
```

**⚠️ Important**: This app cannot run in Expo Go due to native dependencies.

## 🏗️ Architecture

Built with modern React Native and Expo patterns:
- **Expo Router**: File-based routing with TypeScript
- **100ms SDK**: Professional video calling infrastructure
- **TypeScript**: Full type safety and developer experience

## 📚 Documentation

- **[Complete Setup Guide](docs/README.md)**: Comprehensive installation and configuration
- **[Installation Guide](docs/INSTALLATION.md)**: Step-by-step setup instructions
- **[Security Guide](docs/SECURITY.md)**: Production security best practices

## 🧪 Testing

- **Test Room Code**: `kii-zbbo-vcr`
- **Features**: Full video calling with 100ms Prebuilt UI
- **Experience**: Professional video calling interface in full screen

## 🚨 Need Help?

See our [complete documentation](docs/README.md) for troubleshooting and detailed setup instructions.

## Contributing

This is a learning demo - feel free to fork, modify, and learn from it!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Issues Found:

### 1. **BACKEND.md** - Outdated Type References
- References `CreateRoomRequest` which no longer exists (should be `CreateRoomOptions`)
- The example code shows a different interface than what's actually available

### 2. **INSTALLATION.md** - Environment Variables
- Lists `EXPO_PUBLIC_HMS_APP_ACCESS_KEY` but this isn't used in the current code
- Lists `HMS_APP_SECRET` and `HMS_JWT_SECRET` but these aren't used in the demo

### 3. **README.md** - Missing Dependencies
- The installation command is missing some required dependencies
- Doesn't mention that some dependencies need `--legacy-peer-deps`

### 4. **SECURITY.md** - References Non-existent Methods
- References `hmsService.getAuthToken()` which doesn't exist in the current service
