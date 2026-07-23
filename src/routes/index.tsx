import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState, type FormEvent } from "react";

import { submitLead } from "@/lib/leads.functions";
import cloudChiAsset from "@/assets/cloud-chi.jpeg.asset.json";
const cloudChi = cloudChiAsset.url;
import cloudCosaAsset from "@/assets/cloud-cosa.jpg.asset.json";
const cloudCosa = cloudCosaAsset.url;

import cloudPercheAsset from "@/assets/cloud-perche.jpg.asset.json";
const cloudPerche = cloudPercheAsset.url;
import cloudManifesto from "@/assets/cloud-manifesto.jpeg.asset.json";


export const Route = createFileRoute("/")({
  component: Index,
});

type ManifestoParagraph = { text: string; html?: string; italic?: boolean };
const MANIFESTO_PARAGRAPHS: ManifestoParagraph[] = [
  {
    text: "Le soluzioni che esistono oggi per chi vive solo in età avanzata nascono tutte dalla stessa domanda: come faccio a sapere se sta bene? Sensori di movimento, promemoria per le medicine, chiamate per sapere se ha fatto tutto quello che doveva. La cura pensata come sorveglianza riduce le persone ad un rischio da tenere d’occhio.",
  },
  {
    italic: true,
    text: "R.O.S.S. parte da una domanda diversa: e se lo strumento più potente non fosse il monitoraggio, ma la relazione?",
  },
  {
    text: "Non un sensore che segnala una caduta dopo che è già successa. Qualcosa che, prima ancora, tenga viva la parte di una persona che nessun dispositivo di sicurezza saprebbe mai toccare:",
    html: 'Non un sensore che segnala una caduta dopo che è già successa. Qualcosa che, prima ancora, tenga viva la parte di una persona che nessun dispositivo di sicurezza saprebbe mai toccare: <strong class="ross-highlight">i ricordi, le storie, la voglia di raccontarsi a qualcuno che ascolta davvero.</strong>',
  },
  {
    text: "Stiamo costruendo un compagno che stimola cognitivamente chi vive solo attraverso conversazioni adattive, personalizzate su una base di conoscenza biografica che guida ogni dialogo: la famiglia, le passioni, la storia di vita di ciascuno. Non un assistente che fa a tutti le stesse domande. Un'intelligenza che impara chi ha davanti: cosa ha fatto per una vita intera, chi ama, quali canzoni riportano a galla un ricordo preciso.",
  },
  {
    text: "Oggi, tra chi vive solo e la propria famiglia, la maggior parte delle parole scambiate riguarda la cura: ha mangiato, ha preso le medicine, che cosa ha detto il medico, bisognerebbe andare a trovarlo. È un problema reale e non lo eliminiamo. Ma quando si parla solo di questo, si diventa ciechi a tutto il resto e l'affetto, i ricordi, la voglia di raccontarsi spariscono sotto il peso della preoccupazione.",
    html: 'Oggi, tra chi vive solo e la propria famiglia, la maggior parte delle parole scambiate riguarda la cura: ha mangiato, ha preso le medicine, che cosa ha detto il medico, bisognerebbe andare a trovarlo. È un problema reale e non lo eliminiamo. Ma quando si parla solo di questo, <strong class="ross-highlight">si diventa ciechi</strong> a tutto il resto e l\'affetto, i ricordi, la voglia di raccontarsi spariscono sotto il peso della preoccupazione.',
  },
  {
    text: "R.O.S.S. ricostruisce quello che la paura ha eroso: vogliamo che almeno le conversazioni tornino ad essere sulle persone, non sulla gestione.",
  },
  {
    text: "Il modo in cui una persona racconta la propria giornata, quanto ha voglia di parlare, cosa sceglie di raccontare, quali ricordi torna a cercare, diventano lo stimolo cognitivo di cui ha bisogno e, per chi le vuole bene, un segnale di come sta.",
  },
  { text: "Non un dato biometrico. Una narrazione." },
  {
    text: "Oggi le famiglie parlano dei propri cari, non con loro. Ci si chiama tra familiari, ci si organizza, ci si preoccupa e chi vive solo viene interpellato solo per confermare cosa ha fatto o non ha fatto.",
  },
  {
    text: "R.O.S.S. lo rimette al centro della conversazione, non ai margini di una gestione.",
  },
];


type Card = {
  title: string;
  subtitle: string;
  image: string;
  bodyIndexes: number[];
};

