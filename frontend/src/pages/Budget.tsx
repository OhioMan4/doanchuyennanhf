import {  useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';  
import DeleteIcon from '@mui/icons-material/Delete';
import BudgetService from '../services/budget.service';
import {  BudgetData, CategoryData } from '../models/budget';
import notificationService from '../services/nofitication.service'
import { useDispatch } from 'react-redux';
import { triggerRefetch } from '../redux/refresh';
const CircularProgressWithLabel = ({
  value,
  date,
}: {
  value: number;
  date?: string;
}) => {
  const formattedDate = date;

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        value={value}
        size={250}
        thickness={5}
        sx={{ color: '#FF7F50' }}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Typography variant="h6" fontWeight="bold">
          {value}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Spent
        </Typography>
        {formattedDate ? (
          <Typography variant="caption" fontWeight="900" fontSize={12} color="textSecondary">
            Period: {formattedDate}
          </Typography>
        ) : (
          <Typography variant="caption" color="error">
            Ngày không hợp lệ
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const BudgetCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 16,
  boxShadow: theme.shadows[3]
}));

interface Item {
  name: String;
  amount: Number;
  date: string;
}


const BudgetServicePage = () => {
  const [spent, setSpent] = useState(0);
  const [monthlyLimit,setMonthlyLimit] = useState(0);
  const [date,setDate]=useState('')
  const remaining = monthlyLimit - spent;
  const [open, setOpen] = useState(false);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState<number | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryData[]>([]);

  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);
  const [newItem, setNewItem] = useState<Item>({ name: '', amount: 0, date: '' });
  const [budget,setBudget]=useState('');
  const dispatch=useDispatch()
 
 



  useEffect(()=>{
       fetchData()
    },[open,newItem]);
    
    const fetchData=async()=>{
      setSpent(0);
      const data:BudgetData=await BudgetService.getUserBudget();
      setBudget(String(data.budget.budgetId));
      const monthlyLimits=Number(data.budget.totalAmount);
      setDate(String(data.budget.month))
      setMonthlyLimit(monthlyLimits);
      setCategories(data.category)
      console.log(data.category)
    }
    const handleCreateCategory = () => {
      if (!newCategory.trim()) {
        setErrorMessage('Category name cannot be empty.');
        return;
      }
    
      BudgetService.createCategory({ budgetId: budget, name: newCategory })
        .then((data) => {
          console.log(data);
          setNewCategory(String(data.name));
          setErrorMessage(null);  
          setOpen(false);  
          notificationService.createNotification({message:"đã tạo thành công ",title:`Category ${data.name}`}) 
          dispatch(triggerRefetch()) 
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage("Failed to create category.");
        });

       
    };
    

  const handleDeleteCategory = () => {
    if (confirmDeleteIndex !== null) {
      const name=(categories[confirmDeleteIndex].name);
       const data=(BudgetService.deleteCategory({budgetId:budget,categoryId:categories[confirmDeleteIndex].id})).then((data)=>{
        alert(data)
       });
       console.log(data)
      setCategories((prev) => prev.filter((_, i) => i !== confirmDeleteIndex));
      notificationService.createNotification({message:"đã xóa thành công ",title:`Deleted ${name.toUpperCase}`})   
      setConfirmDeleteIndex(null);
    }
  };

  const handleAddItem = () => {
    if (activeCategoryIndex !== null && newItem.name.trim()) {
      const updated = [...categories];
      setCategories(updated);
      const name =newItem.name;
      const amount=newItem.amount;
      const date=newItem.date;
      const _data=BudgetService.createItem({budgetId:budget,categoryId:categories[activeCategoryIndex].id,name,amount,date}).then((_datas)=>{
        alert('Thêm item thành công !!!!')
      })
      console.log(_data);
      setNewItem({name:'',amount:0,date:''})
      notificationService.createNotification({message:`Đã thêm thành công `,title:`Item ${newItem.name}`})    
      setItemDialogOpen(false);
    }
  };

  return (
    <Box px={3}>
      <Grid container spacing={4} mt={4}>
        <Grid item xs={12} md={4}>
          <BudgetCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Budget
              </Typography>
              <Box display="flex" justifyContent="center" my={2}>
                <CircularProgressWithLabel value={(monthlyLimit) }  date={(date)}/>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    ${monthlyLimit}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Monthly Limit
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    ${remaining}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Remaining
                  </Typography>
                </Box>
              </Box>
              <Box mt={4} textAlign="center">
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                  + Add Category
                </Button>
              </Box>
            </CardContent>
          </BudgetCard>
        </Grid>

        <Grid item xs={12} md={8}>
          <BudgetCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Categories
              </Typography>
              <List aria-hidden="false">
                {categories.map((cat, index) => (
                  <Box key={index} mb={3}>
                    <ListItem disableGutters>
                      <ListItemText
                        primary={cat.name}
                        primaryTypographyProps={{ fontWeight: 'bold' }}
                      />
                      <Button size="small" variant="outlined" onClick={() => {
                        setActiveCategoryIndex(index);
                        setItemDialogOpen(true);
                      }}>
                        + Add Item
                      </Button>
                      <ListItemSecondaryAction>
                        <IconButton edge="end" color="error" onClick={() => setConfirmDeleteIndex(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Grid container spacing={2} mt={1}>
                      {cat.items.map((item, itemIndex) => (
                        <Grid item xs={12} sm={6} md={4} key={itemIndex}>
                          <Card variant="outlined" sx={{ p: 2 }}>
                            <Typography fontWeight="bold">{item.itemName}</Typography>
                            <Typography color="text.secondary">{item.amount} dong</Typography>
                            <Typography variant="caption" color="text.secondary">{item.date?.toString()}</Typography>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                    <Divider sx={{ my: 2 }} />
                  </Box>
                ))}
              </List>
            </CardContent>
          </BudgetCard>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateCategory} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmDeleteIndex !== null} onClose={() => setConfirmDeleteIndex(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to Delete this category?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteIndex(null)}>Cancel</Button>
          <Button onClick={handleDeleteCategory} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={itemDialogOpen} onClose={() => setItemDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Item Name"
            fullWidth
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={newItem.amount}
            onChange={(e) => setNewItem({ ...newItem, amount: parseFloat(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newItem.date}
            onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setItemDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddItem} variant="contained">Add Item</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BudgetServicePage;
