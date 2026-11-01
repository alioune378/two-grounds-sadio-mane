/**
 * Image register. Every image on the site comes from here and carries a plate.
 *
 * The experience is a private creative demonstration. Its imagery is AI-generated
 * concept visualization: every frame is labelled "Concept visualization", and the
 * label says what the image must not be taken for (a photograph of Sadio Mané, of
 * Bambali, of an actual building). Swap any entry for a licensed photograph by
 * changing `kind` to "photograph" and adding credit, date and licence.
 *
 * Concepts deliberately not used: B08 / A04 / A06 (an invented business, "SM10 Agro"),
 * A08 bakery and A09 mosque (no reported project behind them), B10 globe (its network
 * hub sits on the Gulf of Guinea, not Senegal), B11 textile (a kente-style weave that
 * misattributes the culture), A02 (duplicate of B06), A05 / A11 (off-story).
 */
interface MediaBase {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** CSS object-position. Scenes align motion to this point. */
  focal: string;
  /** Tiny blurred preview shown while the image loads. */
  blur: string;
  /** Average colour, painted behind the image so loading never shows a hole. */
  tone: string;
}

export interface Concept extends MediaBase {
  kind: "concept";
  /** What the image must not be taken for. */
  notA: string;
}

export interface Photograph extends MediaBase {
  kind: "photograph";
  credit: string;
  date: string;
  licence: string;
}

export type Media = Concept | Photograph;

export function plateText(m: Media): string {
  return m.kind === "concept" ? `Concept visualization · AI-generated · ${m.notA}` : `Photograph · ${m.credit} · ${m.date}`;
}

