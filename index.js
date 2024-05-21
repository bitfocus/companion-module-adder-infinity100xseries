import { InstanceBase, runEntrypoint, InstanceStatus } from '@companion-module/base'
import got from 'got'
import { configFields } from './config.js'
import { upgradeScripts } from './upgrade.js'
import { FIELDS } from './fields.js'


class AdderInstance extends InstanceBase {
	configUpdated(config) {
		this.config = config

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
		// Stop any running feedback timers
		for (const timer of Object.values(this.feedbackTimers)) {
			clearInterval(timer)
		}
	}

	initActions() {
		let actionDefs = {}
		switch (this.config.series){
			case '2020':
				actionDefs = {
			
					setTransmitterIP:{
						name: 'Set TransmitterIP',
						options: [FIELDS.TransmitterIP1, FIELDS.TransmitterIP2, FIELDS.TransmitterVideoNumber, FIELDS.TransmitterVideo1Number],
						callback:  (action) => {
							try{
								this.log('info', `Transmitter IPs: `+action.options.TransmitterIP1 + ` `+ action.options.TransmitterIP2 + ` `+ action.options.TransmitterVideoNumber + ` `+ action.options.TransmitterVideo1Number)
								this.funcSetTransmitterIP(action.options.TransmitterIP1, action.options.TransmitterIP2, action.options.TransmitterVideoNumber, action.options.TransmitterVideo1Number);
								this.log('info', `Set Transmitter IP sucessfull`)
							}catch (e){
								this.log('error', `Set Transmitter IP failed (${e.message})`)
								this.updateStatus(InstanceStatus.UnknownError, e.code)
							}
		
						}
					},
					
				}
				break
			case '1000':
			default:
				actionDefs = {
			
					setTransmitterIP:{
						name: 'Set TransmitterIP',
						options: [FIELDS.TransmitterIP1, FIELDS.TransmitterIP2, FIELDS.TransmitterVideoNumber],
						callback:  (action) => {
							try{
								this.log('info', `Transmitter IPs: `+action.options.TransmitterIP1 + ` `+ action.options.TransmitterIP2 + ` `+ action.options.TransmitterVideoNumber)
								this.funcSetTransmitterIP(action.options.TransmitterIP1, action.options.TransmitterIP2, action.options.TransmitterVideoNumber);
								this.log('info', `Set Transmitter IP sucessfull`)
							}catch (e){
								this.log('error', `Set Transmitter IP failed (${e.message})`)
								this.updateStatus(InstanceStatus.UnknownError, e.code)
							}
		
						}
					},
					
				}
				break
		}

		this.setActionDefinitions(actionDefs)
	}

	funcSetTransmitterIP(TXIP1, TXIP2, VideoNum, Video1Num){
		let textbody
		if (this.config.series === '2020') {
			textbody = "server_unit_ip1="+TXIP1+"&server_unit_ip2="+TXIP2+""
			+"&server_video_ip1="+TXIP1+"&server_video_ip2="+TXIP2+"&server_video_num="+VideoNum+""
			+"&server_video1_ip1="+TXIP1+"&server_video1_ip2="+TXIP2+"&server_video1_num="+Video1Num+""
			+"&server_audio_ip1="+TXIP1+"&server_audio_ip2="+TXIP2+""
			+"&server_usb_ip1="+TXIP1+"&server_usb_ip2="+TXIP2+""
			+"&server_serial_ip1="+TXIP1+"&server_serial_ip2="+TXIP2+""; 
		} else  {
			textbody = "server_unit_ip1="+TXIP1+"&server_unit_ip2="+TXIP2+""
			+"&server_video_ip1="+TXIP1+"&server_video_ip2="+TXIP2+"&server_video_num="+VideoNum+""
			+"&server_audio_ip1="+TXIP1+"&server_audio_ip2="+TXIP2+""
			+"&server_usb_ip1="+TXIP1+"&server_usb_ip2="+TXIP2+""
			+"&server_serial_ip1="+TXIP1+"&server_serial_ip2="+TXIP2+""; 
		}
		try { 
			got.post("http://"+this.config.ReceiverIP+"/cgi-bin/rxunitconfig", {method: 'POST', headers: {'content-type': 'application/x-www-form-urlencoded'},	body: textbody});
			this.updateStatus(InstanceStatus.Ok)
		} catch (e) {
			this.log('error', `Set Transmitter IP failed (${e.message})`)
			this.updateStatus(InstanceStatus.UnknownError, e.code)
		}
		
		
		
	}

	//feedbackTimers = {}

	initFeedbacks() {
	}
}

runEntrypoint(AdderInstance, upgradeScripts)
