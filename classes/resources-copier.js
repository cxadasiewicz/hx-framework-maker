
"use strict";

const FilesCopier = require("./files-copier");
const ResourceIdentification = require("./resource-identification");


module.exports = class ResourcesCopier extends FilesCopier {

	constructor(parentMaker) {
		super(parentMaker, ResourceIdentification.resourcesPath);
	}
};
