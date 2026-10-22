import { useState } from "react"
import { collection, addDoc } from 'firebase/firestore'
import { db } from "../firebase"

// expecting storemovie void type function as prop in Form (this function store movie name and genre in Movie hook)
type FormProps = {
  storeMovie: (id: string, movieName: string, genre: string) => void
}

const Form = ({storeMovie}: FormProps) => {
  const [movieName, setmovieName] = useState<string>("")
  const [genre, setgenre] = useState<string>("")

  const handleSubmit = async () => {
    if(!movieName.trim() || !genre) return

    try {
      // add document in cloud database with following schema(movieName, genre and createdAt)

      // collection named as 'movies' in database and db parameter is coming from firebase.ts config filee
      const movieDoc = await addDoc(collection(db, 'movies'), {
        movieName: movieName.trim(),
        genre, 
        createdAt: new Date(),
      })
      // storing movie name and genre in Movie hook by triggering this function which is declared in app.tsx
      storeMovie(movieDoc.id, movieName.trim(), genre)
      setmovieName("")
      setgenre("")
    } catch (error) {
      console.error(`Error in handleSubmit function in Form.tsx`, error)
    }
  }

  return (
    <>
      <div className='mx-20 py-10 flex flex-col gap-5'>
        <div>
          <p className='text-xl font-semibold mb-4'>Movie Name</p>
          <input value={movieName} placeholder="Enter Movie Name" onChange={(e)=> setmovieName(e.target.value)} className='border border-gray-200 rounded-md p-2 w-[40vw]' type="text" />
        </div>

        <div>
          <p className='text-xl font-semibold mb-4'>Genre</p>
          <select value={genre} onChange={(e) => setgenre(e.target.value)} className="border border-gray-200 p-2 w-[40vw] px-4 rounded-md">
            <option value="">Choose Movie Genre</option>
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="romance">Romance</option>
            <option value="thriller">Thriller</option>
            <option value="horror">Horror</option>
            <option value="psychological">Psychological</option>
            <option value="sci-fi">Sci-Fi</option>
          </select>
        </div>
      </div>
        <button onClick={handleSubmit} className="bg-blue-200 p-3 px-5 font-semibold rounded-md mx-20 cursor-pointer">Save</button>
    </>
  )
}

export default Form
