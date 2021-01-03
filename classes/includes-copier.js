
"use strict";

const FilesCopier = require("./files-copier");
const ResourceIdentification = require("./resource-identification");


module.exports = class IncludesCopier extends FilesCopier {

	constructor(operation) {
		super(operation, ResourceIdentification.includesPath);
	}
};
