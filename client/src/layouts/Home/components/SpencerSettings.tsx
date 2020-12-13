import React from "react";
import {Button, Checkbox, Dimmer} from "semantic-ui-react";
import {ModalBase} from "../../../components/Modal/Common";
import eye from "../../../assets/eye.svg"
import eyegrey from "../../../assets/eyegrey.svg"
import reload from "../../../assets/reload.svg"
import reloadgrey from "../../../assets/reloadgrey.svg"
import {AllElectron, IpcRenderer, IpcRendererEvent} from "electron";
import styled from 'styled-components';
import {SpencerPrivacy} from "./SpencerPrivacy";


const electron: AllElectron = (window as any).require('electron');
const ipcRenderer: IpcRenderer = electron.ipcRenderer;

const SpinButton = styled.img`
	@keyframes spin {
		from {transform:rotate(0deg);}
		to {transform:rotate(360deg);}
	}
	
	&.spin {
		animation: spin 3s linear infinite
	}
`;

export interface SpencerSettingsProps {
    open: boolean;
    closeCallback: () => void;
}


interface SpencerSettingsState {
    saving: boolean;
    fahrenheit: boolean;
    ssid: string,
    password: string,
    showWifiPass: boolean,
    wifiList: string[],
	connected: boolean,
	scanning: boolean,
	privacyOpen: boolean,
	privacyAccepted: boolean
}

export class SpencerSettings extends React.Component<SpencerSettingsProps, SpencerSettingsState>{

	private getInterval: number | undefined;

    public constructor(props: SpencerSettingsProps){
        super(props);

        this.state ={
            saving: false,
            ssid: "",
            password: "",
            fahrenheit: false,
            showWifiPass: false,
            wifiList: [],
			connected: false,
			scanning: false,
			privacyOpen: false,
			privacyAccepted: false
        }

        ipcRenderer.on("SpencerScan", (event: IpcRendererEvent, args) => {
			if(args.error && args.error === "nocon"){
				this.clear();
				this.startCheck();
				return;
			}

            this.setState({ wifiList: args.networks || [], connected: true, scanning: false })
        });

        ipcRenderer.on("SpencerGet", (event: IpcRendererEvent, args) => {
        	if(args.error && args.error === "nocon"){
        		this.clear();
        		this.startCheck();
        		return;
			}

        	if(this.getInterval !== undefined){
        		clearInterval(this.getInterval);
        		this.getInterval = undefined;
			}

        	const { ssid, password, fahrenheit } = args.settings;
            this.setState({ ssid, password, fahrenheit: fahrenheit == 1, connected: true });
            this.scanNetworks();
        });

		ipcRenderer.on("SpencerSet", (event: IpcRendererEvent, args) => {
			if(args.error && args.error === "nocon"){
				this.clear();
				this.startCheck();
				return;
			}

			this.clear();
			this.props.closeCallback();
		});
    }

    private startCheck(){
    	if(this.getInterval !== undefined) return;

    	this.getInterval = setInterval(() => {
    		if(this.state.connected) return;

    		ipcRenderer.send("SpencerGet");
		}, 2000);
	}

    private clear(){
    	this.setState({
			connected: false,
			wifiList: [],
			fahrenheit: false,
			ssid: "",
			password: "",
			scanning: false,
			showWifiPass: false,
			saving: false
		});
	}

    componentDidUpdate(prevProps: Readonly<SpencerSettingsProps>, prevState: Readonly<SpencerSettingsState>, snapshot?: any){
    	if(this.props.open && !prevProps.open){
    		this.clear();
    		ipcRenderer.send("SpencerGet");
		}
	}

	public saveSettings(){
    	if(this.state.saving || !this.state.connected) return;

		this.setState({ saving: true });

        const { ssid, password, fahrenheit } = this.state;

        ipcRenderer.send("SpencerSet", {
            settings: {
                ssid,
                password,
                fahrenheit: fahrenheit ? 1 : 0
            }
        });
    }

    private scanNetworks(){
    	if(!this.state.connected || this.state.scanning) return;
    	this.setState({ scanning: true });
    	ipcRenderer.send("SpencerScan");
	}

