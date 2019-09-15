import { createMuiTheme } from "@material-ui/core";
import orange from "@material-ui/core/colors/orange";
const appTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#283593"
    },
    secondary: orange
  }
});
export { appTheme as default };
// color1: #064273 (6, 66, 115) #76b6c4 (118, 182, 196) #7fcdff (127, 205, 255)
// #1da2d8 (29, 162, 216) #def3f6 (222, 243, 246);
// }
