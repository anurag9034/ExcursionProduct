import App from "./App";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureStore from "./store";
import { Provider } from "react-redux";
import List from "@material-ui/core/List";
Enzyme.configure({ adapter: new Adapter() });
const wrapper = shallow(
  <Provider store={configureStore()}>
    <App />
  </Provider>
);
test("render without crashing", () => {
  expect(wrapper.exists()).toBe(true);
  
});
test("should matches the stored snapshot", () => {
  expect(wrapper.text()).toMatchSnapshot();
});
test("should matches the stored snapshot", () => {
  const props = {
    users: [
      {
        name: "Luke Skywalker",
        height: "172",
        mass: "77",
        hair_color: "blond",
        skin_color: "fair",
        eye_color: "blue",
        birth_year: "19BBY",
        gender: "male",
        homeworld: "https://swapi.dev/api/planets/1/",
        films: [
          "https://swapi.dev/api/films/1/",
          "https://swapi.dev/api/films/2/",
          "https://swapi.dev/api/films/3/",
          "https://swapi.dev/api/films/6/",
        ],
        species: [],
        vehicles: [
          "https://swapi.dev/api/vehicles/14/",
          "https://swapi.dev/api/vehicles/30/",
        ],
        starships: [
          "https://swapi.dev/api/starships/12/",
          "https://swapi.dev/api/starships/22/",
        ],
        created: "2014-12-09T13:50:51.644000Z",
        edited: "2014-12-20T21:17:56.891000Z",
        url: "https://swapi.dev/api/people/1/",
      },
    ],
  };
  wrapper.setProps({
    ...props,
  });
  
});
