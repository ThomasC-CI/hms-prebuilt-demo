/**
 * Type definitions for 100ms room management
 * 
 * This file contains TypeScript interfaces for:
 * - Room creation requests and responses
 * - Room joining requests and responses
 * - Error handling and success states
 */

/**
 * Request parameters for creating a new room
 * 
 * @interface CreateRoomRequest
 */
export interface CreateRoomRequest {
  /** Name of the room to create */
  name?: string;
  /** Description of the room */
  description?: string;
}

/**
 * Response from room creation attempt
 * 
 * @interface CreateRoomResponse
 */
export interface CreateRoomResponse {
  /** Whether room creation was successful */
  success: boolean;
  /** ID of the created room (if successful) */
  roomId?: string;
  /** Guest code for joining the room (if successful) */
  guestCode?: string;
  /** Name of the created room (if successful) */
  roomName?: string;
  /** Error message if creation failed */
  error?: string;
}

/**
 * Request parameters for joining an existing room
 * 
 * @interface JoinRoomRequest
 */
export interface JoinRoomRequest {
  /** Room code to join */
  roomCode: string;
  /** Name of the user joining */
  userName?: string;
}

/**
 * Response from room join attempt
 * 
 * @interface JoinRoomResponse
 */
export interface JoinRoomResponse {
  /** Whether room join was successful */
  success: boolean;
  /** Code of the joined room (if successful) */
  roomCode?: string;
  /** Name of the joined room (if successful) */
  roomName?: string;
  /** Error message if join failed */
  error?: string;
}

// Basic room interfaces
export interface Room {
  id: string;
  code: string;
  name?: string;
  created_at: string;
  updated_at: string;
}

// 100ms API specific room interface
export interface HMSRoom {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
  customer_id: string;
  app_id: string;
  recording_info: {
    enabled: boolean;
    recording_source_template?: boolean;
  };
  template_id: string;
  template: string;
  region: string;
  created_at: string;
  updated_at: string;
}

// Room codes response interface
export interface RoomCode {
  code: string;
  room_id: string;
  role: string;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface RoomCodesResponse {
  limit: number;
  data: RoomCode[];
  last: string;
}

// API response interfaces
export interface CreateRoomOptions {
  name?: string;
  description?: string;
  templateId?: string;
  region?: string;
  size?: number;
  maxDurationSeconds?: number;
}

export interface CreateRoomResponse {
  success: boolean;
  room?: HMSRoom;
  roomCodes?: RoomCode[];
  guestCode?: string;
  hostCode?: string;
  error?: string;
}

export interface GetRoomResponse {
  success: boolean;
  room?: HMSRoom;
  error?: string;
}

// Room participants
export interface RoomParticipant {
  id: string;
  name: string;
  role: 'host' | 'guest';
  joined_at: string;
}

// User roles for 100ms
export type HMSUserRole = 'host' | 'guest' | 'hls-viewer' | 'rtmp-streaming';

// Room regions
export type HMSRegion = 'eu' | 'in' | 'us' | 'auto';
