import { Cliente } from "./cliente"

export interface FatturaForm {

  "data": string,
  "numero": number,
  "anno": number,
  "importo": number,
  "stato": {
    "id": number,
    "nome": string
  },
  "cliente": Cliente
}
