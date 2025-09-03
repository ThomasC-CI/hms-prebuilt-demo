# Backend Setup Guide 🚀

How to add a simple backend for your 100ms video chat app.

## Why You Need a Backend

Right now, your app uses management tokens directly in the client. This works for demos but isn't secure for real apps.

A backend keeps your 100ms credentials safe and controls who can create/join rooms.

## Quick Setup

### 1. Create a Simple Node.js Server

```bash
mkdir hms-backend
cd hms-backend
npm init -y
npm install express jsonwebtoken cors
```

### 2. Basic Server Code

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Create room endpoint
app.post('/api/rooms', async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // Call 100ms API to create room
    const response = await fetch('https://api.100ms.live/v2/rooms', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${generateManagementToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        template_id: process.env.HMS_TEMPLATE_ID,
        region: 'auto',
        size: 100,
      }),
    });

    const roomData = await response.json();
    res.json({ success: true, room: roomData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate auth token endpoint
app.post('/api/rooms/:roomId/token', async (req, res) => {
  try {
    const { roomId } = req.params;
    const { role, userId } = req.body;
    
    const authToken = generateAuthToken({
      roomId,
      role,
      userId,
      appAccessKey: process.env.HMS_APP_ACCESS_KEY,
      appSecret: process.env.HMS_APP_SECRET,
    });
    
    res.json({ success: true, token: authToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate management token (for backend use only)
function generateManagementToken() {
  const payload = {
    access_key: process.env.HMS_APP_ACCESS_KEY,
    type: 'management',
    version: 2,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
  };

  return jwt.sign(payload, process.env.HMS_APP_SECRET, {
    algorithm: 'HS256',
  });
}

// Generate auth token (for client use)
function generateAuthToken({ roomId, role, userId, appAccessKey, appSecret }) {
  const payload = {
    access_key: appAccessKey,
    room_id: roomId,
    user_id: userId,
    role: role,
    type: 'app',
    version: 2,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
  };

  return jwt.sign(payload, appSecret, {
    algorithm: 'HS256',
  });
}

app.listen(3000, () => {
  console.log('Backend running on port 3000');
});
```

### 3. Environment Variables

Create a `.env` file:

```bash
HMS_APP_ACCESS_KEY=your_app_access_key
HMS_APP_SECRET=your_app_secret
HMS_TEMPLATE_ID=your_template_id
```

### 4. Update Your App

Change your `hms-service.ts` to call your backend instead of 100ms directly:

```typescript
// lib/hms-service.ts
class HMSServiceClass {
  private baseUrl: string = 'http://localhost:3000/api';

  async createRoom(options?: CreateRoomOptions): Promise<CreateRoomResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async getAuthToken(roomId: string, role: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/rooms/${roomId}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role, userId: `user_${Date.now()}` }),
    });

    const data = await response.json();
    return data.token;
  }
}
```

## What This Gives You

- ✅ **Secure credentials** - Your 100ms secrets stay on the server
- ✅ **User control** - You can add authentication later
- ✅ **Rate limiting** - Prevent abuse of your account
- ✅ **Usage tracking** - Monitor how your app is used

## Next Steps

1. **Get this basic backend working**
2. **Add user authentication** when you're ready
3. **Deploy to a cloud service** like Heroku or Railway

---

**Need help?** [100ms Documentation](https://docs.100ms.live) | [Backend Examples](https://github.com/100mslive/100ms-examples)
