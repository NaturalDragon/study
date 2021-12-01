import dva from "dva";
import createLoading from "dva-loading";

import "./index.less";

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
// app.model(require('./models/example').default);
app.model(require("./models/AuthorizedRoute").default);
app.model(require("./models/Login").default);

app.model(require("./models/ReimbursementList").default);
// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");
