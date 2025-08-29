# Installation Guide 📱

Complete setup guide for developers who want to learn from and build upon this video chat application.

## Prerequisites

- **Expo CLI** - `npm install -g @expo/cli`
- **Node.js** - Version 18+ recommended
- **Development Environment** - Android Studio / Xcode for native builds
- **API Account** - For video infrastructure (we use 100ms as an example)

## Understanding the Stack

This project demonstrates a **modern mobile development stack**:

- **Frontend**: React Native with Expo for cross-platform development
- **Backend**: Node.js with Express for scalable APIs
- **Video**: WebRTC-based infrastructure for real-time communication
- **Authentication**: JWT-based secure user management
- **Deployment**: Cloud-ready architecture for production use

## Step 1: API Account Setup

We use 100ms for video infrastructure, but the concepts apply to any WebRTC provider:

1. **Sign up** at [100ms.live](https://100ms.live) (free tier available)
2. **Navigate to Dashboard** → Developer section
3. **Copy credentials**:
   - App Access Key
   - App Secret
   - Template ID

> 💡 **Why 100ms?** We chose it for this demo because it's developer-friendly and has a generous free tier. The architectural patterns shown here work with any WebRTC provider.

## Step 2: Project Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd hms-prebuilt-demo

# Install dependencies (use --legacy-peer-deps for compatibility)
npm install --legacy-peer-deps
```

> 💡 **Why --legacy-peer-deps?** The HMS video packages have specific peer dependency requirements that conflict with some Expo SDK 53 packages. Using `--legacy-peer-deps` resolves these conflicts while maintaining full functionality.

## Step 3: Environment Configuration

```bash
# Copy environment template
cp .env.example .env
```

Update `.env` with your credentials:
```bash
# Video Infrastructure Configuration
EXPO_PUBLIC_HMS_TEMPLATE_ID=your_template_id_here
EXPO_PUBLIC_HMS_MANAGEMENT_TOKEN=your_management_token_here

# Note: HMS_APP_SECRET and HMS_JWT_SECRET are only needed
# when implementing a backend server (see docs/BACKEND.md)
```

## Step 4: Development Build

```bash
# Start development server
npx expo start

# For native builds (required for video functionality)
npx expo run:android
# or
npx expo run:ios
```

## Step 5: Test the Application

1. **Create room** - Tap "Create Room" button
2. **Share code** - Copy the generated room code
3. **Join room** - Use "Join Room" with the code
4. **Test features** - Camera, microphone, screen sharing

## Understanding the Architecture

### Current Implementation (Demo Mode)
```
App → Video API (using management token)
```
**What this shows:**
- Basic video chat functionality
- Room creation and management
- User interface design patterns

**What this doesn't show:**
- Proper security practices
- User authentication
- Scalable backend design

### Production Architecture (Documented)
```
App → Your Backend → Video API
     ↓              ↓
  Auth Token   Management Token
```

## Environment Variables Explained

### Required Variables
- **`EXPO_PUBLIC_HMS_TEMPLATE_ID`** - Video room configuration template
- **`EXPO_PUBLIC_HMS_MANAGEMENT_TOKEN`** - Management token for API access (development only)

### Optional Variables
- **`EXPO_PUBLIC_HMS_ROOM_NAME_PREFIX`** - Default room name prefix
- **`EXPO_PUBLIC_HMS_DEFAULT_USERNAME`** - Default username for guests

## Development Workflow

### 1. Explore the Code
- **Start with `app/index.tsx`** - Main application logic
- **Check `lib/hms-service.ts`** - API integration patterns
- **Review `components/`** - Reusable UI components
- **Examine `docs/`** - Architecture and security guides

### 2. Make Changes
- **Modify the UI** - Change colors, layouts, and components
- **Add features** - Implement chat, recording, or custom controls
- **Improve UX** - Better error handling and user feedback

### 3. Test Thoroughly
- **Test on real devices** - Simulators don't support camera/microphone
- **Test different scenarios** - Poor network, device rotation, etc.
- **Test edge cases** - Invalid inputs, network failures, etc.

## Troubleshooting

### Build Issues
```bash
# Clear cache
npx expo start --clear

# Clean native build
npx expo prebuild --clean

# Reinstall dependencies
rm -rf node_modules && npm install
```

### Permission Issues
- **Camera/Microphone**: Use real device, not simulator
- **Build failures**: Ensure native development environment is set up
- **Network issues**: Check firewall and proxy settings

### API Errors
- Verify environment variables are correct
- Check API account status and quotas
- Ensure template ID exists and is active

## Learning Path

### Beginner (Current Demo)
- ✅ **Run the app** and understand the flow
- ✅ **Explore the code** and see how components work
- ✅ **Modify the UI** to learn React Native

### Intermediate (Backend Integration)
- 🔄 **Set up a backend server** following the guides
- 🔄 **Implement proper authentication** with JWT
- 🔄 **Add user management** and role-based access

### Advanced (Production Deployment)
- 🔄 **Deploy to cloud platforms** (AWS, Google Cloud, etc.)
- 🔄 **Add monitoring and logging** for production use
- 🔄 **Implement advanced features** (recording, analytics, etc.)

## Next Steps

- ✅ **Demo working?** Great! Now explore the codebase
- ✅ **Want to learn more?** Check out the architecture docs
- ✅ **Ready to build?** Use this as a foundation for your own app
- ✅ **Want to contribute?** Fork the repo and submit pull requests

## Resources for Learning

### React Native & Expo
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Community](https://forums.expo.dev/)

### Backend Development
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [JWT.io](https://jwt.io/) for token understanding

### Video & WebRTC
- [WebRTC Fundamentals](https://webrtc.org/getting-started/overview)
- [Real-time Communication](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)

---

**This is a learning project.** Take your time, experiment with the code, and don't hesitate to ask questions or contribute improvements! 🚀