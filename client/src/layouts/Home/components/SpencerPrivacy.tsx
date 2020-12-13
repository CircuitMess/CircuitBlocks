import React from "react";
import {Button, Dimmer} from "semantic-ui-react";
import {ModalBase} from "../../../components/Modal/Common";
import styled from 'styled-components';
import {AllElectron} from "electron";

const electron: AllElectron = (window as any).require('electron');
const shell = electron.shell;

const TextContainer = styled.div`
	p, li {
		font-size: 16px;
		line-height: 1.2;
	}
	
	li {
		text-align: left;
		padding-bottom: 10px;
		margin-left: 40px;
	}
	
	h2 {
		font-size: 20px;
	}
	
	h2, p {
		text-align: left;
	}
	
	a {
		cursor: pointer;
	}
`;

export interface SpencerPrivacyProps {
    open: boolean;
    closeCallback: () => void;
}

export class SpencerPrivacy extends React.Component<SpencerPrivacyProps, {}>{

    public constructor(props: SpencerPrivacyProps){
        super(props);

        this.state = {};
    }

    public render(){
		//const { shell } = require("electron");
        const { closeCallback } = this.props;
        const modalOpen = this.props.open;

        return <Dimmer active={modalOpen}>
            <ModalBase className={"large"}>
				<div className="title" style={{ fontSize: 26, top: 0, textAlign: "center", marginBottom: 20, lineHeight: 1.2 }}>CircuitMess Spencer DIY voice assistant privacy policy</div>

				<TextContainer>
					<p><strong>EFFECTIVE DATE: December 12, 2020</strong></p>
					<p>CircuitMess d.o.o. (&ldquo;CircuitMess,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) values your privacy. In this Privacy Policy (&ldquo;Policy&rdquo;), we describe how we collect, use, and disclose information that we obtain about users of CircuitMess Spencer and the related services (the &ldquo;Services&rdquo;).</p>
					<p>By using our software, using a CircuitMess Spencer device, or otherwise using the Services, you agree that your personal information will be handled as described in this Policy.</p>
					<p>Your use of our Services, and any dispute over privacy, is subject to this Policy.</p>
					<p><strong>When you use our Services, including the CircuitMess Spencer voice assistant, your voice and audio commands are transmitted to our servers for processing.</strong></p>
					<h2>1. The Information We Collect About You</h2>
					<p>By using CircuitMess Spencer, you agree that the voice samples sent to our servers will be stored automatically, and may be used to improve the Service and make Spencer better understand your queries.</p>
					<h2>2. Registration and Account Profile</h2>
					<p>To register or manage a CircuitMess Spencer device or otherwise access most of the Services, you do not need to register an account or give us your personal information.</p>
					<h2>3. Voice Commands</h2>
					<p>When you use our Services, your audio commands are transmitted to CircuitMess Spencer&rsquo;s servers for processing as part of the Services. We may also collect other metadata about your audio commands, such as the time of the request, error log files, and IP addresses.</p>
					<p>The voice samples are not stored on our servers at any given moment. The voice samples are buffered, encrypted, de-identified, and sent to a 3rd party voice processing service hosted by Wit.ai, Inc, where they are stored and used to improve the Service.</p>
					<p>We permanently store usage information and statistics tied to IP addresses to prevent misuse and abuse of our Services. </p>
					<p>We do not link any of the requests made by CircuitMess Spencer devices directly to your personal information or identity. Every voice sample sent to the 3rd party voice processing service hosted by Wit.ai, Inc. is de-identified stripped of any information that might link them to individual users.</p>
					<p>We share no private information other than the voice command samples needed for providing CircuitMess Spencer&rsquo;s voice recognition functionalities.Wit.ai, Inc. has, in our opinion, no way of recognizing and connecting the provided voice samples to our users based on the information we provide.</p>
					<p>Find Wit.ai, Inc.&rsquo;s terms of service and privacy policy <a onClick={() => shell.openExternal("https://wit.ai/privacy")}>here</a>.</p>
					<h2>4. How We Use Your Information</h2>
					<p>We use the information you provide us with for the following purposes:</p>
					<ul>
						<li>To provide our Services to you.</li>
						<li>To better understand how users access and use our Services, both on an aggregated and individualized basis, to improve our Services, develop new services and features, and respond to user desires and preferences, and for other research and analytical purposes, including to analyze and understand usage and activity trends.</li>
						<li>To protect our rights and interests, such as to resolve any disputes, enforce our Terms of Use, or to respond to legal processes.</li>
					</ul>
					<h2>5. How We Share Your Information</h2>
					<p>We may share your information as follows:</p>
					<p><strong>3rd party Service providers</strong></p>
					<p>We share recorded voice samples with a 3rd party voice processing service hosted by Wit.ai, Inc., as described in section 3.</p>
					<p><strong>Business Transfers</strong><strong></strong></p>
					<p>If we are acquired by or merged with another company, if any part of our assets are transferred to another company, or as part of a bankruptcy proceeding, we may transfer the information we have collected from you to the other company.</p>
					<p><strong>In Response to Legal Process</strong></p>
					<p>We may disclose the information we collect from you in order to comply with the law, a judicial proceeding, court order, or other legal processes, such as in response to a court order or a subpoena.</p>
					<p><strong>To Protect Us and Others</strong><strong></strong></p>
					<p>We also may disclose the information we collect from you where we believe it is necessary to investigate, prevent, or take action regarding illegal activities, suspected fraud, situations involving potential threats to the safety of any person, violations of our Terms of Use, or this Policy, or as evidence in litigation in which CircuitMess is involved.</p>
					<h2>6. Children Under 13</h2>
					<p>Our Services are not designed for unsupervised children under 13, and children under 13 are not permitted to use our Services without the consent and supervision of an adult.</p>
					<p>If we discover that an unsupervised child under 13 has provided us with any kind of personal information in any way, we will delete such information from our systems.</p>
					<h2>7. Contact Us</h2>
					<p>If you have questions about the privacy aspects of our Services or would like to make a complaint, please contact us at <a onClick={() => shell.openExternal("mailto:contact@circuitmess.com")}>contact@circuitmess.com</a>.</p>
					<h2>8. Changes to this Policy</h2>
					<p>This Policy is current as of the Effective Date set forth above. We may change this Policy from time to time, so please be sure to check back periodically. We will post any changes to this Policy on our Site. If we make any changes to this Policy that materially affect our practices with regard to the personal information we have previously collected from you, we will endeavor to provide you with notice in advance of such change by highlighting the change on our Site, within the Services, or via email notice.</p>
				</TextContainer>

                <div style={{marginTop: 25}}>
                    <Button primary color={"blue"} onClick={() => { closeCallback(); }}>Close</Button>
                </div>

            </ModalBase>
        </Dimmer>
    }
}