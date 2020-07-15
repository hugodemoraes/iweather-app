import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  padding: 15px 30px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Location = styled.Text`
  font-size: 22px;
  color: #000;
  font-weight: 500;
  text-transform: capitalize;
`;

export const Time = styled.Text`
  font-size: 14px;
  color: #474747;
  font-style: italic;
`;

export const TemperatureContainer = styled.View`
  align-items: center;
  margin: 30px 0;
`;

export const Temperature = styled.Text`
  color: #000;
  font-size: 100px;
  font-weight: 500;
  margin-top: 10px;
`;

export const DayInformation = styled.View`
  justify-content: space-around;
  flex-direction: row;
  margin-bottom: 80px;
`;

export const InfoContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Info = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

export const Text = styled.Text`
  color: #000;
  font-size: 34px;
  margin-right: 5px;
`;

export const Metric = styled.Text`
  color: #999;
  font-size: 14px;
`;

export const PreviousDates = styled.View`
  margin-bottom: 50px;
`;

export const DayForecast = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin: 15px 0;
`;

export const Date = styled.Text`
  font-size: 18px;
  color: #999;
  text-transform: capitalize;
`;

export const Forecast = styled.View`
  flex-direction: row;
`;

export const Min = styled.Text`
  font-size: 20px;
  margin-right: 10px;
  color: #474747;
  font-weight: 700;
`;

export const Max = styled.Text`
  font-size: 20px;
  color: #474747;
  font-weight: 700;
`;

export const ButtonContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
`;

export const UpdateButton = styled.TouchableOpacity`
  padding: 10px 50px;
  border: 2px;
  border-color: #000;
  align-items: center;
  flex-direction: row;
`;

export const ButtonText = styled.Text`
  color: #000;
  font-size: 20px;
  margin-left: 15px;
`;
