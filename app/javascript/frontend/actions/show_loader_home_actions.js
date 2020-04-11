export const HIDE_INITIAL_HOME_LOADER_ACTION = 'HIDE_INITIAL_HOME_LOADER_ACTION';

// Private receive created order
export const hideInitialHomeLoader = () => ({
    type: HIDE_INITIAL_HOME_LOADER_ACTION,
    showHomeLoaderFlag: false
});

