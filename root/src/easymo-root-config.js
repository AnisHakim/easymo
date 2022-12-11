import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";
import PubSub from "pubsub-js";

const publish = (event, data) => PubSub.publish(event, data)
const subscribe = (event, callback) => PubSub.subscribe(event, callback)

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });
const logo=require('./assets/images/logo.svg')
const shortLogo=require('./assets/images/logo-short.svg')
const signup=require('./assets/images/sign-up.svg')
const signupSuccess=require('./assets/images/signupSuccess.svg')
applications.map((mfe) => registerApplication({
  ...mfe,
  customProps: {
    publish,
    subscribe,
    logo,
    shortLogo,
    signup,
    signupSuccess,
  }
}))
layoutEngine.activate();
start();