const CARDS: Card[] = [
  {
    title: "Cosa",
    subtitle: "Facciamo e faremo",
    image: cloudCosa,
    bodyIndexes: [2, 3],
  },
  {
    title: "Chi",
    subtitle: "Il team dietro a R.O.S.S.",
    image: cloudChi,
    bodyIndexes: [0, 1],
  },
  {
    title: "Manifesto",
    subtitle: "Perché esistiamo",
    image: cloudManifesto.url,
    bodyIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    title: "Perché",
    subtitle: "Perché lo stiamo facendo",
    image: cloudPerche,
    bodyIndexes: [7, 8, 9],
  },
];


type TeamMember = { name: string; role: string; bio: string };

const TEAM: TeamMember[] = [
  {
    name: "Alessandro Di Mauro",
    role: "Co-Founder & Product Manager",
    bio: "Porta l'esperienza di chi ha già portato un progetto al pareggio — da founder di una startup ai funnel di crescita per editoria e no-profit. Il filo conduttore è sempre lo stesso: imparare facendo. Nella tesi di laurea ha scritto di memoria e nostalgia nel marketing digitale — un tema che, senza saperlo, anticipava quello su cui lavora oggi.\n\nIn R.O.S.S. è co-founder e il punto di contatto tra prodotto, business e persone: cura la visione di prodotto, la comunicazione e i pitch — è lui a portare R.O.S.S. fuori dalla stanza e a raccontarlo a chi ancora non lo conosce.",
  },
  {
    name: "Federico Sassu Verderi",
    role: "Co-Founder & Finance & Investor Relations",
    bio: "Trasforma le idee in modelli e le domande più scomode in risposte precise. È il punto di riferimento per numeri, proiezioni e relazioni con investitori — quando si parla di sostenibilità economica del progetto, è lui il primo interlocutore.",
  },
  {
    name: "Luca Marzotto",
    role: "Co-Founder & Technical Lead",
    bio: "Costruisce l'architettura tecnica di R.O.S.S. — dal modello linguistico che gira on-device al modo in cui il sistema ascolta e risponde. Prima della tecnologia ha lavorato in contesti ad alta pressione relazionale, cucina e sala, un'esperienza che gli dà un modo di spiegare il tecnico raro in un profilo così verticale.",
  },
  {
    name: "Alessandra Beretta",
    role: "Co-Founder & Project Manager",
    bio: "È il ponte con il mondo medico e sanitario — parla con geriatri, RSA, neuropsicologi con la credibilità e l'empatia che quel mondo richiede. Internamente, è lei che tiene il progetto in ordine: scadenze, priorità, il lavoro che non si vede ma che tiene tutto in piedi.",
  },
];

const CHI_BLOCK1_PARAGRAPHS: string[] = [
  "Ci siamo conosciuti al Master in H-FARM College, background diversi tra loro e lontani dal settore che oggi ci occupa ogni giorno. In 24 ore, al Hackathon di H-FARM abbiamo messo insieme un'idea che non riuscivamo a lasciare lì.",
  "La sfida era migliorare le condizioni della terza età. Abbiamo cercato: di soluzioni tecniche e cliniche il mondo ne è pieno.",
  "Continuando le ricerche, abbiamo capito che molte di queste vengono percepite come ostiche, di monitoraggio, controllo, non come qualcosa di positivo. Quasi una violazione della privacy, dell'autonomia di chi ne ha bisogno. Ci siamo interrogati a lungo, cercando un'alternativa, ipotizzando che forse la conversazione potesse essere l'elemento da mettere al centro: non come funzione accessoria, ma come stimolo cognitivo vero e proprio.",
  "Studiando l'argomento abbiamo capito perché: far raccontare ricordi ed esperienze vissute funziona davvero sulla memoria. Esisteva già come terapia, come reminiscenza guidata, ma nessuno la stava portando nella quotidianità di chi vive solo, ogni giorno, invece che in una seduta occasionale.",
  "Abbiamo deciso di accettare questa sfida dal concept, al design dell'interazione, fino ad un prototipo.",
  "Ecco come è nato R.O.S.S.",
  "Il progetto è stato selezionato tra i migliori dell'hackathon. I primi tempi, con il supporto di H-ealth, la parte del venture builder di H-FARM inserita nel contesto medico, li abbiamo passati a capire meglio cosa volevamo davvero costruire. E soprattutto abbiamo avuto una conferma: nel contesto giusto, con il supporto giusto, le nostre competenze erano perfettamente in grado di risolvere questo problema.",
  "Da quella conferma non ci siamo più fermati: è ciò su cui lavoriamo, fissi, tutti i giorni.",
  "Oggi siamo più che sicuri di poter portare a termine questa sfida e di farlo in un modo che nessuno, finora, è ancora riuscito a fare come lo vogliamo fare noi.",
];

