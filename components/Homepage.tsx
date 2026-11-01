import ActOne from "./ActOne";
import ActTwo from "./ActTwo";
import Coda from "./Coda";
import Footer from "./Footer";
import Homecoming from "./Homecoming";
import Opening from "./Opening";
import Timeline from "./Timeline";

/**
 * Opening (land → ball → name) → Act I The ground → Act II The pitch → dual timeline
 * → Act III The return → finale (coda, the two grounds meet, where next) → registers.
 */
export default function Homepage() {
  return (
    <main>
      <Opening />
      <ActOne />
      <ActTwo />
      <Timeline />
      <Homecoming />
      <Coda />
      <Footer />
    </main>
  );
}
