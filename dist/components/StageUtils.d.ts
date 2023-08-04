import { Participant } from 'livekit-client';
/**
 * Default sort for participants, it'll order participants by:
 * 1. dominant speaker (speaker with the loudest audio level)
 * 2. local participant
 * 3. other speakers that are recently active
 * 4. participants with video on
 * 5. by joinedAt
 */
export declare function defaultSortParticipants(participants: Participant[]): Participant[];
