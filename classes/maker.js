
"use strict";


module.exports = class Maker {

	constructor(workspaceOrOther, product = null) {
		let _workspace = null;
		let _product = null;
		if (product) {
			_workspace = workspaceOrOther;
			_product = product;
		} else {
			_workspace = workspaceOrOther.workspace;
			_product = workspaceOrOther.product;
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
