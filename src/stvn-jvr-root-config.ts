import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const _routes = constructRoutes({
  routes: [
    {
      type: "route",
      path: "angular",
      routes: [{ type: "application", name: "@angular/application" }],
    },
    {
      type: "route",
      path: "react",
      routes: [
        {
          type: "application",
          name: "@react/application",
          props: {
            name: "some-value",
          },
        },
      ],
    },
  ],
});

const applications = constructApplications({
  routes: _routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes: _routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
