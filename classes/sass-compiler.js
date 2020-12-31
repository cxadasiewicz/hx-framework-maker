
"use strict";

const FilesMaker = require("./files-maker");
const ResourceIdentification = require("./resource-identification");


module.exports = class SassCompiler extends FilesMaker {

	constructor(maker) {
		super(maker, ResourceIdentification.cssFolder);
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
		const hasRawData = (this.workspace.readJSONAt(this.rawInstallPath) != null);
		this.workspace.addShellTask(this.processTaskName, (hasRawData ? this.shellScriptToProcess : []));
		this.workspace.addShellTask(this.postprocessTaskName, (hasRawData ? this.shellScriptToPostprocess : []));
		this.workspace.addShellTask(this.optimizeTaskName, (hasRawData ? this.shellScriptToOptimize : []));
		this.workspace.addCompoundTask(this.makeTaskName, [
			this.processTaskName,
			this.postprocessTaskName,
			this.optimizeTaskName
		]);
	}
};
