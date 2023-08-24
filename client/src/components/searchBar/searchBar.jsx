import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchByName } from '../../Redux/actions';
import './searchBar.css';

export default function SearchBar(props) {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        dispatch(searchByName(searchValue));
        props.update()
    };

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            dispatch(searchByName(searchValue));
            props.update()
        }
    };

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            dispatch(searchByName(searchValue));
            props.update()
        }
    };

    const handleInput = (event) => {
        setSearchValue(event.target.value);
        dispatch(searchByName(event.target.value));
        props.update()
    };

    return (
        <div className="Conteiner">
            <div className='search-bar'>
                <div className="input-group">
                    <input
                        type='search'
                        className='form-control custom-inputBusqueda'
                        placeholder='Ej: "Fernandez"'
                        value={searchValue}
                        onKeyDown={handleKeyDown}
                        onKeyUp={handleEnter}
                        onInput={handleInput}
                    />
                    <div className="input-group-append">
                        <button onClick={handleSearch} className='btn custom-buttonBusqueda'>
                            <i className='bx bx-search'></i>
                        </button>
                    </div>
                </div>
            </div>


        </div>
    )
}





// import './searchBar.css'

// import { useState } from 'react';
// import { useDispatch } from 'react-redux'
// import { searchByName } from '../../Redux/actions'

// export default function SearchBar() {
//     // Obtiene la función de despacho de acciones desde Redux
//     const dispatch = useDispatch();
//     // Define el estado "searchValue" y su función "setSearchValue" para el valor de búsqueda
//     const [searchValue, setSearchValue] = useState('');

//     // Función para manejar la búsqueda de recetas al hacer clic en el botón de búsqueda
//     const handleSearch = () => {
//         dispatch(searchByName(searchValue));
//     };

//     // Función para manejar la búsqueda de recetas al presionar la tecla "Enter" en la barra de búsqueda
//     const handleKeyDown = (event) => {
//         if (event.keyCode === 13) {
//             dispatch(searchByName(searchValue));
//         }
//     };

//     // Función para manejar la búsqueda de recetas al soltar la tecla "Enter" en la barra de búsqueda
//     const handleEnter = (event) => {
//         if (event.key === 'Enter') {
//             dispatch(searchByName(searchValue))
//         }
//     };

//     return (
//         <div className='content'>
//             {/* Barra de búsqueda */}
//             <input
//                 type='search'
//                 placeholder='Ej:"Fernandez"'
//                 value={searchValue}
//                 onChange={(event) => setSearchValue(event.target.value)}
//                 onKeyDown={handleKeyDown}
//                 onKeyUp={handleEnter}
//             />
//             {/* Botón de búsqueda */}
//             <button onClick={handleSearch} className='submit'>
//                 Buscar
//             </button>
//         </div>
//     )
// }