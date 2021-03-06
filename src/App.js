import "./styles/App.css";
import React from "react";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import Link from '@mui/material/Link';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      pokemon: {},
      streak: -1,
      question: "",
      //default difficulty 
      difficulty: 6
    };
    this.loadPokemon = this.loadPokemon.bind(this);
  }
  componentDidMount() {
    this.loadPokemon()
  }

  loadPokemon(){
    let pokemonIds = []
    for (let i = 0; i < this.state.difficulty; i++) {
      pokemonIds.push((Math.floor(Math.random() * 898) + 1))
    }
    Promise.all(pokemonIds.map(id => 
      fetch('https://pokeapi.co/api/v2/pokemon/' + id).then(res => res.json()),
    ))
    .then(
      (res) => {
        let items = {}
        
        //Create key value pair of name and default sprite
        for (let i = 0; i < res.length; i++){
          items[i] = {}
          items[i]['name'] = res[i]['name']
          items[i]['sprite'] = res[i]['sprites']['front_default']
        }

        let temp = this.state.streak + 1;
        this.setState({
          isLoaded: true,
          pokemon: items,
          streak: temp,
          question: this.randomizePokemon(items)
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  refreshPage() {
    window.location.reload(false);
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  randomizePokemon(pokemon){
    var keys = Object.keys(pokemon);
    return pokemon[keys[Math.floor(Math.random()*keys.length)]];
  }

  checkPokemon(pokemon){
    if (pokemon === this.state.question.name){
      this.loadPokemon()
    }
    else{
      this.refreshPage()
    }
  }

  changeDifficulty(difficulty){
    console.log(difficulty)
    this.state.difficulty = difficulty
    //reset streak count
    this.state.streak = -1
    this.loadPokemon()
  }

  render() {
    let pokemon = this.state.pokemon
    if (this.state.question !== undefined && this.state.question !== ""){
      return (
        <header className="App-header">
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Button onClick={() => this.changeDifficulty("3")} variant="outlined" color="success" sx={{ my: 1, mx: 1.5 }}>
            Easy
          </Button>
          <Button onClick={() => this.changeDifficulty("6")}  href="#" variant="outlined" color="primary" sx={{ my: 1, mx: 1.5 }}>
            Medium
          </Button>
          <Button onClick={() => this.changeDifficulty("9")}  href="#" variant="outlined" color="error" sx={{ my: 1, mx: 1.5 }}>
            Hard
          </Button>
        </Toolbar>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Typography
              component="h3"
              variant="h3"
              align="center"
              color="white"
              font=""
            >
            Which one is {this.capitalize(this.state.question.name)}? Streak: {this.state.streak}
            </Typography>     
            <Grid container spacing={4}>
              {Object.keys(pokemon).map((key, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                    <Avatar
                      src={pokemon[key].sprite}
                      sx={{ width: 256, height: 256 }}
                      onClick={() => this.checkPokemon(pokemon[key].name)}
                    />
                </Grid>
              ))}
            </Grid>

          </Container>
        </header>
      
      );
      }
      else{
        return <span></span>
      }
    

  }
}

export default App;
