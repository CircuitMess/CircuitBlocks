import React from "react";
import {Button, Dimmer, Dropdown, Input, Modal, Select} from "semantic-ui-react";
import styled from "styled-components";
import { library } from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons';
import {DropdownItemProps} from "semantic-ui-react/dist/commonjs/modules/Dropdown/DropdownItem";
import {Sprite} from "./SpriteEditor/Sprite";
import {ModalBase} from "../../../components/Modal/Common";
import {isNewer} from "../../../../../core/compiler/util";
import SpriteDrawer from "./SpriteEditor/SpriteDrawer";

interface GameExportProps {
	close: () => void;
	save: (name: string, sprite?: Sprite) => void;
	sprites: Sprite[]
}

interface GameExportState {
	name: string;
	icon: number;
	sprite?: Sprite;
}

export default class GameExport extends React.Component<GameExportProps, GameExportState> {

	public static readonly DefaultIconNames = ["adventure", "alien", "castle", "dino", "football", "motors", "robot", "space"];

	constructor(props: GameExportProps){
		super(props);
		this.state = {
			name: "Game",
			icon: -1
		};

		library.add(fas);
	}

	private setName(name: string){
		if(!name.match(/^[a-zA-Z0-9 _-]+$/)) return;
		this.setState({ name });
	}

	private setSprite(icon: number){
		if(isNaN(icon)) return;
		let sprite: Sprite | undefined;

		if(icon >= 0 && icon < this.props.sprites.length && this.props.sprites[icon] != undefined){
			sprite = this.props.sprites[icon].getCropped(64, 64);
			this.setState({ icon, sprite })
		}else if(icon >= 0 && icon >= this.props.sprites.length){
			icon -= this.props.sprites.length;
			sprite = new Sprite(GameExport.DefaultIconNames[icon]);

			sprite.fromFile(require(`../../../assets/gameIcons/${GameExport.DefaultIconNames[icon]}.png`)).then(() => this.setState({ icon, sprite }));
		}else{
			this.setState({ icon, sprite })
		}
	}

	public render(){
		const { close, sprites, save } = this.props;
		const { name, icon, sprite } = this.state;

		const icons: DropdownItemProps[] = [];
		icons.push({ text: "No icon", value: -1 });
		sprites.forEach((sprite, i) => icons.push({ text: sprite.name, value: i }));
		GameExport.DefaultIconNames.forEach((icon, i) => icons.push({ text: icon, value: sprites.length + i }));

		return <div>
			<Dimmer active={true}>
				<ModalBase className={"small"} style={{ maxWidth: 300, overflowY: "visible" }}>
					<Elements>
						<div>Name <Input value={name} onChange={e => this.setName(e.target.value)}></Input></div>
						<div>Icon <Select defaultValue={-1} options={icons} onChange={(e, obj) => this.setSprite(Number(obj.value))}/></div>
						{ sprite && <div><SpriteDrawer sprite={sprite} width={252} /></div> }
					</Elements>
					<div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
						<Button onClick={() => close()}>Cancel</Button>
						<Button primary={true} onClick={() => save(name, sprite)}>Export</Button>
					</div>
				</ModalBase>
			</Dimmer>
		</div>;
	}
}

const Elements = styled.div`
	> div { margin-bottom: 10px; }
	canvas { border: 1px solid #000; }
	div.input, div.dropdown { margin-left: 16px; }
`;