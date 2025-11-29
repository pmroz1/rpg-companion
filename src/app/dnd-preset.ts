import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const DndPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#FFF4E6',
      100: '#FFD9B3',
      200: '#FFC285',
      300: '#FFA64C',
      400: '#FF9033',
      500: '#FF7A1A',
      600: '#DB5A00',
      700: '#B44800',
      800: '#8C3900',
      900: '#662800',
      950: '#421800',
    },

    colorScheme: {
      dark: {
        surface: {
          0: '#0A1A2F',
          50: '#0A1A2F',
          100: '#0F253D',
          200: '#12395A',
          300: '#18466D',
          400: '#1F5C8A',
          500: '#2A6A9A',
          600: '#3A7BAC',
          700: '#4989B8',
          800: '#5A97C4',
          900: '#6EA7D0',
          950: '#87B8DC',
        },
        primary: {
          color: '#FF7A1A',
          inverseColor: '#0A1A2F',
          hoverColor: '#DB5A00',
          activeColor: '#B44800',
        },
        highlight: {
          background: 'rgba(255,122,26,0.20)',
          focusBackground: 'rgba(255,122,26,0.30)',
          color: '#F2ECE4',
          focusColor: '#F2ECE4',
        },
      },
    },
  },
});

export default DndPreset;
