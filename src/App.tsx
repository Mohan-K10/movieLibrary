import { Routes, Route, Link } from 'react-router'
import './App.css'
import Library from './components/Library'
import Form from './components/Form'
import { useEffect, useState } from 'react'
import Movie_Cards from './components/Movie_Cards'
import Home_page from './components/Home_page'
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from './firebase'

type Movie = { id: string; movieName: string; genre: string }

function App() {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'movies'))
        setMovies(snapshot.docs.map(document => ({
          id: document.id,
          movieName: document.data().movieName,
          genre: document.data().genre,
        })))
      } catch (error) {
        console.error('Could not load movies:', error)
      }
    }

    void loadMovies()
  }, [])

  const handleStoreMovie = (id: string, movieName: string, genre: string) => {
      setMovies(currentMovies => [...currentMovies, { id, movieName, genre }])
  }
  const deleteMovie = async (movieId: string) => {
    try {
      await deleteDoc(doc(db, 'movies', movieId))
      setMovies(currentMovies => currentMovies.filter(movie => movie.id !== movieId))
    } catch (error) {
      console.error('Could not delete movie:', error)
    }
  }

  const editMovie = async(movieId: string, newName: string) => {
    try {
      await updateDoc(doc(db, 'movies', movieId), { movieName: newName })
      setMovies(currentMovies => currentMovies.map(movie =>
        movie.id === movieId ? { ...movie, movieName: newName } : movie
      ))
    } catch (error) {
      console.error('Could not update movie:', error)
    }
  }

  return (
    <>
    <div className="flex items-center justify-between mx-20 my-7 mt-9">
        <Link to={'/'} className='text-2xl font-bold'>Movie Library</Link>
        <nav className="flex gap-10 font-semibold">
            {/* Take movie data from user in /form */}
            <Link to={'/form'}>Add Movie</Link>
            {/* Display the user given movies as cards in /layout */}
            <Link to={'/layout'}>Movie Cards</Link>
            {/* Movie table with edit and delete options in /home */}
            <Link to={'/home'}>Movie Table</Link>
        </nav>
    </div>

      <Routes>
        <Route path='/' element={<Home_page/>}/>
        <Route path="/home" element={<Library movies={movies} onDelete={deleteMovie}  onEdit={editMovie} />}/>
        <Route path="/layout" element={<Movie_Cards movies={movies} onEdit={editMovie} onDelete={deleteMovie}/>}/>
        <Route path="/form" element={<Form storeMovie={handleStoreMovie} />}/>
      </Routes> 
      
    </>
  )
}

export default App
