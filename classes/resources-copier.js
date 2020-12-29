
"use strict";

const FileLocations = require("./file-locations");
const FilesCopier = require("./files-copier");


module.exports = class ResourcesCopier extends FilesCopier {

	constructor(parentMaker) {
		super(parentMaker, FileLocations.resourcesPath);
	}
};
