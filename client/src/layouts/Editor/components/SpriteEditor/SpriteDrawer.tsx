import React, {createRef, useRef} from "react";
import {Sprite} from "./Sprite";

export interface SpriteDrawerProps {
	sprite: Sprite;
	width?: number;
	onAction?: (x: number, y: number) => void;
}

export default class SpriteDrawer extends React.Component<SpriteDrawerProps> {
	private canvas = React.createRef<HTMLCanvasElement>();


	constructor(props: SpriteDrawerProps){
		super(props);
	}

	public updateCanvas(){
		if(!this.canvas.current) return;

		const canvas: HTMLCanvasElement = this.canvas.current;
		var ctx = canvas.getContext("2d");

		if(!ctx) return;

		const { sprite } = this.props;

		const scale = canvas.width / sprite.width;
		canvas.height = sprite.height * scale;
		canvas.style.height = "" + (sprite.height * scale) + "px";

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.scale(scale, scale);
		for(var i = 0; i < sprite.width; i++){
			for(var j = 0; j < sprite.height; j++){
				const offset = j * sprite.width + i;
				var rgb = sprite.getPixel(offset);
				if(!rgb) continue;
				ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a ? 255 : 0})`;
				ctx.fillRect(i, j, 1, 1);
			}
		}
	}

	componentDidMount(){
		this.updateCanvas();
	}

	private click(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>){
		if(!(e.buttons & 1)) return;
		if(!this.canvas.current) return;
		const canvas = this.canvas.current;

		const x = e.clientX - canvas.getBoundingClientRect().left;
		const y = e.clientY - canvas.getBoundingClientRect().top;

		if(x < 0 || y < 0 || x > canvas.width || y > canvas.height) return;

		const sprite = this.props.sprite;
		const scale = canvas.width / sprite.width;

		const tx = Math.floor(x / scale);
		const ty = Math.floor(y / scale);

		if(this.props.onAction){
			this.props.onAction(tx, ty);
		}
	}

	public render(){
		this.updateCanvas();

		return <div>
			<canvas ref={this.canvas} width={this.props.width}
					onMouseDown={e => this.click(e)}
					onMouseMove={e => this.click(e)}></canvas>
		</div>;
	}
}