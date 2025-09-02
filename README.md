# HMS Prebuilt Demo 🎥

A comprehensive demo app showcasing **100ms Prebuilt UI** integration in **Expo SDK 53** with React Native.

## 🎯 What This Demo Shows

- ✅ **Room Creation & Joining**: Complete flow for creating and joining video call rooms
- ✅ **100ms Prebuilt UI**: Full video calling interface with minimal code
- ✅ **Expo Integration**: Native modules working seamlessly with Expo
- ✅ **Modern UI/UX**: Clean, responsive design with proper theming
- ✅ **TypeScript**: Full type safety and modern development experience
- ✅ **Permission Handling**: Automatic camera and microphone permission requests
- ✅ **Full Screen Video**: Professional video calling experience without custom UI
- ✅ **Cross-Platform**: Works on both iOS and Android

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.17.0 or higher
- **npm** 9.0.0 or higher
- **Expo CLI** (latest version)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)
- **100ms Account** - [Sign up here](https://100ms.live)

### 1. Clone and Setup
```bash
# Clone the repository
git clone https://github.com/ThomasC-CI/hms-prebuilt-demo.git
cd hms-prebuilt-demo

# Install base dependencies
npm install --legacy-peer-deps
```

### 2. Install HMS Dependencies
```bash
# Install 100ms video dependencies
npx expo install @100mslive/react-native-room-kit @100mslive/react-native-hms @100mslive/types-prebuilt --legacy-peer-deps

# Install UI component dependencies
npx expo install @react-native-community/blur @react-native-masked-view/masked-view @shopify/flash-list lottie-react-native react-native-gesture-handler react-native-linear-gradient react-native-modal react-native-reanimated react-native-safe-area-context react-native-simple-toast react-native-webview --legacy-peer-deps

# Install build and utility dependencies
npx expo install expo-build-properties expo-camera expo-font --legacy-peer-deps
```

### 3. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Update with your 100ms credentials
# Get these from your 100ms dashboard
EXPO_PUBLIC_HMS_TEMPLATE_ID=your_template_id_here
EXPO_PUBLIC_HMS_MANAGEMENT_TOKEN=your_management_token_here
```

### 4. Run the App
```bash
# Build native code
npx expo prebuild --clean

# Run on Android
npx expo run:android

# Run on iOS (macOS only)
npx expo run:ios
```

**⚠️ Important**: This app cannot run in Expo Go due to native dependencies.

## 🏗️ Architecture

Built with modern React Native and Expo patterns:

### Core Technologies
- **Expo SDK 53**: Latest stable Expo version
- **React Native 0.79**: Modern React Native with improved performance
- **TypeScript**: Full type safety and developer experience
- **Expo Router**: File-based routing with TypeScript support

### 100ms Integration
- **100ms Prebuilt UI**: Professional video calling interface
- **100ms SDK**: WebRTC-based video infrastructure
- **Room Management**: Create, join, and manage video rooms
- **Real-time Communication**: Audio, video, and screen sharing

### Project Structure
```
hms-prebuilt-demo/
├── app/                    # Expo Router app directory
│   ├── index.tsx          # Main app entry point
│   ├── [roomCode]/        # Dynamic room route
│   └── _layout.tsx        # Root layout component
├── components/             # Reusable UI components
│   ├── JoinRoomModal.tsx  # Room joining interface
│   └── RoomCodeModal.tsx  # Room code display
├── lib/                    # Core functionality
│   └── hms-service.ts     # 100ms API integration
├── types/                  # TypeScript type definitions
│   └── room.ts            # Room-related types
├── assets/                 # Static assets
│   ├── fonts/             # Custom fonts
│   └── images/            # App images and icons
└── docs/                   # Documentation
    ├── INSTALLATION.md     # Setup instructions
    ├── BACKEND.md          # Backend implementation
    ├── SECURITY.md         # Security best practices
    └── TROUBLESHOOTING.md  # Common issues and solutions
```

## 📚 Documentation

- **[Installation Guide](docs/INSTALLATION.md)**: Step-by-step setup instructions
- **[Backend Guide](docs/BACKEND.md)**: Production backend implementation
- **[Security Guide](docs/SECURITY.md)**: Production security best practices
- **[Troubleshooting](docs/TROUBLESHOOTING.md)**: Common issues and solutions

## 🧪 Testing

### Demo Features
- **Room Creation**: Generate unique room codes
- **Room Joining**: Join rooms using room codes
- **Video Calling**: Full-featured video chat interface
- **Screen Sharing**: Share your screen during calls
- **Device Switching**: Switch between cameras and microphones

### Testing Your Setup
1. **Create a room** using the "Create Room" button
2. **Copy the room code** that appears
3. **Join the room** using "Join Room" with the code
4. **Test video/audio** - ensure permissions are granted
5. **Test screen sharing** and other features

**Note**: Room codes expire after use, so create new ones for testing.

## 🔧 Development

### Key Files to Understand
- **`app/index.tsx`**: Main app logic and navigation
- **`lib/hms-service.ts`**: 100ms API integration
- **`components/JoinRoomModal.tsx`**: Room joining interface
- **`types/room.ts`**: TypeScript type definitions

### Making Changes
- **UI Modifications**: Edit components in the `components/` directory
- **Logic Changes**: Modify `lib/hms-service.ts` for API changes
- **Styling**: Update theme colors and styles in components
- **New Features**: Add new routes in the `app/` directory

### Development Workflow
```bash
# Start development server
npx expo start

# Make changes to your code
# The app will automatically reload

# Test on device
npx expo run:android
# or
npx expo run:ios
```

## 🚨 Need Help?

### Common Issues
- **Build failures**: See [Troubleshooting Guide](docs/TROUBLESHOOTING.md)
- **Setup problems**: Check [Installation Guide](docs/INSTALLATION.md)
- **Security questions**: Review [Security Guide](docs/SECURITY.md)

### Getting Support
- **100ms Discord**: [discord.gg/100ms](https://discord.gg/100ms)
- **100ms Support**: [support@100ms.live](mailto:support@100ms.live)
- **Expo Help**: [forums.expo.dev](https://forums.expo.dev)
- **GitHub Issues**: Report bugs in this repository

## 🔒 Security Notice

**This is a demo application** designed for learning purposes. It uses management tokens directly in the client, which is **not secure for production**.

For production use:
- Implement the backend architecture described in [BACKEND.md](docs/BACKEND.md)
- Follow security best practices in [SECURITY.md](docs/SECURITY.md)
- Never expose management tokens to client applications

## 🚀 Next Steps

### Learning Path
1. ✅ **Get the demo running** - Follow the setup guide
2. ✅ **Explore the code** - Understand how components work
3. 🔄 **Modify the UI** - Customize colors, layouts, and features
4. 🔄 **Add a backend** - Implement proper authentication
5. 🔄 **Deploy to production** - Use cloud platforms

### Production Considerations
- **Backend Implementation**: Follow [BACKEND.md](docs/BACKEND.md)
- **Security Hardening**: Apply [SECURITY.md](docs/SECURITY.md) practices
- **Monitoring**: Add logging and error tracking
- **Testing**: Implement comprehensive testing
- **Deployment**: Use CI/CD pipelines

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📄 Acknowledgments

- **100ms Team** for the excellent video infrastructure
- **Expo Team** for the amazing development platform
- **React Native Community** for the robust ecosystem
- **Contributors** who help improve this demo

---

**Happy coding!** 🎉 If you find this demo helpful, please give it a star ⭐️

**Questions?** Join the [100ms Discord](https://discord.gg/100ms) community!
