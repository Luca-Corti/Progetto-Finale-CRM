export interface IndirizzoSedeOperativa {

  "indirizzoSedeOperativa": {
    "id": number,
    "via": string,
    "civico": number,
    "cap": number,
    "localita": string,
    "comune": {
      "id": number,
      "nome": string,
      "provincia": {
        "id": number,
        "nome": string,
        "sigla": string
      }
    }
  }
}
