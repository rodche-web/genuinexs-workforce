'use client';

import {useState, useEffect} from 'react';
import {
  Box,
  Button,
  Typography,
  Paper
} from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { green } from '@mui/material/colors';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'jobTitle', headerName: 'Job Title', width: 200 },
  { field: 'department', headerName: 'Department', width: 200 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function JobList() {
  const [jobData, setJobData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const searchParams = useSearchParams();

  const fetchJobData = async () => {
    try {
      const search = searchParams.get('search');
      const response = await fetch(search ? `/api/jobs?search=${search}` : '/api/jobs');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setJobData(data.data);
    } catch (err) {
      alert(err.message || 'An Error has occured');
    } 
  }

  useEffect(() => {
    fetchJobData();
  }, [searchParams]);

  const deleteSelectedJobs = async () => {
    if (selectedIds.length === 0) return;

    try {
      const response = await fetch('/api/jobs', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (!response.ok) throw new Error('Failed to delete selected jobs');
      fetchJobData();
      setSelectedIds([]);
    } catch (err) {
      alert(err.message || 'An Error has occurred');
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: '50%', margin: '0 auto' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4 
      }}>
        <Typography variant="h5">
          Jobs
        </Typography>
        <Box>
          <Button 
            variant="contained"
            onClick={deleteSelectedJobs} 
            sx={{ 
              bgcolor: green[600],
              '&:hover': {
                bgcolor: green[700],
              }
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>

      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={jobData}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          getRowId={row => row._id}
          checkboxSelection
          onRowSelectionModelChange={(ids) => setSelectedIds(ids)}
          sx={{ border: 0 }}
        />
      </Paper>
    </Box>
  );
}

