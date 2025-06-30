// TransactionForm.tsx
import React, { useEffect, useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import TransactionService from '../services/transaction.service';
import { Transaction } from '../models/transactions';
import { unix } from 'dayjs';
import BudgetService from '../services/budget.service';

interface Transactionn {
  _id?:string;
  itemId?: string;
  type: string;
  amount: number;
  date: string;
  description: string;
}

const TransactionForm: React.FC = () => {
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');
  const [itemId, setItemId] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState<Transactionn[]>([]);
  const [filter, setFilter] = useState<string | null>('all');
  const [openConfirm, setOpenConfirm] = useState(false);
  const [transactionData,setTransactionData]=useState<Transaction[]>([])
  const [deleteOpenConfirm,setDeleteOpenConfirm]=useState(false)
  const [confirmIndex,setConfirmIndex]=useState(-1);
  const [saveOpenConfirm,setSaveOpenConfirm]=useState(false);

  useEffect(()=>{
    fetchAllTransaction();
  },[openConfirm,deleteOpenConfirm])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenConfirm(true)
  }
  const fetchDataTransaction = async (props: Transactionn) => {
    const data = await TransactionService.createTransaction(props)
  }

  const fetchAllTransaction=async()=>{
    const data:Transaction[]=await TransactionService.getAllTransaction();
    setTransactions(data);
    console.log(transactions);

  }

  const handleConfirmSave = async () => {
    const newTransaction = { itemId, type, amount, date, description };

    try {
      await fetchDataTransaction({ type: type, amount: amount, date: date, description: description });
      setAmount(0);
      setDate('');
      setDescription('');
      setItemId('');
    } catch (err) {
      console.log("Error in fetching");
    }

    setOpenConfirm(false); // đóng dialog
  };


  const handleDelete =(index: number) => {
     setConfirmIndex(index);
     setDeleteOpenConfirm(true);
  };
  const handleConfirmDelete=()=>{
    setDeleteOpenConfirm(false)

    const delteTransaction=async()=>{
     try{
      if (!transactions[confirmIndex]._id || confirmIndex==-1) return alert("missing ID of transaction")
        const deteted=await TransactionService.deleteTransaction(transactions[confirmIndex]._id);
     }
     catch(err){
       console.log(err)
     }
    }
    delteTransaction();
    setConfirmIndex(-1);
  }
  const handleSave=(index:number)=>{
    setConfirmIndex(index);
    setSaveOpenConfirm(true);
  }
  const handleSaveTransactionToItemCategory=()=>{
    //  setSaveOpenConfirm(false);
    //  const saveOpenConfirmTransaction=async()=>{
    //   try{
    //     if (!transactions[confirmIndex]._id || confirmIndex==-1) return alert("missing ID of transaction")
    //     const saved =await BudgetService.createItem()
    //   }
    //   catch(err){

    //   }
    //  }
  }

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
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Amount (VND)"
                type="amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Transaction Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} marginBottom={5}>
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
              <TableCell className="font-semibold">Description</TableCell>
              <TableCell align="right" className="font-semibold">Amount (VND)</TableCell>
              <TableCell align="center" className="font-semibold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((tx, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                <TableCell>{tx.type}</TableCell>
                <TableCell>{tx.description}</TableCell>
                <TableCell align="right">
                  {tx.type === 'expense' ? '-' : '+'}{tx.amount} VND
                </TableCell>
                <TableCell align="center">
                <IconButton onClick={() => handleDelete(index)} color="primary">
                    <SaveIcon />
                  </IconButton>
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
      {/* dialog box  */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Xác nhận lưu giao dịch</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn thêm giao dịch này không?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenConfirm(false)}
            className="text-gray-700"
          >
            Hủy
          </Button>
          <Button
            onClick={handleConfirmSave}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold"
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      {/* deleteconfirmDialogBox */}
      <Dialog open={deleteOpenConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Xác nhận lưu giao dịch</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn delete giao dịch này không?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteOpenConfirm(false)}
            className="text-gray-700"
          >
            Hủy
          </Button>
          <Button
            onClick={handleConfirmDelete}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold"
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TransactionForm;
