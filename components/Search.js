/* eslint-disable prettier/prettier */
import React from 'react';
import {ActivityIndicator,StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList} from 'react-native';
//import movies from '../helpers/moviesData'; for static tests
import MovieItem from './MovieItem';
//import movie search function
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi';

class Search extends React.Component {
//constructor for creating props
    constructor(props){
        super(props);
        this.page=0,
        this.totalPage=0,  
        this.searchedText = ""// no need to use the state
        this.state ={
            movies: [], //array for all the props aka movies
            isLoading: false
        };

    }


//_ indicates private function
  _getFilms(){

    if(this.searchedText.length > 0){
        this.setState({isLoading: true})
        getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
            this.page=data.page
            this.totalPage=data.total_pages
           //update the movies list(state) with results fetched
           this.setState({
             movies: [...this.state.movies, ...data.results],
             isLoading: false

            })
        })
    }
}

_displayLoading(){
    if(this.state.isLoading){
        return(
            <View style= {styles.loading}>
                <ActivityIndicator size="large" color="#a0522d"/>
            </View>
        )
    }
}

   _searchInputChanged(text){
       this.searchedText = text;// for each input update the search text
   }


   _searchMovies(){
     this.page=0
     this.totalPage=0
     this.setState({
       movies:[]},()=>{
        console.log("page:"+this.page + " /total pages:"+ this.totalPage+ "nbr movies:"+this.state.movies.length)
        this._getFilms()
       
       } )
       
      
     
   }






  render() {
    //console.log(this.state.isLoading)
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} placeholderTextColor="#8b4513"
 placeholder="Titre du film" onSubmitEditing={()=>this._searchMovies()}  onChangeText={ (text) => this._searchInputChanged(text)}  />
        <TouchableOpacity style={styles.btn}  onPress={() => this._searchMovies()}>
        <Text style={{color:'white'}}>Rechercher</Text>
        </TouchableOpacity>
        <FlatList
            //data={movies} static test
            data={this.state.movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <MovieItem movie={item}/>}
            onEndReachThreadshold={0.5}
            onEndReached={()=>{
              if(this.page < this.totalPage){
                this._getFilms()
              }
              }}
        />
        {this._displayLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      marginTop: 20,
    backgroundColor:'white',
    flex:1,
  },
  input: {
    backgroundColor:'white',
    height: 50,
    padding: 8,
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 5,

  },
  btn:{
    alignItems: "center",
    alignSelf: 'center',
    padding:10,
    backgroundColor: '#cd853f',
    width:150,
    borderRadius: 80/2,


  },
  loading:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        
  }

})

export default Search;

