function preRenderMiddleware(dispatch, { components, location, params }, appConfig) {
    const promises = components.map((current) => {
        const component = current.WrappedComponent ? current.WrappedComponent : current;

        return component.fetchData ? component.fetchData({ dispatch, location, params, appConfig }) : null;
    });

    return Promise.all(promises);
}

export default preRenderMiddleware;
