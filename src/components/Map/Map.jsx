import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutLinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyle from './styles';
import MapStyles from './MapStyles';

const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  bounds,
  places,
  setchildClicked,
  weatherData,
}) => {
  const classes = useStyle();
  const isDesktop = useMediaQuery('(min-width: 600px)');
  return (
    <div className={classes.mapContainer}>
      {/* need key from google developer console */}
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        // allows use to change the maps display
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: MapStyles,
        }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
          console.log(bounds);
          console.log(coordinates);
        }}
        // now when click the child var is populated to use in list
        onChildClick={(child) => setchildClicked(child)}
      >
        {places.length &&
          places.map((place, i) => (
            <div
              key={i}
              className={classes.markerContainer}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
            >
              {!isDesktop ? (
                <LocationOnOutLinedIcon color="primary" fontSize="large" />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography
                    className={classes.typography}
                    variant="subtitle2"
                    gutterBottom
                  >
                    {place.name}
                  </Typography>
                  <img
                    className={classes.pointer}
                    src={
                      place.photo
                        ? place.photo.images.large.url
                        : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                    }
                    alt={place.name}
                  />
                  <Rating size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
            </div>
          ))}
        {weatherData?.list?.length &&
          weatherData.list.map((data, i) => (
            <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
              <img
                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                height="70px"
              />
            </div>
          ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;

// note aim to only pass props one level deep else structure differently , use Redux or react context

//lifting state up (instead of defiing state up we defined it in the parent component of compenents we'll be using it in)
