
"use strict";


module.exports = class FileLocations {

	// Sources
	static get sourcesFolder() { return "sources/"; }

	// CSS
	static get cssFolder() { return "css/"; }
	static get cssRootPath() { return "styles.scss"; }
	static get cssPublicExtension() { return ".css"; }
	static get cssPublicMinifiedExtension() { return ".min" + this.cssPublicExtension; }

	// Resources
	static get resourcesFolder() { return "resources/"; }
	static get resourcesManifestPath() { return "copy-paths.json"; }

	// Includes
	static get includesFolder() { return "includes/"; }
	static get includesManifestPath() { return "copy-paths.json"; }
};
