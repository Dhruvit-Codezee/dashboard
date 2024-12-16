import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingCell } from '@/app/common/LoadingCell';
export const useBotColumns = ({
  onAction,
  loading,
}) => {
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      headerClassName: 'custom-header',
      renderCell: (param) => {
        if (loading) {
          return <LoadingCell />;
        }

        return param?.name;
      }
    },
    {
      field: 'height',
      headerName: 'Height',
      flex: 1,
      headerClassName: 'custom-header',
      renderCell: (param) => {
        if (loading) {
          return <LoadingCell />;
        }

        return param?.height;
      }
    },
    {
      field: 'weight',
      headerName: 'Weight',
      flex: 1,
      headerClassName: 'custom-header',
      renderCell: (param) => {
        if (loading) {
          return <LoadingCell />;
        }

        return param?.weight;
      }
    },
    {
      field: 'gender',
      headerName: 'Gender',
      flex: 1,
      headerClassName: 'custom-header',
      renderCell: (param) => {
        if (loading) {
          return <LoadingCell />;
        }

        return param?.gender;
      }
    },
    {
      field: 'age',
      headerName: 'Age',
      // type: 'number',
      flex: 1,
      headerClassName: 'custom-header',
      renderCell: (param) => {
        if (loading) {
          return <LoadingCell />;
        }

        return param?.age;
      }
    },
    {
      field: 'interest',
      headerName: 'Interest',
      flex: 1,
      headerClassName: 'custom-header',
      renderCell: (param) => {
        if (loading) {
          return <LoadingCell />;
        }

        return param?.interest;
      }
    },
    {
      field: 'hobbies',
      headerName: 'Hobbies',
      flex: 1,
      headerClassName: 'custom-header',
      renderCell: (param) => {
        if (loading) {
          return <LoadingCell />;
        }

        return param?.hobbies;
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      headerClassName: 'table-header',
      renderCell: (param) => {
        if (loading || !param) {
          return <LoadingCell />;
        }
        return (
          <  >
            <IconButton color="primary" onClick={() => { onAction("edit", param.row); }}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={() => onAction("delete", param.row)}>
              <DeleteIcon />
            </IconButton>
          </ >
        )
      }
    },
  ];
  return { columns };
};
