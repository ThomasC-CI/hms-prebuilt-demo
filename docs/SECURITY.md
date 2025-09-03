# Security Guide 🔒

Essential security information for 100ms video chat applications.

## ⚠️ Important: This is a Demo App

**Current Status**: This demo uses management tokens directly in the client, which is **not secure for production**.

**What This Means**: Anyone using your app can see your 100ms credentials and potentially abuse your account.

## �� For Production Use

### Quick Fix: Add a Backend
Instead of calling 100ms directly from your app, create a simple backend server that:
- Keeps your 100ms credentials secure
- Generates temporary tokens for users
- Controls who can create/join rooms

### Basic Backend Example
```javascript
// Your backend (Node.js/Express)
app.post('/api/rooms/:roomId/token', authenticateUser, (req, res) => {
  const authToken = generateAuthToken({
    roomId: req.params.roomId,
    role: req.body.role,
    userId: req.user.id,
    // Your 100ms credentials stay on the server
  });
  
  res.json({ token: authToken });
});
```

## �� Key Security Rules

### ✅ Do This
- Use environment variables for secrets
- Generate short-lived tokens (24 hours max)
- Validate user input
- Use HTTPS in production

### ❌ Don't Do This
- Expose app_secret to clients
- Use long-lived tokens
- Trust user input without validation
- Use HTTP in production

## 🛡️ Basic Security Checklist

- [ ] **Backend server** handles 100ms API calls
- [ ] **User authentication** required for room access
- [ ] **Environment variables** store secrets
- [ ] **HTTPS enabled** for all API calls
- [ ] **Input validation** on all endpoints

## 🚨 Common Mistakes

### 1. Exposing App Secret
```javascript
// ❌ NEVER do this
app.get('/api/config', (req, res) => {
  res.json({ appSecret: process.env.HMS_APP_SECRET });
});

// ✅ Do this instead
app.get('/api/config', (req, res) => {
  res.json({ templateId: process.env.HMS_TEMPLATE_ID });
});
```

### 2. No User Validation
```javascript
// ❌ Insecure
app.post('/api/rooms', (req, res) => {
  createRoom(req.body); // Anyone can create rooms!
});

// ✅ Secure
app.post('/api/rooms', authenticateUser, (req, res) => {
  if (!req.user.canCreateRooms) {
    return res.status(403).json({ error: 'Not allowed' });
  }
  createRoom(req.body, req.user.id);
});
```

## 📚 Next Steps

1. **Get the demo working** first
2. **Read the [Backend Guide](BACKEND.md)** for implementation details
3. **Test your backend** thoroughly
4. **Deploy with HTTPS** enabled

## 🆘 Need Help?

- **100ms Documentation**: [docs.100ms.live](https://docs.100ms.live)
- **Backend Examples**: [github.com/100mslive/100ms-examples](https://github.com/100mslive/100ms-examples)

---

**Remember**: Security doesn't have to be complicated. Start simple and add more security as your app grows.

**For now**: Focus on getting the demo working. Add security when you're ready for production.

