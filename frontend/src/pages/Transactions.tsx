// TransactionForm.tsx
import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Transaction {
  type: string;
  amount: number;
  date: string;
  email: string;
  description: string;
}

const TransactionForm: React.FC = () => {
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<string | null>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction = { type, amount, date, email, description };
    setTransactions([newTransaction, ...transactions]);
    setAmount(0);
    setDate('');
    setEmail('');
    setDescription('');
  };

  const handleDelete = (index: number) => {
    const updatedTransactions = [...transactions];
    updatedTransactions.splice(index, 1);
    setTransactions(updatedTransactions);
  };

  const filteredTransactions =
    filter === 'all' ? transactions : transactions.filter(t => t.type === filter);

  return (
    <Container maxWidth="md" className="py-10">
      <Box className="bg-white rounded-2xl shadow p-10 mb-10">
        <Typography variant="h5" className="font-semibold mb-8 text-gray-900">
          Create New Transaction
        </Typography>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Transaction Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                fullWidth
              >
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
                <MenuItem value="saving">Saving</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Amount ($)"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Transaction Date"
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="From / To Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold"
            fullWidth
          >
            Save Transaction
          </Button>
        </form>
      </Box>

      {/* Filter Controls */}
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h6" className="font-semibold text-gray-800">
          Transaction List
        </Typography>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(_, newFilter) => {
            if (newFilter !== null) setFilter(newFilter);
          }}
          size="small"
          color="primary"
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="income">Income</ToggleButton>
          <ToggleButton value="expense">Expense</ToggleButton>
          <ToggleButton value="saving">Saving</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Transaction Table */}
      <Paper className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold">Date</TableCell>
              <TableCell className="font-semibold">Type</TableCell>
              <TableCell className="font-semibold">Email</TableCell>
              <TableCell className="font-semibold">Description</TableCell>
              <TableCell align="right" className="font-semibold">Amount ($)</TableCell>
              <TableCell align="center" className="font-semibold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((tx, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell>{new Date(tx.date).toLocaleString()}</TableCell>
                <TableCell>{tx.type}</TableCell>
                <TableCell>{tx.email}</TableCell>
                <TableCell>{tx.description}</TableCell>
                <TableCell align="right">
                  {tx.type === 'expense' ? '-' : '+'}${tx.amount.toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleDelete(index)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredTransactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default TransactionForm;
