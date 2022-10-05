export const colors = {
  grey1: '#141414',
  grey2: '#1d1d1d',
  grey3: '#262626',
  grey4: '#303030',
  grey5: '#434343',
  grey6: '#5A5A5A',
  grey7: '#7D7D7D',
  grey8: '#ACACAC',
  grey9: '#dbdbdb',
  grey10: '#F4F5F8',
  pinkkiBlack: '#262626',
  pinkki: '#f73097',
};

/**
 * sm 480
 * md 768
 * lg 1024
 * xl 1440
 */
export const breakpoints = [480, 768, 1024, 1440];

const theme = {
  space: [0, 4, 16, 24, 48, 64, 96, 128, 160, 192, 256],
  fonts: {
    body: 'PT Mono, system-ui, sans-serif',
    heading: 'Nixie One, cursive',
    monospace: '"Roboto Mono", monospace',
  },
  fontSizes: [12, 14, 16, 18, 20, 28, 40, 64, 96],
  fontWeights: {
    body: 400,
    heading: 600,
    bold: 600,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: colors.grey4,
    background: 'white',
    primary: colors.pinkkiBlack,
    secondary: colors.pinkki,
    stroke: colors.grey9,
    darkStroke: colors.grey7,
    ...colors,
  },
  breakpoints: breakpoints.map((bp) => `${bp}px`),
  sizes: {
    containerWidth: 1280,
  },
  cards: {
    primary: {
      padding: 3,
      borderRadius: 5,
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
    },
  },
  divider: {
    color: 'grey9',
  },
  text: {
    heading: {
      h1: {
        color: 'primary',
        fontFamily: 'heading',
        lineHeight: 'heading',
        fontWeight: 'heading',
        fontSize: [3, 4, 5],
      },
      h2: {
        color: 'primary',
        fontFamily: 'heading',
        lineHeight: 'heading',
        fontWeight: 'heading',
        fontSize: [3, 4],
      },
      h3: {
        color: 'primary',
        fontFamily: 'heading',
        lineHeight: 'heading',
        fontWeight: 'heading',
        fontSize: [1, 3],
      },
      h4: {
        color: 'primary',
        fontFamily: 'heading',
        lineHeight: 'heading',
        fontWeight: 'heading',
        fontSize: 1,
      },
      h5: {
        color: 'text',
        fontFamily: 'heading',
        lineHeight: 'heading',
        fontWeight: 'heading',
        fontSize: 1,
      },
      h6: {
        color: 'text',
        fontFamily: 'heading',
        lineHeight: 'heading',
        fontWeight: 'heading',
        fontSize: 0,
      },
    },
    default: {
      fontSize: [0, 1],
    },
  },
  styles: {
    hr: {
      color: 'stroke',
    },
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    a: {
      color: 'secondary',
    },
    p: {
      color: 'text',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },

    pre: {
      fontFamily: 'monospace',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
  },
};

export default theme;