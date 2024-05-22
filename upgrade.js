export const upgradeScripts = [
	function v1_0_1(_context, props) {
		const result = {
			updatedConfig: null,
			updatedActions: [],
			updatedFeedbacks: [],
		}
		if (props.config !== null) {
			if (props.config.series == undefined || props.config.series == null || props.config.verbose == undefined) {
				props.config.series = '1000'
				props.config.verbose = false
				result.updatedConfig = props.config
				console.log('Config updated')
			}	
		}
		return result
	},
]
