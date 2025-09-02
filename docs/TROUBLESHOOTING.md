# Troubleshooting Guide 🛠️

Common issues and solutions for developers working with this video chat application.

## Quick Start - Common Fixes

If you're having issues, try these solutions in order:

1. **Clear cache**: `npx expo start --clear`
2. **Restart app**: Close and reopen the app
3. **Check .env file**: Verify your 100ms credentials
4. **Update dependencies**: `npm install --legacy-peer-deps`
5. **Use real device**: Simulators don't support camera/microphone

## App Won't Start

### "Metro bundler error"
```bash
# Clear Metro cache
npx expo start --clear

# Reset Metro cache completely
npx expo start --reset-cache

# Kill Metro process and restart
npx expo start --clear --no-dev --minify
```

### "Can't resolve module"
```bash
# Reinstall dependencies
npm install --legacy-peer-deps

# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### "Permission denied"
- Make sure you're in the right folder
- Check that you have Node.js installed (version 18+)
- Verify Expo CLI is up to date: `npm install -g @expo/cli@latest`
- **Windows users**: Run PowerShell as Administrator
- **macOS/Linux users**: Check folder permissions with `ls -la`

### "Expo CLI not found"
```bash
# Install Expo CLI globally
npm install -g @expo/cli

# Verify installation
expo --version

# If still not found, check PATH environment variable
echo $PATH  # macOS/Linux
echo $env:PATH  # Windows PowerShell
```

## Video Chat Issues

### Camera/Microphone not working
- **Use a real device** (not simulator) - this is crucial!
- **Check permissions** in your phone settings:
  - iOS: Settings → Privacy & Security → Camera/Microphone
  - Android: Settings → Apps → Your App → Permissions
- **Restart the app** after granting permissions
- **Verify device compatibility** - some older devices may have issues
- **Check hardware**: Test camera/microphone in other apps

### "Room not found" error
- Make sure your `.env` file has the correct keys
- Check that your 100ms account is active
- Verify your template ID is correct
- **Check API quotas** - free tier has limits
- **Verify room exists** in 100ms dashboard
- **Check room code format** - should be like "abc-def-ghi"

### Black screen in video chat
- **Wait a few seconds** - video can take time to load
- **Check your internet** - video chat needs good connection
- **Restart the app** if it persists
- **Verify WebRTC support** on your device
- **Check device orientation** - try rotating device
- **Force close and reopen** the app

### Audio/video quality issues
- **Check network speed** - video chat needs stable connection
- **Reduce video resolution** if on slow networks
- **Close other apps** to free up device resources
- **Check device temperature** - overheating can affect performance
- **Use WiFi instead of mobile data** when possible
- **Check for network interference** (microwaves, etc.)

### "WebRTC connection failed"
- **Check network connectivity** - WebRTC needs stable connection
- **Verify firewall settings** - some networks block WebRTC
- **Check STUN/TURN servers** - ensure 100ms can establish connection
- **Try different network** - mobile vs WiFi
- **Check corporate networks** - some block WebRTC ports
- **Verify VPN settings** - VPNs can interfere with WebRTC

## Build Issues

### "Gradle build failed"
- Make sure you have the latest Expo CLI
- Try `npx expo prebuild --clean`
- Check that all dependencies are installed
- **Verify Android SDK** is properly configured
- **Check Java version** - should be JDK 17 or higher
- **Clear Gradle cache**: `cd android && ./gradlew clean`

### "Missing native module"
```bash
# Fix native module issues
npx expo install --fix

# Rebuild native code
npx expo prebuild --clean

