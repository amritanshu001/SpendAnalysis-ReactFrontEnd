import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    components:{
        MuiAccordion:{
            styleOverrides:{
                root:{
                    width: "90%",
                    margin: "auto",
                    marginTop: "0.5rem",
                    fontWeight: "bold",
                    backgroundColor: "#405d27",
                    color: "white",
                    
                },
                region: {
                    backgroundColor: "white",
                },

            }
        },
        
    }
});

export default theme;
