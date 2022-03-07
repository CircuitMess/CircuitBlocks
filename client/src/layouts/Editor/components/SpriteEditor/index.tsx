import React, {FunctionComponent, SVGProps} from "react";
import {Button, Dimmer, Input, Modal} from "semantic-ui-react";
import {ModalBase} from "../../../../components/Modal/Common";
import styled from "styled-components";
import {Pixel, PixelsEqual, Sprite} from "./Sprite";
import SpriteDrawer from "./SpriteDrawer";
import {ChromePicker, CirclePicker, CompactPicker, GithubPicker, SketchPicker} from 'react-color';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import {IconName} from "@fortawesome/fontawesome-common-types";
import {fas} from '@fortawesome/free-solid-svg-icons';
import Editor from '../..';
import Blockly from "../../../../blockly/blockly";
import ReactTooltip from "react-tooltip";

import { ReactComponent as BrushSVG } from "../../../../assets/SpriteToolbox/brush.svg";
import { ReactComponent as EraserSVG } from "../../../../assets/SpriteToolbox/eraser.svg";
import { ReactComponent as DropperSVG } from "../../../../assets/SpriteToolbox/dropper.svg";
import { ReactComponent as BucketSVG } from "../../../../assets/SpriteToolbox/bucket.svg";

interface SpriteEditorProps {
	close: () => void;
	sprites: Sprite[]
}

interface SpriteEditorState {
	selected: number;
	colorRGB: Pixel;
	colorPicker: boolean;
	selectedTool: number;
	pickerOpen: boolean;
}

export default class SpriteEditor extends React.Component<SpriteEditorProps, SpriteEditorState> {
	private color = React.createRef<HTMLDivElement>();

	private readonly tools: { name: string, icon: FunctionComponent<SVGProps<SVGSVGElement>> }[] = [
		{ name: "Paint brush", icon: BrushSVG },
		{ name: "Eraser", icon: EraserSVG },
		{ name: "Paint bucket", icon: BucketSVG },
		{ name: "Color dropper", icon: DropperSVG }
	]

	constructor(props: SpriteEditorProps){
		super(props);
		this.state = {
			selected: props.sprites.length == 0 ? -1 : 0,
			colorRGB: { r: 170, g: 0, b: 0, a: true },
			colorPicker: false,
			selectedTool: 0,
			pickerOpen: false
		};

		library.add(fas);
	}

	private setWidth(width: number){
		const sprite = this.props.sprites[this.state.selected];
		sprite.updateSize(width, sprite.height);
		this.clearPopups();
		this.forceUpdate();
	}

	private setHeight(height: number){
		const sprite = this.props.sprites[this.state.selected];
		sprite.updateSize(sprite.width, height);
		this.clearPopups();
		this.forceUpdate();
	}

	private setName(name: string){
		if(!name.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)) return;
		if(Editor.DefaultSpriteNames.includes(name)) return;

