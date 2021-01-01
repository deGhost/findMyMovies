/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import{getImageFromApi} from '../API/TMDBApi'

class MovieItem extends React.Component{
render(){

    const movieprop = this.props.movie;
///console.log(this.props.movie.poster_path);
    return(
        <View style={styles.container} >
            <Image style={styles.img} source={{uri: getImageFromApi(movieprop.poster_path)}}/>
            <View style={styles.content_container}>
            <Text style={styles.titles}>{movieprop.title}</Text>
            <Text style={styles.desc} numberOfLines={6}>{movieprop.overview}</Text>
            <Text style={styles.date}>{movieprop.release_date}</Text>

            </View>
        </View>
    )
}


};


const styles = StyleSheet.create({
content_container:{
    flex:1,
    backgroundColor:'white',

    
},    
container:{
    backgroundColor:'#ffdab9',
    height:200,
flexDirection:'row',
padding: 10,
margin: 10,
},

img:{
height: 170,
width:120,
margin:5,
backgroundColor:'#ffefd5',
padding:10,
flexDirection:'row',
},

titles:{
    fontWeight: 'bold',
    fontSize:14,
    paddingLeft: 10,
    flex:1,
    flexWrap:'wrap',
    flexDirection: 'row',

},
desc:{
    fontSize:14,
    flex:7,
    color: 'gray',
    paddingTop: 10,
    paddingLeft: 10,
},

date:{
    flex:1,
    textAlign:'right',
}


})

export default MovieItem;