import { createRoot } from "react-dom/client";

import "./styles.css";
import { Landing } from "@/pages/landing";

// Entry della build statica per GitHub Pages. L'app TanStack Start (SSR +
// server functions) resta intatta in src/router.tsx e src/routes/: qui la
// stessa pagina viene montata lato client, senza router e senza server.
createRoot(document.getElementById("root")!).render(<Landing />);
