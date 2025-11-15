import {
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import type { ReactNode } from 'react';

export interface DataTableColumn<T> {
  id: string;
  label: string;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  render: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  loading?: boolean;
  getRowKey: (row: T) => string | number;
}

export function DataTable<T>({ columns, data, loading = false, getRowKey }: DataTableProps<T>) {
  if (loading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ height: 240 }}>
        <CircularProgress size={32} />
      </Stack>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: '#F9FAFA' }}>
            {columns.map((col) => (
              <TableCell
                key={col.id}
                sx={{
                  width: col.width,
                  textAlign: col.align || 'left',
                }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={getRowKey(row)}>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  sx={{
                    textAlign: col.align || 'left',
                    color: '#1E2024',
                  }}
                >
                  {col.render(row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
