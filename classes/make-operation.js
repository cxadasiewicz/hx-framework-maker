
"use strict";


module.exports = class MakeOperation {

	constructor(workspaceOrOperation, product = null) {
		let _workspace = null;
		let _product = null;
		if (product) {
			_workspace = workspaceOrOperation;
			_product = product;
		} else {
			_workspace = workspaceOrOperation.workspace;
			_product = workspaceOrOperation.product;
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
