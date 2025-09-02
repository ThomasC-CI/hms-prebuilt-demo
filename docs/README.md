# Quick Reference 📚

Quick access to key information for the HMS Prebuilt Demo.

##  Get Started Fast

1. **Clone & Install**: `git clone [repo] && npm install --legacy-peer-deps`
2. **Set up 100ms**: Get credentials from [100ms.live](https://100ms.live)
3. **Configure**: Copy `.env.example` to `.env` and add your keys
4. **Run**: `npx expo prebuild --clean && npx expo run:android`

## 📁 Key Files

- **`app/index.tsx`** - Main screen (create/join rooms)
- **`lib/hms-service.ts`** - 100ms API integration
- **`app/[roomCode]/index.tsx`** - Video room screen

## 🔧 Common Tasks

### Add Custom UI
- Edit components in `components/` folder
- Modify styles in each component file
- Update theme colors in `app.json`

### Change Room Behavior
- Modify `lib/hms-service.ts` for API changes
- Update room options in `app/[roomCode]/index.tsx`

### Add New Features
- Create new routes in `app/` folder
- Follow existing patterns for consistency

## 🆘 Need Help?

- **Setup Issues**: [Installation Guide](INSTALLATION.md)
- **Backend**: [Backend Guide](BACKEND.md)  
- **Security**: [Security Guide](SECURITY.md)
- **Problems**: [Troubleshooting](TROUBLESHOOTING.md)

##  Full Documentation

- **Main README**: Complete project overview and setup
- **Installation**: Step-by-step setup instructions
- **Backend**: How to add a secure backend
- **Security**: Production security considerations
- **Troubleshooting**: Common issues and solutions

---

**Quick Start**: Follow the main README to get running, then use this for quick reference.