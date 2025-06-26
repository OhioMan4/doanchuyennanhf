import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Checkbox,
  FormControlLabel,
  Alert,
} from '@mui/material';
import {
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      await authService.login({ email, password });
      navigate('/');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Đã xảy ra lỗi khi đăng nhập');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 3,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 480,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: 'primary.main',
              mb: 1,
            }}
          >
            FinanceApp
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quản lý tài chính cá nhân thông minh
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Mật khẩu"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Ghi nhớ đăng nhập"
            />
            <Link href="#" underline="none">
              Quên mật khẩu?
            </Link>
          </Box>

          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{ mb: 3 }}
          >
            Đăng nhập
          </Button>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              HOẶC
            </Typography>
          </Divider>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button
              fullWidth
              size="large"
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{
                borderColor: 'divider',
                '&:hover': { borderColor: 'primary.main' },
              }}
            >
              Google
            </Button>
            <Button
              fullWidth
              size="large"
              variant="outlined"
              startIcon={<FacebookIcon />}
              sx={{
                borderColor: 'divider',
                '&:hover': { borderColor: 'primary.main' },
              }}
            >
              Facebook
            </Button>
          </Box>

          <Typography variant="body2" align="center">
            Chưa có tài khoản?{' '}
            <Link href="/register" underline="none">
              Đăng ký ngay
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Login; 