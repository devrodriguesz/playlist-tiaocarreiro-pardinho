'use client'
import React, { useState, useEffect } from 'react';

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
import getAlbum from './services/api';

interface Item {
  name: string;
  year: number;
  id: number;
  tracks: Track[];
}

interface Track {
  id: number;
  number: number;
  title: string;
  duration: number;
}

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [dataPlaylist, setDataPlaylist] = useState([])

  useEffect(() => {
    async function fetchAlbum() {
      const response = await getAlbum('album');
      setDataPlaylist(response.data);
    }

    fetchAlbum();
  }, []);

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
    { field: 'title', headerName: 'Faixa', width: 150, disableColumnMenu: true },
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
    { id: 1, number: 1, title: 'Minas Gerais', duration: '03:26' },
    { id: 2, number: 2, title: 'A Gerais', duration: '99:99' },
    { id: 3, number: 3, title: 'Minas Gerais', duration: '03:26' },
    { id: 4, number: 4, title: 'A Gerais', duration: '99:99' },
    { id: 5, number: 5, title: 'Minas Gerais', duration: '03:26' },
    { id: 6, number: 6, title: 'A Gerais', duration: '99:99' },
    { id: 7, number: 7, title: 'Minas Gerais', duration: '03:26' },
    { id: 8, number: 8, title: 'A Gerais', duration: '99:99' },
    { id: 9, number: 9, title: 'Minas Gerais', duration: '03:26' },
    { id: 10, number: 10, title: 'A Gerais', duration: '99:99' },
    { id: 11, number: 11, title: 'Minas Gerais', duration: '03:26' },
    { id: 12, number: 12, title: 'A Gerais', duration: '99:99' },
    { id: 13, number: 13, title: 'Minas Gerais', duration: '03:26' },
    { id: 14, number: 14, title: 'A Gerais', duration: '99:99' },
    { id: 15, number: 15, title: 'Minas Gerais', duration: '03:26' },
    { id: 16, number: 16, title: 'A Gerais', duration: '99:99' },
    { id: 17, number: 17, title: 'Minas Gerais', duration: '03:26' },
    { id: 18, number: 18, title: 'A Gerais', duration: '99:99' },
    { id: 19, number: 19, title: 'Minas Gerais', duration: '03:26' },
    { id: 20, number: 20, title: 'A Gerais', duration: '99:99' },
    { id: 21, number: 21, title: 'Minas Gerais', duration: '03:26' },
    { id: 22, number: 22, title: 'A Gerais', duration: '99:99' },
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

        <div>
          {dataPlaylist.map((item: Item) => (
            <div key={item.id} className={styles.containerItem}>
              <div className={styles.playlistHeader}>
                <div className={styles.playlistTitle}>
                  <h2>{item.name}, {item.year}</h2>
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
                rows={item.tracks.map((track: Track) => {
                  const minutes = Math.floor(track.duration / 60);
                  const seconds = track.duration % 60;
                  const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                  return { ...track, duration: formattedDuration };
                })}
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
          ))}
        </div>

      </div>
    </main>
  )
}