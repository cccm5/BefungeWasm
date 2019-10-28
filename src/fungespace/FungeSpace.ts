class Fungespace {
    private static readonly WIDTH = 30;
    private static readonly HEIGHT = 80;
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
    public get(x: number, y: number){
        return this.backing[x+(y*Fungespace.WIDTH)];
    }

    public set(x: number, y: number, i: number){
        this.backing[x+(y*Fungespace.WIDTH)] = i;
    }
}
