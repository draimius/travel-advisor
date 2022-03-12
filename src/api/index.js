import axios from 'axios';

// const URL =
//   'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

export const getPlacesData = async (type, sw, ne) => {
  try {
    console.log(sw, ne);
    //request
    const {
      data: { data },
    } = await axios.get(
      // this way (if url same right) but can get whatever type info wanted
      // restuarants , holtels, attractions ect.. and just pass in type vs having to req to diff paths
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      // URL,
      // all foundation set with returant now all we have to do is change type(select bar)
      // and now request that type of date and renders all info ect.. same as resturant
      //but now whatever type we choose(pretty darn cool)
      {
        params: {
          bl_latitude: sw.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
          tr_latitude: ne.lat,
        },
        headers: {
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_API_KEY,
        },
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    //catch error
    console.log(error);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get(
        'https://community-open-weather-map.p.rapidapi.com/weather',
        {
          params: { lat: lat, lon: lng },
          headers: {
            'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_API_KEY,
          },
        }
      );
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
