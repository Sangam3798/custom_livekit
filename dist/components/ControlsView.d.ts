import { Room } from 'livekit-client';
import React from 'react';
export interface ControlsProps {
    room: Room;
    enableScreenShare?: boolean;
    enableAudio?: boolean;
    enableVideo?: boolean;
    onLeave?: (room: Room) => void;
}
export declare const ControlsView: ({ room, enableScreenShare, enableAudio, enableVideo, onLeave, }: ControlsProps) => React.JSX.Element;
