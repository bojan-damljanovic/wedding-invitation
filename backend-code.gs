/* ═══════════════════════════════════════════════════════════
   BACKEND POZIVNICE — Google Apps Script
   Zalepi ceo ovaj fajl u Apps Script editor (vidi UPUTSTVO.md).
   ═══════════════════════════════════════════════════════════ */

// ⚠️ PROMENI OVO — ovo je lozinka za admin.html
var LOZINKA = "promeni-me-2026";

var SHEET = "Gosti";
var KOLONE = ["Kod","Ime","MaxOsoba","Status","BrojOsoba","Imena","Meni","Telefon","Poruka","Azurirano"];

/* ───────── pomoćne ───────── */
function _list(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET);
  if(!sh){
    sh = ss.insertSheet(SHEET);
    sh.getRange(1,1,1,KOLONE.length).setValues([KOLONE]).setFontWeight("bold");
    sh.setFrozenRows(1);
  }
  return sh;
}
function _svi(){
  var sh = _list();
  var v = sh.getDataRange().getValues();
  var out = [];
  for(var i=1;i<v.length;i++){
    if(!v[i][0]) continue;
    out.push({
      red: i+1,
      kod: String(v[i][0]),
      ime: v[i][1],
      maxOsoba: v[i][2] || 1,
      status: v[i][3] || "",
      brojOsoba: v[i][4] || "",
      imena: v[i][5] || "",
      meni: v[i][6] || "",
      telefon: v[i][7] || "",
      poruka: v[i][8] || "",
      azurirano: v[i][9] ? Utilities.formatDate(new Date(v[i][9]), Session.getScriptTimeZone(), "dd.MM.yyyy HH:mm") : ""
    });
  }
  return out;
}
function _json(o){
  return ContentService.createTextOutput(JSON.stringify(o))
    .setMimeType(ContentService.MimeType.JSON);
}
function _kod(){
  var abc = "abcdefghijkmnpqrstuvwxyz23456789", s = "";
  for(var i=0;i<6;i++) s += abc.charAt(Math.floor(Math.random()*abc.length));
  return s;
}
function _proveri(p){ return String(p||"") === LOZINKA; }

/* ───────── ČITANJE ───────── */
function doGet(e){
  var p = e.parameter || {};

  if(p.action === "gost"){
    var g = _svi().filter(function(x){ return x.kod === p.kod; })[0];
    if(!g) return _json({ok:false, greska:"Pozivnica nije pronađena."});
    return _json({
      ok:true, ime:g.ime, maxOsoba:g.maxOsoba, status:g.status,
      brojOsoba:g.brojOsoba, imena:g.imena, meni:g.meni,
      telefon:g.telefon, poruka:g.poruka
    });
  }

  if(p.action === "spisak"){
    if(!_proveri(p.kljuc)) return _json({ok:false, greska:"Pogrešna lozinka."});
    return _json({ok:true, gosti:_svi()});
  }

  return _json({ok:false, greska:"Nepoznata akcija."});
}

/* ───────── UPIS ───────── */
function doPost(e){
  var lock = LockService.getScriptLock();
  try{ lock.waitLock(20000); }catch(err){ return _json({ok:false, greska:"Zauzeto, pokušajte ponovo."}); }

  try{
    var d = JSON.parse(e.postData.contents);
    var sh = _list();

    /* gost potvrđuje dolazak */
    if(d.action === "rsvp"){
      var g = _svi().filter(function(x){ return x.kod === d.kod; })[0];

      if(!g){
        // pozivnica bez ličnog koda (otvoreni link) — dodaj novi red
        var kod = _kod();
        sh.appendRow([kod, d.imena || "Gost (otvoreni link)", d.brojOsoba || 1,
                      d.status, d.brojOsoba, d.imena, d.meni, d.telefon, d.poruka, new Date()]);
        return _json({ok:true});
      }

      sh.getRange(g.red, 4, 1, 7).setValues([[
        d.status, d.brojOsoba, d.imena, d.meni, d.telefon, d.poruka, new Date()
      ]]);
      return _json({ok:true});
    }

    /* od ovde nadalje treba lozinka */
    if(!_proveri(d.kljuc)) return _json({ok:false, greska:"Pogrešna lozinka."});

    if(d.action === "dodaj"){
      if(!d.ime) return _json({ok:false, greska:"Ime je obavezno."});
      var nk = _kod();
      sh.appendRow([nk, d.ime, d.maxOsoba || 1, "", "", "", "", "", "", ""]);
      return _json({ok:true, kod:nk});
    }

    if(d.action === "obrisi"){
      var t = _svi().filter(function(x){ return x.kod === d.kod; })[0];
      if(!t) return _json({ok:false, greska:"Gost nije pronađen."});
      sh.deleteRow(t.red);
      return _json({ok:true});
    }

    return _json({ok:false, greska:"Nepoznata akcija."});
  }catch(err){
    return _json({ok:false, greska:"Greška: " + err.message});
  }finally{
    lock.releaseLock();
  }
}

/* ───────── Pokreni jednom ručno da se napravi tabela ───────── */
function pripremiTabelu(){
  _list();
  SpreadsheetApp.getUi().alert("Tabela 'Gosti' je spremna.");
}
