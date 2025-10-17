import { css } from '@emotion/react';

export const colorPalette = css`
  :root {
    --red: #f44336;
    --blue: #2196f3;
    --green: #4caf50;
    --white: #fff;
    --black: #212121;
    --lightgrey: #e5e5e5;
    --grey: #888;
    --darkgrey: #444;
  }
`;

export const colors = {
  red: 'var(--red)',
  blue: 'var(--blue)',
  green: 'var(--green)',
  white: 'var(--white)',
  black: 'var(--black)',
  lightgrey: 'var(--lightgrey)',
  grey: 'var(--grey)',
  darkgrey: 'var(--darkgrey)',
};

export type Colors = keyof typeof colors;
