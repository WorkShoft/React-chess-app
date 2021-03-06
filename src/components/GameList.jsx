import React, {useState, useEffect} from 'react';
import {
  Link
} from "react-router-dom";

import '../css/GameList.css';
import {getUnfinishedGames, getGames, joinGame} from '../api/api.jsx';


const GameList = (props) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [joining, setJoining] = useState(false);
  const {ownGames} = props;

  useEffect(() => {
    const loadGames = async() => {
    setLoading(true);
    const gamesResponse = ownGames ? await getUnfinishedGames() : await getGames();
    setGames(gamesResponse.results);
    setLoading(false);
    };
    
    loadGames();
  }, []);

  const gameList = games.map((game) => {
    let {whites_player} = game;
    let {blacks_player} = game;
    let {uuid} = game;

    let {username: whites_username} = whites_player || "???";
    let {username: blacks_username} = blacks_player || "???";  

    return <Link to={`/game/${uuid}`} key={game.id} uuid={uuid}>
      <tr className="row">
	<td className="col-lg-6 col-sm-6 col-6">
	  <b>{whites_username || "???"}</b>
	</td>
	<td className="col-lg-6 col-sm-6 col-6">
	  <b>{blacks_username || "???"}</b>
	</td>
      </tr>
    </Link>;
  });

  if(loading === false) {
    return <table className="col-lg-2 col-sm-6 col-9 table mx-auto text-center" id="gameList">
             <thead>
               <tr className="row">
                 <th className="col-lg-6 col-6"><b>White</b></th>
                 <th className="col-lg-6 col-6"><b>Black</b></th>
               </tr>
             </thead>
             <tbody>
               {gameList}
             </tbody>
           </table>;    
  }

  return <div />;

};


export default GameList;
