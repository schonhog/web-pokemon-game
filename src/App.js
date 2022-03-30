import logo from "./logo.svg";
import "./App.css";
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
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      pokemon: {}
    };
  }
  componentDidMount() {
    Promise.all([1, 4, 7].map(id => 
      fetch('https://pokeapi.co/api/v2/pokemon/' + (Math.floor(Math.random() * 898) + 1)).then(res => res.json()),
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
        this.setState({
          isLoaded: true,
          pokemon: items
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

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  randomizePokemon(pokemon){
    var keys = Object.keys(pokemon);
    return pokemon[keys[ keys.length * Math.random() << 0]];
  }

  render() {
    let pokemon = this.state.pokemon
    console.log("Random", this.randomizePokemon(pokemon))
    let question = this.randomizePokemon(pokemon)
    if (question !== undefined){
      return (
        <header className="App-header">
          <Container sx={{ py: 8 }} maxWidth="md">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="white"
            >
              Which one is {this.capitalize(question.name)}
            </Typography>
            <Grid container spacing={4}>
              {Object.keys(pokemon).map((key, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="img"
                      image={pokemon[key].sprite}
                      alt={pokemon[key].name}

                    />
                  </Card>
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
