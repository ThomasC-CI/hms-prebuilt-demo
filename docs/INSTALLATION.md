# Installation Guide 📱

Complete setup guide for developers who want to learn from and build upon this video chat application.

## Prerequisites

### Required Software
- **Node.js** - Version 18.17.0 or higher
- **npm** - Version 9.0.0 or higher (comes with Node.js)
- **Git** - For cloning the repository

### Development Tools
- **Expo CLI** - `npm install -g @expo/cli`
- **Android Studio** - For Android development (version 2022.1.1 or higher)
- **Xcode** - For iOS development (version 14.0 or higher, macOS only)
- **Java Development Kit (JDK)** - Version 17 or higher

### System Requirements
- **Windows**: Windows 10/11 with WSL2 recommended
- **macOS**: macOS 12.0 (Monterey) or higher
- **Linux**: Ubuntu 20.04 LTS or higher

## Understanding the Stack

This project demonstrates a **modern mobile development stack**:

- **Frontend**: React Native with Expo SDK 53 for cross-platform development
- **Backend**: Node.js with Express for scalable APIs (see BACKEND.md)
- **Video**: WebRTC-based infrastructure for real-time communication
- **Authentication**: JWT-based secure user management
- **Deployment**: Cloud-ready architecture for production use

## Step 1: Development Environment Setup

