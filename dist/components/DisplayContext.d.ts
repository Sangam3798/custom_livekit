import React from 'react';
export interface DisplayOptions {
    stageLayout?: string;
    /** display debugging stats */
    showStats?: boolean;
}
export declare const DisplayContext: React.Context<DisplayOptions>;
