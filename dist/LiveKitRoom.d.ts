import { Room, RoomOptions, RoomConnectOptions } from 'livekit-client';
import React from 'react';
import { ControlsProps } from './components/ControlsView';
import { ParticipantProps } from './components/ParticipantView';
import { StageProps } from './components/StageProps';
export interface RoomProps {
    url: string;
    token: string;
    roomOptions?: RoomOptions;
    connectOptions?: RoomConnectOptions;
    onConnected?: (room: Room) => void;
    onLeave?: (room: Room) => void;
    stageRenderer?: (props: StageProps) => React.ReactElement | null;
    participantRenderer?: (props: ParticipantProps) => React.ReactElement | null;
    controlRenderer?: (props: ControlsProps) => React.ReactElement | null;
}
export declare const LiveKitRoom: ({ url, token, roomOptions, connectOptions, stageRenderer, participantRenderer, controlRenderer, onConnected, onLeave, }: RoomProps) => React.JSX.Element | null;
