# Backend Setup Guide 🔐

How to implement a proper backend for 100ms video chat with secure authentication.

## Why You Need a Backend

The demo app uses management tokens directly in the client, which is **not secure for production**. A proper backend:

- 🔒 **Keeps secrets secure** (app_secret never exposed)
- 👥 **Manages user authentication** 
- 📊 **Controls room creation** and access
- 💰 **Tracks usage** for billing
- 🛡️ **Prevents abuse** with rate limiting

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

**Response:**
```json
{
  "success": true,
  "room": {
    "id": "room_123",
    "name": "Team Meeting",
    "description": "Weekly standup",
    "room_code": "abc-def-ghi"
  }
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

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
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

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "room": {
    "id": "room_123",
    "name": "Team Meeting"
  }
}
```

## Implementation Examples

### Node.js/Express Backend

First, install required dependencies:

```bash
npm install express jsonwebtoken uuid cors helmet express-rate-limit
```

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

app.use(express.json());

// Input validation middleware
const validateRoomInput = (req, res, next) => {
  const { name, description } = req.body;
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'Room name is required and must be a non-empty string' });
  }
  if (description && typeof description !== 'string') {
    return res.status(400).json({ error: 'Description must be a string' });
  }
  next();
};

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
app.post('/api/rooms', authenticateUser, validateRoomInput, async (req, res) => {
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
        name: name.trim(),
        description: description?.trim() || '',
        template_id: process.env.HMS_TEMPLATE_ID,
        region: 'auto',
        size: 100,
      }),
    });

    if (!roomResponse.ok) {
      const errorData = await roomResponse.json();
      throw new Error(`100ms API error: ${errorData.message || roomResponse.statusText}`);
    }

    const roomData = await roomResponse.json();
    
    res.status(201).json({
      success: true,
      room: {
        id: roomData.id,
        name: roomData.name,
        description: roomData.description,
        room_code: roomData.room_code
      },
    });
  } catch (error) {
    console.error('Room creation error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to create room',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Generate auth token endpoint
app.post('/api/rooms/:roomId/token', authenticateUser, async (req, res) => {
  try {
    const { roomId } = req.params;
    const { role, userId } = req.body;
    
    if (!role || !userId) {
      return res.status(400).json({ error: 'Role and userId are required' });
    }
    
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
    console.error('Token generation error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to generate token' 
    });
  }
});

// Join room endpoint
app.post('/api/rooms/:roomId/join', authenticateUser, async (req, res) => {
  try {
    const { roomId } = req.params;
    const { role, userId } = req.body;
    
    if (!role || !userId) {
      return res.status(400).json({ error: 'Role and userId are required' });
    }
    
    // Verify room exists (optional - you might want to check this)
    const roomResponse = await fetch(`https://api.100ms.live/v2/rooms/${roomId}`, {
      headers: {
        'Authorization': `Bearer ${generateManagementToken()}`,
      },
    });
    
    if (!roomResponse.ok) {
      return res.status(404).json({ error: 'Room not found' });
    }
    
    const roomData = await roomResponse.json();
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
      room: {
        id: roomData.id,
        name: roomData.name,
        description: roomData.description
      }
    });
  } catch (error) {
    console.error('Join room error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to join room' 
    });
  }
});

// Generate management token (for backend use only)
function generateManagementToken() {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    access_key: process.env.HMS_APP_ACCESS_KEY,
    type: 'management',
    version: 2,
    iat: now,
    nbf: now,
    exp: now + (24 * 60 * 60), // 24 hours from now
  };

  return jwt.sign(payload, process.env.HMS_APP_SECRET, {
    algorithm: 'HS256',
    jwtid: uuidv4(),
  });
}

