import _ from "lodash-es";
import { log } from "./logger.js";
import messages from "./messages.js";
import cjsModule from "./cjs.module.js";
const msg = messages.hello;

log(msg);

log(name);
log(version);
log(_.camelCase("Hello World"));
log(cjsModule);
