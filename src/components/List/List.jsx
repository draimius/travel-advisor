import React from 'react';
import { useState, useEffect, createRef } from 'react';

import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails.jsx';

import useStyles from './styles.js';

const List = ({
  places,
  childClicked,
  isLoading,
  rate,
  setRating,
  type,
  setType,
}) => {
  const [elRefs, setElRefs] = useState([]);
  const classes = useStyles();

  //aside from the actual funciton like useEffect, map, fill, Array, [place],---
  // i dont understand yet what the refs[i] and createRef() does (we find out)
  //refs are attached refrenceses to a specified element in the dom that can the be accessed ect...
  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());
    setElRefs(refs);
  }, [places]);

  // useEffect(() => {
  //   setElRefs((refs) =>
  //     Array(places.length)
  //       .fill()
  //       .map((_, i) => refs[i] || createRef())
  //   );
  // }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotels & Attractions around you
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rate} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {/* ? means only if we have places do we map over them */}
            {/* not good practice to have index and key but in this case that we are deleting ect.. it ok */}
            {/* across all devices takes full width of container */}
            {places?.map((place, i) => (
              // passing in the refs
              <Grid ref={elRefs[i]} item key={i} xs={12}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
//log things in objects

// _ is used to pass in when you want to run functin or set something but aren inputing value nor need that parameter
// only need the second value/parameter
