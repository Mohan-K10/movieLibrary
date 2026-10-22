
type Movie = {
  id: string;
  movieName: string;
  genre: string;
}

type Library = {
  movies: Movie[];
  onDelete: (id: string) => void;
  onEdit: (id: string, newName: string) => void
}

const Library = ({ movies, onDelete, onEdit }: Library) => {

  const date = new Date().toLocaleDateString()

  return (
    <>
      <table className="m-10 mx-30 w-[80vw] table-fixed border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-400">
            <th className="w-1/4 p-3 font-semibold">Movie Name</th>
            <th className="w-1/4 p-3 font-semibold">Genre</th>
            <th className="w-1/4 p-3 font-semibold">Added to Library</th>
            <th className="w-1/4 p-3 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>

          {movies.map((movie) => (
              <tr key={movie.id} className="border-b border-gray-400">
                <td className="p-3">{movie.movieName}</td>
                <td className="p-3">{movie.genre}</td>
                <td className="p-3">{date}</td>
                <td className="p-3 flex gap-10">
                  <button onClick={() => {
                    const editName = window.prompt(`Update the ${movie.movieName} to: `)
                    if (editName != null) {
                      onEdit(movie.id, editName)
                    }
                  }}
                    className="bg-blue-200 px-4 py-2 rounded-md">Edit</button>
                  <button onClick={() => onDelete(movie.id)} className="bg-red-200 px-4 py-2 rounded-md">Delete</button>
                </td>
              </tr>
          ))}


        </tbody>
      </table>
    </>
  )
}

export default Library
