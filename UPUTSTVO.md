# Digitalna pozivnica — uputstvo

Šta dobijaš:

| Fajl | Šta radi |
|---|---|
| `index.html` | Pozivnica koju gost otvara i popunjava |
| `admin.html` | Tvoj panel — ko je potvrdio, koliko ljudi, poruke, CSV |
| `config.js` | **Jedini fajl koji menjaš po klijentu** — imena, datum, mesta, boje |
| `backend-code.gs` | Kod za Google Sheet (baza, besplatna) |
| `vercel.json` | Da rade linkovi tipa `/rsvp/abc123` |

Sve je besplatno: Vercel hosting + Google Sheet kao baza. Bez servera, bez mesečnih troškova.

---

## Korak 1 — Napravi bazu (5 min)

1. Idi na [sheets.new](https://sheets.new) → napravi novu tabelu, nazovi je npr. *Venčanje Aleksandra i Đorđe*.
2. U meniju: **Extensions → Apps Script**.
3. Obriši sve iz editora, pa nalepi ceo sadržaj fajla `backend-code.gs`.
4. U prvom redu promeni lozinku:
   ```js
   var LOZINKA = "nesto-tvoje-tesko-2026";
   ```
5. Sačuvaj (💾).

## Korak 2 — Objavi bazu

1. Gore desno: **Deploy → New deployment**.
2. Klikni zupčanik pored *Select type* → **Web app**.
3. Podesi:
   - *Execute as*: **Me**
   - *Who has access*: **Anyone** ← obavezno, inače gosti ne mogu da pošalju
4. **Deploy** → odobri pristup (Google će te dva puta pitati; klikni *Advanced → Go to project (unsafe)* — to je tvoj sopstveni skript).
5. Kopiraj **Web app URL**. Izgleda ovako:
   `https://script.google.com/macros/s/AKfycb.../exec`

> Kad god posle menjaš `.gs` kod, moraš **Deploy → Manage deployments → ✏️ → Version: New version → Deploy**. Inače promene ne rade.

## Korak 3 — Poveži

Otvori `config.js` i popuni:

```js
API_URL: "https://script.google.com/macros/s/AKfycb.../exec",
ona: "Aleksandra",
on: "Đorđe",
datumISO: "2026-09-12T16:00:00+02:00",
```

Ostalo (raspored, kontakti, boje) je u istom fajlu, sve na srpskom, sve komentarisano.

## Korak 4 — Objavi sajt

**Najlakše (bez Git-a):**
1. Idi na [vercel.com/new](https://vercel.com/new) → *Deploy* → prevuci ceo folder.
2. Dobiješ adresu tipa `pozivnica-aleksandra-djordje.vercel.app`.

**Sa Git-om:**
```bash
git init && git add . && git commit -m "pozivnica"
# napravi repo na GitHubu, pa:
git remote add origin <url> && git push -u origin main
```
Pa u Vercelu *Import Git Repository*.

## Korak 5 — Dodaj goste

1. Otvori `tvoj-sajt.vercel.app/admin.html`
2. Unesi lozinku iz Koraka 1.
3. **Dodaj gosta** → ime + za koliko osoba važi → dobiješ link.
4. **Pošalji na WhatsApp** otvara poruku sa gotovim tekstom.

Svaki gost dobija svoj link (`?kod=x7k2m9`). Zato tačno vidiš ko je odgovorio, a ko ćuti.

---

## Kako to izgleda u praksi

- Gost otvori link → vidi svoje ime („Poštovana porodice Petrović") → popuni → gotovo.
- Ako se predomisli, otvori isti link i ispravi odgovor.
- Ti u `admin.html` vidiš: koliko je pozvano, koliko potvrdilo, **ukupan broj gostiju za restoran**, ko je posan, i sve poruke.
- Dugme **Preuzmi CSV** daje ti tabelu za restoran ili za raspored sedenja.

---

## Ako želiš ovo da prodaješ

Za svakog klijenta ponavljaš samo: nova Google tabela → novi `config.js` → novi Vercel projekat. Oko 20 minuta po klijentu kad se uhodaš.

Praktični saveti:
- **Napravi jedan demo sajt** sa izmišljenim parom i njega šalji kao primer. Ljudi kupuju ono što vide.
- **Uzmi klijentov Google nalog** za tabelu, ili napravi zaseban nalog za svakog — tako im posle predaješ pun pristup i nemaš obavezu čuvanja tuđih podataka.
- **Domen** je najbolji dodatak koji možeš da naplatiš: `aleksandraidjordje.rs` košta par hiljada dinara godišnje, a deluje mnogo ozbiljnije od `.vercel.app`. Vercel ima *Settings → Domains*.
- **Napravi paket cenu**: osnovna pozivnica / + domen / + izmene teksta i boja / + galerija slika.
- Isti sistem radi za krštenja, slave, rođendane, korporativne događaje — menja se samo tekst u `config.js`.

## Sitnice koje treba da znaš

- Bez `API_URL` sajt radi u **demo režimu** — sve izgleda isto, ali se odgovori ne čuvaju. Zgodno za pokazivanje klijentu.
- Google Apps Script ima limit oko 20.000 poziva dnevno. Za venčanje je to ogromno.
- `admin.html` je zaštićen samo lozinkom. Ne stavljaj laku lozinku i ne deli link javno.
- Fontovi se učitavaju sa Google Fonts — potreban je internet, što je ionako slučaj.
- Ako želiš da pozivnica ne bude vidljiva pretraživačima, dodaj `<meta name="robots" content="noindex">` u `index.html`.
