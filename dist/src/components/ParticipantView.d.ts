import React from "react";
import { Property } from "csstype";
import { Participant } from "livekit-client";
export interface ParticipantProps {
    participant: Participant;
    displayName?: string;
    width?: Property.Width;
    height?: Property.Height;
    className?: string;
    aspectWidth?: number;
    aspectHeight?: number;
    orientation?: "landscape" | "portrait";
    showOverlay?: boolean;
    showConnectionQuality?: boolean;
    speakerClassName?: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: () => void;
}
export declare const ParticipantView: ({ participant, width, height, className, speakerClassName, aspectWidth, aspectHeight, orientation, displayName, showOverlay, showConnectionQuality, onMouseEnter, onMouseLeave, onClick, }: ParticipantProps) => React.JSX.Element;
