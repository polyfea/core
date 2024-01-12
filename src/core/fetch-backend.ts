import {  Observable, catchError, concatWith, defer, of, retry, switchMap, tap, throwError, timer } from "rxjs";
import { PolyfeaBackend } from "./internal";
import { ApiResponse, Configuration, ContextArea, PolyfeaApi } from "@polyfea/browser-api";

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
            }
        }

        const cached = localStorage.getItem(`polyfea-context[${contextName},${path}]`);

        const fetched = defer(() => this.api.getContextAreaRaw({ name: contextName, path }))
            .pipe(
                switchMap((response: ApiResponse<ContextArea>) => {
                    if (response.raw.ok) {
                        return response.value();
                    } else {
                        return throwError(() => new Error(response.raw.statusText));
                    }
                }),
                tap(context => {
                    if (context) {
                        localStorage.setItem(`polyfea-context[${contextName},${path}]`, JSON.stringify(context));
                    }
                })
            );
        if (cached) {
            const context = JSON.parse(cached) as ContextArea;
            return of(context).pipe(
                concatWith(fetched),
                catchError(( err ) => {
                    console.warn(`Failed to fetch context area ${contextName} from ${path}, using cached version as the last known value`, err);
                    return of(context);
                }), 
            );
        } else {
            return fetched.pipe(
                retry({ count: 3, delay: (retryIx: number) =>timer((retryIx+1)* 2000) })
            );
        }
    }
}