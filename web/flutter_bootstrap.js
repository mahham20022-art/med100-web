{{flutter_js}}
{{flutter_build_config}}
_flutter.loader.load({
  // No serviceWorkerSettings: avoids a stale cached build masking new
  // deploys on a site that iterates fast.
  config: {
    canvasKitBaseUrl: "canvaskit/"
  },
  onEntrypointLoaded: async function (engineInitializer) {
    const appRunner = await engineInitializer.initializeEngine();
    await appRunner.runApp();
    var loader = document.getElementById('med100-loading');
    if (loader) loader.remove();
  }
});