# For specific modules
npx expo install react-native-hms
```

### "iOS build failed"
- **Check Xcode version** - ensure it's up to date (14.0+)
- **Verify iOS deployment target** - should be 13.0+
- **Check CocoaPods** - run `cd ios && pod install`
- **Clean build folder** - Product → Clean Build Folder in Xcode
- **Check signing** - verify Apple Developer account
- **Update CocoaPods**: `sudo gem install cocoapods`

### "Android build failed"
- **Check Android SDK** - ensure API level 33+ is installed
- **Verify Java version** - JDK 17+ required
- **Check ANDROID_HOME** environment variable
- **Update Android Studio** to latest version
- **Clean project**: `cd android && ./gradlew clean`

## API and Network Issues

### "Network request failed"
- Check your internet connection
- Make sure your 100ms keys are correct
- **Verify API endpoints** - 100ms uses v2 API
- **Check rate limits** - free tier has request limits
- Try again in a few minutes
- **Check CORS settings** if testing in browser
- **Verify network proxy** settings

### "Authentication failed"
- **Verify token expiration** - management tokens expire in 7-14 days
- **Check app credentials** - ensure App Access Key and Secret are correct
- **Verify template ID** - must exist and be active
- **Check account status** - ensure account is not suspended
- **Regenerate management token** if expired
- **Check account billing** - ensure account is active

### "Room creation failed"
- **Check room limits** - free tier has room creation limits
- **Verify template configuration** - ensure template is properly set up
- **Check region settings** - some regions may have restrictions
- **Verify account permissions** - ensure account can create rooms
- **Check template settings** - ensure video/audio are enabled
- **Verify room naming** - some special characters may cause issues

### "Rate limit exceeded"
- **Wait before retrying** - rate limits reset over time
- **Check your usage** in 100ms dashboard
- **Implement exponential backoff** in your app
- **Consider upgrading** to paid plan for higher limits

## Common Error Messages

### "Invalid prop style supplied to React.Fragment"
- **This is normal** - it's a warning from 100ms components
- **Doesn't affect functionality** - video chat still works
- **Can be ignored** - it's a known issue with the current version
- **Will be fixed** in future 100ms SDK updates
- **Suppress warning** by adding to your app configuration

### "Device not supported"
- **Check device requirements** - iOS 13+ / Android 6+
- **Verify camera/microphone** - ensure hardware is working
- **Check app permissions** - camera and microphone access required
- **Update device OS** - older versions may not be supported
- **Check device compatibility** in 100ms documentation

### "Permission denied" (Camera/Microphone)
- **Grant permissions** in device settings
- **Check app settings** - ensure permissions are enabled
- **Restart device** if permissions are stuck
- **Check other apps** - if they work, it's an app issue
- **Reset app permissions** and try again

## Performance Issues

### App is slow or laggy
- **Close background apps** - free up device resources
- **Check device storage** - ensure adequate free space
- **Update device OS** - newer versions have better performance
- **Reduce video quality** - lower resolution for better performance
- **Check memory usage** - close unnecessary browser tabs
- **Restart device** to clear memory

### High battery usage
- **Close unused apps** - background apps consume battery
- **Reduce screen brightness** - lower brightness saves battery
- **Check network usage** - poor connection causes retries
- **Use WiFi when possible** - mobile data uses more power
- **Enable battery saver** mode on device
- **Check for battery-draining apps**

### Video freezing or stuttering
- **Check network stability** - use speed test app
- **Reduce video quality** in app settings
- **Close other video apps** that might interfere
- **Check device performance** - older devices may struggle
- **Restart video call** if issue persists

## Platform-Specific Issues

### iOS Issues
- **Camera permission stuck**: Reset all settings → Privacy & Security
- **Build fails**: Update Xcode and iOS deployment target
- **App crashes**: Check iOS version compatibility
- **Audio routing**: Check audio output settings

### Android Issues
- **Permission denied**: Check app permissions in system settings
- **Build fails**: Verify Android SDK and Java version
- **App crashes**: Check Android version compatibility
- **Camera issues**: Check camera app permissions

## Advanced Debugging

### Enable Verbose Logging
```bash
# Start with verbose logging
npx expo start --verbose

# Check Metro logs
npx expo start --clear --no-dev

# Enable React Native debugging
# Add to your app: console.log('Debug info:', someVariable)
```

### Check Device Logs
```bash
# Android (requires device connected)
adb logcat | grep -i "your-app-name"

# iOS (requires device connected)
xcrun simctl spawn booted log stream --predicate 'process == "YourApp"'
```

### Network Debugging
```bash
# Check network connectivity
ping 8.8.8.8

# Test 100ms API endpoints
curl -I https://api.100ms.live/v2/rooms

# Check DNS resolution
nslookup api.100ms.live
```

## Getting More Help

### Check the Logs
- Look at your terminal for error messages
- Check the Expo Go app for any error popups
- **Enable verbose logging** - add `--verbose` to expo start
- **Check device logs** for native errors
- **Use React Native Debugger** for advanced debugging

### Common Solutions (Try in Order)
1. **Restart everything** (app, terminal, computer)
2. **Clear cache** (`npx expo start --clear`)
3. **Reinstall dependencies** (`rm -rf node_modules && npm install --legacy-peer-deps`)
4. **Check your keys** (make sure `.env` file is correct)
5. **Update Expo CLI** (`npm install -g @expo/cli@latest`)
6. **Clean native build** (`npx expo prebuild --clean`)
7. **Check device compatibility** and permissions

### Still Stuck?
- **100ms Discord**: [discord.gg/100ms](https://discord.gg/100ms)
- **100ms Support**: [support@100ms.live](mailto:support@100ms.live)
- **Expo Help**: [forums.expo.dev](https://forums.expo.dev)
- **GitHub Issues**: Report bugs in this repository
- **Stack Overflow**: Tag with `100ms` and `react-native`

## Version Compatibility Notes

### Current Versions (Latest Stable)
- **100ms SDK**: Check [npm package](https://www.npmjs.com/package/@100mslive/react-native-hms)
- **Expo SDK**: Check [Expo releases](https://docs.expo.dev/versions/latest/)
- **React Native**: Check [React Native releases](https://reactnative.dev/versions)
- **API Version**: v2 (latest)

### Breaking Changes
- **100ms SDK updates** may introduce UI/API changes
- **Expo SDK updates** may require Node.js version changes
- **React Native updates** may have breaking changes
- **Always check changelogs** before updating

### Recommended Versions
- **Node.js**: 18.17.0 or higher
- **npm**: 9.0.0 or higher
- **Expo CLI**: Latest stable version
- **Platform SDKs**: Latest stable versions

## Prevention Tips

### Before Starting Development
- **Read the documentation** thoroughly
- **Check system requirements** for all tools
- **Set up development environment** properly
- **Test on real devices** early and often

### During Development
- **Test frequently** on different devices
- **Handle errors gracefully** in your app
- **Implement proper logging** for debugging
- **Use TypeScript** to catch errors early

### Before Production
- **Test on multiple devices** and network conditions
- **Implement error monitoring** and crash reporting
- **Set up proper logging** and monitoring
- **Test edge cases** and error scenarios

---

**Remember**: Most issues are simple to fix. Don't give up! 🚀

**Pro tip**: Join the [100ms Discord](https://discord.gg/100ms) - the community is very helpful and the team often responds quickly to questions.

**Debugging mantra**: "When in doubt, restart and try again!" 🚀