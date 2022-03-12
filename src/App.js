import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import { getPlacesData, getWeatherData } from './api/index.js';

import Header from './components/Header/Header.jsx';
import List from './components/List/List.jsx';
import Map from './components/Map/Map.jsx';

const App = () => {
  const [type, setType] = useState('restaurants');
  const [rate, setRating] = useState('');

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setfilteredPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  const [isLoading, setisLoading] = useState(false);
  const [childClicked, setchildClicked] = useState(null);
  const [autocomplete, setAutocomplete] = useState(false);

  // if (weatherData ? console.log(weatherData) : console.log('late'))
  // get current user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  //create bound by which travel api can return returand in bounds
  useEffect(() => {
    //only if we have the coordinate(lat and lng aka bounds) do we actualy run this
    //note check for properties as an empty { is always truethy}
    if (bounds.sw && bounds.ne) {
      console.log(weatherData);
      //its like gatekeeping the fucntinality from running only after it revieves data
      //couldnt we async and await here ??? instead of using state though its clever
      //where funcitno to display data only runs when that state is in corresponding bool value
      setisLoading(true);
      getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
        setWeatherData(data)
      );

      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(
          data?.filter((place) => {
            // only return those places that have a name and at lease one review
            return place.name && place.num_reviews > 0;
          })
        );
        setfilteredPlaces([]);
        setRating('');
        setisLoading(false);
      });
    }
  }, [bounds, type]); //removed coordinates from state effects array (dont think we need to trigger on both)

  //filter places by rating  (note: ok to have several useEffect but they must all sever diff purpose, and have diff dependencies)
  useEffect(() => {
    const placeFilter = places.filter((place) => {
      return place.rating > rate;
    });
    setfilteredPlaces(placeFilter);
  }, [rate]);

  const onLoad = (autoC) => {
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    //find lat and lng of the new location
    const Glat = autocomplete.getPlace().geometry.location.lat();
    const Glng = autocomplete.getPlace().geometry.location.lng();
    //we can simply name const above same name and key and pass in just that with new syntax (but dont want to confuse it )
    setCoordinates({ lat: Glat, lng: Glng });
  };

  //render
  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        {/* sizing for mobile and medius screens */}
        <Grid item xs={12} md={4}>
          <List
            // if filtered places exist (aka filters on) pass that in to be render else just all places
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            rate={rate}
            setRating={setRating}
            type={type}
            setType={setType}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Map
            bounds={bounds}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setchildClicked={setchildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;

//very few states we actually passing only very key ones

//not a fan of the listing here on the list (then needed to pass in all rating type and set's all via props
//just alot, got to be better way) one level ok any further not ok  (what is react context)
