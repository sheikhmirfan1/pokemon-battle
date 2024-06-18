import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { yellow } from "@mui/material/colors";


const PokemonGame = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [playerPokemon, setPlayerPokemon] = useState(null);
    const [computerPokemon, setComputerPokemon] = useState(null);
    const [battleResult, setBattleResult] = useState('');

    const fetchPokemonList = async () => {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=04');
            setPokemonList(response.data.results);
            console.log(response.data);
            
        } catch (error) {
            console.error('Error fetching Pokemon list:', error);
        }
    };
useEffect(() => {
    fetchPokemonList()},[]);


    const selectPokemon = (pokemon) => {
        setPlayerPokemon(pokemon);
        selectComputerPokemon();
    };

    const selectComputerPokemon = () => {
        const randomIndex = Math.floor(Math.random() * pokemonList.length);
        setComputerPokemon(pokemonList[randomIndex]);
    };

    const startBattle = () => {
        const playerPokemonIndex = pokemonList.findIndex(
            (pokemon) => pokemon.name === playerPokemon.name
        );
        const computerPokemonIndex = pokemonList.findIndex(
            (pokemon) => pokemon.name === computerPokemon.name
        );

        if (playerPokemonIndex > computerPokemonIndex) {
            setBattleResult('Player Wins');
        } else if (playerPokemonIndex < computerPokemonIndex) {
            setBattleResult('Computer Wins');
        } else {
            setBattleResult('Draw');
        }

        
    };
    return (
      <>
        <div style={{ padding: "3%" }}>
          <h1>Pokemon Battle Game</h1>

          <h2>Select Your Pokemon:</h2>
          <div className="div-card">
            {pokemonList.map((pokemon, index) => (
              <div key={index}>
                {/* <button onClick={() => selectPokemon(pokemon)}>
                    {pokemon.name}
                  </button> */}
                <div>
                  <Card sx={{ Width: 345, margin: 1, bgcolor: yellow[200] }}>
                    <button onClick={() => selectPokemon(pokemon)}>
                      {pokemon.name}
                    </button>

                    <CardMedia
                      sx={{
                        height: 120,
                        width: 140,
                      }}
                      image={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
                      
                      title="Pokemon"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                      ></Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      ></Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={startBattle}>
                        Start Battle
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {playerPokemon && computerPokemon && (
          <div>
            <h2>Player's Pokemon: {playerPokemon.name}</h2>
            <h2>Computer's Pokemon: {computerPokemon.name}</h2>
            <div className="reslt">
              {battleResult && <h2>{battleResult}</h2>}
            </div>

            <button onClick={startBattle}>Start Battle</button>
          </div>
        )}
      </>
    );
    
};

export default PokemonGame;
