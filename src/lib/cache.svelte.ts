
import {
    SvelteMap,
} from 'svelte/reactivity';

export function createCache<K, V>(fetcher: (key: K) => Promise<V>) {
    const store = new SvelteMap<K, Promise<V>>();
    let entries = $state<Record<string, V>>({});

    async function get(key: K): Promise<V> {
        const id = String(key);
        if (id in entries) return entries[id];

        if (!store.has(key)) {
            store.set(key, fetcher(key));
        }

        const value = await store.get(key)!;
        entries[id] = value;
        return value;
    }

    function clear(key?: K): void {
        if (key === undefined) {
            store.clear();
            entries = {};
        } else {
            store.delete(key);
            delete entries[String(key)];
        }
    }

    return {
        get,
        clear,
        get size() {
            return Object.keys(entries).length;
        }
    };
}