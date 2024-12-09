'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Box, Button } from '@mui/material';


export function DataTable({ rows, columns }) {
    return (
        <>
            <Paper sx={{
                height: '78vh',
                width: '160vh', boxShadow: 3, borderRadius: 2
            }}>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 15]}
                    pageSizeOptions={[5, 10]}
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
                    }}
                />
            </Paper>

        </>
    );
}
