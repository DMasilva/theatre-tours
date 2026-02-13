import React from 'react';
import { Button } from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * ButtonPill - A reusable capsule-shaped (pill) button component.
 * Use for primary CTAs, hero buttons, auth actions, and prominent call-to-action buttons.
 * 
 * @param {string} variant - 'contained' | 'outlined' | 'text'
 * @param {string} color - 'primary' | 'secondary' | 'error' | 'inherit'
 * @param {string} size - 'small' | 'medium' | 'large'
 * @param {boolean} fullWidth - Stretch to container width
 * @param {node} startIcon - Icon before text
 * @param {node} endIcon - Icon after text
 * @param {object} sx - Additional MUI sx overrides
 * @param {object} ...rest - All other Button props (component, to, onClick, disabled, etc.)
 */
const ButtonPill = ({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  startIcon,
  endIcon,
  sx = {},
  children,
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        borderRadius: 9999, // Pill/capsule shape
        px: size === 'small' ? 2.5 : size === 'large' ? 5 : 3.5,
        py: size === 'small' ? 1 : size === 'large' ? 2 : 1.5,
        fontWeight: 700,
        textTransform: 'none',
        fontSize: size === 'small' ? '0.875rem' : size === 'large' ? '1.1rem' : '0.95rem',
        boxShadow: variant === 'contained' && color === 'primary'
          ? (theme) => `0 8px 20px ${alpha(theme.palette.primary.main, 0.4)}`
          : 'none',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: variant === 'contained' && color === 'primary'
            ? (theme) => `0 12px 28px ${alpha(theme.palette.primary.main, 0.5)}`
            : (theme) => theme.shadows[8],
        },
        '&:disabled': {
          transform: 'none',
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ButtonPill;
