import { makeStyles } from "@mui/styles";
import { fontSize } from "@mui/system";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "orange",
    "& a": { color: "white", marginLeft: 10 },
  },
  brand: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  grow: { flexGrow: 1 },
  main: { minHeight: "90vh" },
  footer: { textAlign: "center" },
  section: { marginTop: 10, marginBottom: 10 },
  form: { maxWidth: 800, margin: "0 auto" },
  navUser: { color: "white" },
  wizard: { margin: "4rem 0" },
  flexend: { justifyContent: "flex-end" },
});

export default useStyles;
