
"use strict";

const IncludesCopier = require("./includes-copier");
const Maker = require("./maker");
const ResourcesCopier = require("./resources-copier");
const SassCompiler = require("./sass-compiler");


module.exports = class FrameworkMaker extends Maker {

	constructor(workspace, product) {
		super(workspace, product);
	}

	// Configuring workspace tasks

	get makeTaskName() { return "make_" + this.frameworkName; }

	configureWorkspaceToMake() {
		const sassCompiler = new SassCompiler(this);
		sassCompiler.configureWorkspaceToMake();
		const resourcesCopier = new ResourcesCopier(this);
		resourcesCopier.configureWorkspaceToMake();
		const includesCopier = new IncludesCopier(this);
		includesCopier.configureWorkspaceToMake();
		this.workspace.addCompoundTask(this.makeTaskName, [
			sassCompiler.makeTaskName,
			resourcesCopier.makeTaskName,
			includesCopier.makeTaskName
		]);
	}
};
