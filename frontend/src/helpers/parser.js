export const getInstitution = stringNum => {
    switch(stringNum) {
      case '0109':
        return 'Examensarbeten inom Biokemi, Biomedicin och Bioteknik GU';
      case '0113':
        return 'Biologi och Miljövetenskap GU';
      case '0114': 
        return 'Kemi och Molekylärbiologi GU';
      case '0205':
        return 'Nationalekonomiska Institutionen GU';
      case '0210':
        return 'Statsvetenskapliga Institutionen GU';
      case '0480':
        return 'Maskinteknik (Projektarbete)';
      case '0595':
        return 'Studentkåren';
      case '0860':
        return 'Växt- och miljövetenskaper GU';
      case '11':
        return 'Matematiska Vetenskaper';
      case '16':
        return 'Fysik';
      case '20':
        return 'Arkitektur och Samhällsbyggnadsteknik';
      case '21':
        return 'Kemi och Kemiteknik';
      case '28':
        return 'Biologi och Bioteknik';
      case '30':
        return 'Mekanik och Maritima Vetenskaper';
      case '32':
        return 'Elektroteknik';
      case '37':
        return 'Data- och Informationsteknik';
      case '40':
        return 'Industri- och Materialvetenskap';
      case '45':
        return 'Teknikens Ekonomi och Organisation';
      case '48':
        return 'Sjöfart och Marin Teknik';
      case '59':
        return 'Mikroteknologi och Nanovetenskap';
      case '60':
        return 'Tillämpad Informationsteknologi';
      case '62':
        return 'Vetenskapens Kommunikation och Lärande';
      case '70':
        return 'Rymd-, Geo- och Miljövetenskap';
      case '88':
        return 'Generell kompetens';
      case '902':
        return 'Utbildningsstöd';
      case '903':
        return 'Studentstöd';
      case '904':
        return 'Studentcentrum';
      case '905':
        return 'Antagning och examen';
      case '906':
        return 'Studie- och systemadministration';
      case '91':
        return 'Verksamhetsstöd';
      case '92':
        return 'Biblioteket';
      default:
        return '';
   }
}

