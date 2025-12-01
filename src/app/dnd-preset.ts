import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const DndPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#fdf6e3',
      100: '#f5e6c8',
      200: '#e8d4a8',
      300: '#d4b896',
      400: '#c9a227',
      500: '#b8860b',
      600: '#996515',
      700: '#7a4a0a',
      800: '#5c3a0a',
      900: '#3d2506',
      950: '#1f1303',
    },

    colorScheme: {
      dark: {
        surface: {
          0: '#1a1410',
          50: '#1a1410',
          100: '#241c16',
          200: '#2e241c',
          300: '#3d3024',
          400: '#4d3c2c',
          500: '#5c4a38',
          600: '#6b5844',
          700: '#7a6650',
          800: '#8a765e',
          900: '#9a866e',
          950: '#aa967e',
        },
        primary: {
          color: '#c9a227',
          inverseColor: '#1a1410',
          hoverColor: '#d4b33a',
          activeColor: '#b8910e',
        },
        highlight: {
          background: 'rgba(201, 162, 39, 0.16)',
          focusBackground: 'rgba(201, 162, 39, 0.28)',
          color: '#f5e6c8',
          focusColor: '#fdf6e3',
        },
      },
    },
  },
  components: {
    button: {
      root: {
        borderRadius: '4px',
      },
    },
    card: {
      root: {
        borderRadius: '8px',
      },
    },
    inputtext: {
      root: {
        borderRadius: '4px',
      },
    },
  },
});

export default DndPreset;
