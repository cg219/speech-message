var path = require("path");

module.exports = function(grunty){

	var libraryScripts = [];
	var sourceScripts = [];
	var styles = [];

	grunty.initConfig({
		pkg: grunty.file.readJSON("package.json"),
		watch: {
			options: {
				spawn: false
			}
		},
		focus: {
			all: {
				// include: ["scripts", "pages", "css"]
			}
		}

	})

	grunty.loadNpmTasks("grunt-contrib-watch");
	grunty.loadNpmTasks("grunt-focus");

	grunty.registerTask("default", ["focus:all"]);
}