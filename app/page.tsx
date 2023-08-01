'use client'
import React, { useState, useEffect } from 'react';

import styles from './page.module.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import Header from './components/Header/page'
import { getAlbum, createAlbum, deleteAlbum, createTrack, deleteTrack } from './services/api';




export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [dataPlaylist, setDataPlaylist] = useState<Album[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistYear, setPlaylistYear] = useState('');

  const [isAddTrackModalOpen, setIsAddTrackModalOpen] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(0);
  const [trackNumber, setTrackNumber] = useState(0);
  const [trackTitle, setTrackTitle] = useState('');
  const [trackDuration, setTrackDuration] = useState(0);
  const [filteredPlaylists, setFilteredPlaylists] = useState<Album[]>([]);

  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    const searchValue = event.target.value;
    setInputValue(searchValue);
  };

  const handleSearch = () => {
    const filtered = dataPlaylist.filter(item =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  
    setFilteredPlaylists(filtered);
    console.log(filtered)
  };

    const fetchAlbumData = async () => {
    try {
      const response = await getAlbum('album');
      if (response && response.data) {
        setDataPlaylist(response.data);
        setFilteredPlaylists(response.data);
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAlbumData();
  }, []);


  const createPlaylist = async () => {
    try {
      await createAlbum(playlistName, playlistYear);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deletePlaylist = async (id: number) => {

    if (window.confirm(`Tem certeza que deseja excluir`)) {

      try {
        await deleteAlbum(id);  
        fetchAlbumData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const addTrack = (playlistId: number) => {
    setSelectedPlaylistId(playlistId);
    openAddTrackModal();
  };

  const openAddTrackModal = () => {
    setIsAddTrackModalOpen(true);
  };

  const closeAddTrackModal = () => {
    setIsAddTrackModalOpen(false);
  };

  const handleDeleteTrack = async (id: number) => {

    if (window.confirm(`Tem certeza que deseja excluir`)) {
      try {
        await deleteTrack(id);
        fetchAlbumData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const columns: GridColDef[] = [
    { field: 'number', headerName: 'Nº', width: 70, disableColumnMenu: true },
    { field: 'title', headerName: 'Faixa', width: 150, disableColumnMenu: true },
    { field: 'duration', headerName: 'Duração', width: 130, disableColumnMenu: true, sortable: false },
    {
      field: 'action', headerName: 'Ação', width: 130, disableColumnMenu: true, sortable: false,
      renderCell: (params) => (
        <IconButton aria-label="delete track" color='error' onClick={() => handleDeleteTrack(params.row.id)}>
          <DeleteForeverOutlinedIcon />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    async function fetchAlbum() {
      const response = await getAlbum('album');
      if (response && response.data) {
        setDataPlaylist(response.data);
      }
    }

    fetchAlbum();
  }, []);

  const newTrackData = {
    albumId: selectedPlaylistId,
    number: trackNumber,
    title: trackTitle,
    duration: trackDuration,
  };

  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.container}>
        <div className={styles.menu}>
          <Button
            variant="contained"
            size="large"
            endIcon={<AddCircleIcon />}
            onClick={openModal}
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
                <IconButton aria-label="pesquisar" onClick={handleSearch} edge="end">
                  <SearchOutlinedIcon />
                </IconButton>
              ),
            }}
          />
        </div>

        <div>
          {filteredPlaylists.map((playlist: Album) => (
            <div key={playlist.id} className={styles.containerplaylist}>
              <div className={styles.playlistHeader}>
                <div className={styles.playlistTitle}>
                  <h2>{playlist.name}, {playlist.year}</h2>
                  <Button
                    variant="outlined"
                    startIcon={<AddCircleIcon />}
                    sx={{
                      fontWeight: 700,
                    }}
                    onClick={() => addTrack(playlist.id)}
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
                  onClick={() => deletePlaylist(playlist.id)}
                >
                  Deletar Playlist</Button>
              </div>
              <DataGrid
                rows={playlist.tracks.map((track: Track) => {
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

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="modal-title">Criar Playlist</h2>
          <form onSubmit={createPlaylist}>
            <TextField
              label="Nome da Playlist"
              fullWidth
              required
              value={playlistName}
              sx={{ mt: 2 }}
              onChange={(e) => setPlaylistName(e.target.value)}
            />
            <TextField
              label="Ano"
              fullWidth
              required
              type="number"
              value={playlistYear}
              sx={{ mt: 2 }}
              onChange={(e) => setPlaylistYear(e.target.value)}
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Enviar
            </Button>
          </form>
        </Box>
      </Modal>

      <Modal
        open={isAddTrackModalOpen}
        onClose={closeAddTrackModal}
        aria-labelledby="add-track-modal-title"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="add-track-modal-title">Adicionar Música</h2>
          <form onSubmit={() => createTrack(newTrackData)}>
            <TextField
              label="Número"
              fullWidth
              required
              type="number"
              value={trackNumber}
              sx={{ mt: 2 }}
              onChange={(e) => setTrackNumber(Number(e.target.value))}
            />
            <TextField
              label="Título"
              fullWidth
              required
              value={trackTitle}
              sx={{ mt: 2 }}
              onChange={(e) => setTrackTitle(e.target.value)}
            />
            <TextField
              label="Duração"
              fullWidth
              required
              type="number"
              value={trackDuration}
              sx={{ mt: 2 }}
              onChange={(e) => setTrackDuration(Number(e.target.value))}
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Enviar
            </Button>
          </form>
        </Box>
      </Modal>
    </main>
  )
}