		const sprite = this.props.sprites[this.state.selected];
		sprite.name = name;
		this.clearPopups();
		this.forceUpdate();
	}

	private newSprite(defaultSprite?: string){
		const sprites = this.props.sprites;

		let num = 0;
		while(true){
			let used = false;
			sprites.forEach(sprite => used = used || (sprite.name == "sprite" + num));
			if(!used) break;
			num++;
		}

		if(defaultSprite){
			const img = new Image();
			img.onload = () => {
				const canvas = document.createElement("canvas");
				const ctx = canvas.getContext("2d");
				if(!ctx) return;
				ctx.drawImage(img, 0, 0);
				const iData = ctx.getImageData(0, 0, img.width, img.height);
				const data = iData.data;

				const sprite = new Sprite("sprite" + num, img.width, img.height);
				for(let x = 0; x < sprite.width; x++){
					for(let y = 0; y < sprite.height; y++){
						const i = y * sprite.width + x;
						sprite.setPixel(x, y, { r: data[i*4], g: data[i*4 + 1], b: data[i*4 + 2], a: data[i*4 + 3] == 255 });
					}
				}

				sprites.push(sprite);
				this.openSprite(sprites.length-1);
			}

			img.src = require(`../../../../assets/sprites/${defaultSprite}.png`);
		}else{
			sprites.push(new Sprite("sprite" + num, 20, 20));
			this.openSprite(sprites.length-1);
		}
	}

	private openSprite(i: number){
		this.setState({ selected: i });
		this.clearPopups();
	}

	private deleteSprite(i: number){
		const { sprites } = this.props;
		if(i >= sprites.length || i < 0) return;

		const { selected } = this.state;

		sprites.splice(i, 1);

		if(sprites.length == 0){
			this.openSprite(-1);
		}else if(selected == 0){
			this.openSprite(0);
		}else{
			this.openSprite(selected - 1);
		}

		this.clearPopups();
	}

	private canvasAction(x: number, y: number){
		const tool = this.state.selectedTool;
		if(tool == 0){
			this.drawPixel(x, y);
		}else if(tool == 1){
			this.erasePixel(x, y);
		}else if(tool == 2){
			this.paintBucket(x, y);
		}else if(tool == 3){
			const sprite = this.props.sprites[this.state.selected];
			this.setState({ colorRGB: sprite.getPixel(x, y) });
		}

		this.clearPopups();
	}

	private drawPixel(x: number, y: number){
		if(!this.color.current) return;

		const sprite = this.props.sprites[this.state.selected];

		if(sprite.getPixel(x, y) == this.state.colorRGB) return;

		sprite.setPixel(x, y, this.state.colorRGB);

		this.forceUpdate();
	}

	private erasePixel(x: number, y: number){
		if(!this.color.current) return;

		const sprite = this.props.sprites[this.state.selected];

		if(!sprite.getPixel(x, y).a) return;

		sprite.setPixel(x, y, { r: 0, g: 0, b: 0, a: false });

		this.forceUpdate();
	}

	private paintBucket(x: number, y: number){
		const sprite = this.props.sprites[this.state.selected];
		const startColor = sprite.getPixel(x, y);
		const color = this.state.colorRGB;

		this.floodFill(sprite, startColor, color, x, y);
	}

	private floodFill(sprite: Sprite, startColor: Pixel, color: Pixel, x: number, y: number){
		if(x < 0 || x >= sprite.width || y < 0 || y >= sprite.height) return;

		if(PixelsEqual(sprite.getPixel(x, y), color) || !PixelsEqual(sprite.getPixel(x, y), startColor)) return;

		sprite.setPixel(x, y, color);
		this.floodFill(sprite, startColor, color, x+1, y);
		this.floodFill(sprite, startColor, color, x-1, y);
		this.floodFill(sprite, startColor, color, x, y+1);
		this.floodFill(sprite, startColor, color, x, y-1);
	}

	private pixelToColor(pixel: Pixel){
		return `rgba(${pixel.r}, ${pixel.g}, ${pixel.b}, ${pixel.a ? 255 : 0})`;
	}

	private selectTool(i: number){
		this.setState({selectedTool: i});
		this.clearPopups();
	}

	private clearPopups(){
		this.setState({ colorPicker: false, pickerOpen: false });
	}

	public render(){
		const { close, sprites } = this.props;
		const { selected, colorRGB, colorPicker, selectedTool, pickerOpen } = this.state;
		const sprite = selected == -1 ? null : sprites[selected];
		const color = this.pixelToColor(colorRGB);

		return <div>
			<Dimmer active={true}>
				<ModalBase className={"small"} style={{ width: "auto", minWidth: 510, padding: 0 }}>
					<ReactTooltip id="spriteEditor" place="bottom" type="dark" />
					<Header>
						{ sprite && <div>
							<div className={"size"}>
								<Input type={"number"} value={sprite.width} onChange={e => this.setWidth(parseInt(e.target.value))}></Input>
								<strong>&nbsp; X &nbsp;</strong>
								<Input type={"number"} value={sprite.height} onChange={e => this.setHeight(parseInt(e.target.value))}></Input>
								<span>&nbsp; px</span>
							</div>
							<div className={"name"}>
								<Input value={sprite.name} onChange={e => this.setName(e.target.value)}></Input>
							</div>
						</div> }
					</Header>

					<Main>
						<Toolbox>
							{ this.tools.map((tool, i) => <div data-tip={tool.name} data-for="spriteEditor" data-iscapture="true" className={`tool ${selectedTool == i ? "selected" : ""}`} onClick={() => this.selectTool(i)}>
								{ React.createElement(tool.icon, { fill: selectedTool == i ? "#fff" : "000" }) }
							</div>) }

							<div className={"tool color"} ref={this.color} data-tip="Color picker" data-for="spriteEditor" data-iscapture="true" onClick={() => this.setState({colorPicker: !colorPicker})}><div style={{background: color}}></div></div>
							{ colorPicker && <div className={"colorPicker"}>
								<ChromePicker disableAlpha={true} color={color} onChangeComplete={(color) => { this.setState({colorRGB: { r: color.rgb.r, g: color.rgb.g, b: color.rgb.b, a: true }}) }} />
							</div> }

							<div className={"tool newSprite"} onClick={() => { this.setState({ pickerOpen: !pickerOpen }); }}>
								<FontAwesomeIcon icon={"plus"} size={"2x"} />
							</div>
						</Toolbox>

						<Content>
							<div className={"canvasContainer"}>
								{ sprite && <SpriteDrawer width={360} sprite={sprite} onAction={(x, y) => this.canvasAction(x, y)} /> }
							</div>

							<Footer>
								<div className={"sprites"}>
									<div className={"container"}>
										{sprites.map((sprite, i) => <div onClick={() => this.openSprite(i)} className={selected == i ? "selected" : undefined}>
											<SpriteDrawer sprite={sprite} width={40} />
										</div>)}
									</div>
								</div>
								<div className={"actions"}>
									<Button onClick={close} color={"blue"}>Close</Button>
									{ selected != -1 && <Button onClick={() => this.deleteSprite(selected)} color={"red"}>Delete</Button> }
								</div>

								{ pickerOpen && <SpritePicker>
									<div>
										<div className={"newSprite"} onClick={() => { this.newSprite(); }}>
											<FontAwesomeIcon icon={"plus"} size={"2x"} />
										</div>
										{ Editor.DefaultSpriteNames.map(sprite => <img src={require(`../../../../assets/sprites/${sprite}.png`)} onClick={() => this.newSprite(sprite)}></img>) }
									</div>
								</SpritePicker> }
							</Footer>
						</Content>
					</Main>
				</ModalBase>
			</Dimmer>
		</div>;
	}
}


