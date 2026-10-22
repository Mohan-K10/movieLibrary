type Movie = {
  id: string;
  movieName: string;
  genre: string;
}

type movieCards = {
  movies: Movie[];
  onEdit: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
}


const Movie_Cards = ({movies, onEdit, onDelete}: movieCards) => {
  return (
    <>
      <div className="mx-20 grid grid-cols-4 justify-items-center gap-7">
        {movies.map((movie) => (
          <div key={movie.id} className="w-fit border-2 border-gray-300 px-10 py-5 rounded-md flex flex-col gap-6">
          <h1 className="font-semibold text-xl pt-2">{movie.movieName}</h1>
          <p className="font-semibold text-xl">{movie.genre}</p>
          <div className="flex gap-10 mt-3">
            <button onClick={() => {
              const newname = window.prompt(`Update ${movie.movieName} to: `)
              if(newname != null) {
                onEdit(movie.id, newname)
              }
            }} className="bg-blue-200 px-7 py-3 rounded-md">Edit</button>
            <button onClick={()=> onDelete(movie.id)} className="bg-blue-200 px-7 py-3 rounded-md">Delete</button>
          </div>
        </div>
        ))}



       
      </div>
    </>
  )
}

export default Movie_Cards
