import Binaryen from 'binaryen';
import fs from 'fs';
import {Fungespace} from  './fungespace/FungeSpace'

const code = fs.readFileSync('foo.txt','utf8');
const space = new Fungespace(code);
console.log(space.repr())
