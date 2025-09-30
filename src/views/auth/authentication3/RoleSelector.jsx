import { useState } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const RoleSelector = ({ icon, title, isSelected, onSelect }) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    const isMd = useMediaQuery(theme.breakpoints.down('md'));
    const isLg = useMediaQuery(theme.breakpoints.down('lg'));
    const isXl = useMediaQuery(theme.breakpoints.down('xl'));

    // Define responsive styles for height and width
    const imageSize = isXs ? '80px' : isSm ? '100px' : isMd ? '120px' : isLg ? '140px' : isXl ? '200px' : '150';

    // Define responsive styles for top and right positions
    const checkmarkPosition = {
        top: isXs ? '3px' : isSm ? '5px' : isMd ? '10px' : isLg ? '15px' : '20px',
        right: isXs ? '5px' : isSm ? '7px' : isMd ? '30px' : isLg ? '75px' : isXl ? '88px' : '100px'
    };

    return (
        <Box
            textAlign="center"
            sx={{
                p: 1,
                borderRadius: '50px',
                cursor: 'pointer',
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
                // '&:hover': {
                //     transform: 'scale(1.05)'
                // }
            }}
            onClick={onSelect}
        >
            {isSelected && (
                <Box
                    sx={{
                        position: 'absolute',
                        ...checkmarkPosition,
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: theme.palette.primary.main,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '14px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                >
                    ✓
                </Box>
            )}
            <img
                src={icon}
                alt={title}
                style={{
                    borderRadius: '50%',
                    border: isSelected ? `2px solid ${theme.palette.primary.main}` : 'none',
                    height: isSm ? '100px' : '150px',
                    width: isSm ? '100px' : '150px'
                }}
            />
            <Typography variant="subtitle1" sx={{ mt: 0, fontWeight: 500 }}>
                {title}
            </Typography>
        </Box>
    );
};

export default RoleSelector;
