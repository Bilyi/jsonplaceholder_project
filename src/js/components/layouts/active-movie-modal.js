import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleMovieModal, setNextMovie } from '../../state/data/actions';
import moment from 'moment';

const ActiveMovieModal = ({ movies, toggleMovieModal, setNextMovie }) => {
    const { activeMovie, isActiveModal } = movies;
    if(!isActiveModal) {
        return null;
    }

    const { poster_path, title, release_date, overview, vote_average, adult, index } = activeMovie;
    const imgUrl = `http://image.tmdb.org/t/p/w300/${poster_path}`;

    const background = poster_path ? `url(${imgUrl})` : '#000';
    const wrapperStyles = {
        [ poster_path ? 'backgroundImage' : 'backgroundColor'] : background,
        opacity: `${!poster_path ? 0.9 : 1}`
    };

    const closeModal = (e) => {
        e.preventDefault();
        toggleMovieModal();
    };

    const nextMovie = (e) => {
        e.preventDefault();
        if(movies.results.length - 1 > activeMovie.index) {
            setNextMovie(index)
        }
    };

    return (
        <Fragment>
            <div className="background-img" style={wrapperStyles}/>
            <div className="modal-buttons">
                <button className="modal-btn" onClick={closeModal}>Back to list</button>
                <button className="modal-btn" onClick={nextMovie}>Next movie</button>
            </div>
            <div className="modal-wrapper">
                { Object.keys(activeMovie).length ? (
                    <div className="movie-details-container">
                        { poster_path &&
                            <div className="movie-poster-wrapper">
                                <img className="movie-poster" src={imgUrl}/>
                            </div>
                        }
                        <div className="movie-details">
                            <h1 className="movie-title">{title}({moment(release_date).format('YYYY')})</h1>
                            <ul className="movie-info">
                                <li>Score: {vote_average}</li>
                                <li>Rating: { adult ? 'R' : 'PG' }</li>
                                <li>Release date: {moment(release_date).format('LL')}</li>
                            </ul>
                            { overview &&
                                <div className="movie-description">
                                    <p>{overview}</p>
                                </div>
                            }
                        </div>
                    </div>
                ) : (
                    <h1>No any information about selected movie.</h1>
                )

                }
            </div>
        </Fragment>
    )
};

const mapStateToProps = state => {
    return {
        movies: state.movies
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleMovieModal: bindActionCreators(toggleMovieModal, dispatch),
        setNextMovie: bindActionCreators(setNextMovie, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveMovieModal);