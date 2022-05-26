import { IndirizzoSedeOperativa } from "./indirizzo-sede-operativa";

export interface ClienteForm {
  "ragioneSociale": string,
  "partitaIva": string,
  "tipoCliente": string,
  "email": string,
  "pec": string,
  "telefono": string,
  "nomeContatto": string,
  "cognomeContatto": string,
  "telefonoContatto": string,
  "emailContatto": string,
  "indirizzoSedeOperativa": IndirizzoSedeOperativa,
  "indirizzoSedeLegale": IndirizzoSedeOperativa,
  "dataInserimento": string,
  "dataUltimoContatto": string,
}
