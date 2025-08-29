# Troubleshooting Guide 🛠️

Common issues and solutions for developers working with this video chat application.

## App Won't Start

### "Metro bundler error"
```bash
npx expo start --clear
```

### "Can't resolve module"
```bash
npm install
```

### "Permission denied"
- Make sure you're in the right folder
- Check that you have Node.js installed
- Verify Expo CLI is up to date: `npm install -g @expo/cli@latest`

## Video Chat Issues

### Camera/Microphone not working
- **Use a real device** (not simulator)
- **Check permissions** in your phone settings
- **Restart the app** after granting permissions
- **Verify device compatibility** - some older devices may have issues

### "Room not found" error
- Make sure your `.env` file has the correct keys
- Check that your 100ms account is active
- Verify your template ID is correct
- **Check API quotas** - free tier has limits

### Black screen in video chat
- **Wait a few seconds** - video can take time to load
- **Check your internet** - video chat needs good connection
- **Restart the app** if it persists
- **Verify WebRTC support** on your device

### Audio/video quality issues
- **Check network speed** - video chat needs stable connection
- **Reduce video resolution** if on slow networks
- **Close other apps** to free up device resources
- **Check device temperature** - overheating can affect performance

## Build Issues

### "Gradle build failed"
- Make sure you have the latest Expo CLI
- Try `npx expo prebuild --clean`
- Check that all dependencies are installed
- **Verify Android SDK** is properly configured

### "Missing native module"
```bash
npx expo install --fix
```

### "iOS build failed"
- **Check Xcode version** - ensure it's up to date
- **Verify iOS deployment target** - should be 13.0+
- **Check CocoaPods** - run `cd ios && pod install`
- **Clean build folder** - Product → Clean Build Folder in Xcode

## API and Network Issues

### "Network request failed"
- Check your internet connection
- Make sure your 100ms keys are correct
- **Verify API endpoints** - 100ms uses v2 API
- **Check rate limits** - free tier has request limits
- Try again in a few minutes

### "Authentication failed"
- **Verify token expiration** - management tokens expire in 7-14 days
- **Check app credentials** - ensure App Access Key and Secret are correct
- **Verify template ID** - must exist and be active
- **Check account status** - ensure account is not suspended

### "Room creation failed"
- **Check room limits** - free tier has room creation limits
- **Verify template configuration** - ensure template is properly set up
- **Check region settings** - some regions may have restrictions
- **Verify account permissions** - ensure account can create rooms

## Common Error Messages

### "Invalid prop style supplied to React.Fragment"
- **This is normal** - it's a warning from 100ms components
- **Doesn't affect functionality** - video chat still works
- **Can be ignored** - it's a known issue with the current version
- **Will be fixed** in future 100ms SDK updates

### "WebRTC connection failed"
- **Check network connectivity** - WebRTC needs stable connection
- **Verify firewall settings** - some networks block WebRTC
- **Check STUN/TURN servers** - ensure 100ms can establish connection
- **Try different network** - mobile vs WiFi

### "Device not supported"
- **Check device requirements** - iOS 13+ / Android 6+
- **Verify camera/microphone** - ensure hardware is working
- **Check app permissions** - camera and microphone access required
- **Update device OS** - older versions may not be supported

## Performance Issues

### App is slow or laggy
- **Close background apps** - free up device resources
- **Check device storage** - ensure adequate free space
- **Update device OS** - newer versions have better performance
- **Reduce video quality** - lower resolution for better performance

### High battery usage
- **Close unused apps** - background apps consume battery
- **Reduce screen brightness** - lower brightness saves battery
- **Check network usage** - poor connection causes retries
- **Use WiFi when possible** - mobile data uses more power

## Getting More Help

### Check the Logs
- Look at your terminal for error messages
- Check the Expo Go app for any error popups
- **Enable verbose logging** - add `--verbose` to expo start

### Common Solutions
1. **Restart everything** (app, terminal, computer)
2. **Clear cache** (`npx expo start --clear`)
3. **Reinstall dependencies** (`rm -rf node_modules && npm install`)
4. **Check your keys** (make sure `.env` file is correct)
5. **Update Expo CLI** (`npm install -g @expo/cli@latest`)

### Still Stuck?
- **100ms Discord**: [discord.gg/100ms](https://discord.gg/100ms)
- **100ms Support**: [support@100ms.live](mailto:support@100ms.live)
- **Expo Help**: [forums.expo.dev](https://forums.expo.dev)
- **GitHub Issues**: Report bugs in this repository

## Version Compatibility Notes

### Current Versions (as of 2024)
- **100ms SDK**: v1.11.0
- **Expo SDK**: 53
- **React Native**: 0.79.6
- **API Version**: v2

### Breaking Changes
- **100ms v1.11.0** introduced some UI improvements
- **Expo SDK 53** requires Node.js 18+
- **React Native 0.79** has improved performance

---

**Remember**: Most issues are simple to fix. Don't give up! 🚀

**Pro tip**: Join the [100ms Discord](https://discord.gg/100ms) - the community is very helpful and the team often responds quickly to questions.