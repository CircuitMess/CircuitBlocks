import React from "react";
import {Button, Dimmer, Dropdown, Input, Modal, Select} from "semantic-ui-react";
import styled from "styled-components";
import {ChromePicker, CirclePicker, CompactPicker, GithubPicker, SketchPicker} from 'react-color';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import {IconName} from "@fortawesome/fontawesome-common-types";
import {fas} from '@fortawesome/free-solid-svg-icons';
import {DropdownItemProps} from "semantic-ui-react/dist/commonjs/modules/Dropdown/DropdownItem";
import {Sprite} from "./SpriteEditor/Sprite";
import {ModalBase} from "../../../components/Modal/Common";

interface GameExportProps {
	close: () => void;
	save: () => void;
	sprites: Sprite[]
}

interface GameExportState {
	name: string;
	icon: number;
}

export default class GameExport extends React.Component<GameExportProps, GameExportState> {
	constructor(props: GameExportProps){
		super(props);
		this.state = {
			name: "Game",
			icon: 0
		};

		library.add(fas);
	}

	private setName(name: string){
		if(!name.match(/^[a-zA-Z0-9 _-]+$/)) return;
		this.setState({ name });
	}

	public render(){
		const { close, sprites, save } = this.props;
		const { name, icon } = this.state;

		const icons: DropdownItemProps[] = [];
		icons.push({ text: "No icon", value: -1 });
		sprites.forEach((sprite, i) => icons.push({ text: sprite.name, value: i }));

		return <div>
			<Dimmer active={true}>
				<ModalBase className={"small"} style={{ maxWidth: 300, overflowY: "visible" }}>
					<Elements>
						<div>Name: <Input value={name} onChange={e => this.setName(e.target.value)}></Input></div>
						<div>Icon: <Select defaultValue={-1} options={icons}/></div>
					</Elements>
					<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
						<Button onClick={() => close()}>Cancel</Button>
						<Button primary={true} onClick={() => save()}>Export</Button>
					</div>
				</ModalBase>
			</Dimmer>
		</div>;
	}
}

const Elements = styled.div`
	> div { margin-bottom: 10px; }
`;