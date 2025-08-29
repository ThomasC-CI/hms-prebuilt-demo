/**
 * Type definitions for 100ms room management
 * 
 * This file contains TypeScript interfaces for:
 * - Room creation requests and responses
 * - Room code generation responses
 */

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

// API request/response interfaces
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
