import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export const useBotColumns = ({
  onAction,
  // loading,
}) => {
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1, headerClassName: 'custom-header' },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      headerClassName: 'custom-header',
    },
    {
      field: 'height',
      headerName: 'Height',
      flex: 1,
      headerClassName: 'custom-header',
    },
    {
      field: 'weight',
      headerName: 'Weight',
      flex: 1,
      headerClassName: 'custom-header',
    },
    {
      field: 'gender',
      headerName: 'Gender',
      flex: 1,
      headerClassName: 'custom-header',
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      flex: 1,
      headerClassName: 'custom-header',
    },
    {
      field: 'interest',
      headerName: 'Interest',
      flex: 1,
      headerClassName: 'custom-header',
    },
    {
      field: 'hobbies',
      headerName: 'Hobbies',
      flex: 1,
      headerClassName: 'custom-header',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      headerClassName: 'table-header',
      renderCell: (param) => (
        < div >
          <IconButton color="primary" onClick={() => { onAction("edit", param.row); }}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => onAction("delete", param.row)}>
            <DeleteIcon />
          </IconButton>
        </ div>
      )
    },
  ];
  return { columns };
};
