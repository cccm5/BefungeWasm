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

function getEnumKeyByEnumValue(myEnum: any, enumValue: string) {
    let keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
    return keys.length > 0 ? keys[0] : null;
}

type Flow = {dir: Direction, x: number, y: number, cord: Cordinate};
class Cordinate{
    public readonly x: number;
    public readonly y: number;
    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    public toString(): string{
        return "" + this.x + "," + this.y;
    }
}
export class Fungespace {
    public static readonly WIDTH = 30;
    public static readonly HEIGHT = 80;
    private backing: Uint8Array;
    constructor(space: string){
        this.backing = new Uint8Array(Fungespace.WIDTH*Fungespace.HEIGHT);
        let xIndex = 0;
        let yIndex = 0;
        this.backing.fill(" ".charCodeAt(0));
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
        const stack: Flow[] = [{dir: Direction.Right, x: 0, y:0, cord: new Cordinate(-1,0)}];
        const flow = new Graph<Cordinate>();
        const visited: string[] = [];
        while(stack.length != 0) {
            let top: Flow = stack.pop()!;
            let x = top.x;
            let y = top.y;
            if(visited.indexOf(JSON.stringify(top)) != -1 ){
                continue;
            }
            visited.push(JSON.stringify(top));
            let stringMode = false;
            let token: string;
            do{
                token = this.getChar(x,y);
                let d = 1;
                if(token == '#'){
                    d = 2;
                } else if(token == '"'){
                    stringMode = !stringMode;
                } else if(getEnumKeyByEnumValue(FlowControl, token) != null && !stringMode){
                    break;
                }
                switch(top.dir){
                    case Direction.Up:
                        y = (y-d)%Fungespace.HEIGHT;
                        break;
                    case Direction.Down:
                        y = (y+d)%Fungespace.HEIGHT;
                        break;
                    case Direction.Left:
                        x = (x-d)%Fungespace.WIDTH;
                        break;
                    case Direction.Right:
                        x = (x+d)%Fungespace.WIDTH;
                        break;
                }
            }while((stringMode || getEnumKeyByEnumValue(FlowControl, token) == null) && !((x==top.x) && (y==top.y)));
            flow.addEdge(top.cord, new Cordinate(x, y));
            if(token == FlowControl.Right || token == FlowControl.HorizontalIf || token==FlowControl.Random){
                stack.push({dir: Direction.Right,
                           x: (x+1)%Fungespace.WIDTH,
                           y: y, 
                           cord: new Cordinate(x,y)});
                 
            }
            if(token == FlowControl.Left || token == FlowControl.HorizontalIf || token==FlowControl.Random){
                stack.push({dir: Direction.Left,
                           x: (x-1)%Fungespace.WIDTH,
                           y: y,
                           cord: new Cordinate(x,y)});
            }
            if(token == FlowControl.Down || token == FlowControl.VerticalIf || token==FlowControl.Random){
                stack.push({dir: Direction.Down,
                           x: x,
                           y: (y+1)%Fungespace.HEIGHT, 
                           cord: new Cordinate(x,y)});
            }
            if(token == FlowControl.Up || token == FlowControl.VerticalIf || token==FlowControl.Random){
                stack.push({dir: Direction.Up,
                           x: x,
                           y: (y-1)%Fungespace.HEIGHT,
                           cord: new Cordinate(x,y)});
            }
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
        let i = 0;
        let newline = false;
        for(let c of this.backing){
            out += String.fromCharCode(c);
            newline = newline || String.fromCharCode(c) != ' ';
            i+=1;
            if(i >= Fungespace.WIDTH && newline){
                i=0;
                out += '\n';
                newline = false;
            }
        }
        return out;

    }
}
