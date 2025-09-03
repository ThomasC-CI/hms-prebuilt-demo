# Installation Guide 📱

Get your 100ms video chat app running in 10 minutes.

## What You Need

- **Node.js** 18+ 
- **Expo CLI** - `npm install -g @expo/cli`
- **100ms Account** - [Sign up here](https://100ms.live)

## Quick Setup

### 1. Get Your App Running

```bash
# Clone and install
git clone https://github.com/ThomasC-CI/hms-prebuilt-demo.git
cd hms-prebuilt-demo
npm install --legacy-peer-deps

# Start the app
npx expo start
```

### 2. Set Up 100ms

1. **Go to [100ms.live](https://100ms.live)** and sign up
2. **Create a new app** in your dashboard
3. **Copy your credentials**:
   - App Access Key
   - App Secret  
   - Template ID

### 3. Configure Environment

```bash
# Copy the template
cp .env.example .env

# Add your 100ms credentials
EXPO_PUBLIC_HMS_TEMPLATE_ID=your_template_id_here
EXPO_PUBLIC_HMS_MANAGEMENT_TOKEN=your_management_token_here
```

### 4. Test on Device

```bash
# Build and run
npx expo prebuild --clean
npx expo run:android
# or
npx expo run:ios
```

**⚠️ Important**: Use a real device - simulators don't support camera/microphone.

## Test Your App

1. **Tap "Create Room"** - You'll get a room code
2. **Copy the code** and share it
3. **Tap "Join Room"** - Enter the code to join
4. **Grant permissions** for camera/microphone

## Common Issues

### App Won't Start
```bash
npx expo start --clear
```

### Build Fails
```bash
npx expo prebuild --clean
```

### Camera Not Working
- Use a real device (not simulator)
- Check camera permissions in device settings

## What's Next?

- ✅ **Demo working?** Great! Now explore the code
- 🔄 **Want a backend?** Check [BACKEND.md](BACKEND.md)
- 🔄 **Ready for production?** Read [SECURITY.md](SECURITY.md)

---

**Need help?** [100ms Documentation](https://docs.100ms.live) | [Expo Forums](https://forums.expo.dev)