'use client'
import React, { useState } from 'react';

import styles from './page.module.css'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import Header from './components/Header/page'

export default function Home() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  };

  const deleteTrack = () => {
    console.log('Musica deletada')
  }

  const addTrack = () => {
    console.log('Musica adicionada')
  }

  const createPlaylist = () => {
    console.log('Playlist criada com sucesso')
  }

  const deletePlaylist = () => {
    console.log('Playlist deletada')
  }

  const columns: GridColDef[] = [
    { field: 'number', headerName: 'Nº', width: 70, disableColumnMenu: true },
    { field: 'track', headerName: 'Faixa', width: 150, disableColumnMenu: true },
    { field: 'duration', headerName: 'Duração', width: 130, disableColumnMenu: true, sortable: false },
    { field: 'spacer', headerName: '', width: 600, disableColumnMenu: true, sortable: false },
    {
      field: 'action', headerName: 'Ação', width: 130, disableColumnMenu: true, sortable: false,
      renderCell: (params) => (
        <IconButton aria-label="delete track" color='error' onClick={() => deleteTrack()}>
          <DeleteForeverOutlinedIcon />
        </IconButton>
      ),
    },
  ];

  const rows = [
    { id: 1, number: 1, track: 'Minas Gerais', duration: '03:26' },
    { id: 2, number: 2, track: 'A Gerais', duration: '99:99' },
    { id: 3, number: 3, track: 'Minas Gerais', duration: '03:26' },
    { id: 4, number: 4, track: 'A Gerais', duration: '99:99' },
    { id: 5, number: 5, track: 'Minas Gerais', duration: '03:26' },
    { id: 6, number: 6, track: 'A Gerais', duration: '99:99' },
    { id: 7, number: 7, track: 'Minas Gerais', duration: '03:26' },
    { id: 8, number: 8, track: 'A Gerais', duration: '99:99' },
    { id: 9, number: 9, track: 'Minas Gerais', duration: '03:26' },
    { id: 10, number: 10, track: 'A Gerais', duration: '99:99' },
    { id: 11, number: 11, track: 'Minas Gerais', duration: '03:26' },
    { id: 12, number: 12, track: 'A Gerais', duration: '99:99' },
    { id: 13, number: 13, track: 'Minas Gerais', duration: '03:26' },
    { id: 14, number: 14, track: 'A Gerais', duration: '99:99' },
    { id: 15, number: 15, track: 'Minas Gerais', duration: '03:26' },
    { id: 16, number: 16, track: 'A Gerais', duration: '99:99' },
    { id: 17, number: 17, track: 'Minas Gerais', duration: '03:26' },
    { id: 18, number: 18, track: 'A Gerais', duration: '99:99' },
    { id: 19, number: 19, track: 'Minas Gerais', duration: '03:26' },
    { id: 20, number: 20, track: 'A Gerais', duration: '99:99' },
    { id: 21, number: 21, track: 'Minas Gerais', duration: '03:26' },
    { id: 22, number: 22, track: 'A Gerais', duration: '99:99' },
  ];


  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.container}>
        <div className={styles.menu}>
          <Button
            variant="contained"
            size="large"
            endIcon={<AddCircleIcon />}
            onClick={createPlaylist}
            >              
            Criar Playlist
          </Button>

          <TextField
            id='search-input'
            label="Pesquisar"
            placeholder="Digite o nome do álbum"
            value={inputValue}
            onChange={handleInputChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#000',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#000',
                  outline: 'none',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#000',
              },
            }}
            InputProps={{
              endAdornment: (
                <IconButton aria-label="pesquisar" onClick={() => console.log(inputValue)} edge="end">
                  <SearchOutlinedIcon />
                </IconButton>
              ),
            }}
          />
        </div>

        <div className={styles.containerItem}>
          <div className={styles.playlistHeader}>
            <div className={styles.playlistTitle}>
              <h2>Rei do Gado, 1961</h2>
              <Button
                variant="outlined"
                startIcon={<AddCircleIcon />}
                sx={{
                  fontWeight: 700,
                }}
                onClick={addTrack}
              >
                Adicionar Música</Button>
            </div>
            <Button
              variant="outlined"
              color='error'
              startIcon={<DeleteIcon />}
              sx={{
                fontWeight: 700,
              }}
              onClick={deletePlaylist}
            >
              Deletar Playlist</Button>
          </div>
          <DataGrid
            rows={rows}
            columns={columns}
            rowSelectionModel={[] as GridRowSelectionModel}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 15, 20, 50, 100]}
          />
        </div>

      </div>
    </main>
  )
}
