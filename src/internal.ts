import { type ContextArea } from "@polyfea/browser-api";
import { Observable } from "rxjs";

export interface PolyfeaBackend {
    getContextArea(contextName: string): Observable<ContextArea>;
}