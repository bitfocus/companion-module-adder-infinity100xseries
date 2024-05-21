export const upgradeScripts = [
	function v1_1_0(context, props) {
		const result = {
			updatedConfig: null,
			updatedActions: [],
			updatedFeedbacks: [],
		}
		if (props.config) {
			if (props.config.series == undefined || props.config.series == null) {
				props.config.series = '1000'
				props.config.verbose = false
				result.updatedConfig = props.config
				console.log('Config updated')
			}	
		}
		return result
	},
]
