import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budget from './pages/Budget';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import authService from './services/auth.service';
import { AppProvider } from './context/nofiticationContext';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Tạo theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5A3FE0',
    },
    secondary: {
      main: '#1D1B20',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
  },
  typography: {
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = authService.getToken();
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <Routes>
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
           
           <Route
              path="/"
              element={
                  
                    <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute> 
              }
            />

            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Transactions />
                  </Layout>
                </ProtectedRoute>
              }
            />
      
            <Route
              path="/budget"
              element={
                   <Provider store={store}>
                       <ProtectedRoute>
                  <Layout>
                    <Budget/>
                  </Layout>
                </ProtectedRoute>
                   </Provider>
              }
            />
          
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Layout> 
                    <Reports />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Settings />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App; 