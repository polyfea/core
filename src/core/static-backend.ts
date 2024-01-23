import { NEVER, Observable, concatWith, from, map } from "rxjs";
import { PolyfeaBackend } from "./internal";
import { Configuration, ContextArea, PolyfeaApi, StaticConfig } from "@polyfea/browser-api";

export class StaticBackend implements PolyfeaBackend {
    private spec$ = new Observable<StaticConfig>();
    
    constructor(api: PolyfeaApi | Configuration | string = "./polyfea") {
        let polyfeaApi: PolyfeaApi;
        if (typeof api === "string") {
            if (api.length === 0) {
                api = "./polyfea";
            }
            polyfeaApi = new PolyfeaApi(new Configuration({ 
                basePath: new URL(
                    api, new URL(
                        globalThis.document?.baseURI || "/", 
                        globalThis.location?.href || "http://localhost")
                ).href }));
            polyfeaApi = new PolyfeaApi(new Configuration({ basePath: api }));
        } else if (api instanceof Configuration) {

            polyfeaApi = new PolyfeaApi(api as Configuration);
        } else {
            polyfeaApi = api as PolyfeaApi;
        }
        
        this.spec$ = from(polyfeaApi.getStaticConfig()).pipe(concatWith(NEVER));
    }

    getContextArea(contextName: string): Observable<ContextArea> {
        let path = globalThis.location.pathname;
        // make path relative to document.baseURI
        if (globalThis.document.baseURI) {
            const baseURI = new URL(globalThis.document.baseURI, globalThis.location.href);
            const basePath = baseURI.pathname;
            if (path.startsWith(basePath)) {
                path = './' + path.substring(basePath.length);
            } else if (basePath.endsWith("/") && path === basePath.substring(0, basePath.length - 1)) {
                // use case where user navigates to base path without trailing slash
                path = './';
            }
        }

        return this.spec$.pipe(
            map(spec => {
                for (let context of spec.contextAreas) {
                    if (context.name === contextName && new RegExp(context.path).test(path)) {
                        return { ...context.contextArea, microfrontends: { ...spec.microfrontends, ...context.contextArea.microfrontends } };
                    }
                }
                return null;
            }));
    }
}