// Generate auth token (for client use)
function generateAuthToken({ roomId, role, userId, appAccessKey, appSecret }) {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    access_key: appAccessKey,
    room_id: roomId,
    user_id: userId,
    role: role,
    type: 'app',
    version: 2,
    iat: now,
    nbf: now,
    exp: now + (24 * 60 * 60), // 24 hours from now
  };

  return jwt.sign(payload, appSecret, {
    algorithm: 'HS256',
    jwtid: uuidv4(),
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
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
ALLOWED_ORIGINS=https://yourapp.com,https://admin.yourapp.com

# Security
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Client App Updates

Update your React Native app to use the backend:

```typescript
// lib/hms-service.ts
interface CreateRoomOptions {
  name: string;
  description?: string;
}

interface CreateRoomResponse {
  success: boolean;
  room?: {
    id: string;
    name: string;
    description: string;
    room_code: string;
  };
  error?: string;
}

interface JoinRoomResponse {
  success: boolean;
  token?: string;
  room?: {
    id: string;
    name: string;
    description: string;
  };
  error?: string;
}

class HMSServiceClass {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:3000/api';
  }

  async createRoom(options: CreateRoomOptions): Promise<CreateRoomResponse> {
    try {
      const userToken = await this.getUserToken();
      if (!userToken) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(`${this.baseUrl}/rooms`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create room');
      }
      
      return data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async getAuthToken(roomId: string, role: string): Promise<string> {
    const userToken = await this.getUserToken();
    if (!userToken) {
      throw new Error('User not authenticated');
    }

    const response = await fetch(`${this.baseUrl}/rooms/${roomId}/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role, userId: await this.getUserId() }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to generate token');
    }
    
    return data.token;
  }

  async joinRoom(roomId: string, role: string): Promise<JoinRoomResponse> {
    try {
      const userToken = await this.getUserToken();
      if (!userToken) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(`${this.baseUrl}/rooms/${roomId}/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role, userId: await this.getUserId() }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to join room');
      }
      
      return data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private async getUserToken(): Promise<string | null> {
    // Get from your authentication system
    // This could be from AsyncStorage, secure store, etc.
    try {
      // Example using AsyncStorage
      // return await AsyncStorage.getItem('user_token');
      return 'user_jwt_token_here';
    } catch (error) {
      console.error('Failed to get user token:', error);
      return null;
    }
  }

  private async getUserId(): Promise<string> {
    // Get user ID from your authentication system
    try {
      // Example using AsyncStorage
      // return await AsyncStorage.getItem('user_id');
      return 'user_123';
    } catch (error) {
      console.error('Failed to get user ID:', error);
      return 'unknown_user';
    }
  }
}

export const HMSService = new HMSServiceClass();
```

## Security Best Practices

1. **Never expose app_secret** to client apps
2. **Use HTTPS** for all API communications
3. **Implement rate limiting** to prevent abuse
4. **Validate user permissions** before room access
5. **Log all API calls** for monitoring
6. **Use short-lived tokens** (24 hours max)
7. **Validate all input** to prevent injection attacks
8. **Use CORS** to restrict cross-origin requests
9. **Implement proper error handling** without exposing sensitive information
10. **Use environment variables** for all configuration

## Testing Your Backend

1. **Start backend server** - `npm start`
2. **Update client app** - Point to your backend URL
3. **Test room creation** - Verify rooms are created in 100ms dashboard
4. **Test auth tokens** - Verify tokens work with 100ms SDK
5. **Test error scenarios** - Invalid tokens, missing fields, etc.
6. **Test rate limiting** - Verify abuse prevention works

## Deployment

- **Use environment variables** for all secrets
- **Enable HTTPS** in production
- **Set up monitoring** and logging
- **Implement health checks** for your API endpoints
- **Use a process manager** like PM2 or Docker
- **Set up CI/CD** for automated deployments
- **Monitor API performance** and error rates

## Troubleshooting

### Common Issues

1. **CORS errors** - Check ALLOWED_ORIGINS configuration
2. **Token validation fails** - Verify JWT_SECRET is set correctly
3. **100ms API errors** - Check your credentials and template ID
4. **Rate limiting too strict** - Adjust RATE_LIMIT_MAX_REQUESTS

### Debug Mode

Set `NODE_ENV=development` to get detailed error messages in responses.

---

**Need help?** [100ms Discord](https://100ms.live/discord) | [Backend Examples](https://github.com/100mslive/100ms-examples)
