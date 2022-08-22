
import { useState, useEffect } from 'react';

import * as gameService from './components/services/gameService';

import { Routes, Route, } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import './App.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import CreateGame from './components/CreateGame/CreateGame';
import Catalog from './components/Catalog/Catalog';
import GameDetails from './components/GameDetails/GameDetails';

function App() {

    const [games, setGames] = useState([]);
    const addComment = (gameId, comment) => {
        setGames(state => {
            const game = state.find(x => x._id === gameId);

            const comments = game.comments || [];
            comments.push(comment)

            return [
                ...state.filter(x => x._id !== gameId),
                { ...game, comments: comments },
            ]
        })
    }

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                console.log(result);
                setGames(result);
            });
    }, []);
    return (
        <div id="box">
            <Header />

            {/* Main Content */}
            <main id="main-content"></main>
            <Routes>
                <Route path="/" element={<Home games={games} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create" element={<CreateGame />} />
                <Route path="/catalog" element={<Catalog games={games} />} />
                <Route path="/catalog/:gameId" element={<GameDetails games={games} addComment={addComment}/>} />

            </Routes>


            {/* Login Page ( Only for Guest users ) */}

            {/* Register Page ( Only for Guest users ) */}
            {/* <section id="register-page" className="content auth">
                <form id="register">
                    <div className="container">
                        <div className="brand-logo" />
                        <h1>Register</h1>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="maria@email.com"
                        />
                        <label htmlFor="pass">Password:</label>
                        <input type="password" name="password" id="register-password" />
                        <label htmlFor="con-pass">Confirm Password:</label>
                        <input type="password" name="confirm-password" id="confirm-password" />
                        <input className="btn submit" type="submit" defaultValue="Register" />
                        <p className="field">
                            <span>
                                If you already have profile click <a href="#">here</a>
                            </span>
                        </p>
                    </div>
                </form>
            </section> */}
            {/* Create Page ( Only for logged-in users ) */}

            {/* Edit Page ( Only for the creator )*/}
            {/* <section id="edit-page" className="auth">
                <form id="edit">
                    <div className="container">
                        <h1>Edit Game</h1>
                        <label htmlFor="leg-title">Legendary title:</label>
                        <input type="text" id="title" name="title" defaultValue="" />
                        <label htmlFor="category">Category:</label>
                        <input type="text" id="category" name="category" defaultValue="" />
                        <label htmlFor="levels">MaxLevel:</label>
                        <input
                            type="number"
                            id="maxLevel"
                            name="maxLevel"
                            min={1}
                            defaultValue=""
                        />
                        <label htmlFor="game-img">Image:</label>
                        <input type="text" id="imageUrl" name="imageUrl" defaultValue="" />
                        <label htmlFor="summary">Summary:</label>
                        <textarea name="summary" id="summary" defaultValue={""} />
                        <input className="btn submit" type="submit" defaultValue="Edit Game" />
                    </div>
                </form>
            </section> */}
            {/*Details Page*/}
            {/*  */}
            {/* */}
        </div>
    );
}

export default App;
