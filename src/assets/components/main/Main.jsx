import mainStyles from "./Main.module.scss";
import { useState, useRef } from "react";

const Main = () => {
    const [titles, setTitles] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState("");
    const titleRef = useRef();

    // Aggiungi titolo
    const titleSubmit = (event) => {
        event.preventDefault();
        const title = titleRef.current.value;
        // Se inserisci 3 spazi non si crea il post 
        if (title.trim().length !== 0) {
            setTitles(array => ([...array, title]));
            titleRef.current.value = "";
        }
    }

    // Elimina titolo
    const deleteTitle = (index) => {
        setTitles(array => array.filter((t, i) => i !== index));
    }

    // Se clicchi il pulsante enter aggiunge il titolo
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            titleSubmit(event);
        }
    }

    // Fa spuntare la parte modifica
    const startEditTitle = (index, currentTitle) => {
        setEditIndex(index);
        setEditValue(currentTitle);
    }

    // Salva il contenuto
    const saveEditTitle = (index) => {
        setTitles(array => array.map((t, i) => i === index ? editValue : t));
        setEditIndex(null);
        setEditValue("");
    }

    return (
        <main>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 my-5 ">
                        <label htmlFor="title" className={mainStyles.viola}>
                            <h3>Titolo del post</h3>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            placeholder="Inserisci il titolo del post"
                            ref={titleRef}
                            onKeyPress={handleKeyPress}
                        />
                        <button className={mainStyles.button} onClick={titleSubmit}>Invia</button>
                    </div>

                    <h3 className={mainStyles.viola}>Titoli salvati</h3>
                    {titles.map((title, index) => (
                        <div className="col-12 col-md-4  d-flex justify-content-center">
                            <div className="d-flex mt-3 text-center" key={index}>
                                {editIndex === index ? (
                                    <div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                        />
                                        <div className="my-3">
                                            <button className={mainStyles.button} onClick={() => saveEditTitle(index)}>Salva</button>
                                            <button className={mainStyles.button} onClick={() => setEditIndex(null)}>Annulla</button>
                                        </div>

                                    </div>
                                ) : (
                                    <div>
                                        <h3 className="me-3">{title}</h3>
                                        <button
                                            className={mainStyles.edit}
                                            onClick={() => startEditTitle(index, title)}>
                                            <i className="fa-solid fa-pen"></i>
                                        </button>
                                        <button
                                            className={mainStyles.trash}
                                            onClick={() => deleteTitle(index)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Main;
