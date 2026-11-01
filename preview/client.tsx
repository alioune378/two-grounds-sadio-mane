import { hydrateRoot } from "react-dom/client";
import Homepage from "../components/Homepage";

hydrateRoot(document.getElementById("root")!, <Homepage />, {
  onRecoverableError: (e) => console.error("[hydration]", e),
});
