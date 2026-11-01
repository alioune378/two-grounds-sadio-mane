import { renderToString } from "react-dom/server";
import Homepage from "../components/Homepage";
import "../app/globals.css";

export function render() {
  return renderToString(<Homepage />);
}
