function preRenderMiddleware(dispatch, { components, location, params }, appConfig = {}, req) {
    const promises = components.map((current) => {
        if(!current) return null;

        const component = current.WrappedComponent ? current.WrappedComponent : current;
        const pageConfig = component.OriginalPage && component.OriginalPage.pageConfig;

        return component.fetchData ? component.fetchData({ dispatch, location, params, appConfig, pageConfig }, req) : null;
    });

    let lastComponent = components[components.length - 1].WrappedComponent ? components[components.length - 1].WrappedComponent : components[components.length - 1];
    appConfig.pageId = lastComponent && lastComponent.OriginalPage && lastComponent.OriginalPage.pageConfig.pageId;

    return Promise.all(promises);
}

export default preRenderMiddleware;
