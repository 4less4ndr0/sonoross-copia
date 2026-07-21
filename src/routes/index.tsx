import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState, type FormEvent } from "react";

import { submitLead } from "@/lib/leads.functions";
import cloudChiAsset from "@/assets/cloud-chi.jpeg.asset.json";
const cloudChi = cloudChiAsset.url;
import cloudCosa from "@/assets/cloud-cosa.jpg";

import cloudPerche from "@/assets/cloud-perche.jpg";
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
    title: "manifesto",
    subtitle: "perché esistiamo",
    image: cloudManifesto.url,
    bodyIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    title: "chi",
    subtitle: "il team dietro a R.O.S.S.",
    image: cloudChi,
    bodyIndexes: [0, 1],
  },
  {
    title: "cosa",
    subtitle: "il cuore di R.O.S.S.",
    image: cloudCosa,
    bodyIndexes: [2, 3],
  },
  {
    title: "perché",
    subtitle: "perché lo stiamo facendo",
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



// Desktop-only slots. Each side slot is expressed with left+width+height so
// CSS can interpolate smoothly between side and center on state change.
type Slot = {
  top: string;
  left: string;
  width: string;
  height: string;
  rotate: number;
};

const SIDE_W = "min(22vw, 300px)";
const SIDE_H = "calc(min(22vw, 300px) * 1.25)"; // aspect 4:5

const CENTER_SLOT: Slot = {
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  rotate: 0,
};

type Cloud = {
  variant: "a" | "b" | "c" | "d";
  delay: string;
  cardIndex: number; // index into CARDS (1..4 for chi/cosa/come/perché)
  slot: Slot;
};

// Side slots for the 4 non-manifesto cards. Right-anchored slots are converted
// to a left-based calc() so transitions animate on a single property.
const CLOUDS: Cloud[] = [
  {
    variant: "a",
    delay: "0s",
    cardIndex: 1, // chi
    slot: { top: "10%", left: "-22%", width: SIDE_W, height: SIDE_H, rotate: -4 },
  },
  {
    variant: "b",
    delay: "1.1s",
    cardIndex: 2, // cosa
    slot: { top: "66%", left: "-23%", width: SIDE_W, height: SIDE_H, rotate: 3 },
  },
  {
    variant: "d",
    delay: "0.6s",
    cardIndex: 3, // come
    slot: {
      top: "20%",
      left: `calc(100% + 22% - ${SIDE_W})`,
      width: SIDE_W,
      height: SIDE_H,
      rotate: -2,
    },
  },
  {
    variant: "a",
    delay: "1.7s",
    cardIndex: 4, // perché
    slot: {
      top: "72%",
      left: `calc(100% + 23% - ${SIDE_W})`,
      width: SIDE_W,
      height: SIDE_H,
      rotate: 4,
    },
  },
];

const EASE = "cubic-bezier(0.22,1,0.36,1)";
const SWAP_TRANSITION = [
  `top 600ms ${EASE}`,
  `left 600ms ${EASE}`,
  `width 600ms ${EASE}`,
  `height 600ms ${EASE}`,
  `transform 480ms ${EASE}`,
  `box-shadow 400ms ease`,
].join(", ");

function SwapCard({
  card,
  sideSlot,
  isActive,
  onClick,
  floatVariant,
  floatDelay,
}: {
  card: Card;
  sideSlot: Slot;
  isActive: boolean;
  onClick: () => void;
  floatVariant: "a" | "b" | "c" | "d";
  floatDelay: string;
}) {
  const [isHover, setIsHover] = useState(false);
  const slot = isActive ? CENTER_SLOT : sideSlot;
  const peek = isHover && !isActive;
  const rotate = isActive || peek ? 0 : sideSlot.rotate;
  const scale = peek ? 1.06 : 1;
  const translateY = peek ? -4 : 0;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {
        if (!isActive) onClick();
      }}
      onKeyDown={(e) => {
        if (!isActive && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onFocus={() => setIsHover(true)}
      onBlur={() => setIsHover(false)}
      aria-label={isActive ? card.title : `Apri ${card.title}`}
      aria-expanded={isActive}
      className={`absolute rounded-[20px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EF9F27] ${!isActive ? `float-${floatVariant}` : ""}`}
      style={{
        top: slot.top,
        left: slot.left,
        width: slot.width,
        height: slot.height,
        transform: `rotate(${rotate}deg) scale(${scale}) translateY(${translateY}px)`,
        zIndex: isActive ? 20 : peek ? 50 : 5,
        transition: SWAP_TRANSITION,
        cursor: isActive ? "default" : "pointer",
        animationDelay: floatDelay,
        animationPlayState: isHover || isActive ? "paused" : "running",
      }}
    >
      {/* Terracotta halo — fades out when active */}
      <div
        aria-hidden
        className="absolute -inset-8 rounded-[32px] pointer-events-none"
        style={{
          background: "rgba(239, 159, 39, 0.45)",
          filter: "blur(44px)",
          opacity: isActive ? 0 : isHover ? 1 : 0.8,
          transition: "opacity 400ms ease",
          zIndex: -1,
        }}
      />

      {/* IMAGE LAYER (visible when not active) */}
      <div
        aria-hidden={isActive}
        className="absolute inset-0 rounded-[20px] overflow-hidden"
        style={{
          opacity: isActive ? 0 : 1,
          transition: "opacity 300ms ease",
          pointerEvents: isActive ? "none" : "auto",
          boxShadow: "0 10px 30px rgba(28,26,20,0.18)",
          border: "1px solid rgba(255,255,255,0.5)",
        }}
      >
        <img
          src={card.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: card.title === "manifesto" ? "50% 55%" : "center" }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(28,26,20,0.72) 0%, rgba(28,26,20,0.35) 40%, rgba(28,26,20,0) 65%)",
          }}
        />
        <div className="absolute left-4 right-16 bottom-3">
          <h3
            className="m-0 font-normal text-white"
            style={{
              fontFamily: '"Instrument Serif", serif',
              fontSize: "clamp(1.75rem, 14cqi, 3.25rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              textShadow: "0 2px 12px rgba(0,0,0,0.35)",
            }}
          >
            {card.title}
          </h3>
          <p
            className="m-0 text-white/90"
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: "clamp(0.75rem, 2.2cqi, 1rem)",
              lineHeight: 1.3,
              textShadow: "0 1px 8px rgba(0,0,0,0.35)",
            }}
          >
            {card.subtitle}
          </p>
        </div>
        <span
          aria-hidden
          className="absolute right-3 bottom-3 flex items-center justify-center rounded-full text-white"
          style={{
            width: "clamp(28px, 12cqi, 44px)",
            height: "clamp(28px, 12cqi, 44px)",
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
            style={{ width: "45%", height: "45%" }}
          >
            <path d="M7 17 17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </span>

      </div>

      {/* GLASS LAYER (visible when active) */}
      <div
        aria-hidden={!isActive}
        className="absolute inset-0 rounded-[20px] overflow-hidden"
        style={{
          opacity: isActive ? 1 : 0,
          transition: "opacity 300ms ease",
          pointerEvents: isActive ? "auto" : "none",
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(20px) saturate(140%)",
          WebkitBackdropFilter: "blur(20px) saturate(140%)",
          border: "1px solid rgba(255,255,255,0.5)",
          boxShadow: "0 24px 70px rgba(28, 26, 20, 0.12)",
        }}
      >
        <div
          className="p-6 sm:p-12 space-y-6 absolute inset-0 overflow-y-auto"
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: "clamp(1.1rem, 1.3vw, 1.3rem)",
            fontWeight: 400,
            lineHeight: 1.65,
            letterSpacing: "-0.005em",
            color: "#1C1A14",
          }}
        >
          <h2
            className="m-0 font-normal"
            style={{
              fontFamily: '"Instrument Serif", serif',
              color: "#1C1A14",
              fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
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
            className="w-full object-cover rounded-[14px]"
            style={{
              height: "clamp(180px, 22vh, 320px)",
              marginBottom: "0.5rem",
              objectPosition: card.title === "manifesto" ? "50% 55%" : "center",
            }}
          />

          {card.title === "chi" ? (
            <ChiContent />
          ) : (
            card.bodyIndexes.map((idx) => {
              const p = MANIFESTO_PARAGRAPHS[idx];
              if (!p) return null;
              return p.italic ? (
                <p
                  key={idx}
                  className="italic"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  <strong>{p.text}</strong>
                </p>
              ) : (
                <p key={idx} dangerouslySetInnerHTML={{ __html: p.html ?? p.text }} />
              );
            })
          )}
        </div>
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
      className="group relative w-full text-left overflow-hidden rounded-[20px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EF9F27] transition-transform duration-300 ease-out hover:-translate-y-1 active:scale-[0.98]"
      style={{
        aspectRatio: "16 / 10",
        boxShadow: "0 14px 40px rgba(28,26,20,0.18)",
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
        style={{ objectPosition: card.title === "manifesto" ? "50% 55%" : "center" }}
      />
      {/* bottom gradient for legibility */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(28,26,20,0.78) 0%, rgba(28,26,20,0.45) 35%, rgba(28,26,20,0) 65%)",
        }}
      />
      {/* title + subtitle bottom-left */}
      <div className="absolute left-6 right-24 bottom-5 sm:left-8 sm:right-28 sm:bottom-7">
        <h3
          className="m-0 font-normal text-white"
          style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: "clamp(2.25rem, 6.5vw, 4rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            textShadow: "0 2px 14px rgba(0,0,0,0.4)",
          }}
        >
          {card.title}
        </h3>
        <p
          className="mt-1 sm:mt-2 m-0 text-white/90"
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)",
            lineHeight: 1.35,
            textShadow: "0 1px 8px rgba(0,0,0,0.35)",
          }}
        >
          {card.subtitle}
        </p>
      </div>
      {/* + button bottom-right */}
      <span
        aria-hidden
        className="absolute right-5 bottom-5 sm:right-7 sm:bottom-7 flex items-center justify-center rounded-full text-white transition-transform duration-500 group-hover:scale-110"
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
      // enter on next frame so the initial styles commit first
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
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
          background: "rgba(246,243,237,0.98)",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 30px 80px rgba(28,26,20,0.35)",
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
              objectPosition: card.title === "manifesto" ? "50% 55%" : "center",
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
            {card.title === "chi" ? (
              <ChiContent />
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

function usePixelSize() {
  const [px, setPx] = useState(6);
  useEffect(() => {
    const update = () => {
      const vmin = Math.min(window.innerWidth, window.innerHeight);
      setPx(Math.max(6, Math.min(10, Math.round(vmin * 0.012))));
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
        i === 6 || i === 7 ? [0, 0, 0, 1, 1, 0, 0, 0] : r
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
          "radial-gradient(ellipse 55% 55% at 50% 50%, #000 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.35) 70%, transparent 100%)",
      }}
    />
  );
}


function Index() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [activeCloudIndex, setActiveCloudIndex] = useState<number | null>(null);
  const eyesClosed = useBlink(2500, 6000);
  const pixelSize = usePixelSize();
  const submit = useServerFn(submitLead);

  const activeCardData = activeCard !== null ? CARDS[activeCard] : null;
  const lastCardRef = useRef<Card | null>(null);
  if (activeCardData) lastCardRef.current = activeCardData;
  const displayedCard = activeCardData ?? lastCardRef.current;


  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (activeCard !== null) setActiveCard(null);
      if (activeCloudIndex !== null) setActiveCloudIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeCard, activeCloudIndex]);

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
        <div className="relative z-20 h-full flex flex-col items-center justify-center px-5 sm:px-6 pb-[18vh] sm:pb-[20vh]">
          <div className="relative w-full max-w-3xl mt-[10vh] sm:mt-[12vh]">
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

            <div className="relative z-10 mx-auto mt-6 sm:mt-8 w-full max-w-md">
              <div
                aria-hidden
                className="absolute -inset-3 rounded-full pointer-events-none"
                style={{
                  background: "rgba(239, 159, 39, 0.55)",
                  filter: "blur(18px)",
                }}
              />
              <form
                onSubmit={onSubmit}
                className="relative z-10 flex items-center gap-2 rounded-full pl-5 sm:pl-6 pr-2 py-2 shadow-sm w-full"
                style={{
                  backgroundColor: "#F6F3ED",
                  border: "1px solid rgba(28,26,20,0.14)",
                }}
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
                  style={{ backgroundColor: "var(--ross-terra)", color: "var(--ross-ink)" }}
                >
                  →
                </button>
              </form>
            </div>
            <div
              className="relative z-10 mt-3 h-5 text-sm text-center"
              style={{ fontFamily: '"DM Sans", system-ui, sans-serif', color: "#1C1A14" }}
              aria-live="polite"
            >
              {status === "success" && "Grazie, ti scriveremo presto."}
              {status === "error" && "Qualcosa è andato storto, riprova."}
            </div>
          </div>
        </div>

        <GridBackdrop />

        <div className="absolute top-[78%] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-6 pointer-events-none">
          <div className="flex items-start gap-[10vw] sm:gap-[12vw]">
            <FlatEye closed={eyesClosed} pixelSize={pixelSize} />
            <FlatEye closed={eyesClosed} pixelSize={pixelSize} />
          </div>
          <div
            className="text-[10px] tracking-[0.25em] uppercase animate-bounce"
            style={{ color: "rgba(28,26,20,0.7)" }}
          >
            ↓ scroll
          </div>
        </div>
      </section>

      {/* CARDS section — mobile: stacked; desktop: manifesto glass + floating clouds */}
      <section className="relative z-10 w-full py-20 sm:py-28 px-5 sm:px-6">
        {/* MOBILE: 5 stacked cards */}
        <div className="sm:hidden mx-auto max-w-[640px] flex flex-col gap-5">
          {CARDS.map((c, i) => (
            <StackCard key={i} card={c} onOpen={() => setActiveCard(i)} />
          ))}
        </div>

        {/* DESKTOP: manifesto glass card at center with 4 floating cloud cards around */}
        <div className="hidden sm:block">
          <div className="relative w-[58vw] max-w-5xl mx-auto">
            {/* Sizer: keeps wrapper the same height as the manifesto */}
            <div
              aria-hidden
              className="invisible pointer-events-none rounded-[20px] p-6 sm:p-12 space-y-6"
              style={{
                fontFamily: '"DM Sans", system-ui, sans-serif',
                fontSize: "clamp(1.1rem, 1.3vw, 1.3rem)",
                lineHeight: 1.65,
              }}
            >
              {MANIFESTO_PARAGRAPHS.map((p, i) => (
                <p key={i}>{p.text}</p>
              ))}
            </div>

            {/* 5 SwapCards — manifesto + 4 clouds. Persistent DOM nodes swap
                between side and center slots via CSS transitions. */}
            <SwapCard
              card={CARDS[0]}
              sideSlot={
                activeCloudIndex !== null
                  ? CLOUDS[activeCloudIndex].slot
                  : CLOUDS[0].slot
              }
              isActive={activeCloudIndex === null}
              onClick={() =>
                activeCloudIndex !== null && setActiveCloudIndex(null)
              }
              floatVariant="c"
              floatDelay="0s"
            />
            {CLOUDS.map((c, i) => (
              <SwapCard
                key={i}
                card={CARDS[c.cardIndex]}
                sideSlot={c.slot}
                isActive={activeCloudIndex === i}
                onClick={() =>
                  activeCloudIndex === i
                    ? setActiveCloudIndex(null)
                    : setActiveCloudIndex(i)
                }
                floatVariant={c.variant}
                floatDelay={c.delay}
              />
            ))}

          </div>
        </div>

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
