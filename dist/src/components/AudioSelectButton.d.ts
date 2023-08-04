import React from 'react';
export interface AudioSelectButtonProps {
    isMuted: boolean;
    onClick?: () => void;
    onSourceSelected?: (device: MediaDeviceInfo) => void;
    isButtonDisabled?: boolean;
    muteText?: string;
    unmuteText?: string;
    className?: string;
    requestPermissions?: boolean;
    popoverContainerClassName?: string;
    popoverTriggerBtnClassName?: string;
    popoverTriggerBtnSeparatorClassName?: string;
}
export declare const AudioSelectButton: ({ isMuted, onClick, onSourceSelected, isButtonDisabled, muteText, unmuteText, requestPermissions, className, popoverContainerClassName, popoverTriggerBtnClassName, popoverTriggerBtnSeparatorClassName, }: AudioSelectButtonProps) => React.JSX.Element;
