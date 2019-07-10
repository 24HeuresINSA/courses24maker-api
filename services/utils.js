function modelToJSON (model) {
	return JSON.parse(JSON.stringify(model));
};

module.exports = {
	modelToJSON: modelToJSON,
};