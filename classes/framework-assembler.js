
"use strict";

const IncludesCopier = require("./includes-copier");
const MakeOperation = require("./make-operation");
const ResourcesCopier = require("./resources-copier");
const SassCompiler = require("./sass-compiler");


module.exports = class FrameworkAssembler extends MakeOperation {

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
		this.workspace.defineTaskWithNameAndSubtasks(this.makeTaskName, [
			sassCompiler.makeTaskName,
			resourcesCopier.makeTaskName,
			includesCopier.makeTaskName
		]);
	}
};
