# Troubleshooting Guide 🛠️

Quick fixes for common issues.

## App Won't Start

### Metro Error
```bash
npx expo start --clear
```

### Missing Modules
```bash
npm install --legacy-peer-deps
```

## Video Issues

### Camera/Microphone Not Working
- **Use a real device** (not simulator)
- **Check permissions** in device settings
- **Restart the app** after granting permissions

### Black Screen
- **Wait a few seconds** - video takes time to load
- **Check internet** - video chat needs good connection
- **Restart the app** if it persists

## Build Issues

### Android Build Fails
```bash
npx expo prebuild --clean
npx expo run:android
```

### iOS Build Fails
```bash
npx expo prebuild --clean
npx expo run:ios
```

## API Issues

### "Room not found"
- Check your `.env` file has correct keys
- Verify your 100ms account is active
- Check API quotas (free tier has limits)

### "Authentication failed"
- Generate new management token (they expire)
- Check your 100ms credentials
- Verify template ID exists

## Quick Fixes

1. **Restart everything** (app, terminal, computer)
2. **Clear cache** (`npx expo start --clear`)
3. **Reinstall dependencies** (`rm -rf node_modules && npm install`)
4. **Check your keys** (make sure `.env` file is correct)

## Still Stuck?

- **100ms Documentation**: [docs.100ms.live](https://docs.100ms.live)
- **100ms Examples**: [github.com/100mslive/100ms-examples](https://github.com/100mslive/100ms-examples)
- **Expo Help**: [forums.expo.dev](https://forums.expo.dev)

---

**Remember**: Most issues are simple to fix. Don't give up! 🚀