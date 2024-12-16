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
                            backgroundColor: '#d3d3d3',
                            color: '#000',
                            fontWeight: '600',
                            fontSize: '1.1rem',
                            borderBottom: '2px solid #ccc',
                            borderRadius: '0',
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            textTransform: 'uppercase',
                        },
                        '& .MuiDataGrid-cell': {
                            padding: '12px 16px',
                        },
                        '& .MuiDataGrid-row:hover': {
                            backgroundColor: '#ecf0f1',
                        },
                        '& .MuiDataGrid-columnSeparator': {
                            display: 'none',
                        },
                        '& .MuiDataGrid-toolbarContainer': {
                            padding: '10px'
                        },
                        '& .MuiDataGrid-toolbarQuickFilter': {
                            backgroundColor: `${COLORS.IRON_50}`
                        },
                    }}
                />
            </Paper>

        </>
    );
});
