import { Property } from 'csstype';
import { Track } from 'livekit-client';
import React from 'react';
interface ScreenShareProps {
    track: Track;
    width?: Property.Width;
    height?: Property.Height;
}
export declare const ScreenShareView: ({ track, width, height }: ScreenShareProps) => React.JSX.Element;
export {};
