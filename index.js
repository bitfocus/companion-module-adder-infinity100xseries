import { InstanceBase, runEntrypoint, InstanceStatus } from '@companion-module/base'
import got from 'got'
import { configFields } from './config.js'
import { upgradeScripts } from './upgrade.js'
import { FIELDS } from './fields.js'
import PQueue from 'p-queue'

class AdderInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
		this.queue = new PQueue({ concurrency: 1, interval: 50, intervalCap: 1 })
	}

	configUpdated(config) {
		this.config = config
		this.queue.clear()
		this.updateStatus(InstanceStatus.Ok)

		this.initActions()
		this.initFeedbacks()
	}

	init(config) {
		
		this.config = config

		this.updateStatus(InstanceStatus.Ok)
		this.initActions()
		this.initFeedbacks()
	}

	// Return config fields for web config
	getConfigFields() {
		return configFields
	}

	// When module gets deleted
	async destroy() {
		this.queue.clear()
		// Stop any running feedback timers
		/* for (const timer of Object.values(this.feedbackTimers)) {
			clearInterval(timer)
		} */
	}

	initActions() {
		let actionDefs = {}
		switch (this.config.series) {
			case '2020':
				actionDefs = {
					setTransmitterIP: {
						name: 'Set TransmitterIP',
						options: [
							FIELDS.TransmitterIP1,
							FIELDS.TransmitterIP2,
							FIELDS.TransmitterVideoNumber,
							FIELDS.TransmitterVideo1Number,
						],
						callback: async (action, context) => {
							const ip1 = await context.parseVariablesInString(action.options.TransmitterIP1)
							const ip2 = await context.parseVariablesInString(action.options.TransmitterIP2)

							this.log(
								'info',
								`Transmitter IPs: ` +
									ip1 +
									` ` +
									ip2 +
									` ` +
									action.options.TransmitterVideoNumber +
									` ` +
									action.options.TransmitterVideo1Number,
							)
							await this.funcSetTransmitterIP(
								ip1,
								ip2,
								action.options.TransmitterVideoNumber,
								action.options.TransmitterVideo1Number,
							)
						},
					},
				}
				break
			case '1000':
			default:
				actionDefs = {
					setTransmitterIP: {
						name: 'Set TransmitterIP',
						options: [FIELDS.TransmitterIP1, FIELDS.TransmitterIP2, FIELDS.TransmitterVideoNumber],
						callback: async (action, context) => {
							const ip1 = await context.parseVariablesInString(action.options.TransmitterIP1)
							const ip2 = await context.parseVariablesInString(action.options.TransmitterIP2)
							this.log('info', `Transmitter IPs: ` + ip1 + ` ` + ip2 + ` ` + action.options.TransmitterVideoNumber)
							await this.funcSetTransmitterIP(ip1, ip2, action.options.TransmitterVideoNumber)
						},
					},
				}
				break
		}

		this.setActionDefinitions(actionDefs)
	}

	async funcSetTransmitterIP(TXIP1, TXIP2, VideoNum, Video1Num) {
		let textbody
		switch (this.config.series) {
			case '2020':
				textbody =
					'server_unit_ip1=' +
					TXIP1 +
					'&server_unit_ip2=' +
					TXIP2 +
					'' +
					'&server_video_ip1=' +
					TXIP1 +
					'&server_video_ip2=' +
					TXIP2 +
					'&server_video_num=' +
					VideoNum +
					'' +
					'&server_video1_ip1=' +
					TXIP1 +
					'&server_video1_ip2=' +
					TXIP2 +
					'&server_video1_num=' +
					Video1Num +
					'' +
					'&server_audio_ip1=' +
					TXIP1 +
					'&server_audio_ip2=' +
					TXIP2 +
					'' +
					'&server_usb_ip1=' +
					TXIP1 +
					'&server_usb_ip2=' +
					TXIP2 +
					'' +
					'&server_serial_ip1=' +
					TXIP1 +
					'&server_serial_ip2=' +
					TXIP2 +
					''
				break
			case '1000':
			default:
				textbody =
					'server_unit_ip1=' +
					TXIP1 +
					'&server_unit_ip2=' +
					TXIP2 +
					'' +
					'&server_video_ip1=' +
					TXIP1 +
					'&server_video_ip2=' +
					TXIP2 +
					'&server_video_num=' +
					VideoNum +
					'' +
					'&server_audio_ip1=' +
					TXIP1 +
					'&server_audio_ip2=' +
					TXIP2 +
					'' +
					'&server_usb_ip1=' +
					TXIP1 +
					'&server_usb_ip2=' +
					TXIP2 +
					'' +
					'&server_serial_ip1=' +
					TXIP1 +
					'&server_serial_ip2=' +
					TXIP2 +
					''
				break
		}
		await this.queue.add(async () => {
			try {
				const response = await got.post('http://' + this.config.ReceiverIP + '/cgi-bin/rxunitconfig', {
					method: 'POST',
					headers: { 'content-type': 'application/x-www-form-urlencoded' },
					body: textbody,
				})
				this.updateStatus(InstanceStatus.Ok)
				this.log('info', `Set Transmitter IP successful`)
				if (this.config.verbose) {
					console.log(response)
				}
				return true
			} catch (e) {
				this.log('error', `Set Transmitter IP failed (${e.message ?? ''})`)
				this.updateStatus(InstanceStatus.ConnectionFailure, e.code ?? '')
				if (this.config.verbose) {
					console.log(e)
				}
				return undefined
			}
		})
	}

	//feedbackTimers = {}

	initFeedbacks() {}
}

runEntrypoint(AdderInstance, upgradeScripts)
