import { writable } from 'svelte/store';

const stateobj = {
    status: true,
    counter: 0,
    complex_data: {
        name: 'pizza',
        values: [1, 2, 3, 4]
    }
}

// We could just export the store itself.  However, creating a second object as done with public_store below
// allow sus to create custom APIs.  This simplifies using the store elsewhere in the code because it means all the
// "update" syntax can stay here.
const store = writable(stateobj);

export const public_store = {
    subscribe: store.subscribe,
    set: store.set,
    update: store.update,

    // Now the custom data manipulation functions.
    increment: () => {
        store.update(state => {
            state.counter += 1;
            return state;
        })
    },
    increment_quiet: () => {
        // Changes the value but not through the update method.
        stateobj.counter += 1;
    },
    append_value: () => {
        store.update(state => {
            state.complex_data.values.push(Math.floor(Math.random() * 10));
            return state;
        })
    },
    append_specific_value: (val) => {
        store.update(state => {
            state.complex_data.values.push(val);
            return state;
        })
    }
}