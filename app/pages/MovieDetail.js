import React, { Component } from "react";
import { View, StyleSheet, Text, Image, ScrollView, TouchableWithoutFeedback, Modal } from "react-native";
import Constants from "expo-constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ChipGroup from "../components/ChipGroup";
import Trailer from "../models/Trailer";
import TrailerItem from "../components/TrailerItem";
import YoutubePlayer from 'react-native-youtube-iframe';

class MovieDetail extends Component {
  movieItem = null;

  constructor(props) {
    super(props);
    this.movieItem = props.route.params.item;
  }

  state = {
    trailer: [],
    modalVisible: false,
    movieTrailerKey: ''
  };

  componentDidMount() {
    return fetch("https://api.themoviedb.org/3/movie/" + this.movieItem.id + "/videos?api_key=cfe806b49431dfc64c4180ad5e66e300")
      .then((response) => response.json())
      .then((responseJson) => {
        var items = [];
        responseJson.results.map((movie) => {
          items.push(
            new Trailer({
              key: movie.key,
              name: movie.name,
              type: movie.type,
            })
          );
        });
        this.setState({ trailer: items });
      })
      .catch((error) => console.error(error));
  }

  render() {
    //   console.log(route.params.item.title)
    //   let genres = ''

    //   movieItem.genres.forEach((genre, index) => {
    //     genres += genre + (index < movieItem.genres.length - 1 ? ', ' : '')
    //   })
    return (
      <View style={styles.container}>
        <Modal
          style={{
            positiong: "absolute",
            top: 0
          }}
          statusBarTranslucent={true}
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible:false})
          }}
        >
          <View style={{ flex: 1, backgroundColor: "#000", alignItems: 'center', justifyContent: "center" }}>
            <TouchableWithoutFeedback onPress={() => this.setState({modalVisible: false})}>
              <View
                style={{ 
                  backgroundColor: '#222222',
                  width: 48,
                  height: 48,
                  position: 'absolute',
                  top: Constants.statusBarHeight + 10,
                  left: 20,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <MaterialCommunityIcons name='close' size={24} color={'white'}/>
              </View>
            </TouchableWithoutFeedback>
            <View style={{ width: '100%' }}>
              <YoutubePlayer 
                style={{  }}
                height={300}
                play={true}
                videoId={this.state.movieTrailerKey}
              />
            </View>
          </View>
        </Modal>
        <ScrollView>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.pop()}>
            <MaterialCommunityIcons
              style={{
                position: "absolute",
                top: Constants.statusBarHeight + 10,
                left: 10,
                zIndex: 1,
                paddingRight: 20,
                paddingBottom: 20,
              }}
              name="chevron-left"
              size={24}
              color="#fff"
            />
          </TouchableWithoutFeedback>
          <Image style={styles.poster} resizeMode="cover" source={{ uri: "http://image.tmdb.org/t/p/w500" + this.movieItem.backdrop_path }} />
          <View style={{ flex: 1, padding: 20 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <View style={{ flexWrap: "wrap", flexDirection: "column" }}>
                <Text style={styles.title}>{this.movieItem.title}</Text>
                <Text style={styles.subtitle}>{this.movieItem.release_date}</Text>
              </View>
              <View style={styles.rating}>
                <Text style={styles.ratingValue}>{this.movieItem.vote_average}</Text>
              </View>
            </View>
            <ChipGroup datas={this.movieItem.genres} />
            {/* <View style={{ width: '100%' }}>
                </View> */}
            <Text style={styles.header}>Overview</Text>
            <Text style={{ textAlign: 'justify' }}>{this.movieItem.overview}</Text>
            <Text style={styles.header}>Teaser & Trailers</Text>
            <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
              {this.state.trailer.map((item, index) => {
                return (          
                  <TrailerItem
                    key={item.key}
                    poster={this.movieItem.backdrop_path}
                    data={item}
                    modalVisible={this.state.modalVisible}
                    onPressFunction={() => {
                      this.setState({
                        modalVisible: true,
                        movieTrailerKey: item.key
                      })
                    }}
                    itemIndex={index}
                  />
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  poster: {
    height: 281,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    width: 300
  },
  rating: {
    width: 48,
    height: 48,
    backgroundColor: "white",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  ratingValue: {
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '300'
  }
});

export default MovieDetail;