export const media = {
  /** Sun at 59.5% / 19% of the frame. */
  bambaliDawn: {
    kind: "concept",
    src: "/media/bambali-dawn.jpg",
    width: 1920,
    height: 1622,
    alt: "Concept visualization: aerial view at sunrise over a Casamance village of tin-roofed houses among trees, a red dirt road running towards the horizon.",
    focal: "59.5% 19%",
    notA: "not a photograph of Bambali",
    blur: "data:image/webp;base64,UklGRpgAAABXRUJQVlA4IIwAAADwBACdASoUABEAPu1krE6ppaQiKA1RMB2JZACdMoGv/gHoFDNtap9AH/XYc9hS+oAA/VNrIU14Sgd9V08+VG02W3FG3IshPVc5TANndewZQ9YguW3Q1wU6Em75D08kye9BfC8y/t2xvq2/nCqCPtSuVStAWHQf8xHru8PCnQeJaiI0MijZdW1ea3YAAA==",
    tone: "#734c1f",
  },
  /** Ball at 58.5% / 85% of the frame. */
  ground: {
    kind: "concept",
    src: "/media/ground.jpg",
    width: 1920,
    height: 1622,
    alt: "Concept visualization: a barefoot boy controls a worn football on a dusty red ground, backlit by low sun through trees.",
    focal: "58.5% 85%",
    notA: "not Sadio Mané · not a historical photograph",
    blur: "data:image/webp;base64,UklGRpQAAABXRUJQVlA4IIgAAADwBACdASoUABEAPu1sqlEppaOiqAqpMB2JYgC7L8CA5cQHXbndYyuWhViIrtTLtAAA/ukEF5Jk6VBeb1PM3rJPeFvgxFsevtXpvvpn2OZvxAoXmhcWOLCjxMXmQSsKkSHnzfZHacA8QShEtrtCOxoqw+aVI/HTWfnM+7V3RNW049jbaPXn8AAA",
    tone: "#a36d35",
  },
  groundDetail: {
    kind: "concept",
    src: "/media/ground-detail.jpg",
    width: 819,
    height: 772,
    alt: "Concept visualization detail: a bare foot beside a worn football in red dust.",
    focal: "50% 60%",
    notA: "not a historical photograph",
    blur: "data:image/webp;base64,UklGRsAAAABXRUJQVlA4ILQAAABQBQCdASoUABMAPu1oqVAppaOiqA1RMB2JZgCdABGK+JHzNlbVRJfIuwC5jAw0gfXuHAAA/ukpD+e4KaPcHfrq4VIy/9FTGc0VArMv8U5dj/vsrcuUxeo0T8dHm0O9gOBogQw96LU/BhWvqWOun7LnkT5+/QrT9h5VPEn5flAPFHwilvmFisziWjC/JjxuBAxhRC6Ctgl2dbh37n/3s7FwJKk2V2334BwU0fxZ9PMU2V/YAAA=",
    tone: "#ad6e33",
  },
  portrait: {
    kind: "concept",
    src: "/media/portrait.jpg",
    width: 1920,
    height: 1622,
    alt: "Concept visualization: an AI-generated portrait in the likeness of Sadio Mané, smiling, lit warmly against a dark background.",
    focal: "56% 40%",
    notA: "not a photograph of Sadio Mané",
    blur: "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAABQBACdASoUABEAPu1eqk2ppKQiMBgMATAdiWMAACG9wW8E53wVx+Yu55AAAP7w36GPxd+Zor4g2Rxqz70YscgHEl7YTpmCTSLpvLDSZ9TSZUfM5necJ/cwG9qT3EolCh2u1LVKRXrST7cgAAA=",
    tone: "#402d23",
  },
  pitchJoy: {
    kind: "concept",
    src: "/media/pitch-joy.jpg",
    width: 1920,
    height: 1622,
    alt: "Concept visualization: an AI-generated image in the likeness of Sadio Mané smiling in a white Senegal shirt with the captain’s armband, a stadium crowd behind.",
    focal: "45% 30%",
    notA: "not a photograph of Sadio Mané",
    blur: "data:image/webp;base64,UklGRqgAAABXRUJQVlA4IJwAAACwBACdASoUABEAPu1kq0+ppSOiMBgIATAdiWQSoAIkACAObDXiTYE43fNKzh/wAP67ElkOoHpZlqlEzn/i9f6XKhNI4HCo8N6ECbj+N0IAHbDEZdV4B0cczVYysef+uvVkxQpPWjHqioMU19fgoSfYg4trD4RLqTQ/PZW60MOi3KQliuDZfM9d4PmC6dwjJ+EZPwi0ygUR9TgAAAA=",
    tone: "#716a71",
  },
  trophy: {
    kind: "concept",
    src: "/media/trophy.jpg",
    width: 1920,
    height: 1622,
    alt: "Concept visualization: an AI-generated image in the likeness of Sadio Mané holding the Africa Cup of Nations trophy, a Senegal flag over his shoulder.",
    focal: "45% 32%",
    notA: "not a photograph of the 2022 final",
    blur: "data:image/webp;base64,UklGRrQAAABXRUJQVlA4IKgAAAAwBQCdASoUABEAPu1krE6ppaQiKA1RMB2JbACdMoHCAJsAFZ5+UcNCipENZlaVP7wyAAD+8YGbIs1MHWXLAz2A55Di6XmfV1j6RI4UXYd6Rhv13gEjlKUE0qir122BY/ZBe/xN2YaLMX0qryqkdUCmCP5Fr+kbAXoYGL6WgUd2sJt/Sa4mr0oR/0uHd75DQVAJb1yAKjbr/FSI2sqxC/ca4sKQVbuqAAA=",
    tone: "#594427",
  },
  hospital: {
    kind: "concept",
    src: "/media/hospital.jpg",
    width: 1920,
    height: 1622,
    alt: "Concept visualization: a woman and a child walk towards a single-storey health centre in afternoon sun.",
    focal: "55% 55%",
    notA: "not the actual hospital in Bambali",
    blur: "data:image/webp;base64,UklGRpYAAABXRUJQVlA4IIoAAADwBACdASoUABEAPu1eqE6ppKOiMBgMATAdiWQAsR8YAX66vTwpYm8Ov7Uojml+PwAA/o4cQ4N+r5AidXNqHzNDAQWJeRxL9pqhv5uHP0rmEWOtWEAsgsy9lFTHDDPyQX2VgdCiNoMTyksqu5fb5T4KqqzOsFyOkXdQOTDtnjwYKD4LfFLwWhcAAAA=",
    tone: "#94836b",
  },
  school: {
    kind: "concept",
    src: "/media/school.jpg",
    width: 1600,
    height: 1128,
    alt: "Concept visualization: children in blue uniforms with backpacks walk towards a yellow school building, a Senegal flag on a pole beside it.",
    focal: "50% 45%",
    notA: "not an actual school building",
    blur: "data:image/webp;base64,UklGRoYAAABXRUJQVlA4IHoAAABwBACdASoUAA4APu1iqU2ppaQiMAgBMB2JbACdMoMYJn/AeMOKdwJWig3HwAD8eBiay+sNVtodpuQYxHv5dLD7WGAikXhv8tEP0EOWiJLXAowK40idfPjA2ttu8P7Dhhf0Tsr9FBLrlgV5pyhnhaqaU3wJrZEZ7RAAAA==",
    tone: "#938e82",
  },
  stadium: {
    kind: "concept",
    src: "/media/stadium.jpg",
    width: 1600,
    height: 1128,
    alt: "Concept visualization: a small football ground with a covered green stand under a clear sky.",
    focal: "50% 55%",
    notA: "not the actual stadium in Bambali",
    blur: "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAADwAwCdASoUAA4APu1iqU2ppaOiMAgBMB2JaACdMoADThFkleOufrfYAP6La4EqSbWdFelZaClTyqaotPpOCv2bNxb96mJRpNsQtTqo9PO9iAj4A+MIkFTlMdd1BIAA",
    tone: "#748975",
  },
  connectivity: {
    kind: "concept",
    src: "/media/connectivity.jpg",
    width: 1600,
    height: 1128,
    alt: "Concept visualization: a telecom mast and a bank of solar panels beside a small equipment building in dry grassland.",
    focal: "50% 40%",
    notA: "not an actual installation",
    blur: "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAACQAwCdASoUAA4APu1iqU2ppaOiMAgBMB2JagCdMoAEuEqXgydwAP39rpOx/ha/HQEsEu6olSbPe0vAua8DeyyvyOS0vpG7qjQeRFzo1ahtyxwYA+ZUou7roOhgzV1MGZNSQAAA",
    tone: "#6f90b4",
  },
  childhood: {
    kind: "concept",
    src: "/media/childhood.jpg",
    width: 1600,
    height: 1128,
    alt: "Concept visualization: five children laughing together, arms around each other, in front of a village wall.",
    focal: "50% 38%",
    notA: "not real people from Bambali",
    blur: "data:image/webp;base64,UklGRpYAAABXRUJQVlA4IIoAAADwBACdASoUAA4APu1iqU2ppaOiMAgBMB2JYgCdMoMjmIBz1QDm+OShGUL3u2C7iQAA/pO+p9v6Mk2ibfMjP8ZbLLX8+XwRDDFA6EPRVYA5YhimhCho8pbMPPwvI1lxbanIhssp4hEd/avFjjjFWxchTGtwSaC6isi+cBgGOvmGei2zZURvzwnAAAA=",
    tone: "#776358",
  },
  nextGeneration: {
    kind: "concept",
    src: "/media/next-generation.jpg",
    width: 1920,
    height: 1622,
    alt: "Concept visualization: two smiling schoolchildren in white shirts with backpacks, classmates behind them.",
    focal: "50% 40%",
    notA: "not real pupils from Bambali",
    blur: "data:image/webp;base64,UklGRpYAAABXRUJQVlA4IIoAAACQBACdASoUABEAPu1qrFEppaQiqAqpMB2JYgBLfwCOJG8OkbnVJbc0RopxsYAA/sB09J4dJ/3A+hy+HnnXFiq15skrTwmZIG/GvTs2PA+rRwZsbp28phv1e7dpeogtngbu4AgjMKnn7xoZSx6RkIZSj0vIJTjyVkWpq5nAK1jbMRdxwVun3cAAAAA=",
    tone: "#806557",
  },
  recordCabinet: {
    kind: "concept",
    src: "/media/record-cabinet.jpg",
    width: 1920,
    height: 1622,
    alt: "Concept visualization: football boots, a golden globe trophy, a continental trophy and a red number 10 shirt in a lit display case.",
    focal: "50% 55%",
    notA: "not an actual collection",
    blur: "data:image/webp;base64,UklGRoIAAABXRUJQVlA4IHYAAACwBACdASoUABEAPu1ep06ppKMiMBgMATAdiWQAnTKEgpgUfD8Gp0G5We2ummCgAP7u4yGDfvhGpLg9psflwkVMk6bKXjt48IceU2kmR8h0yZBG/IbiJY8jNfMqgUiMUjJ6k/NInFHeYEBwAVII+wdCKOcThqgA",
    tone: "#4f2b14",
  },
  casamance: {
    kind: "concept",
    src: "/media/casamance.jpg",
    width: 1600,
    height: 1128,
    alt: "Concept visualization: aerial view of a Casamance-style village at sunset, red roads winding between houses and trees.",
    focal: "78% 29.5%",
    notA: "not a photograph of Bambali",
    blur: "data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAABQBACdASoUAA4APu1iqU2ppaOiMAgBMB2JZgCdMoMYJn/ATy/RKUDJFLCAAPcHl/BPjT8PMFsRo0CnpidF149k7u7cj5IGMcDgcryzZ3Bm3sNzngg0KWtz/tehoAb/LfvY1QbXV/kQqWqA6tIwAA==",
    tone: "#7c6047",
  },
  /** Trunk base at 36.5% / 73.5%. */
  baobab: {
    kind: "concept",
    src: "/media/baobab.jpg",
    width: 1920,
    height: 1622,
    alt: "Concept visualization: four children seen from behind sit on a rock beside a great baobab, watching the sun set.",
    focal: "36.5% 73.5%",
    notA: "not a historical photograph",
    blur: "data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAACwBACdASoUABEAPu1orlCppaQiqAqpMB2JZACxG9SA0yYGa8dNej6gRDAFMrkwAOAY7VjCbxvQy93DB58Rr+impbzbavkQpxKciKitxRKT8s2zonnEyp3bfA8fHXiAjBYGklB6p7UBdI0RlwZ2ePZUiG7L/QxREIMSAAAA",
    tone: "#8c5928",
  },
} satisfies Record<string, Media>;
