
"use strict";


module.exports = class FileLocations {

	// Sources
	static get sourcesFolder() { return "sources/"; }
	static get copyManifestPath() { return "copy-paths.json"; }

	// CSS
	static get cssFolder() { return "css/"; }
	static get cssRootPath() { return "styles.scss"; }
	static get cssPublicExtension() { return ".css"; }
	static get cssPublicMinifiedExtension() { return ".min" + this.cssPublicExtension; }

	// Resources
	static get resourcesPath() { return "resources"; }

	// Includes
	static get includesPath() { return "includes"; }
};
