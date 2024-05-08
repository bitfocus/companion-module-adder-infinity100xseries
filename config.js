export const configFields = [
	{
		type: 'static-text',
		id: 'info',
		width: 12,
		label: 'Information',
		value:
			"This module controls Adder Infinity 100x Series receivers. The tested firmware is 5.1",
	},
	
	{
		type: 'static-text',
		id: 'ReceiverIPInfo',
		width: 12,
		value: `
					<p>
						Use the receiver IP or hostname without leading protocol (like http://) and '/' at the end.
					</p>
					<p>Example: 192.168.235.10</p>
				`,
	},
	{
		type: 'textinput',
		id: 'ReceiverIP',
		label: 'Adder Receiver IP or hostname',
		width: 12,
		default: '',
	},
	
	
]
