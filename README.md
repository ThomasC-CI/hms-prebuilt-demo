# HMS Prebuilt Demo 🎥

A complete video chat app built with Expo and 100ms Prebuilt UI.

## 🎯 What You'll Build

- ✅ **Room Creation & Joining** - Users create rooms and get codes
- ✅ **Professional Video Chat** - Full-featured video calling interface
- ✅ **Cross-Platform** - Works on iOS and Android
- ✅ **Minimal Code** - Built in just 3 main files

## 🚀 Quick Start (5 minutes)

### Prerequisites
- **Node.js** 18+ and **Expo CLI**
- **100ms Account** - [Sign up here](https://100ms.live)

### Setup
```bash
# 1. Clone and install
git clone https://github.com/ThomasC-CI/hms-prebuilt-demo.git
cd hms-prebuilt-demo
npm install --legacy-peer-deps

# 2. Configure 100ms
cp .env.example .env
# Add your 100ms credentials to .env

# 3. Run the app
npx expo prebuild --clean
npx expo run:android
```

## ️ How It Works

### Architecture

```
User Interface → HMS Service → 100ms API → Video Chat
```

## 🧪 Test Your App

1. **Create a room** - Tap "Create Room" button
2. **Copy the room code** that appears
3. **Join the room** - Use "Join Room" with the code
4. **Grant permissions** for camera/microphone

## 🔒 Production Ready?

**Current**: Demo mode (not secure for production)
**Production**: Add backend following [BACKEND.md](docs/BACKEND.md)

## 📚 Documentation

- **[Installation](docs/INSTALLATION.md)** - Detailed setup guide
- **[Backend](docs/BACKEND.md)** - Add secure backend
- **[Security](docs/SECURITY.md)** - Production considerations
- **[Troubleshooting](docs/TROUBLESHOOTING.md)** - Common issues

## 🆘 Need Help?

- **100ms Discord**: [discord.gg/100ms](https://discord.gg/100ms)
- **Expo Forums**: [forums.expo.dev](https://forums.expo.dev)
- **GitHub Issues**: Report bugs in this repository

## 🚀 Next Steps

1. ✅ **Get the demo running**
2. ✅ **Explore the code** - Understand how it works
3. ✅ **Customize the UI** - Make it your own
4. 🔄 **Add a backend** - Make it production-ready

---

**Happy coding!** 🎉 If this helps, please give it a star ⭐️

**Questions?** Join the [100ms Discord](https://discord.gg/100ms) community!