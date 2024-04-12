

```markdown
# Weather App

## Table of Contents

- [Description](#description)
- [Core Requirements](#core-requirements)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Description

This is a weather application that allows users to view weather information for cities around the world. It uses the OpenWeatherMap API to fetch weather data and provides features such as searching for cities, displaying weather details in a table, and viewing detailed weather information for each city.

## Core Requirements

### Display Cities in a Table

- Show all cities in a table format with infinite scroll using the [GeoNames API](https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/api/?disjunctive.cou_name_en&sort=name).
- The table should have columns for city name, country, timezone, etc.
- Implement search as you type with autocomplete suggestions.
- Implement filter and sorting for each column.
- Clicking on a city name should take the user to the weather page for that city.

### Weather Page

- Accessible by clicking on a city name in the table.
- Use the [OpenWeatherMap API](https://openweathermap.org) to display weather information.
- Display current weather information (temperature, weather description, humidity, wind speed, atmospheric pressure, etc.).
- Display weather forecast information (temperature highs and lows, weather descriptions, precipitation chances, etc.).
- Optional: Display location on a map, show options for changing units, etc.
- Once weather data is loaded, display basic information like day high/low for the city on the cities table page as well.

## Installation

1. Clone the repository:
https://github.com/MayurCode2/weather-app
   ```bash
 
   ```

2. Install dependencies:

   ```bash
   cd weather-app
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:

   ```plaintext
   REACT_APP_WEATHER_API_KEY=your-api-key-here
   ```

## Usage

1. Start the development server:

   ```bash
   npm rundev start
   ```

2. Open your browser and navigate to `http://localhost:3000` to view the app.



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