const PERCHE_PARAGRAPHS: string[] = [
  "Siamo quattro ragazzi che vivono lontano da casa, chi da Cagliari, chi da Roma, chi da Bergamo, finiti tutti qui in Veneto per lo stesso percorso. Abbiamo tutti a casa qualcuno di cui vogliamo essere tranquilli che stia bene.",
  "Non è un problema astratto: è qualcosa che già ci tocca e ci toccherà sempre di più.",
  "Le soluzioni che esistono oggi, quando le abbiamo guardate da vicino, non sono mai quelle che si scelgono. Sono quelle che si subiscono: qualcosa che si dimentica di indossare, qualcosa che sembra un controllo, non un aiuto, e niente che faccia venire voglia di dire \"sì, questo lo voglio\".",
  "R.O.S.S. nasce dalla voglia di costruire qualcosa che si sceglie, non che si subisce, che dia sostegno senza aggiungere ansia a una fase della vita che dovrebbe essere vissuta con più leggerezza, per chi la vive in prima persona e per chi le sta intorno.",
  "È una fase che non aspetta chi è pronto, arriva comunque. Noi vogliamo costruire qualcosa di buono ad aspettarla.",
];

const COSA_PARAGRAPHS: string[] = [
  "In questo momento stiamo imparando a conoscere il problema meglio di chiunque altro. Non partiamo da quello che pensiamo di sapere: partiamo da chi questo problema lo vive, lo osserva, lo affronta ogni giorno. Parliamo con chi ci lavora, con le famiglie che si dividono tra vita, lavoro e preoccupazione, con chi la solitudine non la studia sui libri ma la sente addosso. Ogni conversazione cambia qualcosa di quello che pensavamo di aver capito il giorno prima.",
  "Potremmo costruire in un ufficio, decidere a tavolino cosa serve e presentarlo al mondo già finito. Sarebbe più veloce, ma un prodotto pensato per chi vive isolato, deciso senza mai ascoltare chi quell'isolamento lo vive, rischierebbe di ripetere lo stesso errore che vogliamo correggere. Per questo lavoriamo su due binari insieme: da una parte la validazione, capire e correggere la rotta; dall'altra lo sviluppo, costruire e sbagliare in fretta su qualcosa di reale invece che discuterne su qualcosa di ipotetico.",
  "Stiamo lavorando a un prototipo. Non un'idea su carta, non una promessa in un pitch deck: qualcosa che esiste, che si può toccare, su cui possiamo raccogliere una reazione vera invece di un'opinione su un'ipotesi. Ogni versione è pensata per essere messa in discussione, non difesa. Se qualcosa non serve, la togliamo; se manca qualcosa che non avevamo previsto, la aggiungiamo. Preferiamo una direzione giusta trovata con qualche correzione a una direzione sbagliata seguita con sicurezza.",
  "Crediamo che il modo in cui affrontiamo questo percorso conti quanto il risultato. Crediamo che nessuna soluzione possa funzionare se le persone restano fuori dalla stanza in cui si decide. Crediamo che la verità su cosa sappiamo, e cosa non sappiamo ancora, valga più di un annuncio perfetto ma vuoto.",
  "Se hai una voce in questo mondo che tu ci lavori, che tu ci viva accanto, o che tu voglia solo dirci cosa ne pensi, ci interessa ascoltarla. Lasciaci la tua mail: non finirà in una newsletter automatica, ti contattiamo noi, di persona, per capire se hai voglia di aiutarci a definire meglio la direzione che stiamo prendendo. Non ti chiediamo di comprare niente. Ti chiediamo di aiutarci a non sbagliare.",
  "E se quello che ti interessa è provare il prototipo appena sarà pronto, faccelo sapere: sarai tra i primi a saperlo.",
];

function ChiEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: '"DM Sans", system-ui, sans-serif',
        color: "#3B6D11",
        fontSize: "0.72em",
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        marginBottom: "0.5rem",
      }}
    >
      {children}
    </div>
  );
}

function ChiHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="italic"
      style={{
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)",
        lineHeight: 1.15,
        fontWeight: 400,
        color: "#1C1A14",
        marginBottom: "1rem",
      }}
    >
      {children}
    </h3>
  );
}

function ChiContent() {
  return (
    <div className="space-y-8">
      <section>
        <ChiEyebrow>Da dove è iniziato tutto</ChiEyebrow>
        <ChiHeading>11 Aprile 2026</ChiHeading>
        <div className="space-y-4">
          {CHI_BLOCK1_PARAGRAPHS.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section>
        <ChiEyebrow>Chi siamo</ChiEyebrow>
        <ChiHeading>Il team dietro al progetto</ChiHeading>
        <div className="border-t" style={{ borderColor: "rgba(28,26,20,0.12)" }}>
          {TEAM.map((m) => (
            <details
              key={m.name}
              className="group border-b"
              style={{ borderColor: "rgba(28,26,20,0.12)" }}
            >
              <summary
                className="flex items-center justify-between gap-4 cursor-pointer list-none py-4"
                style={{ outline: "none" }}
              >
                <span className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                  <span
                    style={{
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      fontStyle: "italic",
                      fontSize: "1.1em",
                      color: "#1C1A14",
                    }}
                  >
                    {m.name}
                  </span>
                  <span
                    style={{
                      fontFamily: '"DM Sans", system-ui, sans-serif',
                      color: "#3B6D11",
                      fontSize: "0.88em",
                    }}
                  >
                    {m.role}
                  </span>
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1C1A14"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 transition-transform duration-300 group-open:rotate-180"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div className="pb-5 pr-8 space-y-3" style={{ fontSize: "0.96em" }}>
                {m.bio.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

function PercheContent() {
  return (
    <div className="space-y-5">
      {PERCHE_PARAGRAPHS.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

function CosaContent() {
  const insertBeforeLast = COSA_PARAGRAPHS.length - 1;
  return (
    <div className="space-y-5">
      {COSA_PARAGRAPHS.flatMap((p, i) => {
        const nodes = [<p key={`p-${i}`}>{p}</p>];
        if (i === insertBeforeLast - 1) {
          nodes.push(
            <div key={`lead-${i}`} className="py-2">
              <LeadForm />
            </div>,
          );
        }
        return nodes;
      })}
    </div>
  );
}

function LeadForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const submit = useServerFn(submitLead);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const res = await submit({ data: { email } });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div
        className="absolute -inset-2 rounded-[2rem] -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(239, 159, 39, 0.38) 0%, rgba(239, 159, 39, 0) 55%)",
        }}
      />
      <form
        onSubmit={onSubmit}
        className="relative z-10 flex items-center gap-2 rounded-full pl-5 sm:pl-6 pr-2 py-2 shadow-sm w-full"
        style={{ backgroundColor: "#F6F3ED", border: "1px solid rgba(28,26,20,0.14)" }}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Il tuo indirizzo email"
          disabled={status === "loading"}
          className="flex-1 min-w-0 bg-transparent outline-none py-2 disabled:opacity-60 placeholder:text-neutral-500"
          style={{ color: "#1C1A14" }}
        />
        <button
          type="submit"
          aria-label="Iscriviti"
          disabled={status === "loading"}
          className="shrink-0 rounded-full w-10 h-10 flex items-center justify-center transition-opacity disabled:opacity-60 hover:opacity-90"
          style={{ backgroundColor: "#EF9F27", color: "#1C1A14" }}
        >
          →
        </button>
      </form>
      <div
        className="relative z-10 mt-3 h-5 text-sm text-center"
        style={{ fontFamily: '"DM Sans", system-ui, sans-serif', color: "#1C1A14" }}
        aria-live="polite"
      >
        {status === "success" && "Grazie, ti scriveremo presto."}
        {status === "error" && "Qualcosa è andato storto, riprova."}
      </div>
    </div>
  );
}
function DesktopCarousel({ onOpen }: { onOpen: (i: number) => void }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);
  const xRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const SPEED = 70; // px/sec
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current) {
        const halfWidth = track.scrollWidth / 2;
        if (halfWidth > 0) {
          xRef.current += SPEED * dt;
          if (xRef.current >= halfWidth) xRef.current -= halfWidth;
          track.style.transform = `translate3d(${-xRef.current}px, 0, 0)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="hidden sm:block relative w-full py-8"
      style={{ overflowX: "clip" }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <div
        ref={trackRef}
        className="flex gap-8 lg:gap-10 w-max"
        style={{ willChange: "transform" }}
      >
        {[...CARDS, ...CARDS].map((c, i) => (
          <div
            key={i}
            className="shrink-0 w-[clamp(360px,32vw,520px)]"
            onMouseEnter={() => { pausedRef.current = true; }}
            onMouseLeave={() => { pausedRef.current = false; }}
          >
            <StackCard card={c} onOpen={() => onOpen(i % CARDS.length)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function StackCard({

  card,
  onOpen,
}: {
  card: Card;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Apri ${card.title}`}
      className="group relative w-full text-left rounded-[24px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EF9F27] active:scale-[0.98]"
    >
      {/* Terracotta halo — kept inside the card bounds to avoid hover bleed */}
      <span
        aria-hidden
        className="absolute -inset-1 rounded-[28px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "rgba(239, 159, 39, 0.28)",
          filter: "blur(18px)",
          zIndex: 0,
        }}
      />

      {/* Glass frame */}
      <span
        className="relative z-10 block w-full rounded-[24px] p-2 sm:p-2.5 transition-transform duration-300 ease-out group-hover:scale-[1.02]"
        style={{
          background: "rgba(255, 255, 255, 0.36)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.62)",
          boxShadow:
            "0 20px 50px rgba(28,26,20,0.12), inset 0 1px 0 rgba(255,255,255,0.85)",
          transformOrigin: "center",
        }}
      >
        {/* Inner photo card */}
        <span
          className="relative block w-full rounded-[20px] overflow-hidden"
          style={{
            aspectRatio: "16 / 10",
            boxShadow: "0 14px 40px rgba(28,26,20,0.16)",
            border: "1px solid rgba(255,255,255,0.5)",
          }}
        >
          <img
            src={card.image}
            alt=""
            loading="lazy"
            width={1024}
            height={640}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{
              objectPosition:
                card.title === "Manifesto"
                  ? "50% 55%"
                  : card.title === "Cosa"
                    ? "30% 62%"
                    : "center",
            }}
          />
          {/* bottom gradient for legibility */}
          <span
            aria-hidden
            className="absolute inset-0 block"
            style={{
              background:
                "linear-gradient(to top, rgba(28,26,20,0.78) 0%, rgba(28,26,20,0.45) 35%, rgba(28,26,20,0) 65%)",
            }}
          />
          {/* title + subtitle bottom-left */}
          <span className="absolute left-5 right-20 bottom-4 sm:left-7 sm:right-24 sm:bottom-6 block">
            <span
              className="m-0 font-normal text-white block"
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontSize: "clamp(2.25rem, 6.5vw, 4rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                textShadow: "0 2px 14px rgba(0,0,0,0.4)",
              }}
            >
              {card.title}
            </span>
            <span
              className="mt-1 sm:mt-2 m-0 text-white/90 block"
              style={{
                fontFamily: '"DM Sans", system-ui, sans-serif',
                fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)",
                lineHeight: 1.35,
                textShadow: "0 1px 8px rgba(0,0,0,0.35)",
              }}
            >
              {card.subtitle}
            </span>
          </span>
          {/* arrow bottom-right */}
          <span
            aria-hidden
            className="absolute right-4 bottom-4 sm:right-6 sm:bottom-6 flex items-center justify-center rounded-full text-white transition-transform duration-500 group-hover:scale-110"
            style={{
              width: "clamp(44px, 5vw, 56px)",
              height: "clamp(44px, 5vw, 56px)",
              background: "rgba(255,255,255,0.22)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.5)",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: "44%", height: "44%" }}
            >
              <path d="M7 17 17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </span>
        </span>
      </span>
    </button>
  );
}

