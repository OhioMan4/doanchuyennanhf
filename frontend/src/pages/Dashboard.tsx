import { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  LinearProgress,
  useTheme,
  IconButton,
  Button,
  Divider,
  Avatar,
} from '@mui/material';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  AccountBalance,
  Savings,
  MoreVert,
  ArrowUpward,
  ArrowDownward,
  AttachMoney,
  ShoppingCart,
  LocalDining,
  DirectionsCar,
  Home,
} from '@mui/icons-material';

// Dữ liệu mẫu

// @ts-ignore
const _monthlyData = [
  { month: 'T1', thuNhap: 24000000, chiTieu: 12000000 },
  { month: 'T2', thuNhap: 28000000, chiTieu: 15000000 },
  { month: 'T3', thuNhap: 32000000, chiTieu: 18000000 },
  { month: 'T4', thuNhap: 26000000, chiTieu: 14000000 },
  { month: 'T5', thuNhap: 30000000, chiTieu: 16000000 },
  { month: 'T6', thuNhap: 34000000, chiTieu: 19000000 },
];

const transactionHistory = [
  { id: 1, title: 'Lương tháng 6', amount: 34000000, type: 'income', category: 'Lương', date: '25/06/2024', icon: <AttachMoney /> },
  { id: 2, title: 'Mua sắm Vincom', amount: -2500000, type: 'expense', category: 'Mua sắm', date: '24/06/2024', icon: <ShoppingCart /> },
  { id: 3, title: 'Ăn tối nhà hàng', amount: -850000, type: 'expense', category: 'Ăn uống', date: '23/06/2024', icon: <LocalDining /> },
  { id: 4, title: 'Xăng xe', amount: -500000, type: 'expense', category: 'Di chuyển', date: '22/06/2024', icon: <DirectionsCar /> },
  { id: 5, title: 'Tiền nhà', amount: -8000000, type: 'expense', category: 'Nhà cửa', date: '21/06/2024', icon: <Home /> },
];

const categoryData = [
  { name: 'Mua sắm', value: 8500000, color: '#FF6B6B' },
  { name: 'Ăn uống', value: 5200000, color: '#4ECDC4' },
  { name: 'Di chuyển', value: 3100000, color: '#45B7D1' },
  { name: 'Nhà cửa', value: 8000000, color: '#96CEB4' },
  { name: 'Giải trí', value: 2200000, color: '#FFEEAD' },
];

const trendData = [
  { date: '20/06', value: 15000000 },
  { date: '21/06', value: 12000000 },
  { date: '22/06', value: 18000000 },
  { date: '23/06', value: 14000000 },
  { date: '24/06', value: 16000000 },
  { date: '25/06', value: 19000000 },
];

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('6');
  const theme = useTheme();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            Xin chào, Nguyễn Văn An
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Chào mừng bạn quay trở lại với tổng quan tài chính của bạn
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Thời gian</InputLabel>
            <Select
              value={timeRange}
              label="Thời gian"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="1">1 tháng gần đây</MenuItem>
              <MenuItem value="3">3 tháng gần đây</MenuItem>
              <MenuItem value="6">6 tháng gần đây</MenuItem>
              <MenuItem value="12">12 tháng gần đây</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<TrendingUp />}
            sx={{ bgcolor: theme.palette.primary.main }}
          >
            Xuất báo cáo
          </Button>
        </Box>
      </Box>

      {/* Thống kê tổng quan */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: theme.palette.success.light, mr: 2 }}>
                    <TrendingUp />
                  </Avatar>
                  <Typography variant="subtitle2">Thu nhập</Typography>
                </Box>
                <IconButton size="small">
                  <MoreVert />
                </IconButton>
              </Box>
              <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                {formatCurrency(34000000)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ArrowUpward sx={{ color: theme.palette.success.main, fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" color="success.main" sx={{ mr: 1 }}>
                  +12.5%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  so với tháng trước
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: theme.palette.error.light, mr: 2 }}>
                    <TrendingDown />
                  </Avatar>
                  <Typography variant="subtitle2">Chi tiêu</Typography>
                </Box>
                <IconButton size="small">
                  <MoreVert />
                </IconButton>
              </Box>
              <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                {formatCurrency(19000000)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ArrowDownward sx={{ color: theme.palette.error.main, fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" color="error.main" sx={{ mr: 1 }}>
                  -8.3%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  so với tháng trước
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: theme.palette.primary.light, mr: 2 }}>
                    <AccountBalance />
                  </Avatar>
                  <Typography variant="subtitle2">Số dư</Typography>
                </Box>
                <IconButton size="small">
                  <MoreVert />
                </IconButton>
              </Box>
              <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                {formatCurrency(15000000)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ArrowUpward sx={{ color: theme.palette.success.main, fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" color="success.main" sx={{ mr: 1 }}>
                  +15.2%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  so với tháng trước
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: theme.palette.info.light, mr: 2 }}>
                    <Savings />
                  </Avatar>
                  <Typography variant="subtitle2">Tiết kiệm</Typography>
                </Box>
                <IconButton size="small">
                  <MoreVert />
                </IconButton>
              </Box>
              <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                44.1%
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ArrowUpward sx={{ color: theme.palette.success.main, fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" color="success.main" sx={{ mr: 1 }}>
                  +5.2%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  so với tháng trước
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Biểu đồ và thống kê */}
      <Grid container spacing={3}>
        {/* Biểu đồ xu hướng */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Xu hướng thu chi</Typography>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value="week"
                  variant="outlined"
                  size="small"
                >
                  <MenuItem value="week">Tuần này</MenuItem>
                  <MenuItem value="month">Tháng này</MenuItem>
                  <MenuItem value="year">Năm nay</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={theme.palette.primary.main}
                  fillOpacity={1}
                  fill="url(#colorTrend)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Phân bổ chi tiêu theo danh mục */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Chi tiêu theo danh mục
            </Typography>
            <Box sx={{ mt: 2 }}>
              {categoryData.map((category) => (
                <Box key={category.name} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: category.color,
                          mr: 1,
                        }}
                      />
                      <Typography variant="body2">{category.name}</Typography>
                    </Box>
                    <Typography variant="body2" fontWeight={500}>
                      {formatCurrency(category.value)}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(category.value / 27000000) * 100}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: `${category.color}20`,
                      '& .MuiLinearProgress-bar': {
                        bgcolor: category.color,
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Lịch sử giao dịch gần đây */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Giao dịch gần đây</Typography>
              <Button color="primary">Xem tất cả</Button>
            </Box>
            {transactionHistory.map((transaction, index) => (
              <Box key={transaction.id}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      sx={{
                        bgcolor: transaction.type === 'income' ? 'success.light' : 'error.light',
                        mr: 2,
                      }}
                    >
                      {transaction.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">{transaction.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {transaction.category} • {transaction.date}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant="subtitle2"
                    color={transaction.type === 'income' ? 'success.main' : 'error.main'}
                  >
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                  </Typography>
                </Box>
                {index < transactionHistory.length - 1 && <Divider />}
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 