
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';

const GameDetails = ({
    games,
    addComment,
}) => {
    const { gameId } = useParams();
    const [comment, setComment] = useState({
        username: '',
        comment: '',
    });
    const [error, setError] = useState({
        username: '',
        comment: '',

    });


    const game = games.find(x => x._id === gameId);

    const addCommentHandler = (e) => {
        e.preventDefault();

        const result = `${comment.username} : ${comment.comment}`;
        addComment(gameId, result);

    }

    const onChange = (e) => {
        setComment(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const validateUsername = (e) => {
        const username = e.target.value;
        let errorMessage = '';

        if (username.length < 4) {
            errorMessage = 'Username must be longer than  4 characters';
        } else if(username.length > 10){
            errorMessage = 'Username must be shorter than 10 characters'
        }

            setError(state => ({
                ...state,
                username: errorMessage,
            }));
    }



return (
    <section id="game-details">
        <h1>{game.title}</h1>
        <div className="info-section">
            <div className="game-header">
                <img className="game-img" src={game.imageUrl} alt="1313" />
                <h1>Bright</h1>
                <span className="levels">MaxLevel: {game.maxLevel}</span>
                <p className="type">{game.category}</p>
            </div>
            <p className="text">
                {game.summary}
            </p>
            <div className="details-comments">
                <h2>Comments:</h2>
                <ul>

                    {game.comments?.map(x =>
                        <li className="comment">
                            <p>{x}</p>
                        </li>
                    )}
                </ul>

                {!game.comments &&
                    <p className="no-comment">No comments.</p>
                }
            </div>
            <div className="buttons">
                <Link to="#" className="button">
                    Edit
                </Link>
                <Link to="#" className="button">
                    Delete
                </Link>
            </div>
        </div>
        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" onSubmit={addCommentHandler}>
                <input
                    type="text"
                    name="username"
                    placeholder="Ivan Georgiev"
                    onChange={onChange}
                    onBlur={validateUsername}
                    value={comment.username}
                />

                {error.username && 
                <div style={{color: "red"}}>{error.username}</div>}


                <textarea
                    name="comment"
                    placeholder="Comment......"
                    onChange={onChange}
                    value={comment.comment}
                />
                <input
                    className="btn submit"
                    type="submit"
                    value="Add Comment"
                />
            </form>
        </article>
    </section>
);
}
export default GameDetails;