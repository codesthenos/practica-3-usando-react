function App () {
  const playlists = [
    {
      name: 'playlist1',
      songs: [
        {
          title: 'song1',
          artist: 'artist1',
          genre: 'genre1',
          duration: 180,
          favorite: false
        },
        {
          title: 'song2',
          artist: 'artist2',
          genre: 'genre2',
          duration: 200,
          favorite: false
        }
      ]
    },
    {
      name: 'playlist2',
      songs: [
        {
          title: 'song3',
          artist: 'artist3',
          genre: 'genre3',
          duration: 150,
          favorite: false
        },
        {
          title: 'song2',
          artist: 'artist2',
          genre: 'genre2',
          duration: 200,
          favorite: true
        }
      ]
    }
  ]
  return (
    <>
      <h1>Keep coding playlist</h1>
      <section>
        <h2>Add playlist</h2>
        <form id="playlist" autoComplete="off">
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <button>Add playlist</button>
        </form>
        <h2>Playlists</h2>
        <div id="playlists">
          {
            playlists.map((playlist, index) => (
              <section key={`${playlist.name}${index}`}>
                <h2>{playlist.name} - Playlist</h2>
                <form className="song-form" data-id="${playlist.name}">
                  <div className="form-control">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" placeholder="Title" required />
                  </div>
                  <div className="form-control">
                    <label htmlFor="artist">Artist</label>
                    <input type="text" name="artist" placeholder="Artist" required />
                  </div>
                  <div className="form-control">
                    <label htmlFor="genre">Genre</label>
                    <input type="text" name="genre" placeholder="Genre" required />
                  </div>
                  <div className="form-control">
                    <label htmlFor="duration">Duration (Seconds)</label>
                    <input type="number" name="duration" placeholder="Duration" />
                  </div>
                  <button type="submit">Add Song</button>
                </form>
                <p><b>Sort songs</b></p>
                <div className="sort-songs">
                  <button className="criterion" data-id="${playlist.name}" data-criterion="duration">Sort by duration</button>
                  <button className="criterion" data-id="${playlist.name}" data-criterion="title">Sort by title</button>
                  <button className="criterion" data-id="${playlist.name}" data-criterion="artist">Sort by artist</button>
                </div>
                {
                  playlist.songs.map((song, index) => (
                    <div key={`${song.title}${index}`} className="song">
                      <h3>{song.title}</h3>
                      <p>Artist: {song.artist}</p>
                      <p>Genre: {song.genre}</p>
                      <p>Duration: {song.duration}</p>
                      {
                        song.favorite ? <p>One of my favorites</p> : <button className="favorite-song" data-playlist={playlist.name} data-id={song.title}>Favorite</button>
                      }
                      <button className="remove-song" data-playlist="${playlistName}" data-id="${song.title}">Remove</button>
                    </div>
                  ))
                }
                <button className="remove-playlist" data-id="${playlist.name}">Remove playlist</button>
              </section>
            ))
          }
        </div>
      </section>
    </>
  )
}

export default App
