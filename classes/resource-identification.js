
"use strict";


module.exports = class ResourceIdentification {

	// Sources
	static get sourcesFolder() { return "sources/"; }
	static get copyManifestPath() { return "copy-paths.json"; }

	// CSS
	static get cssFolder() { return "css/"; }
	static get cssRawPath() { return "styles.scss"; }
	static get cssFinalExtension() { return ".css"; }
	static get cssFinalMinifiedExtension() { return ".min" + this.cssFinalExtension; }

	// Resources
	static get resourcesPath() { return "resources"; }

	// Includes
	static get includesPath() { return "includes"; }

	// File specifications
	static get fileSpecSeparator() { return "|"; }
	static get fileSpecInheritOption() { return "inherit"; }
};