export const getProgramme = abbr => {
  switch(abbr) {
    case 'TKARK': 
      return 'Arkitektur';
    case 'TKBIO': 
      return 'Bioteknik, Civilingenjör';
    case 'TKDAT': 
      return 'Datateknik, Civilingenjör';
    case 'TKELT': 
      return 'Elektroteknik, Civilingenjör';
    case 'TKITE': 
      return 'Informationsteknik, Civilingenjör';
    case 'TKKMT': 
      return 'Kemiteknik, Civilingenjör';
    case 'TKMAS': 
      return 'Maskinteknik, Civilingenjör';
    case 'TKTEM': 
      return 'Teknisk Matematik, Civilingenjör';
    case 'TKAUT': 
      return 'Automation och Mekatronik, Civilingenjör';
    case 'TKDES': 
      return 'Teknisk Design, Civilingenjör';
    case 'TKIEK': 
      return 'Industriell Ekonomi, Civilingenjör';
    case 'TKKEF': 
      return 'Kemiteknik Med Fysik, Civilingenjör';
    case 'TKTFY': 
      return 'Teknisk Fysik, Civilingenjör';
    case 'TKSAM': 
      return 'Samhällsbyggnadsteknik, Civilingenjör';
    case 'TKATK': 
      return 'Arkitektur och Teknik';
    case 'TIDSL': 
      return 'Design och Produktutveckling, Högskoleingenjör';
    case 'TIELL': 
      return 'Elektroteknik, Högskoleingenjör';
    case 'TIKEL': 
      return 'Kemiteknik, Högskoleingenjör';
    case 'TIMEL': 
      return 'Mekatronik, Högskoleingenjör';
    case 'TIMAL': 
      return 'Maskinteknik, Högskoleingenjör';
    case 'TISAM': 
      return 'Samhällsbyggnadsteknik, Högskoleingenjör';
    case 'TIDAL': 
      return 'Datateknik, Högskoleingenjör';
    case 'TIEPL': 
      return 'Ekonomi och Produktionsteknik, Högskoleingenjör';
    case 'MPMEI': 
      return 'Innovationsledning, Masterprogram';
    case 'MPPDE': 
      return 'Produktutveckling, Masterprogram';
    case 'MPQOM': 
      return 'Kvalitets- och Verksamhetsutveckling, Masterprogram';
    case 'MPSES': 
      return 'Hållbara Energisystem, Masterprogram';
    case 'MPSYS': 
      return 'Systemteknik, Reglerteknik och Mekatronik, Masterprogram';
    case 'MPBME': 
      return 'Medicinsk Teknik, Masterprogram';
    case 'MPNUE': 
      return 'Nukleär Vetenskap och Teknik, Masterprogram';
    case 'MPEES': 
      return 'Inbyggda Elektroniksystem, Masterprogram';
    case 'MPSEB': 
      return 'Konstruktionsteknik och Byggnadsteknologi, Masterprogram';
    case 'MPIEE': 
      return 'Infrastruktur och Miljöteknik, Masterprogram';
    case 'MPWPS': 
      return 'Trådlös Teknik, Fotonik och Rymdteknik, Masterprogram';
    case 'MPLOL': 
      return 'Lärande och Ledarskap, Masterprogram';
    case 'MPIDE': 
      return 'Interaktionsdesign, Masterprogram';
    case 'MPENM': 
      return 'Matematik och Beräkningsvetenskap, Masterprogram';
    case 'MPDCF': 
      return 'Organisering och Ledning I Bygg- och Fastighetssektorn, Masterprogram';
    case 'MPCAS': 
      return 'Komplexa Adaptiva System, Masterprogram';
    case 'MPARC': 
      return 'Arkitektur och Stadsbyggnad, Masterprogram';
    case 'MPAME': 
      return 'Tillämpad Mekanik, Masterprogram';
    case 'MPALG': 
      return 'Datavetenskap - Algoritmer, Programspråk och Logik, Masterprogram';
    case 'MPMAR': 
      return 'Sjöfartens Organisation och Ledning, Masterprogram';
    case 'MPTSE': 
      return 'Industriell Ekologi, Masterprogram';
    case 'MPMCN': 
      return 'Materialkemi, Masterprogram';
    case 'MPSOF': 
      return 'Software Engineering And Technology - Utveckling och Implementering Av Mjukvara, Masterprogram';
    case 'MPPAS': 
      return 'Fysik och Astronomi, Masterprogram';
    case 'MPBIO': 
      return 'Bioteknik, Masterprogram';
    case 'MPAEM': 
      return 'Materialteknik, Masterprogram';
    case 'MPAPP': 
      return 'Tillämpad Fysik, Masterprogram';
    case 'MPAUT': 
      return 'Fordonsteknik, Masterprogram';
    case 'MPBDP': 
      return 'Entreprenörskap och Affärsdesign, Masterprogram';
    case 'MPCOM': 
      return 'Kommunikationssystem, Masterprogram';
    case 'MPDES': 
      return 'Teknisk Design, Masterprogram';
    case 'MPDSD': 
      return 'Arkitektur och Planering För Hållbar Framtid, Masterprogram';
    case 'MPEPO': 
      return 'Elkraftteknik, Masterprogram';
    case 'MPISC': 
      return 'Innovativ och Hållbar Kemiteknik, Masterprogram';
    case 'MPNAV': 
      return 'Marin Teknik, Masterprogram';
    case 'MPPEN': 
      return 'Produktionsutveckling, Masterprogram';
    case 'MPSCM': 
      return 'Supply Chain Management, Masterprogram';
    case 'MPSOV': 
      return 'Ljud och Vibrationer, Masterprogram';
    case 'TIPMA': 
      return 'Internationell Projektledning, Masterprogram';
    case 'MPCSN': 
      return 'Datorer, Nätverk och System, Masterprogram';
    case 'MPNAT': 
      return 'Nanoteknologi, Masterprogram';
    case 'TSLOG': 
      return 'Sjöfart och Logistik';
    case 'TISJL': 
      return 'Sjöingenjör';
    case 'TSJKL': 
      return 'Sjökapten';
    case 'TAFFS': 
      return 'Affärsutveckling och Entreprenörskap Inom Samhällsbyggnadsteknik';
    case 'MTS': 
      return 'Människa - Teknik - Samhälle';
    case 'SPRAK': 
      return 'Fackspråk och Kommunikation';
    case 'KPMUT': 
      return 'Kompletterande Utbildning För Ingenjörer och Arkitekter Med Avslutad Utländsk Utbildning och Utfärdad Utländsk Examen';
    case 'ZBASS': 
      return 'Tekniskt Basår';
    case 'KPLOL': 
      return 'Lärande och Ledarskap, Kompletterande Pedagogisk Utbildning';
    case 'SBVII': 
      return 'Sjöbefäl Klass Vii</option></select>';
    default:
      return '';
  }
}

export const getSP = str => {
  switch(str) {
    case 'LP1':
      return 'Läsperiod 1';
    case 'LP2':
      return 'Läsperiod 2';
    case 'LP3':
      return 'Läsperiod 3';
    case 'LP4':
      return 'Läsperiod 4';
    case 'Ej LP':
      return 'Ej Läsperiod';
    default:
      return '';
  }
}
