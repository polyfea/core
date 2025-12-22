import {  Observable, catchError, concatWith, defer, of, retry, switchMap, tap, timer } from "rxjs";
import { type PolyfeaBackend } from "./internal";
import { type ApiResponse, Configuration, type ContextArea, PolyfeaApi } from "@polyfea/browser-api";

/** @internal implementation of dynamic fetching of context areas */
export class FetchBackend implements PolyfeaBackend {
    private readonly api: PolyfeaApi;

    constructor(api: PolyfeaApi | Configuration | string = "./polyfea") {
        if (typeof api === "string") {
            // sanitize base path to work accross platforms (otherwise raises invalid URL in testing )
            this.api = new PolyfeaApi(new Configuration({ 
                basePath: new URL(
                    api, new URL(
                        globalThis.document?.baseURI || "/", 
                        globalThis.location?.href || "http://localhost")
                ).href }));
        } else if (api instanceof Configuration) {
            this.api = new PolyfeaApi(api as Configuration);
        } else {
            this.api = api as PolyfeaApi;
        }
    }

    getContextArea(contextName: string): Observable<ContextArea> {
        let path = globalThis.location?.pathname || "/";
        // make path relative to document.baseURI
        if (globalThis.document?.baseURI) {
            const baseURI = new URL(globalThis.document.baseURI, globalThis.location.href);
            const basePath = baseURI.pathname;
            if (path.startsWith(basePath)) {
                path = './' + path.substring(basePath.length);
            } else if (basePath.endsWith("/") && path === basePath.substring(0, basePath.length - 1)) {
                // use case where user navigates to base path without trailing slash
                path = './';
            }
        }

        const cached = localStorage.getItem(`polyfea-context[${contextName},${path}]`);
        const fetched = defer(() => this.api.getContextAreaRaw({ name: contextName, path }))
            .pipe(
                switchMap((response: ApiResponse<ContextArea>) =>  response.value()),
                tap(context => {
                    if (context) {
                        localStorage.setItem(`polyfea-context[${contextName},${path}]`, JSON.stringify(context));
                    }
                }),
            );
        if (cached) {
            const context = JSON.parse(cached) as ContextArea;
            return of(context).pipe(
                concatWith(fetched),
                catchError(( err ) => {
                    console.warn(`[Polyfea] Failed to fetch context area ${contextName} from ${path}, using cached version as the last known value`, err);
                    return of(context);
                }), 
            );
        } else {
                const retriesCfg =document.head.querySelector(`meta[name="polyfea-backend-retries"]`)?.getAttribute("content") || "3";
                const retries = parseInt(retriesCfg, 10) || 3;
                const timerCfg =document.head.querySelector(`meta[name="polyfea-backend-retry-timer"]`)?.getAttribute("content") || "2000";
                const timerMs = parseInt(timerCfg, 10) || 2000;

            return fetched.pipe(
                retry({ count: retries, delay: (retryIx: number) =>timer((retryIx+1)* timerMs) })
            );
        }
    }
}