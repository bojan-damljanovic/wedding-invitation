/* ═══════════════════════════════════════════════════════════
   PODEŠAVANJA POZIVNICE
   Ovo je JEDINI fajl koji menjaš za svakog novog klijenta.
   ═══════════════════════════════════════════════════════════ */

const CONFIG = {

  /* ── Veza sa bazom (Google Sheet) ────────────────────────
     Zalepi ovde URL koji dobiješ na kraju koraka 2 iz UPUTSTVO.md.
     Dok je prazno, sajt radi u DEMO režimu (forma se ne čuva). */
  API_URL: "https://script.google.com/macros/s/AKfycbwtxLDkAxp43viPwlkOKW_coE3WCcmhnN0UsmdEPQBSKt1IT3ynTgonl4EvWz0b9ZVg/exec",

  /* ── Mladenci ───────────────────────────────────────────── */
  ona: "Aleksandra",
  on: "Đorđe",
  inicijali: "A\u00A0Đ",          // stoji u pečatu
  hashtag: "#AleksandraIĐorđe",

  /* ── Datum i vreme venčanja ─────────────────────────────── */
  datumISO: "2026-09-12T16:00:00+02:00",   // za odbrojavanje
  datumTekst: "Subota, 12. septembar 2026.",
  godina: "2026",

  /* ── Uvodna reč ─────────────────────────────────────────── */
  citat: "Ima dana koji se ne pamte po datumu, nego po ljudima koji su tog dana bili tu.",
  uvod: "Posle svih godina, jednog leta i mnogo planova — konačno govorimo „da“. Bilo bi nam mnogo lepše da ste tu.",

  /* ── Raspored dana ──────────────────────────────────────── */
  raspored: [
    {
      vreme: "13:30",
      naslov: "Ispraćaj mlade",
      mesto: "Cara Dušana 42, Novi Sad",
      opis: "Kafa, rakija i suze radosnice. Dođite na vreme, mlada ne čeka.",
      mapa: "https://maps.google.com/?q=Cara+Dušana+42+Novi+Sad"
    },
    {
      vreme: "16:00",
      naslov: "Venčanje",
      mesto: "Saborna crkva, Novi Sad",
      opis: "Molimo vas da budete na mestu 15 minuta ranije.",
      mapa: "https://maps.google.com/?q=Saborna+crkva+Novi+Sad"
    },
    {
      vreme: "19:00",
      naslov: "Svečana večera",
      mesto: "Restoran Salaš 137, Čenej",
      opis: "Muzika, večera i igranka do jutra.",
      mapa: "https://maps.google.com/?q=Salaš+137+Čenej"
    }
  ],

  /* ── Dodatne informacije (kartice pri dnu) ──────────────── */
  info: [
    { naslov: "Kodeks oblačenja", tekst: "Svečano. Dame — duga ili koktel haljina. Gospoda — odelo." },
    { naslov: "Parking", tekst: "Besplatan parking ispred restorana, oko 80 mesta." },
    { naslov: "Umesto cveća", tekst: "Ako želite da nas obradujete, koverta nam znači više nego buket." }
  ],

  /* ── Kontakt za pitanja ─────────────────────────────────── */
  kontakt: [
    { ime: "Kum Miloš", telefon: "+381 63 111 222" },
    { ime: "Kuma Jelena", telefon: "+381 64 333 444" }
  ],

  /* ── Rok za potvrdu dolaska ─────────────────────────────── */
  rokTekst: "Molimo vas da potvrdite dolazak do 15. avgusta.",
  rokISO: "2026-08-15T23:59:00+02:00",

  /* ── Opcije menija u formi (obriši niz ako ti ne treba) ─── */
  meniOpcije: ["Standardno", "Posno", "Vegetarijansko", "Bez glutena"],

  /* ── Boje ───────────────────────────────────────────────── */
  boje: {
    ink:      "#0D2622",   // glavna tamna
    inkDeep:  "#06120F",
    linen:    "#F4EFE6",   // svetla
    brass:    "#C39A4E",   // zlatna
    brassLit: "#E3C88D",
    rose:     "#C98F86"
  }
};
