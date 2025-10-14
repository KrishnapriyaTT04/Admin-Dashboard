import colors from 'assets/scss/_themes-vars.module.scss';

const style = (theme) => ({
  tableStyle: {
    '&.MuiTable-root': {
      minWidth: 650
    }
  },
  cmnIcon: {
    '&.MuiIconButton-root': {
      padding: '3px 4px',
      borderRadius: '7px',
      marginRight: '2px',
      color: '#fff',
      fontSize: '10px'
    }
  },
  cmnSvg: {
    '&.MuiSvgIcon-root': {
      fontSize: '18px'
    }
  },

  cmnViewIcon: {
    backgroundColor: '#3dcd58',

    '&:hover': {
      backgroundColor: '#30a049'
    }
  },
  cmnEditIcon: {
    backgroundColor: '#27a5d6',
    padding: '3px 3px',

    '&:hover': {
      backgroundColor: '#27a5d6'
    }
  },
  cmnStatusIcon: {
    backgroundColor: 'red',
    padding: '3px 3px',

    '&:hover': {
      backgroundColor: '#c70707ff'
    }
  },
  cmnMoreIcon: {
    backgroundColor: '#f2c6f369',
    color: '#000',
    borderRadius: '7px',
    padding: '3px 0px'

    // '&:hover': {
    //   backgroundColor: '#f2c6f3'
    // }
  },
  tableHeaderLabel: {
    '&.MuiTypography-root': {
      color: 'white',
      fontSize: '.9rem',
      fontWeight: 'bold'
    }
  },
  tableRowLabel: {
    '&.MuiTypography-root': {
      overflow: 'hidden', // REQUIRED for text-overflow to work
      textOverflow: 'ellipsis', // The correct property for ellipsis
      whiteSpace: 'nowrap', // REQUIRED for text-overflow to work
      display: 'block', // Ensure it's a block-level element,
      fontSize: '0.85rem',
      color: '#23282c'
    }
  },
  chipLabel: {
    '&.MuiChip-root': {
      color: '#fff',

      textTransform: 'capitalize',
      height: '16px',
      fontWeight: '600',
      fontSize: '11px',
      borderRadius: '4px'
      // fontFamily: theme.palette.fontFamily
    },
    '& .MuiChip-label': {
      paddingLeft: '4px', // Your desired padding
      paddingRight: '4px', // Your desired padding
      lineHeight: '12px' // Match the chip's height to vertically center single-line text
    }
  }
});

export default style;