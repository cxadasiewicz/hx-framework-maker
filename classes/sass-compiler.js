
"use strict";

const FilesOperation = require("./files-operation");
const ResourceIdentification = require("./resource-identification");


module.exports = class SassCompiler extends FilesOperation {

	constructor(operation) {
		super(operation, ResourceIdentification.cssFolder);
	}

	// Getting paths

	get rawInstallPath() { return this.sourcesInstallFolder + ResourceIdentification.cssRawPath; }
	get finalInstallPath() { return this.publicInstallFolder + this.frameworkName + ResourceIdentification.cssFinalExtension; }
	get finalMinifiedInstallPath() { return this.publicInstallFolder + this.frameworkName + ResourceIdentification.cssFinalMinifiedExtension; }

	// Configuring workspace tasks

	get makeTaskName() { return "make_" + this.frameworkName + "_css"; }

	get processTaskName() { return "process_" + this.frameworkName + "_css"; }
	get shellScriptToProcess() {
		return ["sass" + " " + this.rawInstallPath + " " + this.finalInstallPath];
	}

	get postprocessTaskName() { return "postprocess_" + this.frameworkName + "_css"; }
	get shellScriptToPostprocess() {
		return ["postcss" + " " + this.finalInstallPath + " --replace --use autoprefixer"];
	}

	get optimizeTaskName() { return "optimize_" + this.frameworkName + "_css"; }
	get shellScriptToOptimize() {
		return ["cleancss" + " " + this.finalInstallPath + " --output " + this.finalMinifiedInstallPath];
	}

	configureWorkspaceToMake() {
		const hasRawData = (this.workspace.readJSONFileAt(this.rawInstallPath) != null);
		this.workspace.defineTaskWithNameAndScript(this.processTaskName, (hasRawData ? this.shellScriptToProcess : []));
		this.workspace.defineTaskWithNameAndScript(this.postprocessTaskName, (hasRawData ? this.shellScriptToPostprocess : []));
		this.workspace.defineTaskWithNameAndScript(this.optimizeTaskName, (hasRawData ? this.shellScriptToOptimize : []));
		this.workspace.defineTaskWithNameAndSubtasks(this.makeTaskName, [
			this.processTaskName,
			this.postprocessTaskName,
			this.optimizeTaskName
		]);
	}
};
