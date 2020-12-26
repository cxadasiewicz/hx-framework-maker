
"use strict";


module.exports = class Maker {

	constructor() {
		this.workspace = null;
		this.product = null;
	}

	setContext(workspace, product) {
		this.workspace = workspace;
		this.product = product;
	}
	setContextFrom(other) {
		this.setContext(other.workspace, other.product);
	}

	// Getting paths

	get frameworkName() {
		return this.product.name;
	}
	get frameworkInstallFolder() {
		return this.product.installPath + "/";
	}
	get frameworkPublicInstallFolder() {
		return this.product.publicInstallPath + "/";
	}
};
