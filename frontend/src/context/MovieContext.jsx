import {createContext, useState, useContext, useEffect} from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);
export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFaves = localStorage.getItem("favorites");
        if (storedFaves) {
            setFavorites(JSON.parse(storedFaves));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addFave = (movie) => {
        setFavorites (prev => [...prev, movie]);
    }

    const removeFromFave = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId));
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId); 
    }

    const value = {
        favorites,
        addFave,
        removeFromFave,
        isFavorite
    }
    return <MovieContext.Provider value = {value}>
        {children}
    </MovieContext.Provider>
}
