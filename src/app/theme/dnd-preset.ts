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
      light: {
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
        formField: {
          background: '#1a1410',
          disabledBackground: '#241c16',
          filledBackground: '#241c16',
          filledHoverBackground: '#2e241c',
          filledFocusBackground: '#241c16',
          borderColor: '#4d3c2c',
          hoverBorderColor: '#5c4a38',
          focusBorderColor: '#c9a227',
          invalidBorderColor: '#8b1e3f',
          color: '#d4c4a8',
          disabledColor: '#9a866e',
          placeholderColor: '#9a866e',
          floatLabelColor: '#9a866e',
          floatLabelFocusColor: '#c9a227',
          floatLabelActiveColor: '#c9a227',
          floatLabelInvalidColor: '#8b1e3f',
          iconColor: '#9a866e',
          shadow: '0 0 0 2px rgba(201, 162, 39, 0.2)',
        },
        text: {
          color: '#d4c4a8',
          hoverColor: '#f5e6c8',
          mutedColor: '#9a866e',
          hoverMutedColor: '#aa967e',
        },
        content: {
          background: '#241c16',
          hoverBackground: '#2e241c',
          borderColor: '#4d3c2c',
          color: '#d4c4a8',
          hoverColor: '#f5e6c8',
        },
      },
    },
  },
  components: {
    card: {
      root: {
        background: '#241c16',
        borderRadius: '8px',
        color: '#d4c4a8',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
      },
      body: {
        padding: '1.25rem',
      },
      title: {
        fontWeight: '600',
      },
      subtitle: {
        color: '#9a866e',
      },
    },
    select: {
      root: {
        background: '#1a1410',
        borderColor: '#4d3c2c',
        hoverBorderColor: '#5c4a38',
        focusBorderColor: '#c9a227',
        color: '#d4c4a8',
      },
      dropdown: {
        color: '#c9a227',
      },
      overlay: {
        background: '#241c16',
        borderColor: '#4d3c2c',
        color: '#d4c4a8',
      },
      option: {
        focusBackground: 'rgba(201, 162, 39, 0.15)',
        selectedBackground: 'rgba(201, 162, 39, 0.25)',
        selectedFocusBackground: 'rgba(201, 162, 39, 0.35)',
        color: '#d4c4a8',
        focusColor: '#f5e6c8',
        selectedColor: '#f5e6c8',
        selectedFocusColor: '#f5e6c8',
      },
    },
    inputtext: {
      root: {
        background: '#1a1410',
        borderColor: '#4d3c2c',
        hoverBorderColor: '#5c4a38',
        focusBorderColor: '#c9a227',
        color: '#d4c4a8',
        placeholderColor: '#9a866e',
        borderRadius: '4px',
      },
    },
    inputnumber: {
      root: {},
      button: {
        background: '#2e241c',
        hoverBackground: '#3d3024',
        activeBackground: '#4d3c2c',
        borderColor: '#4d3c2c',
        hoverBorderColor: '#5c4a38',
        color: '#c9a227',
        hoverColor: '#d4b33a',
      },
    },
    textarea: {
      root: {
        background: '#1a1410',
        borderColor: '#4d3c2c',
        hoverBorderColor: '#5c4a38',
        focusBorderColor: '#c9a227',
        color: '#ec990aff',
        placeholderColor: '#9a866e',
      },
    },
    checkbox: {
      root: {
        borderColor: '#4d3c2c',
        hoverBorderColor: '#c9a227',
        checkedBackground: '#c9a227',
        checkedBorderColor: '#c9a227',
        checkedHoverBackground: '#d4b33a',
        checkedHoverBorderColor: '#d4b33a',
      },
      icon: {
        color: '#1a1410',
        checkedColor: '#1a1410',
        checkedHoverColor: '#1a1410',
      },
    },
    button: {
      colorScheme: {
        light: {
          root: {
            primary: {
              background: 'linear-gradient(180deg, #a62951 0%, #8b1e3f 100%)',
              color: '#f5e6c8',
              hoverBackground: 'linear-gradient(180deg, #b83362 0%, #9c2548 100%)',
              activeBackground: 'linear-gradient(180deg, #952448 0%, #7a1836 100%)',
              borderColor: 'transparent',
              hoverBorderColor: 'transparent',
              activeBorderColor: 'transparent',
            },
          },
        },
      },
    },
    chip: {
      root: {
        borderRadius: '12px',
        paddingX: '1rem',
        paddingY: '0.25rem',
        gap: '0.35rem',
      },
      icon: {
        size: '1rem',
      },
      colorScheme: {
        light: {
          root: {
            background: '#362b23ff',
            color: '#d4c4a8',
            borderRadius: '12px',
          },
          icon: {
            color: '#c9a227',
            size: '1rem',
          },
          removeIcon: {
            color: '#9a866e',
            size: '1rem',
          },
        },
      },
    },
  },
});

export default DndPreset;
