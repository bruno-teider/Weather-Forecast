# Weather Forecast

Simple Weather Forecast app made with React, Jsx, Axios and OpenWeatherAPI. The website gets wether data from the API and shows it to the user in a simple interface.

![image](https://github.com/user-attachments/assets/4eccb055-683a-499b-90e3-1db31e3919f1)

## Features
- Fetches weather data for the next 5 days from the OpenWeatherMap API
- Display the temperature, feels like temperature, weather condition, humidity, wind speed, the max and min temperatures and weather condition for the next days in the chosen city
- Background image changes based on the weather condition
- Gets user location to show current city data (if the user allows)
- Search bar to get data for other cities, with exception handling with an alert using Material-UI
- Responsive visuals with different resolutions, including mobile

![image](https://github.com/user-attachments/assets/a364445d-b3eb-41ce-8396-1ea733d70eac)

## Running
1. Clone the repository in your machine
   
2. Create a `.env` file in the root directory and add your OpenWeatherAPI Key there (you need a key that have acess to Daily Forecast 16 days):
```bash
REACT_APP_API_KEY=your_api_key_here
```

3. Install the dependencies:
```
npm install
```

4. Start the server and then it will open in your browser:
```
npm start
```

![image](https://github.com/user-attachments/assets/f5f52498-b2e7-4259-9f0b-9b1cde432fac)
