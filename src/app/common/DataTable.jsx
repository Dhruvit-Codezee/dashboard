'use client';

import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { forwardRef } from 'react';
import { COLORS } from '@/constants/colors';



export const DataTable = forwardRef(({ ref, rows, columns, loading }) => {
    return (
        <>
            <Paper sx={{
                height: '78vh',
                width: '160vh', boxShadow: 3, borderRadius: 2
            }}>

                <DataGrid
                    initialState={{
                        filter: {
                            filterModel: {
                                items: [],
                                quickFilterValues: [],
                            },
                        },
                    }}
                    ref={ref}
                    rows={rows}
                    columns={columns}
                    loading={loading}
                    // pageSize={5}
                    // rowsPerPageOptions={[5, 10, 15]}
                    // pageSizeOptions={[5, 10]}
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector

                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                    sx={{
                        '& .MuiDataGrid-columnHeader': {
                            backgroundColor: '#d3d3d3',  // Light grey color for header
                            color: '#000',  // Black text for better readability
                            fontWeight: '600',  // Bold text
                            fontSize: '1.1rem',
                            borderBottom: '2px solid #ccc',  // Light border for separation
                            borderRadius: '0',
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            textTransform: 'uppercase',  // Uppercase text for headers
                        },
                        '& .MuiDataGrid-cell': {
                            padding: '12px 16px',  // Padding for cells
                        },
                        '& .MuiDataGrid-row:hover': {
                            backgroundColor: '#ecf0f1',  // Hover effect for rows
                        },
                        '& .MuiDataGrid-columnSeparator': {
                            display: 'none',  // Removing column separator
                        },
                        '& .MuiDataGrid-toolbarContainer': {
                            padding: '10px'
                        },
                        '& .MuiDataGrid-toolbarQuickFilter': {
                            backgroundColor: `${COLORS.IRON_50}`
                        },
                        // '& .MuiButtonBase-root': {
                        //     display: `none`
                        // }
                    }}
                />
            </Paper>

        </>
    );
});
