export interface Pixel {
	r: number;
	g: number;
	b: number;
	a: boolean;
}

export function PixelsEqual(a: Pixel, b: Pixel){
	if(!a.a && a.a == b.a) return true;
	if(a.a != b.a) return false;
	return a.r == b.r && a.g == b.g && a.b == b.b;
}


export class Sprite {
	public name: string;
	public width: number;
	public height: number;
	public data: Pixel[];


	constructor(name: string, width: number, height: number){
		this.name = name;
		this.width = width;
		this.height = height;

		this.data = Array(width * height).fill({ r: 0, g: 0, b: 0, a: false });
	}

	public updateSize(w: number, h: number){
		const data = Array(w * h).fill({ r: 0, g: 0, b: 0, a: false });

		for(var j = 0; j < h; j++){
			for(var i = 0; i < w; i++){
				if(i >= this.width || j >= this.height) continue;

				data[j * w + i] = (i >= this.width || j >= this.height)
					? { r: 0, g: 0, b: 0, a: false }
					: this.data[j * this.width + i];
			}
		}

		this.data = data;

		this.width = w;
		this.height = h;
	}

	public getPixel(x: number, y?: number): Pixel{
		const index = y ? (y * this.width + x) : x;

		return this.data[index];
	}

	public setPixel(x: number, y: number, color: Pixel){
		if(x > this.width || y > this.height || x < 0 || y < 0) return;
		const index = y ? (y * this.width + x) : x;
		this.data[index] = color;
	}

	public base64(){
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		if(ctx == undefined) return "";

		canvas.width = this.width;
		canvas.height = this.height;

		const imgData = ctx.getImageData(0, 0, this.width, this.height);
		const data = imgData.data;

		for(var i = 0, l = this.width * this.height; i < l; i += 4){
			data[i] = this.data[i].r;
			data[i + 1] = this.data[i].g;
			data[i + 2] = this.data[i].b;
			data[i + 3] = this.data[i].a ? 255 : 0;
		}
		ctx.putImageData(imgData, 0, 0);


		return canvas.toDataURL();
	}

	public toCode(){
		const pixels: string[] = [];

		this.data.forEach(pixel => {
			if(pixel.a){
				const color = (((pixel.r & 0xF8) << 8) | ((pixel.g & 0xFC) << 3) | (pixel.b >> 3));
				pixels.push("0x" + color.toString(16));
			}else{
				pixels.push("TFT_TRANSPARENT");
			}
		});

		return `Color ${this.name}[${this.width} * ${this.height}] PROGMEM = { ${pixels.join(", ")} };`;
	}
}