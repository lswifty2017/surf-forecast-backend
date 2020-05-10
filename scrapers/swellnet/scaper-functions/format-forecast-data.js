const moment = require('moment');

const formatForecastData = forecasts => {
  const formattedForecasts = forecasts.map(
    ({
      beach,
      country,
      date,
      path,
      region,
      surf_height,
      time,
      wind_direction,
      wind_speed,
      primary_swell_direction,
      primary_swell_period,
      primary_swell_height,
      secondary_swell_direction,
      secondary_swell_period,
      secondary_swell_height
    }) => {
      const formattedForecast = {};

      const formattedDate = date
        ? moment(date, 'DD-MM').format('DD-MM-YYYY')
        : null;

      const formattedTime = time ? moment(time, 'HHa').format('HH:mm') : null;

      const formattedDateTime =
        formattedDate && formattedTime
          ? `${formattedDate} ${formattedTime}`
          : null;

      formattedForecast['beach'] = beach;
      formattedForecast['country'] = country;
      formattedForecast['path'] = path;
      formattedForecast['region'] = region;
      formattedForecast['primary_swell_height'] = primary_swell_height;
      formattedForecast['secondary_swell_height'] = secondary_swell_height;
      formattedForecast['wind_direction'] = wind_direction;

      formattedForecast['date_time'] = formattedDateTime || null;

      formattedForecast['primary_swell_direction'] = primary_swell_direction
        ? primary_swell_direction.split(' ')[1].slice(1, -1)
        : null;
      formattedForecast['primary_swell_period'] = primary_swell_period
        ? primary_swell_period.substring(0, primary_swell_period.length - 1)
        : null;
      formattedForecast['secondary_swell_direction'] = secondary_swell_direction
        ? secondary_swell_direction.split(' ')[1].slice(1, -1)
        : null;
      formattedForecast['secondary_swell_period'] = secondary_swell_period
        ? secondary_swell_period.substring(0, secondary_swell_period.length - 1)
        : null;
      formattedForecast['wind_speed'] = wind_speed
        ? wind_speed.split('k')[0]
        : null;
      formattedForecast['surf_height'] = surf_height
        ? surf_height.split('f')[0]
        : null;

      return formattedForecast;
    }
  );

  return formattedForecasts;
};

module.exports = formatForecastData;
