import type { SxProps, Theme } from '@mui/material';

export const mergeSx = (...sxObjects: (SxProps<Theme> | false | undefined)[]): SxProps<Theme> =>
    Object.assign({}, ...sxObjects.filter(Boolean));