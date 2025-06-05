import { Regex } from '@companion-module/base'

export const FIELDS = {
	TransmitterIP1: {
		type: 'textinput',
		label: 'Transmitter IP 1',
		id: 'TransmitterIP1',
		default: '192.168.235.10',
		useVariables: { local: true },
		regex: Regex.SOMETHING,
	},
	TransmitterIP2: {
		type: 'textinput',
		label: 'Transmitter IP 2',
		id: 'TransmitterIP2',
		default: '0.0.0.0',
		useVariables: { local: true },
		regex: Regex.SOMETHING,
	},
	TransmitterVideoNumber: {
		type: 'number',
		label: 'Transmitter Video Number',
		id: 'TransmitterVideoNumber',
		default: 0,
		min: 0,
		max: 4,
		step: 1,
		range: true,
	},
	TransmitterVideo1Number: {
		type: 'number',
		label: 'Transmitter Video 1 Number',
		id: 'TransmitterVideo1Number',
		default: 1,
		min: 0,
		max: 4,
		step: 1,
		range: true,
	},
}
