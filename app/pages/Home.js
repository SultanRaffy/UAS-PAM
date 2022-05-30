import React, { Component } from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import PopularMovieItem from "../components/PopularMovieItem";
import Movie from "../models/Movie";
import Constants from "expo-constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RecentMovieItem from "../components/RecentMovieItem";

export default class Home extends Component {
  baseUrl = "https://api.themoviedb.org/3/movie/";
  apiKey = "cfe806b49431dfc64c4180ad5e66e300";
  _isMount = false;
  genres = [];

  state = {
    isLoading: false,
    recentMovies: [],
    popularMovies: [],
    recentMovies: [],
  };

  constructor(props) {
    super(props);
    this.genres = props.genres;
  }

  componentDidMount() {
    this._isMount = true;

    return fetch(this.baseUrl + "popular?api_key=" + this.apiKey)
      .then((response) => response.json())
      .then((responseJson) => {
        const data = [];
        var allgenres = this.genres;
        responseJson.results.forEach((movie) => {
          movie.genres = [];
          movie.genre_ids.forEach((genreid) => {
            var genreData = allgenres.filter((x) => x.id == genreid);
            if (genreData.length != 0) {
              movie.genres.push(genreData[0].name);
            }
          });

          data.push(
            new Movie({
              id: movie.id,
              title: movie.title,
              poster_path: movie.poster_path,
              backdrop_path: movie.backdrop_path,
              genres: movie.genres,
              genre_ids: movie.genre_ids,
              overview: movie.overview,
              popularity: movie.popularity,
              release_date: movie.release_date,
              vote_average: movie.vote_average,
              vote_count: movie.vote_count,
            })
          );
        });

        if (this._isMount) {
          this.setState({
            popularMovies: data,
          });
        }

        fetch(this.baseUrl + "now_playing?api_key=" + this.apiKey)
          .then((response) => response.json())
          .then((responseJson) => {
            const data = [];
            var allgenres = this.genres;
            responseJson.results.forEach((movie) => {
              movie.genres = [];
              movie.genre_ids.forEach((genreid) => {
                var genreData = allgenres.filter((x) => x.id == genreid);
                if (genreData.length != 0) {
                  movie.genres.push(genreData[0].name);
                }
              });
              data.push(
                new Movie({
                  id: movie.id,
                  title: movie.title,
                  poster_path: movie.poster_path,
                  backdrop_path: movie.backdrop_path,
                  genres: movie.genres,
                  genre_ids: movie.genre_ids,
                  overview: movie.overview,
                  popularity: movie.popularity,
                  release_date: movie.release_date,
                  vote_average: movie.vote_average,
                  vote_count: movie.vote_count,
                })
              );
            });

            if (this._isMount) {
              this.setState({
                recentMovies: data,
              });
            }
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Movie Library</Text>
          <MaterialCommunityIcons name="magnify" size={24} />
        </View>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              marginVertical: 15,
            }}
          >
            <Text
              style={{
                fontWeight: "400",
              }}
            >
              Popular Movies
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Text>View All</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} />
            </View>
          </View>
          <ScrollView horizontal={true} showHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", flex: 1, paddingLeft: 20 }}>
              {this.state.popularMovies.map((item, index) => {
                return index < 10 ? <PopularMovieItem key={item.id} item={item} /> : <View key={item.id} />;
              })}
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              marginVertical: 20,
            }}
          >
            <Text
              style={{
                fontWeight: "400",
              }}
            >
              Recent Movies
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Text>View All</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} />
            </View>
          </View>
          <ScrollView horizontal={true} showHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", flex: 1, paddingLeft: 20 }}>
              {this.state.recentMovies.map((item, index) => {
                 return index < 10 ? <RecentMovieItem key={item.id} item={item} /> : <View key={item.id} />;
              })}
            </View>
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: Constants.statusBarHeight,
    paddingVertical: 20,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
