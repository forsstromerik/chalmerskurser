const getInstitution = stringNum => {
  let string = 'Institution:'
    switch(stringNum) {
      case '0109':
        string += ' Examensarbeten inom Biokemi, Biomedicin och Bioteknik GU';
        break;
      case '0113':
        string += ' Biologi och Miljövetenskap GU';
        break;
      case '0114': 
        string += ' Kemi och Molekylärbiologi GU';
        break;
      case '0205':
        string += ' Nationalekonomiska Institutionen GU';
        break;
      case '0210':
        string += ' Statsvetenskapliga Institutionen GU';
        break;
      case '0480':
        string += ' Maskinteknik (Projektarbete)';
        break;
      case '0595':
        string += ' Studentkåren';
        break;
      case '0860':
        string += ' Växt- och miljövetenskaper GU';
        break;
      case '11':
        string += ' Matematiska Vetenskaper';
        break;
      case '16':
        string += ' Fysik';
        break;
      case '20':
        string += ' Arkitektur och Samhällsbyggnadsteknik';
        break;
      case '21':
        string += ' Kemi och Kemiteknik';
        break;
      case '28':
        string += ' Biologi och Bioteknik';
        break;
      case '30':
        string += ' Mekanik och Maritima Vetenskaper';
        break;
      case '32':
        string += ' Elektroteknik';
        break;
      case '37':
        string += ' Data- och Informationsteknik';
        break;
      case '40':
        string += ' Industri- och Materialvetenskap';
        break;
      case '45':
        string += ' Teknikens Ekonomi och Organisation';
        break;
      case '48':
        string += ' Sjöfart och Marin Teknik';
        break;
      case '59':
        string += ' Mikroteknologi och Nanovetenskap';
        break;
      case '60':
        string += ' Tillämpad Informationsteknologi';
        break;
      case '62':
        string += ' Vetenskapens Kommunikation och Lärande';
        break;
      case '70':
        string += ' Rymd-, Geo- och Miljövetenskap';
        break;
      case '88':
        string += ' Generell kompetens';
        break;
      case '902':
        string += ' Utbildningsstöd';
        break;
      case '903':
        string += ' Studentstöd';
        break;
      case '904':
        string += ' Studentcentrum';
        break;
      case '905':
        string += ' Antagning och examen';
        break;
      case '906':
        string += ' Studie- och systemadministration';
        break;
      case '91':
        string += ' Verksamhetsstöd';
        break;
      case '92':
        string += ' Biblioteket';
        break;
      default:
        string = '';
   }
   return string;
}

export default getInstitution;