function CardModal({
  card,
  isOpen,
  onClose,
}: {
  card: Card;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const raf = requestAnimationFrame(() => setVisible(true));
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        cancelAnimationFrame(raf);
        document.body.style.overflow = prev;
      };
    }
    setVisible(false);
  }, [isOpen]);


  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={card.title}
      onClick={onClose}
      style={{
        background: visible ? "rgba(28,26,20,0.55)" : "rgba(28,26,20,0)",
        backdropFilter: visible ? "blur(8px)" : "blur(0px)",
        WebkitBackdropFilter: visible ? "blur(8px)" : "blur(0px)",
        opacity: visible ? 1 : 0,
        pointerEvents: isOpen ? "auto" : "none",
        transition:
          "opacity 280ms ease, background-color 280ms ease, backdrop-filter 280ms ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[20px]"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.82) 0%, rgba(246,243,237,0.74) 100%)",
          backdropFilter: "blur(40px) saturate(200%)",
          WebkitBackdropFilter: "blur(40px) saturate(200%)",
          border: "1px solid rgba(255,255,255,0.9)",
          boxShadow:
            "0 30px 80px rgba(28,26,20,0.28), inset 0 1px 0 rgba(255,255,255,0.95), 0 0 0 1px rgba(255,255,255,0.35) inset",
          transform: visible
            ? "translateY(0) scale(1)"
            : "translateY(24px) scale(0.96)",
          opacity: visible ? 1 : 0,
          transition:
            "transform 320ms cubic-bezier(0.22,1,0.36,1), opacity 260ms ease",
        }}
      >
        <div
          className="sticky top-0 z-10 flex justify-end pointer-events-none"
          style={{ height: 0 }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi"
            className="pointer-events-auto flex items-center justify-center rounded-full w-10 h-10 hover:opacity-90 transition"
            style={{
              marginTop: "1rem",
              marginRight: "1rem",
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(14px) saturate(160%)",
              border: "1px solid rgba(255,255,255,0.7)",
              color: "#1C1A14",
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: "1.25rem",
              lineHeight: 1,
              fontWeight: 500,
              boxShadow:
                "0 4px 14px rgba(28,26,20,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            ×
          </button>
        </div>
        <div className="p-8 sm:p-12">
          <h2
            className="m-0 font-normal"
            style={{
              fontFamily: '"Instrument Serif", serif',
              color: "#1C1A14",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {card.title}
          </h2>
          <img
            src={card.image}
            alt={card.title}
            loading="lazy"
            className="w-full object-cover rounded-[16px] mt-6"
            style={{
              height: "clamp(200px, 40vw, 360px)",
              objectPosition:
                card.title === "Manifesto"
                  ? "50% 55%"
                  : card.title === "Cosa"
                    ? "30% 62%"
                    : "center",
            }}
          />

          <div
            className="mt-6 space-y-5"
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              color: "#1C1A14",
              fontSize: "clamp(1rem, 1.15vw, 1.15rem)",
              lineHeight: 1.65,
            }}
          >
            {card.title === "Chi" ? (
              <ChiContent />
            ) : card.title === "Perché" ? (
              <PercheContent />
            ) : card.title === "Cosa" ? (
              <CosaContent />
            ) : (
              card.bodyIndexes.map((idx) => {
                const p = MANIFESTO_PARAGRAPHS[idx];
                if (!p) return null;
                if (p.italic) {
                  return (
                    <p
                      key={idx}
                      className="italic"
                      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                    >
                      <strong>{p.text}</strong>
                    </p>
                  );
                }
                return (
                  <p key={idx} dangerouslySetInnerHTML={{ __html: p.html ?? p.text }} />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


function useBlink(minMs: number, maxMs: number) {
  const [closed, setClosed] = useState(false);
  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    const loop = () => {
      const wait = minMs + Math.random() * (maxMs - minMs);
      t1 = setTimeout(() => {
        setClosed(true);
        t2 = setTimeout(() => {
          setClosed(false);
          loop();
        }, 150);
      }, wait);
    };
    loop();
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [minMs, maxMs]);
  return closed;
}

const COLS = 8;
const FULL_ROWS = [
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
];
const ROWS_COUNT = FULL_ROWS.length;

function useEyePixelSize() {
  const [px, setPx] = useState(8);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setPx(4);
      else if (w < 1024) setPx(6);
      else if (w < 1536) setPx(9);
      else setPx(11);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return px;
}

function FlatEye({ className, closed, pixelSize }: { className?: string; closed: boolean; pixelSize: number }) {
  const gap = 1;
  const rows = closed
    ? FULL_ROWS.map(() => Array(COLS).fill(0)).map((r, i) =>
        i === 6 || i === 7 ? [0, 1, 1, 1, 1, 1, 1, 0] : r
      )
    : FULL_ROWS;

  return (
    <div
      className={className ?? ""}
      style={{
        width: COLS * pixelSize + (COLS - 1) * gap,
        height: ROWS_COUNT * pixelSize + (ROWS_COUNT - 1) * gap,
        filter:
          "drop-shadow(0 2px 3px rgba(28,26,20,0.35)) drop-shadow(0 0 1px rgba(28,26,20,0.45))",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, ${pixelSize}px)`,
          gap,
        }}
      >
        {rows.map((row, r) =>
          row.map((on, c) => (
            <div
              key={`${r}-${c}`}
              style={{
                width: pixelSize,
                height: pixelSize,
                background: on ? "#FFFFFF" : "transparent",
                boxShadow: on ? "0 0 3px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.6)" : undefined,
                transition: "background 120ms ease, box-shadow 120ms ease",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}


function GridBackdrop() {
  const line = "rgba(151, 196, 89, 0.22)";
  const cell = "44px";
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        backgroundImage: `
          linear-gradient(to right, ${line} 1px, transparent 1px),
          linear-gradient(to bottom, ${line} 1px, transparent 1px)
        `,
        backgroundSize: `${cell} ${cell}, ${cell} ${cell}`,
        maskImage:
          "radial-gradient(ellipse 60% 52% at 50% 38%, #000 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.35) 70%, transparent 100%)",
      }}
    />
  );
}


function Index() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const eyesClosed = useBlink(1200, 2800);
  const eyePixelSize = useEyePixelSize();

  const activeCardData = activeCard !== null ? CARDS[activeCard] : null;
  const lastCardRef = useRef<Card | null>(null);
  if (activeCardData) lastCardRef.current = activeCardData;
  const displayedCard = activeCardData ?? lastCardRef.current;


  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (activeCard !== null) setActiveCard(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeCard]);

  return (
    <main
      className="relative w-full overflow-x-hidden"
      style={{ background: "#F6F3ED" }}
    >
      {/* Grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[5]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "240px 240px",
          opacity: 0.08,
          mixBlendMode: "overlay",
        }}
      />

      {/* HERO */}
      <section className="relative z-10 h-screen w-full overflow-hidden">
        <div className="relative z-20 h-full flex flex-col items-center justify-start px-5 sm:px-6 pt-[8vh] sm:pt-[10vh] pb-[1vh] sm:pb-[1.5vh]">
          <div className="relative w-full max-w-3xl">
            {/* Eyes — centered above the headline */}
            <div className="flex justify-center items-end gap-3 sm:gap-5 mb-6 sm:mb-10 pointer-events-none">
              <FlatEye closed={eyesClosed} pixelSize={eyePixelSize} />
              <FlatEye closed={eyesClosed} pixelSize={eyePixelSize} />
            </div>

            <h1
              className="relative z-10 text-center text-[clamp(2.75rem,10vw,4.5rem)] sm:text-[clamp(2rem,7vw,4.5rem)]"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 400,
                lineHeight: 1.05,
                color: "#1C1A14",
              }}
            >
              Perché nessuno dovrebbe invecchiare solo.
            </h1>

            <div className="relative z-10 mx-auto mt-6 sm:mt-8 w-full">
              <LeadForm />
            </div>
          </div>
        </div>

        <GridBackdrop />

      </section>

      {/* CARDS section — mobile: stacked; desktop: 2x2 mosaic */}
      <section className="relative z-20 w-full -mt-[42vh] sm:-mt-[40vh] pt-4 sm:pt-6 pb-20 sm:pb-28 px-5 sm:px-6">
        {/* MOBILE: stacked cards */}
        <div className="sm:hidden mx-auto max-w-[640px] flex flex-col gap-5">
          {CARDS.map((c, i) => (
            <StackCard key={i} card={c} onOpen={() => setActiveCard(i)} />
          ))}
        </div>

        {/* DESKTOP: horizontal auto-scrolling carousel, pauses on hover */}
        <DesktopCarousel onOpen={setActiveCard} />




        <div
          className="relative z-10 max-w-2xl mx-auto mt-14 sm:mt-20 text-center"
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            color: "#1C1A14",
            fontSize: "clamp(1.4rem, 2vw, 1.9rem)",
            lineHeight: 1.35,
          }}
        >
          <strong className="ross-highlight">Per questo R.O.S.S. non sorveglia. Dà voce.</strong>
        </div>
      </section>


      {displayedCard && (
        <CardModal
          card={displayedCard}
          isOpen={activeCard !== null}
          onClose={() => setActiveCard(null)}
        />
      )}
    </main>
  );
}
