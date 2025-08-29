# Backend Setup Guide ��️

How to implement a proper backend for 100ms video chat with secure authentication.

## Why You Need a Backend

The demo app uses management tokens directly in the client, which is **not secure for production**. A proper backend:

- 🔒 **Keeps secrets secure** (app_secret never exposed)
- 👥 **Manages user authentication** 
- 📊 **Controls room creation** and access
- 💰 **Tracks usage** for billing
- �� **Prevents abuse** with rate limiting

## Architecture Overview

```
Client App → Your Backend → 100ms API
     ↓              ↓           ↓
  Auth Token   Management   Room Data
                Token
```

## Required Endpoints

### 1. Create Room
```http
POST /api/rooms
Authorization: Bearer <user_token>
Content-Type: application/json

{
  "name": "Team Meeting",
  "description": "Weekly standup"
}
```

### 2. Generate Auth Token
```http
POST /api/rooms/:roomId/token
Authorization: Bearer <user_token>
Content-Type: application/json

{
  "role": "host",
  "userId": "user_123"
}
```

### 3. Join Room
```http
POST /api/rooms/:roomId/join
Authorization: Bearer <user_token>
Content-Type: application/json

{
  "role": "guest",
  "userId": "user_456"
}
```

## Implementation Examples

### Node.js/Express Backend

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

// Middleware to verify user authentication
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Create room endpoint
app.post('/api/rooms', authenticateUser, async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // Call 100ms API to create room
    const roomResponse = await fetch('https://api.100ms.live/v2/rooms', {
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

    const roomData = await roomResponse.json();
    
    res.json({
      success: true,
      room: roomData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate auth token endpoint
app.post('/api/rooms/:roomId/token', authenticateUser, async (req, res) => {
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
    
    res.json({
      success: true,
      token: authToken,
    });
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
    nbf: Math.floor(Date.now() / 1000),
  };

  return jwt.sign(payload, process.env.HMS_APP_SECRET, {
    algorithm: 'HS256',
    expiresIn: '24h',
    jwtid: uuidv4(),
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
    nbf: Math.floor(Date.now() / 1000),
  };

  return jwt.sign(payload, appSecret, {
    algorithm: 'HS256',
    expiresIn: '24h',
    jwtid: uuidv4(),
  });
}

app.listen(3000, () => {
  console.log('Backend running on port 3000');
});
```

### Environment Variables for Backend

```bash
# 100ms Configuration
HMS_APP_ACCESS_KEY=your_app_access_key
HMS_APP_SECRET=your_app_secret
HMS_TEMPLATE_ID=your_template_id

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h

# Server Configuration
PORT=3000
NODE_ENV=production
```

## Client App Updates

Update your React Native app to use the backend:

```typescript
// lib/hms-service.ts
class HMSServiceClass {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'http://your-backend-url.com/api';
  }

  async createRoom(request?: CreateRoomRequest): Promise<CreateRoomResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/rooms`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await this.getUserToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
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
        'Authorization': `Bearer ${await this.getUserToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role, userId: 'user_123' }),
    });

    const data = await response.json();
    return data.token;
  }

  private async getUserToken(): Promise<string> {
    // Get from your authentication system
    // This could be from AsyncStorage, secure store, etc.
    return 'user_jwt_token_here';
  }
}
```

## Security Best Practices

1. **Never expose app_secret** to client apps
2. **Use HTTPS** for all API communications
3. **Implement rate limiting** to prevent abuse
4. **Validate user permissions** before room access
5. **Log all API calls** for monitoring
6. **Use short-lived tokens** (24 hours max)

## Testing Your Backend

1. **Start backend server** - `npm start`
2. **Update client app** - Point to your backend URL
3. **Test room creation** - Verify rooms are created in 100ms dashboard
4. **Test auth tokens** - Verify tokens work with 100ms SDK

## Deployment

- **Use environment variables** for all secrets
- **Enable HTTPS** in production
- **Set up monitoring** and logging
- **Implement health checks** for your API endpoints

---

**Need help?** [100ms Discord](https://100ms.live/discord) | [Backend Examples](https://github.com/100mslive/100ms-examples)
