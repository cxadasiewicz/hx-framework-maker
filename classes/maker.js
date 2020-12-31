
"use strict";


module.exports = class Maker {

	constructor(workspaceOrMaker, product = null) {
		let _workspace = null;
		let _product = null;
		if (product) {
			_workspace = workspaceOrMaker;
			_product = product;
		} else {
			_workspace = workspaceOrMaker.workspace;
			_product = workspaceOrMaker.product;
		}
		this.workspace = _workspace;
		this.product = _product;
	}

	// Getting paths

	get frameworkName() { return this.product.name; }
	get frameworkInstallFolder() { return this.product.installPath + "/"; }
	get frameworkPublicInstallFolder() { return this.product.publicInstallPath + "/"; }

	// Configuring workspace tasks

	configureWorkspaceToMake() { }
};
