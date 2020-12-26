
"use strict";

const FileLocations = require("./file-locations");
const FilesCopier = require("./files-copier");


module.exports = class ResourcesCopier extends FilesCopier {

	constructor() {
		super();
		this.filesFolder = FileLocations.resourcesFolder;
		this.filesManifestPath = FileLocations.resourcesManifestPath;
		this.filesName = "resources";
	}
};