    public render(){
        const { open, closeCallback } = this.props;
        const { fahrenheit, connected, scanning, saving, ssid, privacyOpen, privacyAccepted } = this.state;

        let wifiList = this.state.wifiList;
		if(ssid && ssid !== "" && ssid !== "SpencerFoo" && wifiList.indexOf(ssid) === -1){
			wifiList.unshift(ssid);
		}

		let password = this.state.password;
		if(password == "SpencerFoo"){
			password = "";
		}

        return <div>
			<Dimmer active={open}>
				<ModalBase className={"medium"}>
					<div className="title" style={{ position: "relative", fontSize: 26, top: 0, textAlign: "center", marginBottom: 20, lineHeight: 1.2 }}>Spencer settings</div>

					{ !connected && <p style={{ marginBottom: 20, fontSize: 18, lineHeight: 1.2 }}>Connect Spencer to your PC and tell him to <i>enter configuration mode</i>.</p> }

					<p style={{ marginBottom: 15, fontSize: 18, fontWeight: "bold", marginTop: 15 }}>Temperature:</p>
					<div style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
						<Button primary inverted={fahrenheit} onClick={() => this.setState({fahrenheit: false})} style={{margin: "0 15px"}} disabled={!connected}>Celsius</Button>
						<Button primary inverted={!fahrenheit} onClick={() => this.setState({fahrenheit: true})} style={{margin: "0 15px"}} disabled={!connected}>Fahrenheit</Button>
					</div>

					<div style={{marginTop: 25, marginBottom: 25, maxWidth: 350, marginLeft:"auto", marginRight: "auto"}}>
						<div style={{ display: "flex", alignItems: "center", marginBottom: 30 }}>
							<select onChange={e => { this.setState({ ssid: e.target.value }) }}
									style={{width: 275, lineHeight: 10, marginRight: 30}}
									disabled={!connected}>
								{ wifiList.map((network) =>
									<option value={network} key={network} selected={ ssid === network }>{network}</option>
								) }
							</select>

							<a onClick={() => this.scanNetworks() } style={{
								width: "24px",
								height: "24px",
								float: "right",
								display: "flex",
								alignItems: "center",
								cursor: connected ? "pointer" : "default"
							}}>

								<SpinButton className={ scanning ? "spin" : undefined } src={connected ? reload : reloadgrey}/>

							</a>
						</div>

						<div style={{ display: "flex", alignItems: "center", marginBottom: 30 }} >
							<input
							style={{ width:275, marginRight: 30}}
							placeholder="Password"
							type={this.state.showWifiPass ? "text" : "password"}
							id="wifi-password"
							disabled={!connected}
							value={password}
							onChange={e => { this.setState({ password: e.target.value }); }}/>

							<a onClick={() => this.setState({showWifiPass: !this.state.showWifiPass})} style={{
								width: "30px",
								height: "30px",
								float: "right",
								display: "flex",
								alignItems: "center",
								cursor: "pointer"
							}}>

								<img src={this.state.showWifiPass ? eye : eyegrey} />

							</a>
						</div>
					</div>

					<p style={{fontSize: 14, lineHeight: "20px", cursor: "pointer"}}><Checkbox checked={ privacyAccepted } onChange={(e, checked) => { this.setState({ privacyAccepted: checked.checked || false }) }} style={{marginRight: 10, position: "relative", top: 3}} /><span onClick={ () => this.setState({ privacyAccepted: !privacyAccepted }) }>I have read and I accept Spencer's</span> <a onClick={() => this.setState({ privacyOpen: true })}>privacy policy</a></p>

					<div style={{marginTop: 25}}>
						<Button primary color={"blue"} disabled={ !connected || saving || !privacyAccepted } onClick={() => this.saveSettings()}>Save and close</Button>
						<Button secondary onClick={() => { this.clear(); closeCallback(); }}>Cancel changes</Button>
					</div>
				</ModalBase>
			</Dimmer>
			<SpencerPrivacy open={privacyOpen} closeCallback={() => this.setState({ privacyOpen: false }) } />
		</div>
    }
}