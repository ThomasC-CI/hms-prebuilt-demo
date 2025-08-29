import {
  CreateRoomOptions,
  CreateRoomResponse,
  GetRoomResponse,
  RoomCodesResponse
} from '@/types/room';

/**
 * 100ms Service for managing video call rooms via REST API
 * 
 * This service provides methods to:
 * - Create new video call rooms using the 100ms API
 * - Generate room codes for different user roles
 * - Retrieve room information
 * - Handle room lifecycle management
 * 
 * @class HMSService
 * @example
 * // Create a new room
 * const result = await hmsService.createRoom({
 *   name: 'Team Meeting',
 *   description: 'Weekly standup'
 * });
 * 
 * if (result.success) {
 *   console.log('Room created with code:', result.guestCode);
 * }
 */
export class HMSService {
  private managementToken: string;
  private baseUrl: string;

  /**
   * Initialize the HMS service with management token
   * 
   * @param {string} managementToken - 100ms management token for API access
   * @warning DEVELOPMENT ONLY: Management tokens should not be in client apps
   * See docs/SECURITY.md for production architecture
   */
  constructor(managementToken: string) {
    this.managementToken = managementToken;
    this.baseUrl = 'https://api.100ms.live/v2';
  }

  /**
   * Create a new room and generate room codes
   * 
   * This method performs a two-step process:
   * 1. Creates a room using the 100ms API
   * 2. Generates room codes for different user roles (host, guest)
   * 
   * @async
   * @param {CreateRoomOptions} [options] - Optional room creation parameters
   * @returns {Promise<CreateRoomResponse>} Room creation result with codes
   * 
   * @example
   * const result = await hmsService.createRoom({
   *   name: 'Demo Room',
   *   description: 'Test meeting room',
   *   templateId: 'template_123',
   *   size: 50
   * });
   * 
   * if (result.success) {
   *   // Share guest code with participants
   *   shareRoomCode(result.guestCode);
   * }
   */
  async createRoom(options: CreateRoomOptions = {}): Promise<CreateRoomResponse> {
    try {
      // Step 1: Create the room
      const roomResponse = await fetch(`${this.baseUrl}/rooms`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.managementToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: options.name || `demo-room-${Date.now()}`,
          description: options.description || 'Room created via HMS Demo App',
          template_id: options.templateId || process.env.EXPO_PUBLIC_HMS_TEMPLATE_ID,
          region: options.region || 'auto',
          size: options.size || 100,
          max_duration_seconds: options.maxDurationSeconds || 3600, // 1 hour
        }),
      });

      if (!roomResponse.ok) {
        const errorData = await roomResponse.json();
        throw new Error(`Failed to create room: ${errorData.message || roomResponse.status}`);
      }

      const roomData = await roomResponse.json();
      console.log('Room created:', roomData);

      // Step 2: Generate room codes (POST request, not GET)
      const codesResponse = await fetch(`${this.baseUrl}/room-codes/room/${roomData.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.managementToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // 100ms will generate codes for all roles in the template
        }),
      });

      if (!codesResponse.ok) {
        console.warn('Failed to generate room codes:', codesResponse.status);
        // Continue without room codes - user can still join with room ID
        return {
          success: true,
          room: roomData,
          roomCodes: [],
        };
      }

      const codesData: RoomCodesResponse = await codesResponse.json();
      console.log('Room codes generated:', codesData);

      // Find guest code instead of host code
      const guestCode = codesData.data.find(code => code.role === 'guest');
      const hostCode = codesData.data.find(code => code.role === 'host');
      
      console.log('Found codes:', { guestCode: guestCode?.code, hostCode: hostCode?.code });

      return {
        success: true,
        room: roomData,
        roomCodes: codesData.data,
        guestCode: guestCode?.code, // Add guest code specifically
        hostCode: hostCode?.code,   // Add host code for reference
      };
    } catch (error) {
      console.error('Failed to create room:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Get room information by room ID
   * 
   * Retrieves detailed information about an existing room including
   * participants, settings, and current status.
   * 
   * @async
   * @param {string} roomId - The unique identifier of the room
   * @returns {Promise<GetRoomResponse>} Room information or error
   * 
   * @example
   * const roomInfo = await hmsService.getRoom('room_abc123');
   * if (roomInfo.success) {
   *   console.log('Room name:', roomInfo.room.name);
   *   console.log('Participants:', roomInfo.room.participant_count);
   * }
   */
  async getRoom(roomId: string): Promise<GetRoomResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/rooms/${roomId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.managementToken}`,
        },
      });

      if (!response.ok) {
        return {
          success: false,
          error: `Room not found: ${response.status}`,
        };
      }

      const roomData = await response.json();
      return {
        success: true,
        room: roomData,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}

/**
 * Singleton instance of the HMS service
 * 
 * This instance is shared across the app and provides
 * access to all 100ms room management functionality.
 * 
 * @warning DEVELOPMENT ONLY: This uses a management token which should
 * not be exposed in client applications. See docs/SECURITY.md for
 * production architecture recommendations.
 */
export const hmsService = new HMSService(process.env.EXPO_PUBLIC_HMS_MANAGEMENT_TOKEN || '');
