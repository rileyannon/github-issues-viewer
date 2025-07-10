import path from 'path';
import { app } from 'electron';

export function getPreloadPath(): string {
    return path.join(app.getAppPath(), 'dist-electron', 'preload.cjs');
}