import React from "react";
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

	private readonly tools: { name: string, icon: IconName }[] = [
		{ name: "Paint brush", icon: "paint-brush" },
		{ name: "Eraser", icon: "eraser" },
		{ name: "Color picker", icon: "eye-dropper" },
		{ name: "Paint bucket", icon: "fill-drip" }
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
			const sprite = this.props.sprites[this.state.selected];
			this.setState({ colorRGB: sprite.getPixel(x, y) });
		}else if(tool == 3){
			this.paintBucket(x, y);
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
				<ModalBase className={"small"}>
					<Header>
						{ sprite && <div>
							<div className={"size"}>
								<Input type={"number"} value={sprite.width}
									   onChange={e => this.setWidth(parseInt(e.target.value))}></Input> X <Input type={"number"} value={sprite.height}
									   onChange={e => this.setHeight(parseInt(e.target.value))}></Input> px
							</div>
							<div>
								<Input value={sprite.name} onChange={e => this.setName(e.target.value)}></Input>
							</div>
						</div> }
					</Header>

					<EditorElement>
						<div className={"toolbox"}>
							{ this.tools.map((tool, i) => <div data-tip={tool.name} className={`tool ${selectedTool == i ? "selected" : ""}`} onClick={() => this.selectTool(i)}><FontAwesomeIcon icon={tool.icon}/></div>) }
							<div className={"tool color"} style={{background: color}} ref={this.color} onClick={() => this.setState({colorPicker: !colorPicker})}></div>
							{ colorPicker && <div className={"colorPicker"}>
								<ChromePicker disableAlpha={true} color={color} onChangeComplete={(color) => { this.setState({colorRGB: { r: color.rgb.r, g: color.rgb.g, b: color.rgb.b, a: true }}) }} />
							</div> }
						</div>
						{ sprite && <SpriteDrawer width={360} sprite={sprite} onAction={(x, y) => this.canvasAction(x, y)} /> }
					</EditorElement>

					<Footer>
						<div className={"sprites"}>
							{sprites.map((sprite, i) => <div onClick={() => this.openSprite(i)} className={selected == i ? "selected" : undefined}>
								<SpriteDrawer sprite={sprite} width={40} />
							</div>)}
							<div className={"newSprite"} onClick={() => {
								this.newSprite();
							}}>
								<FontAwesomeIcon icon={"plus"} size={"2x"} />

								<div onClick={e => { e.stopPropagation(); this.setState({ pickerOpen: !pickerOpen }) }}>
									<FontAwesomeIcon icon={"angle-down"} size={"xs"} />
								</div>
							</div>
						</div>
						<div className={"actions"}>
							<Button onClick={close} color={"blue"}>Close</Button>
							{ selected != -1 && <Button onClick={() => this.deleteSprite(selected)} color={"red"}>Delete</Button> }
						</div>

						{ pickerOpen && <SpritePicker>
							{ Editor.DefaultSpriteNames.map(sprite => <img src={require(`../../../../assets/sprites/${sprite}.png`)} onClick={() => this.newSprite(sprite)}></img>) }
						</SpritePicker> }
					</Footer>
				</ModalBase>
			</Dimmer>
		</div>;
	}
}

const EditorElement = styled.div`
	display: flex;
	flex-direction: row;
	
	.toolbox {
		width: 110px;
		padding: 10px;
		background: #eee;
		margin-right: 20px;
		position: relative;
		
		.tool {
			width: 40px;
			height: 40px;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 1px solid #111;
			background: #ddd;
			cursor: pointer;
			margin-right: 10px;
			margin-bottom: 10px;
			float: left;
			
			&.selected {
				box-shadow: 0 0 8px rgba(0, 0, 0, 0.8) inset;
			}
			
			&:nth-child(2n){
				margin-right: 0;
			}
		}
		
		.colorPicker {
			position: absolute;
			top: 120px;
		}
	}
	
	canvas {
		border: 1px solid #000;
		width: 360px;
	 	background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
  		background-size: 20px 20px;
  		background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
	}
`;

const SpritePicker = styled.div`
	position: absolute;
	bottom: 50px;
	left: 20px;
	border-radius: 5px;
	background: #ddd;
	padding: 10px;
	display: flex;
	flex-direction: row;
	max-width: 90%;
	overflow-y: auto;
	
	img {
		height: 55px;
		width: auto;
		margin-right: 10px;
		image-rendering: pixelated;
		padding: 5px;
		object-fit: contain;
		
		&:last-child { margin-right: 0; }
		&:hover { background: #eee; }
		
		cursor: pointer;
	}
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 5px;
  width: 100%;
  position: relative;
  
  .sprites {
    flex-grow: 1;
    flex-direction: row;
    display: flex;
    margin-right: 20px;
    padding: 5px 0;
    overflow-x: auto;
    
    > div {
        border: 1px solid #000;
        overflow: hidden;
        width: 85px;
        height: 70px;
        margin-right: 10px;
        cursor: pointer;
        
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        
        &:last-child { margin-right: 0; }
        
        canvas { width: 40px; }
        
        &:hover {
        	background: #eee;
        }
        
        &.selected {
        	box-shadow: 0 0 8px rgba(0, 0, 0, 0.8) inset;
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
  
  .actions {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      
      button { margin-right: 0; }
  }
`;

const Header = styled.div`
	margin-bottom: 20px;
	height: 35px;
		
	> div {
		display: flex;
		flex-direction: row;
    }
    
    .size {
    	margin-right: 30px;
    
        input {
            width: 80px;
        }
    }
    
    input { 
    	width: 270px; 	
    }
`;