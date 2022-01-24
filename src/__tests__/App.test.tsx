import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import App from "../App";
import { store } from "../store";

test("renders without crashing", () => {
  const { baseElement } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(baseElement).toBeDefined();
});
