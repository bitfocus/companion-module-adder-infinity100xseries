const { Regex } = require('@companion-module/base')

export const configFields = [
	{
		type: 'static-text',
		id: 'info',
		width: 12,
		label: 'Information',
		value: 'This module controls Adder Infinity 100x Series and 2020 Series receivers. The tested firmware is 5.1',
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
		regex: Regex.HOSTNAME,
	},
	{
		type: 'dropdown',
		id: 'series',
		label: 'Adder Reciever Series',
		width: 6,
		default: '1000',
		choices: [
			{ id: '1000', label: '1000 Series' },
			{ id: '2020', label: '2020 Series' },
		],
	},
	{
		type: 'checkbox',
		id: 'verbose',
		label: 'Verbose Logs',
		width: 6,
		default: false,
		tooltip: 'Verbose logs written to console',
	},
]
