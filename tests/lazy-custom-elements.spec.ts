
import { beforeEach, expect, test, describe, vi } from 'vitest';
import { LazyCustomElements } from '../src/lazy-custom-elements';

const GLOBAL_KEY = '__POLYFEA_LAZY_REGISTRY__';

describe('LazyCustomElements', () => {

    beforeEach(() => {
        // Cleanup global singleton
        delete (window as any)[GLOBAL_KEY];
        
        // Reset body
        document.body.innerHTML = '';
        
        // Clear mocks
        vi.restoreAllMocks();
        
        // Reset customElements.defineLazy if we can't unpatch, we just rely on re-assignment or check
        // Ideally we would want to remove defineLazy but standard customElements is not easily mutable in some envs.
        // But for our polyfill:
        if ((customElements as any).defineLazy) {
             // We can leave it, as constructor checks !customElements.defineLazy
             // But to test the assignment logic, we might want to delete it if it is configurable.
             try {
                delete (customElements as any).defineLazy;
             } catch (e) {}
        }
    });

    test('should be a singleton', () => {
        const instance1 = new LazyCustomElements();
        const instance2 = new LazyCustomElements();
        expect(instance1).toBe(instance2);
        expect((window as any)[GLOBAL_KEY]).toBe(instance1);
    });

    test('constructor should initialize correctly', () => {
        const attachShadowSpy = vi.spyOn(Element.prototype, 'attachShadow');
        new LazyCustomElements();
        
        // Check defineLazy polyfill
        expect(customElements.defineLazy).toBeDefined();
        
        // Check attachShadow patch - hard to check directly if it's strictly not the same without reference, 
        // but we can check if it works as expected or is different function object if we had ref.
        // We can check if it calls original.
        const div = document.createElement('div');
        div.attachShadow({ mode: 'open' });
        expect(attachShadowSpy).toHaveBeenCalled();
    });

    test('defineLazy should throw if arguments are missing', () => {
        new LazyCustomElements();
        expect(() => customElements.defineLazy('', 'mod')).toThrow();
        expect(() => customElements.defineLazy('tag', '' as any)).toThrow();
    });
    
    test('defineLazy should warn on relative string path', () => {
        new LazyCustomElements();
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        customElements.defineLazy('my-tag', './relative.js');
        expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('relative path string'));
    });

    test('should register and load element when added to DOM', async () => {
        new LazyCustomElements();
        const loadFn = vi.fn().mockResolvedValue(undefined);
        
        customElements.defineLazy('lazy-one', loadFn);
        
        expect(loadFn).not.toHaveBeenCalled();
        
        const el = document.createElement('lazy-one');
        document.body.appendChild(el);
        
        await vi.waitFor(() => expect(loadFn).toHaveBeenCalled());
    });

    test('should load immediately if element already exists in DOM', async () => {
        const el = document.createElement('lazy-two');
        el.attachShadow({ mode: 'open' });
        document.body.appendChild(el);
        
        new LazyCustomElements();
        const loadFn = vi.fn().mockResolvedValue(undefined);
        
        customElements.defineLazy('lazy-two', loadFn);
        
        await vi.waitFor(() => expect(loadFn).toHaveBeenCalled());
    });

    test('should ignore if element is already defined in customElements', () => {
        new LazyCustomElements();
        const loadFn = vi.fn();
        
        // Mock customElements.get to return true
        vi.spyOn(customElements, 'get').mockReturnValue(class extends HTMLElement {});
        
        customElements.defineLazy('defined-tag', loadFn);
        
        expect(loadFn).not.toHaveBeenCalled();
        
        // Even if we add it
        const el = document.createElement('defined-tag');
        document.body.appendChild(el);
        
        // Trigger generic mutation via something else
        const div = document.createElement('div');
        document.body.appendChild(div);

        // waitFor logic might be tricky if it never happens, but we expect it NOT to happen.
        // We can wait a bit or check immediately.
        expect(loadFn).not.toHaveBeenCalled();
    });

    test('should load when element is added deep in DOM tree', async () => {
        new LazyCustomElements();
        const loadFn = vi.fn().mockResolvedValue(undefined);
        
        customElements.defineLazy('lazy-deep', loadFn);
        
        const parent = document.createElement('div');
        const child = document.createElement('span');
        const leaf = document.createElement('lazy-deep');
        child.appendChild(leaf);
        parent.appendChild(child);
        
        document.body.appendChild(parent);
        
        await vi.waitFor(() => expect(loadFn).toHaveBeenCalled());
    });

    test('should load when element is added to Shadow DOM (patched attachShadow)', async () => {
        new LazyCustomElements();
        const loadFn = vi.fn().mockResolvedValue(undefined);
        
        customElements.defineLazy('lazy-shadow', loadFn);
        
        const host = document.createElement('div');
        document.body.appendChild(host);
        const shadow = host.attachShadow({ mode: 'open' });
        
        const el = document.createElement('lazy-shadow');
        shadow.appendChild(el);
        
        await vi.waitFor(() => expect(loadFn).toHaveBeenCalled());
    });

    test('should load if element exists in Shadow DOM before registration', async () => {
        const host = document.createElement('div');
        document.body.appendChild(host);
        
        // attachShadow before LazyCustomElements exists (if that's possible to test? 
        // No, construction patches it. But native elements exist.)
         const shadow = host.attachShadow({ mode: 'open' });
         const el = document.createElement('lazy-shadow-pre');
         shadow.appendChild(el);

        new LazyCustomElements();
        const loadFn = vi.fn().mockResolvedValue(undefined);
        
        customElements.defineLazy('lazy-shadow-pre', loadFn);
        
        await vi.waitFor(() => expect(loadFn).toHaveBeenCalled());
    });

    test('should handle string loadFn (primitive)', async () => {
        new LazyCustomElements();
        // We can't easily verify dynamic import success in unit test without mocking import or module system.
        // But we can verify it tries to call it. 
        // We will rely on coverage that we entered the block.
        // If we mock console.error, we can catch the failure of import
        
        const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        
        customElements.defineLazy('lazy-string', 'invalid-module-path');
        const el = document.createElement('lazy-string');
        document.body.appendChild(el);
        
        // It should attempt to load and likely fail.
        await vi.waitFor(() => expect(errorSpy).toHaveBeenCalled()); 
        // Error is expected because 'invalid-module-path' won't resolve.
    });

    test('should handle load error gracefully', async () => {
        new LazyCustomElements();
        const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const loadFn = vi.fn().mockRejectedValue(new Error('Load failed'));
        
        customElements.defineLazy('lazy-error', loadFn);
        const el = document.createElement('lazy-error');
        document.body.appendChild(el);
        
        await vi.waitFor(() => expect(loadFn).toHaveBeenCalled());
        await vi.waitFor(() => expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('error to load custom element'), expect.anything()));
    });
    
     test('should detect deep shadow roots via TreeWalker in deepQuerySelector', async () => {
         // This is covered by "exists in Shadow DOM before registration" if we make it nested.
         const host = document.createElement('div');
         document.body.appendChild(host);
         const shadow1 = host.attachShadow({ mode: 'open' });
         
         const innerHost = document.createElement('div');
         shadow1.appendChild(innerHost);
         const shadow2 = innerHost.attachShadow({ mode: 'open' });
         
         const el = document.createElement('lazy-nested-shadow');
         shadow2.appendChild(el);
         
         new LazyCustomElements();
         const loadFn = vi.fn().mockResolvedValue(undefined);
         
         customElements.defineLazy('lazy-nested-shadow', loadFn);
         
         await vi.waitFor(() => expect(loadFn).toHaveBeenCalled());
     });

    test('should react to mutations in Shadow DOM even if shadow root added later', async () => {
         new LazyCustomElements();
         const loadFn = vi.fn().mockResolvedValue(undefined);
         customElements.defineLazy('lazy-late-shadow', loadFn);
         
         const host = document.createElement('div');
         document.body.appendChild(host);
         
         // Host is already in DOM, now attach shadow
         const shadow = host.attachShadow({ mode: 'open' });
         
         // Add element to shadow
         const el = document.createElement('lazy-late-shadow');
         shadow.appendChild(el);
         
         await vi.waitFor(() => expect(loadFn).toHaveBeenCalled());
    });
    
    test('should check deep children in mutation observer', async () => {
        new LazyCustomElements();
        const loadFn = vi.fn().mockResolvedValue(undefined);
        customElements.defineLazy('lazy-child-check', loadFn);
        
        const div = document.createElement('div');
        const inner = document.createElement('div');
        const leaf = document.createElement('lazy-child-check');
        
        inner.appendChild(leaf);
        div.appendChild(inner);
        
        document.body.appendChild(div);
        
        await vi.waitFor(() => expect(loadFn).toHaveBeenCalled());
    });

    test('should stop observer when queue is empty and re-init on new registration', async () => {
        new LazyCustomElements();
        const loadFn = vi.fn().mockResolvedValue(undefined);
        customElements.defineLazy('lazy-stop', loadFn);
        
        // Add element to trigger load
        const el = document.createElement('lazy-stop');
        document.body.appendChild(el);
        
        await vi.waitFor(() => expect(loadFn).toHaveBeenCalled());
        
        // At this point pending is empty. 
        // Trigger generic mutation to cause observer callback check size === 0 and stop itself.
        const div = document.createElement('div');
        document.body.appendChild(div);
        
        // We can't verify observer state directly (private). 
        // But we can verify re-registration works.
        
        const loadFn2 = vi.fn().mockResolvedValue(undefined);
        customElements.defineLazy('lazy-restart', loadFn2);
        
        // Observer should be restarted.
        const el2 = document.createElement('lazy-restart');
        document.body.appendChild(el2);
        
        await vi.waitFor(() => expect(loadFn2).toHaveBeenCalled());
    });

});
