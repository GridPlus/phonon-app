import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import React from "react";
import { Route } from "react-router-dom";
import Layout from "./layout/Layout";
import "./output.css";
import CreatePhononPage from "./pages/CreatePhononPage";
import PhononsList from "./pages/PhononsList";
import RedeemPhononPage from "./pages/RedeemPhononPage";
import SendPhononPage from "./pages/SendPhononPage";
import SessionsList from "./pages/SessionsList";
/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => {
  setupIonicReact({
    mode: "md",
  });

  return (
    <IonApp className="container mx-auto">
      <IonReactRouter>
        <IonRouterOutlet id="main">
          <Layout>
            <Route exact path="/" component={SessionsList} />
            <Route exact path="/:sessionId" component={PhononsList} />
            <Route
              exact
              path="/:sessionId/create"
              component={CreatePhononPage}
            />
            <Route
              exact
              path="/:sessionId/redeem"
              component={RedeemPhononPage}
            />
            <Route exact path="/:sessionId/send" component={SendPhononPage} />
          </Layout>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
