import {Graph} from '../Graph'

const enum Direction {
    Up,
    Down,
    Left,
    Right,
}

enum FlowControl {
    VerticalIf = '|',
    HorizontalIf = '_',
    Up = '^',
    Down = 'v',
    Right = '>',
    Left = '<',
    Random = '?',
}

type Flow = {dir: Direction, x: number, y: number};
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
        // we're moved once by prior itteration in the direction
        // Always check current token first, than itterate
        const stack: Flow[] = [{dir: Direction.Right, x: 0, y:0}];
        const flowTokens = Object.keys(FlowControl);
        while(stack) {
            let top: Flow = stack.pop()!;
            let x = top.x;
            let y = top.y;
            let stringMode = false;
            let token: string;
            do{
                token = this.getChar(x,y);
                let d = 1;
                if(token == '#'){
                    d = 2;
                } else if(token == '"'){
                    stringMode = !stringMode;
                }
                switch(top.dir){
                    case Direction.Up:
                        y-=d;
                        break;
                    case Direction.Down:
                        y+=d;
                        break;
                    case Direction.Left:
                        x-=d;
                        break;
                    case Direction.Right:
                        x+=d;
                        break;
                }
            }while(stringMode || flowTokens.indexOf(token)==-1);

        }
    }
    public get(x: number, y: number): number{
        return this.backing[x+(y*Fungespace.WIDTH)];
    }

    public getChar(x: number, y: number): string{
        return String.fromCharCode(this.get(x,y));
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
