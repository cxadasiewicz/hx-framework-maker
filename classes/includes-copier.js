
"use strict";

const FileLocations = require("./file-locations");
const FilesCopier = require("./files-copier");


module.exports = class IncludesCopier extends FilesCopier {

	constructor() {
		super();
		this.filesFolder = FileLocations.includesFolder;
		this.filesManifestPath = FileLocations.includesManifestPath;
		this.filesName = "includes";
	}
};
