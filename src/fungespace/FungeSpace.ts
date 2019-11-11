import {Graph} from '../Graph'

export class Fungespace {
    public static readonly WIDTH = 30;
    public static readonly HEIGHT = 80;
    private backing: Uint8Array;
    constructor(space: string){
        this.backing = new Uint8Array(Fungespace.WIDTH*Fungespace.HEIGHT);
        let xIndex = 0;
        let yIndex = 0;
        for(let c of space){
            if(c == '\n'){
                xIndex = 0;
                yIndex += 1;
            } else {
                this.set(xIndex,yIndex, c.charCodeAt(0));
                xIndex +=1;
            }
        }
    }
    public get(x: number, y: number): number{
        return this.backing[x+(y*Fungespace.WIDTH)];
    }

    public set(x: number, y: number, i: number){
        this.backing[x+(y*Fungespace.WIDTH)] = i;
    }

    public repr(): string{
        //TODO: Make this split rows by newlines
        let out = "";
        for(let c of this.backing){
            out += String.fromCharCode(c);
        }
        return out;

    }
}
