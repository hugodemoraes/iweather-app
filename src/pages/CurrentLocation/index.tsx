import React, {useCallback, useMemo} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {format} from 'date-fns';

import {useGeneral} from '../../hooks/general';

import {
  Container,
  Header,
  Location,
  Time,
  TemperatureContainer,
  Temperature,
  DayInformation,
  InfoContainer,
  Info,
  Text,
  Metric,
  PreviousDates,
  DayForecast,
  Date,
  Forecast,
  Min,
  Max,
  ButtonContainer,
  UpdateButton,
  ButtonText,
} from './styles';

const CurrentLocation: React.FC = () => {
  const {getWeatherData, weatherData} = useGeneral();

  const handleRefreshData = useCallback(() => {
    getWeatherData();
  }, [getWeatherData]);

  const formattedCheckedHour = useMemo(() => {
    return weatherData ? format(weatherData.checked, 'HH:mm') : '--:--';
  }, [weatherData]);

  return (
    <Container>
      {weatherData && (
        <>
          <Header>
            <Location>{weatherData.city}</Location>
            <Time>{formattedCheckedHour}</Time>
          </Header>
          <TemperatureContainer>
            <Icon name={weatherData.icon} size={85} color="#000" />
            <Temperature>{`${weatherData.temperature}°C`}</Temperature>
          </TemperatureContainer>
          <DayInformation>
            <InfoContainer>
              <Icon name="weather-windy" color="#999" size={35} />
              <Info>
                <Text>{weatherData.wind}</Text>
                <Metric>km/h</Metric>
              </Info>
            </InfoContainer>
            <InfoContainer>
              <Icon name="water-outline" color="#999" size={35} />
              <Info>
                <Text>{weatherData.humidity}</Text>
                <Metric>%</Metric>
              </Info>
            </InfoContainer>
          </DayInformation>
          <PreviousDates>
            {weatherData.forecast &&
              weatherData.forecast.map((info) => (
                <DayForecast key={info.date}>
                  <Date>{info.date}</Date>
                  <Forecast>
                    <Min>{info.min}°C</Min>
                    <Max>{info.max}°C</Max>
                  </Forecast>
                </DayForecast>
              ))}
          </PreviousDates>
        </>
      )}
      <ButtonContainer>
        <UpdateButton onPress={handleRefreshData}>
          <Icon name="cloud-sync-outline" color="#000" size={22} />
          <ButtonText>Atualizar</ButtonText>
        </UpdateButton>
      </ButtonContainer>
    </Container>
  );
};

export default CurrentLocation;
