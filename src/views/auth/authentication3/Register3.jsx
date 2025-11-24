import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RoleSelector from 'views/auth/authentication3/RoleSelector';
// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IconPhoneFilled, IconCheck } from '@tabler/icons-react';
import Button from '@mui/material/Button';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'assets/images/logo.svg';
import { Box } from '@mui/material';
//  import styles from './authentication/auth-forms/style';
import styles from '../../../utils/style';


// Role selection images
import ClaimantIcon from 'assets/images/claimant.png';
import ArbitratorIcon from 'assets/images/arb-med.png';
import AdvocateIcon from 'assets/images/advocate.png';
import ExpertIcon from 'assets/images/expert.png';

// ================================|| AUTH3 - ROLE SELECTION ||================================ //

const Login = () => {
    const theme = useTheme();
    const style = styles(theme);
    const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const navigate = useNavigate();

    // State for role selection and form steps
    const [selectedRole, setSelectedRole] = useState(null);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);

    // Handle role selection
    // const handleRoleSelect = (role) => {
    //     setSelectedRole(role);
    // };

    const handleRoleSelect = (role) => {
        setSelectedRole(selectedRole === role ? null : role);
    };

    // Handle proceed button click
    const handleProceed = () => {
        if (selectedRole) {
            setShowRegistrationForm(true);
        }
    };

    // Handle back button click
    const handleBackToRoleSelection = () => {
        setShowRegistrationForm(false);
    };

    const roles = [
        { id: 'claimant', icon: ClaimantIcon, title: 'Claimant' },
        { id: 'arbitrator', icon: ArbitratorIcon, title: 'Arbitrator/Mediator' },
        { id: 'advocate', icon: AdvocateIcon, title: 'Advocate' },
        { id: 'expert', icon: ExpertIcon, title: 'Expert' }
    ];

    return (
        <AuthWrapper1 sx={style.loginBg}>
            <Grid container>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center">
                        <Grid item sx={style.loginGrid}>
                            <AuthCardWrapper sx={style.authCardWrapper}>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={style.iconGrid}>
                                        <Link to="#" aria-label="logo">
                                            <img src={Logo} alt="Logo" style={style.logoImg} />
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={{ xs: 'column-reverse', md: 'row' }}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item sx={{ mt: 0 }}>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    {!showRegistrationForm ? (
                                                        <>
                                                            <Typography
                                                                fontWeight={900}
                                                                sx={style.welcomeBack}
                                                                gutterBottom
                                                                variant={downMD ? 'h6' : 'h6'}
                                                            >
                                                                Select Your Current Professional Role
                                                            </Typography>
                                                            <Typography
                                                                variant="caption"
                                                                sx={style.title}
                                                                textAlign={{ xs: 'center', md: 'inherit' }}
                                                            >
                                                                Your Role Selection Will Adjust The Portal To Suit Your Needs.
                                                            </Typography>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Typography
                                                                fontWeight={900}
                                                                sx={style.welcomeBack}
                                                                gutterBottom
                                                                variant={downMD ? 'h6' : 'h5'}
                                                            >
                                                                Create Your Account
                                                            </Typography>
                                                            <Typography
                                                                variant="caption"
                                                                sx={style.title}
                                                                textAlign={{ xs: 'center', md: 'inherit' }}
                                                            >
                                                                5 Simple Steps To Create Your Account.
                                                            </Typography>
                                                        </>
                                                    )}
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {!showRegistrationForm ? (
                                            // Role selection UI
                                            <Box>
                                                <Grid container spacing={3} justifyContent="center">
                                                    {roles.map((role) => (
                                                        <Grid item xs={6} sm={6} md={6} key={role.id}>
                                                            <RoleSelector
                                                                icon={role.icon}
                                                                title={role.title}
                                                                isSelected={selectedRole === role.id}
                                                                onSelect={() => handleRoleSelect(role.id)}
                                                            />
                                                        </Grid>
                                                    ))}
                                                </Grid>

                                                <Grid item xs={12} sm={12} md={12} sx={{ mt: 3 }}>
                                                    <Button
                                                        fullWidth
                                                        variant="contained"
                                                        color="primary"
                                                        size="large"
                                                        onClick={handleProceed}
                                                        disabled={!selectedRole}
                                                        sx={{
                                                            backgroundColor: theme.palette.primary.main,
                                                            color: 'white',
                                                            // py: 1.5,
                                                            fontSize: '16px',
                                                            borderRadius: '8px',
                                                            textTransform: 'none',
                                                            '&:hover': {
                                                                backgroundColor: theme.palette.primary.dark
                                                            },
                                                            '&.Mui-disabled': {
                                                                backgroundColor: '#e0e0e0',
                                                                color: '#acacac'
                                                            }
                                                        }}
                                                    >
                                                        Proceed &gt;
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={12} sm={12}  sx={{ textAlign: 'center', mt: 3 }}>
                                                    <Typography
                                                        component={Link}
                                                        to="/login"
                                                        variant="subtitle1"
                                                        sx={{
                                                            ...style.signUp,
                                                            fontSize:'14px',
                                                            textDecoration: 'none',
                                                            color: theme.palette.text.secondary,
                                                            '&:hover': {
                                                                color: theme.palette.primary.main
                                                            }
                                                        }}
                                                    >
                                                        Go Back to&nbsp;
                                                        <span style={{ color: theme.palette.primary.main, fontWeight: 500 }}>Login</span>
                                                    </Typography>
                                                </Grid>
                                                {/* </Grid> */}
                                            </Box>
                                        ) : (
                                            // Registration form UI
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    {/* Progress Steps */}
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                                                        {[1, 2, 3, 4, 5].map((step) => (
                                                            <Box
                                                                key={step}
                                                                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        width: 30,
                                                                        height: 30,
                                                                        borderRadius: '50%',
                                                                        backgroundColor:
                                                                            step === 1 ? theme.palette.primary.main : '#e0e0e0',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        color: step === 1 ? 'white' : '#999',
                                                                        fontWeight: 'bold',
                                                                        mb: 1
                                                                    }}
                                                                >
                                                                    {step}
                                                                </Box>
                                                                <Typography
                                                                    variant="caption"
                                                                    sx={{ fontSize: '10px', textAlign: 'center', maxWidth: 60 }}
                                                                >
                                                                    {step === 1 && 'User Details'}
                                                                    {step === 2 && 'Additional Details'}
                                                                    {step === 3 && 'Arbitrator Details'}
                                                                    {step === 4 && 'Arbitrator Exp'}
                                                                    {step === 5 && 'Terms & Conditions'}
                                                                </Typography>
                                                            </Box>
                                                        ))}
                                                    </Box>

                                                    {/* User Details Form - Step 1 */}
                                                    <Box sx={{ mb: 3 }}>
                                                        <Typography variant="subtitle1" sx={{ mb: 2 }}>
                                                            Type
                                                        </Typography>
                                                        <Box
                                                            sx={{
                                                                p: 2,
                                                                border: '1px solid #e0e0e0',
                                                                borderRadius: '4px',
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center'
                                                            }}
                                                        >
                                                            <Typography>Arbitrator</Typography>
                                                            <Box>▼</Box>
                                                        </Box>
                                                    </Box>

                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={4}>
                                                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                                                Title
                                                            </Typography>
                                                            <Box
                                                                sx={{
                                                                    p: 2,
                                                                    border: '1px solid #e0e0e0',
                                                                    borderRadius: '4px',
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center'
                                                                }}
                                                            >
                                                                <Typography>Mr.</Typography>
                                                                <Box>▼</Box>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item xs={12} sm={4}>
                                                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                                                First Name
                                                            </Typography>
                                                            <Box
                                                                component="input"
                                                                sx={{
                                                                    p: 2,
                                                                    border: '1px solid #e0e0e0',
                                                                    borderRadius: '4px',
                                                                    width: '100%',
                                                                    boxSizing: 'border-box'
                                                                }}
                                                                placeholder="Enter here"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={4}>
                                                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                                                Last Name
                                                            </Typography>
                                                            <Box
                                                                component="input"
                                                                sx={{
                                                                    p: 2,
                                                                    border: '1px solid #e0e0e0',
                                                                    borderRadius: '4px',
                                                                    width: '100%',
                                                                    boxSizing: 'border-box'
                                                                }}
                                                                placeholder="Enter here"
                                                            />
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container spacing={2} sx={{ mt: 1 }}>
                                                        <Grid item xs={12} sm={6}>
                                                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                                                Gender
                                                            </Typography>
                                                            <Box
                                                                sx={{
                                                                    p: 2,
                                                                    border: '1px solid #e0e0e0',
                                                                    borderRadius: '4px',
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center'
                                                                }}
                                                            >
                                                                <Typography>Select Here</Typography>
                                                                <Box>▼</Box>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                                                Date of Birth
                                                            </Typography>
                                                            <Box
                                                                component="input"
                                                                sx={{
                                                                    p: 2,
                                                                    border: '1px solid #e0e0e0',
                                                                    borderRadius: '4px',
                                                                    width: '100%',
                                                                    boxSizing: 'border-box'
                                                                }}
                                                                placeholder="Enter here"
                                                            />
                                                        </Grid>
                                                    </Grid>

                                                    <Box sx={{ mt: 2 }}>
                                                        <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                                            Email
                                                        </Typography>
                                                        <Box
                                                            component="input"
                                                            sx={{
                                                                p: 2,
                                                                border: '1px solid #e0e0e0',
                                                                borderRadius: '4px',
                                                                width: '100%',
                                                                boxSizing: 'border-box'
                                                            }}
                                                            placeholder="Enter here"
                                                        />
                                                    </Box>

                                                    <Grid container spacing={2} sx={{ mt: 1 }}>
                                                        <Grid item xs={12} sm={6}>
                                                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                                                Primary Number
                                                            </Typography>
                                                            <Box
                                                                component="input"
                                                                sx={{
                                                                    p: 2,
                                                                    border: '1px solid #e0e0e0',
                                                                    borderRadius: '4px',
                                                                    width: '100%',
                                                                    boxSizing: 'border-box'
                                                                }}
                                                                placeholder="Enter here"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                                                Alternate Number
                                                            </Typography>
                                                            <Box
                                                                component="input"
                                                                sx={{
                                                                    p: 2,
                                                                    border: '1px solid #e0e0e0',
                                                                    borderRadius: '4px',
                                                                    width: '100%',
                                                                    boxSizing: 'border-box'
                                                                }}
                                                                placeholder="Enter here"
                                                            />
                                                        </Grid>
                                                    </Grid>

                                                    <Grid item xs={12} sx={{ mt: 3 }}>
                                                        <Button
                                                            fullWidth
                                                            variant="contained"
                                                            color="primary"
                                                            size="large"
                                                            onClick={() => {
                                                                /* Navigate to next step */
                                                            }}
                                                            sx={{
                                                                backgroundColor: theme.palette.primary.main,
                                                                color: 'white',
                                                                py: 1.5,
                                                                fontSize: '16px',
                                                                borderRadius: '8px',
                                                                textTransform: 'none'
                                                            }}
                                                        >
                                                            Additional Details →
                                                        </Button>
                                                    </Grid>

                                                    <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
                                                        <Typography
                                                            variant="subtitle1"
                                                            sx={{
                                                                ...style.signUp,
                                                                cursor: 'pointer',
                                                                color: theme.palette.text.secondary,
                                                                '&:hover': {
                                                                    color: theme.palette.primary.main
                                                                }
                                                            }}
                                                            onClick={handleBackToRoleSelection}
                                                        >
                                                            ← Go Back to Role Selection
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        )}
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                        <Box sx={style.contactBox}>
                            <Typography sx={{ mb: 1 }}>
                                <IconPhoneFilled size={15} /> Need help
                            </Typography>
                            <Typography sx={{ ml: 2 }}>+91 9594364935</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default Login;
