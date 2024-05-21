export const upgradeScripts = [
	function v1_1_0(context, props) {
		const result = {
			updatedConfig: null,
			updatedActions: [],
			updatedFeedbacks: [],
		}
		if (props.config !== null) {
			let config = props.config
			if (config.series === undefined) {
				config.port = '1000'
				result.updatedConfig = config
			}
		}
		return result
	},


]
