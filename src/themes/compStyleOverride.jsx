export default function componentStyleOverrides() {
  return {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1d3848', // Dark green sidebar background
          color: '#FFFFFF' // White text color
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', // White text color
          '&.Mui-selected': {
            color: '#0F3A2D', // Selected item text color
            backgroundColor: '#fff', // Slightly lighter green for selected
            '&:hover': {
              backgroundColor: '#fff' // Hover effect
            },
            '& .MuiListItemIcon-root': {
              color: '#0F3A2D' // Selected icon color
            }
          },
          '&:hover': {
            backgroundColor: '#fff', // Hover background
            color: '#0F3A2D',
            '& .MuiListItemIcon-root': {
              color: '#0F3A2D'
            }
          }
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#FFFFFF' // Icon color (White)
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: '#FFFFFF' // Text color (White)
        }
      }
    }
  };
}
