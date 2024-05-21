export const upgradeScripts = [
	function v1_1_0(context, props) {
		const result = {
			updatedConfig: null,
			updatedActions: [],
			updatedFeedbacks: [],
		}
		if (props.config !== null) {
			let config = props.config
			if (config.series === undefined || config.series === null) {
				config.series = '1000'
				result.updatedConfig = config
			}
			if (config.verbose === undefined || config.verbose === null) {
				config.verbose = false
				result.updatedConfig = config
			}	
		}
		return result
	},


]