const Header = styled.div`
	margin: 30px;
	margin-bottom: 20px;
	height: 35px;
		
	> div {
		display: flex;
		flex-direction: row;
    }
    
    .size {
    	margin-right: 30px;
    	color: #8F8F8F;
    	font-size: 16px;
    
        input {
            width: 80px;
        }
    }
    
    .name {
    	flex-grow: 1;
    	
    	.input { width: 100%; }
    }
`;

const Main = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	
	.canvasContainer {
		margin: 0 30px;
		min-width: 360px;
		min-height: 362px;
		canvas {
			border: 1px solid #000;
			width: 360px;
			background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
			background-size: 20px 20px;
			background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
		}
	}
`;

const Toolbox = styled.div`
	width: 90px;
	padding: 6px;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: flex-begin;
	background: #E2E2E2;
	
	.tool {
		width: 78px;
		height: 78px;
		background: #E2E2E2;
		transition: all 0.3s ease;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;
		margin-bottom: 6px;
		border-radius: 3px;
		
		&:last-child {
			margin-bottom: 0;
		}
		
		&:hover {
			background: #BBBBBB;
		}
		
		&.selected {
			background: #000;
		}
		
		> div {
			width: 100%;
			height: 100%;
		}
	}
	
	.colorPicker {
		position: absolute;
		top: 120px;
	}
`;

const SpritePicker = styled.div`
	position: absolute;
	bottom: 18px;
	left: 100px;
	border-radius: 4px;
	background: #ddd;
	padding: 10px;
	max-width: 75%;
	overflow-y: auto;
	border: 2px solid #C5C5C5;
	display: flex;
	flex-direction: row;
	
	> div {
		display: flex;
		flex-direction: row;
	
		img, div {
			height: 55px;
			width: auto;
			margin-right: 10px;
			image-rendering: pixelated;
			padding: 5px;
			object-fit: contain;
			transition: all 0.3s ease;
			background: #fff;
			border-radius: 3px;
			border: 1px solid #000;
			
			&:hover { background: #eee; }
			
			cursor: pointer;
		}
		
		div.newSprite {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 5px 15px;
		}
	}
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 12px;
  padding-right: 30px;
  width: 0;
  min-width: 100%;
  
  .sprites {
    flex-grow: 1;
    padding: 10px 12px;
    overflow-x: auto;
    background: #E2E2E2;
    
    .container {
    	display: flex;
    	flex-direction: row;
    
		> div {
			border: 1px solid #A2A2A2;
			overflow: hidden;
			box-sizing: border-box;
			width: 52px;
			height: 52px;
			margin-right: 5px;
			cursor: pointer;
			background: #fff;
			border-radius: 3px;
			transition: all 0.3s ease;
			
			display: flex;
			justify-content: center;
			align-items: center;
			flex-shrink: 0;
			
			&:last-child { margin-right: 0; }
			
			canvas { width: 40px; display: block; }
			
			&:hover {
				background: #eee;
			}
			
			&.selected {
				border-width: 2px;
				border-color: #000;
			}
			
			&.newSprite {
				position: relative;
			
				> div {
					position: absolute;
					top: 0;
					right: 0;
					bottom: 0;
					width: 15px;
					display: flex;
					justify-content: center;
					align-items: center;
					background: #ccc;
					
					&:hover {
						background: #efefef;
					}
				}
				
				> svg {
					position: relative;
					right: 7px;
				}
			}
		}
    }
  }
  
	.actions {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		height: 74px;
		align-items: center;
		
		button {
			margin-right: 0;
			margin-left: 12px;
			height: max-content;
		}
	}
`;