### Install Node.js
1. **Download** from [nodejs.org](https://nodejs.org/)
2. **Verify installation**:
   ```bash
   node --version  # Should be 18.17.0+
   npm --version   # Should be 9.0.0+
   ```

### Install Expo CLI
```bash
npm install -g @expo/cli
expo --version  # Verify installation
```

### Platform-Specific Setup

#### Android Development
1. **Install Android Studio** from [developer.android.com](https://developer.android.com/studio)
2. **Install Android SDK**:
   - Open Android Studio → Settings → Appearance & Behavior → System Settings → Android SDK
   - Install Android SDK 33 (API Level 33) or higher
   - Install Android SDK Build-Tools 33.0.0 or higher
3. **Set environment variables**:
   ```bash
   # Windows (PowerShell)
   $env:ANDROID_HOME = "C:\Users\$env:USERNAME\AppData\Local\Android\Sdk"
   $env:PATH += ";$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\tools"

   # macOS/Linux
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools
   ```
4. **Verify setup**:
   ```bash
   adb --version
   ```

#### iOS Development (macOS only)
1. **Install Xcode** from Mac App Store
2. **Install Xcode Command Line Tools**:
   ```bash
   xcode-select --install
   ```
3. **Verify setup**:
   ```bash
   xcodebuild -version
   ```

## Step 2: API Account Setup

### 100ms Account Setup
1. **Sign up** at [100ms.live](https://100ms.live) (free tier available)
2. **Navigate to Dashboard** → Developer section
3. **Create a new app**:
   - Click "Create New App"
   - Enter app name (e.g., "Video Chat Demo")
   - Select "Video" as app type
4. **Copy credentials**:
   - **App Access Key** - Found in App Settings
   - **App Secret** - Found in App Settings (keep this secure!)
   - **Template ID** - Found in Templates section

### Create Video Template
1. **Go to Templates** in your 100ms dashboard
2. **Create New Template**:
   - Name: "Video Chat Template"
   - Type: "Video"
   - Enable: Camera, Microphone, Screen Share
   - Set default roles: "host", "guest"
3. **Copy the Template ID** for use in environment variables

> 💡 **Why 100ms?** We chose it for this demo because it's developer-friendly and has a generous free tier. The architectural patterns shown here work with any WebRTC provider.

## Step 3: Project Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd hms-prebuilt-demo

# Install dependencies (use --legacy-peer-deps for compatibility)
npm install --legacy-peer-deps
```

> 💡 **Why --legacy-peer-deps?** The HMS video packages have specific peer dependency requirements that conflict with some Expo SDK 53 packages. Using `--legacy-peer-deps` resolves these conflicts while maintaining full functionality.

### Verify Installation
```bash
# Check if all dependencies are installed
npm list --depth=0

# Should show no missing peer dependency warnings
```

## Step 4: Environment Configuration

### Create Environment File
```bash
# Copy environment template
cp .env.example .env
```

### Environment File Template (.env.example)
```bash
# Video Infrastructure Configuration
EXPO_PUBLIC_HMS_TEMPLATE_ID=your_template_id_here
EXPO_PUBLIC_HMS_MANAGEMENT_TOKEN=your_management_token_here

# Optional Configuration
EXPO_PUBLIC_HMS_ROOM_NAME_PREFIX=Meeting
EXPO_PUBLIC_HMS_DEFAULT_USERNAME=Guest

# Note: HMS_APP_SECRET and HMS_JWT_SECRET are only needed
# when implementing a backend server (see docs/BACKEND.md)
```

### Generate Management Token
For development purposes, you need a management token. You can generate one using the 100ms dashboard or create a simple script:

```javascript
// generate-token.js
const jwt = require('jsonwebtoken');

const payload = {
  access_key: 'your_app_access_key',
  type: 'management',
  version: 2,
  iat: Math.floor(Date.now() / 1000),
  nbf: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
};

const token = jwt.sign(payload, 'your_app_secret', {
  algorithm: 'HS256',
});

console.log('Management Token:', token);
```

**⚠️ Security Warning**: This token should NEVER be used in production. It's only for development and testing.

## Step 5: Development Build

### Start Development Server
```bash
# Start development server
npx expo start
```

### Build for Native Platforms
```bash
# For Android (requires Android Studio setup)
npx expo run:android

# For iOS (requires Xcode setup, macOS only)
npx expo run:ios
```

### Development Options
```bash
# Start with tunnel (useful for testing on physical devices)
npx expo start --tunnel

# Start with specific platform
npx expo start --android
npx expo start --ios

# Clear cache if you encounter issues
npx expo start --clear
```

## Step 6: Test the Application

### Basic Functionality Test
1. **Create room** - Tap "Create Room" button
2. **Share code** - Copy the generated room code
3. **Join room** - Use "Join Room" with the code
4. **Test features** - Camera, microphone, screen sharing

### Verification Checklist
- ✅ App launches without errors
- ✅ Camera permission requested and granted
- ✅ Microphone permission requested and granted
- ✅ Room creation successful
- ✅ Room joining successful
- ✅ Video/audio working in both directions
- ✅ Screen sharing functional

## Understanding the Architecture

### Current Implementation (Demo Mode)
```
App → Video API (using management token)
```
**What this shows:**
- Basic video chat functionality
- Room creation and management
- User interface design patterns
- Real-time communication

**What this doesn't show:**
- Proper security practices
- User authentication
- Scalable backend design
- Production-ready architecture

### Production Architecture (Documented)
```
App → Your Backend → Video API
     ↓              ↓
  Auth Token   Management Token
```

## Environment Variables Explained

### Required Variables
- **`EXPO_PUBLIC_HMS_TEMPLATE_ID`** - Video room configuration template from 100ms dashboard
- **`EXPO_PUBLIC_HMS_MANAGEMENT_TOKEN`** - Management token for API access (development only)

### Optional Variables
- **`EXPO_PUBLIC_HMS_ROOM_NAME_PREFIX`** - Default room name prefix (default: "Meeting")
- **`EXPO_PUBLIC_HMS_DEFAULT_USERNAME`** - Default username for guests (default: "Guest")

## Development Workflow

### 1. Explore the Code
- **Start with `app/index.tsx`** - Main application logic and navigation
- **Check `lib/hms-service.ts`** - API integration patterns and 100ms SDK usage
- **Review `components/`** - Reusable UI components (JoinRoomModal, RoomCodeModal)
- **Examine `docs/`** - Architecture and security guides

### 2. Make Changes
- **Modify the UI** - Change colors, layouts, and components
- **Add features** - Implement chat, recording, or custom controls
- **Improve UX** - Better error handling and user feedback
- **Customize branding** - Update app icons, splash screen, and colors

### 3. Test Thoroughly
- **Test on real devices** - Simulators don't support camera/microphone
- **Test different scenarios** - Poor network, device rotation, background/foreground
- **Test edge cases** - Invalid inputs, network failures, permission denials
- **Test multiple devices** - Ensure compatibility across different screen sizes

## Troubleshooting

### Common Build Issues

#### Metro Bundler Issues
```bash
# Clear cache
npx expo start --clear

# Reset Metro cache
npx expo start --reset-cache

# Clear npm cache
npm cache clean --force
```

#### Native Build Issues
```bash
# Clean native build
npx expo prebuild --clean

# Reinstall dependencies
rm -rf node_modules && npm install

# Clear Android build cache
cd android && ./gradlew clean && cd ..

# Clear iOS build cache
cd ios && xcodebuild clean && cd ..
```

#### Dependency Conflicts
```bash
# Check for conflicting packages
npm ls

# Force resolution of peer dependencies
npm install --legacy-peer-deps --force

# Update Expo SDK if needed
npx expo install --fix
```

### Permission Issues
- **Camera/Microphone**: Use real device, not simulator
- **Build failures**: Ensure native development environment is set up correctly
- **Network issues**: Check firewall and proxy settings
- **Permission denied**: Check device settings and app permissions

### API Errors
- **Invalid template ID**: Verify template exists and is active in 100ms dashboard
- **Token expired**: Generate new management token
- **Permission denied**: Check API key permissions and quotas
- **Network errors**: Verify internet connection and firewall settings

### Platform-Specific Issues

#### Android
- **Build fails**: Ensure ANDROID_HOME is set correctly
- **App crashes**: Check logcat for detailed error messages
- **Permission issues**: Verify AndroidManifest.xml permissions

#### iOS
- **Build fails**: Ensure Xcode and command line tools are installed
- **Signing issues**: Check Apple Developer account and provisioning profiles
- **Simulator issues**: Use real device for camera/microphone testing

## Learning Path

### Beginner (Current Demo)
- ✅ **Run the app** and understand the flow
- ✅ **Explore the code** and see how components work
- ✅ **Modify the UI** to learn React Native
- ✅ **Test on real devices** to understand mobile development

### Intermediate (Backend Integration)
- 🔄 **Set up a backend server** following BACKEND.md guide
- 🔄 **Implement proper authentication** with JWT
- 🔄 **Add user management** and role-based access
- 🔄 **Implement room persistence** and user sessions

### Advanced (Production Deployment)
- 🔄 **Deploy to cloud platforms** (AWS, Google Cloud, etc.)
- 🔄 **Add monitoring and logging** for production use
- 🔄 **Implement advanced features** (recording, analytics, etc.)
- 🔄 **Add CI/CD pipelines** for automated testing and deployment

## Next Steps

- ✅ **Demo working?** Great! Now explore the codebase
- ✅ **Want to learn more?** Check out the architecture docs
- ✅ **Ready to build?** Use this as a foundation for your own app
- ✅ **Want to contribute?** Fork the repo and submit pull requests
- ✅ **Need help?** Check the troubleshooting section or open an issue

## Resources for Learning

### React Native & Expo
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Community](https://forums.expo.dev/)
- [Expo Discord](https://discord.gg/expo)

### Backend Development
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [JWT.io](https://jwt.io/) for token understanding
- [100ms Backend Examples](https://github.com/100mslive/100ms-examples)

### Video & WebRTC
- [WebRTC Fundamentals](https://webrtc.org/getting-started/overview)
- [Real-time Communication](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)
- [100ms Documentation](https://docs.100ms.live/)

### Development Tools
- [Android Studio Guide](https://developer.android.com/studio/intro)
- [Xcode Documentation](https://developer.apple.com/xcode/)
- [Git Documentation](https://git-scm.com/doc)

## Support & Community

- **GitHub Issues**: Report bugs and request features
- **100ms Discord**: Get help with video infrastructure
- **Expo Forums**: React Native and Expo support
- **Stack Overflow**: General development questions

---

**This is a learning project.** Take your time, experiment with the code, and don't hesitate to ask questions or contribute improvements! 🚀

**Remember**: The demo mode is for learning purposes only. For production use, implement the backend architecture described in BACKEND.md.