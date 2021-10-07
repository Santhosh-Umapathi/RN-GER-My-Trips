import DEVELOPMENT_ENV from "./development";
import PRODUCTION_ENV from "./production";

let ENV = PRODUCTION_ENV; //Production ENV's as default

//Development ENV's
if (__DEV__) {
  ENV = DEVELOPMENT_ENV; // return this if in development mode
}

export default ENV;
