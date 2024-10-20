/**
 * @typedef {Object} Song
 * @property {string} title - The title of the song.
 * @property {string} artist - The artist of the song.
 * @property {string} genre - The genre of the song.
 * @property {number} duration - The duration of the song in seconds.
 * @property {boolean} favorite - Whether the song is marked as a favorite.
 */
// Example: { title: 'Song Title', artist: 'Song Artist', genre: 'Song Genre', duration: 180, favorite: false }


/**
 * @typedef {Object} Playlist
 * @property {string} name - The name of the playlist.
 * @property {Song[]} songs - The list of songs in the playlist.
 */
// Example: { name: 'Playlist Name', songs: [{ title: 'Song Title', artist: 'Song Artist', genre: 'Song Genre', duration: 180, favorite: false }] }

const findPlaylist = (playlistList, playlistName) => {
  const foundPlaylist = playlistList.find(playlist => playlist.name === playlistName)
  if (!foundPlaylist) throw new Error('Playlist not found')
  return foundPlaylist
}

const musicCatalog = () => {
  /**
   * Array of playlists in the catalog.
   * @type {Playlist[]}
   */
  let playlists = [];

  /**
   * Adds a new playlist to the catalog.
   * @param {string} playlistName - The name of the new playlist.
   */
  const createPlaylist = (playlistName) => {
    const newPlaylist = { name: playlistName, songs: [] }
    // playlists.push(newPlaylist) puede acabar causando errores, muta playlists
    playlists = [...playlists, newPlaylist]
  };

  /**
   * Gets all playlists in the catalog.
   * @returns {Playlist[]} The list of all playlists.
   */
  const getAllPlaylists = () => {
    return playlists
  };

  /**
   * Removes a playlist from the catalog.
   * @param {string} playlistName - The name of the playlist to remove.
   */
    const removePlaylist = (playlistName) => {
      playlists = playlists.filter(playlist => playlist.name !== playlistName)
    };

  /**
   * Adds a song to a specific playlist.
   * @param {string} playlistName - The name of the playlist to add the song to.
   * @param {{ title: string, artist: string, genre: string, duration: number }} song - The song to add to the playlist.
   * @throws {Error} If the playlist is not found.
   */
  const addSongToPlaylist = (playlistName, song) => {
    const playlistFound = findPlaylist(playlists, playlistName)
    // playlist.songs.push({ ...song, favorite: false }) muta, da lugar a errores
    const updatedPlaylist = { name: playlistFound.name, songs: [...playlistFound.songs, { ...song, favorite: false }]}
    playlists = playlists.map(playlist => playlist.name === playlistName ? updatedPlaylist : playlist)
    /*
    playlists = playlists.map(playlist => {
      if (playlist.name === playlistName) return updatedPlaylist
      return playlist
    })
    */
  };

  /**
   * Removes a song from a specific playlist.
   * @param {string} playlistName - The name of the playlist to remove the song from.
   * @param {string} title - The title of the song to remove.
   * @throws {Error} If the playlist or song is not found.
   */
  const removeSongFromPlaylist = (playlistName, title) => {
    const playlistFound = findPlaylist(playlists, playlistName)
    const songToDelete = playlistFound.songs.find(song => song.title === title)
    if (!songToDelete) throw new Error('Song not found')
    const updatedSongs = playlistFound.songs.filter(song => song !== songToDelete)
    const updatedPlaylist = { name: playlistFound.name, songs: updatedSongs }
    // playlist.songs.pop(song) muta el array original evitar uso como con push
    // con ternaria, por praticar, es igual que el playlists.map de addSongToPlaylist pero en una linea
    playlists = playlists.map(playlist => playlist.name === playlistName ? updatedPlaylist : playlist)
  };

  /**
   * Marks a song as a favorite or removes the favorite status.
   * @param {string} playlistName - The name of the playlist containing the song.
   * @param {string} title - The title of the song to mark as a favorite.
   */
  const favoriteSong = (playlistName, title) => {
    const playlistFound = findPlaylist(playlists, playlistName)
    const songToFavorite = playlistFound.songs.find(song => song.title === title)
    if (!songToFavorite) throw new Error('Song not found')
    const updatedSongs = playlistFound.songs.map(song => {
      if (song === songToFavorite) return { ...song, favorite: true }
      return song
    })
    const updatedPlaylist = { name: playlistFound.name, songs: updatedSongs }
    playlists = playlists.map(playlist => playlist.name === playlistName ? updatedPlaylist : playlist)
  };

  /**
   * Sorts songs in a specific playlist by a given criterion (title, artist, or duration).
   * @param {string} playlistName - The name of the playlist to sort songs in.
   * @param {'title' | 'artist' | 'duration'} criterion - The criterion to sort by.
   * @returns {Song[]} The list of sorted songs.
   * @throws {Error} If the playlist is not found or the criterion is invalid.
   */
  const sortSongs = (playlistName, criterion) => {
    if (!['title', 'artist', 'duration'].includes(criterion)) throw new Error('Invalid criterion')
    const playlistFound = findPlaylist(playlists, playlistName)

    const sortedSongs = playlistFound.songs.toSorted((a, b) => criterion === 'duration' ? a.duration - b.duration : a[criterion].localeCompare(b[criterion]))
    const updatedPlaylist = { name: playlistFound.name, songs: sortedSongs }

    playlists = playlists.map(playlist => playlist.name === playlistName ? updatedPlaylist : playlist)
    /* Esto lo entiendo, pero aun no estoy comodo con ello
    const compareCriterions = {
      duration: song => song.duration,
      title: song => song.title,
      artist: song => song.artist
    }
    
    playlist.songs.sort((a, b) => {
      const getCriterion = compareCriterions[criterion]

      return getCriterion(a).localeCompare(getCriterion(b))
    })
    */
    
  };

  return { createPlaylist, addSongToPlaylist, removeSongFromPlaylist, sortSongs, getAllPlaylists, removePlaylist, favoriteSong };
};

export default musicCatalog

/*
const catalog = musicCatalog();
catalog.createPlaylist('Rock Classics');
catalog.createPlaylist('Pop Hits');
//Crear una canción
const song = { title: 'Billie Jean', artist: 'Michael Jackson', genre: 'Pop', duration: 300 };
//Añadir la canción usando push (modificación directa)
catalog.addSongToPlaylist('Rock Classics', song);
//Verificar antes de añadir la misma canción a otra playlist
const originalPlaylistWithoutPopHitSong = catalog.getAllPlaylists();
//Añadir la misma canción a "Pop Hits"
catalog.addSongToPlaylist('Pop Hits', song);
// Verificar después de añadir la canción
const playlistAfterAddingSongToPop = catalog.getAllPlaylists();
console.log(originalPlaylistWithoutPopHitSong); // no debería tener canción en pop hits pero usando push muta el valor y si que la pone
console.log(playlistAfterAddingSongToPop); // debería tener canción ambas playlist
*/