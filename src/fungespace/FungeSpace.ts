class Fungespace {
    private static readonly WIDTH = 30;
    private static readonly HEIGHT = 80;
    private backing: UInt8Array;
    constructor(space: string){
        xIndex = 0;
        yIndex = 0;
        for(c of space){
            if(c == '\n'){
                xIndex = 0;
                yIndex += 1;
            } else {
                this.set(xIndex,yIndex, c.charCodeAt(0));
                xIndex +=1;
            }
        }
    }
    public get(x: number, y: number){
        return backing[x+(y*WIDTH)];
    }

    public set(x: number, y: number, i: number){
        backing[x+(y*WIDTH)] = i;
    }
}
