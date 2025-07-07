import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge,
  InputBase,
  Card, CardContent
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Receipt as ReceiptIcon,
  AccountBalance as BudgetIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  ExitToApp as LogoutIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import authService from '../services/auth.service';
import { Nofi } from '../models/notifi';
import NotificationServive from '../services/nofitication.service';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const drawerWidth = 280;

interface LayoutProps {
  children: React.ReactNode;
}

interface NotificationCardProps {
  title: string;
  message: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ title, message }) => {
  return (
    <Card elevation={3} sx={{ maxWidth: 600, m: 2, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      </CardContent>
    </Card>
  );
};

const menuItems = [
  { text: 'Tổng quan', icon: <DashboardIcon />, path: '/' },
  { text: 'Giao dịch', icon: <ReceiptIcon />, path: '/transactions' },
  { text: 'Ngân sách', icon: <BudgetIcon />, path: '/budget' },
  { text: 'Báo cáo', icon: <ReportsIcon />, path: '/reports' },
  { text: 'Cài đặt', icon: <SettingsIcon />, path: '/settings' },
];

export default function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null)
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null);

  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [notifications, setNotifications] = useState<NotificationCardProps[]>([]);
  const shouldRefetch = useSelector((state: RootState) => state.refetch.shouldRefetch);



  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setAnchorEl(null)
  }

  // useEffect(()=>{
  // if(!open) return ;

  // const fetchData=async()=>{
  //       try{
  //         const res=await NotificationServive.getNotification();
  //         const data:Nofi[]=res;
  //         const messages:string[]=data.map((item)=>item.message);
  //         setNotifications(messages)
  //       }
  //       catch(err)
  //       {
  //         console.log(err)
  //       }
  //     }
  //   fetchData();
  //   console.log(shouldRefetch)
  // },[shouldRefetch])


  const fetchData = async () => {
    try {
      const res = await NotificationServive.getNotification();
      const data: Nofi[] = res;
      const messages: { title: string; message: string }[] = data.map((item) => ({
        title: item.title,
        message: item.message,
      }));
      setNotifications(messages)
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    console.log(shouldRefetch)
    fetchData()
  }, [shouldRefetch])


  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setNotificationAnchorEl(null);
  };
  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    }
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ px: 3, py: 2 }}>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
          FinanceApp
        </Typography>
      </Toolbar>
      <Box sx={{ px: 3, mb: 3 }}>
        <Box
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            bgcolor: theme.palette.grey[100],
            borderRadius: 2,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Tìm kiếm..."
          />
          <IconButton type="button" sx={{ p: '10px' }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
      <List sx={{ px: 2, flex: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  bgcolor: theme.palette.primary.main,
                  color: 'white',
                  '&:hover': {
                    bgcolor: theme.palette.primary.dark,
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ mx: 2, mb: 2 }} />
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            p: 2,
            bgcolor: theme.palette.primary.main,
            borderRadius: 3,
            color: 'white',
            textAlign: 'center',
          }}
        >
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'white',
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          {/* Language Selector */}
          <IconButton
            size="large"
            onClick={handleLanguageMenuOpen}
            color="default"
          >
            <LanguageIcon />
          </IconButton>
          <Menu
            anchorEl={languageAnchorEl}
            open={Boolean(languageAnchorEl)}
            onClose={handleLanguageMenuClose}
          >
            <MenuItem onClick={handleLanguageMenuClose}>Tiếng Việt</MenuItem>
            <MenuItem onClick={handleLanguageMenuClose}>English</MenuItem>
          </Menu>

          {/* Notifications */}
          <IconButton color="default" onClick={handleOpen}>
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={notificationAnchorEl}
            open={Boolean(notificationAnchorEl)}
            onClose={handleClose}>
            {notifications.map((note, index) => (
              <MenuItem key={index} onClick={handleClose}>
                <NotificationCard
                 title={note.title}
                 message={note.message}
/>
              </MenuItem>
            ))}
            {notifications.length === 0 && (
              <MenuItem disabled>
                <Typography variant="body2" color="text.secondary">Không có thông báo</Typography>
              </MenuItem>
            )}
          </Menu>

          {/* Profile */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              ml: 2,
              p: 1,
              borderRadius: 2,
              '&:hover': {
                bgcolor: theme.palette.grey[100],
              },
            }}
            onClick={handleProfileMenuOpen}
          >
            <Avatar
              src="/path-to-avatar.jpg"
              sx={{ width: 35, height: 35 }}
            />
            <Box sx={{ ml: 1, display: { xs: 'none', md: 'block' } }}>
              <Typography variant="subtitle2">Nguyễn Văn An</Typography>
              <Typography variant="caption" color="text.secondary">
                Premium User
              </Typography>
            </Box>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleProfileMenuClose}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Thông tin cá nhân
            </MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Cài đặt
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Đăng xuất
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: 'background.paper',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: 'background.paper',
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '64px',
          bgcolor: 'background.default',
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </Box>
  );
} 