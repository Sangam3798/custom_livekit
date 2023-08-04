import React from 'react';
export interface VideoSelectButtonProps {
    isEnabled: boolean;
    onClick?: () => void;
    onSourceSelected?: (device: MediaDeviceInfo) => void;
    disableText?: string;
    enableText?: string;
    requestPermissions?: boolean;
    className?: string;
    isButtonDisabled?: boolean;
    popoverContainerClassName?: string;
    popoverTriggerBtnClassName?: string;
    popoverTriggerBtnSeparatorClassName?: string;
}
export declare const VideoSelectButton: ({ isEnabled, onClick, onSourceSelected, disableText, enableText, requestPermissions, className, isButtonDisabled, popoverContainerClassName, popoverTriggerBtnClassName, popoverTriggerBtnSeparatorClassName, }: VideoSelectButtonProps) => React.JSX.Element;
