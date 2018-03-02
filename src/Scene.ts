import Drawable from "./rendering/gl/Drawable";
import {gl} from './globals';
import {Geometry} from './geometry/Geometry';
import Model from "./geometry/Model";

class Scene extends Drawable {
    indices: Uint32Array;
    positions: Float32Array;
    normals: Float32Array;
    colors: Float32Array;

    pos =  new Array<number>();
    nor =  new Array<number>();
    col =  new Array<number>();
    idx = new Array<number>();

    public addElement(element: Model) {
        let count = this.pos.length / 4;

        if (this.pos.length === 0) {
            this.pos = element.pos.slice();
            this.nor = element.nor.slice();
            this.col = element.col.slice();
        } else {
            this.pos = this.pos.concat(element.pos);
            this.nor = this.nor.concat(element.nor);
            this.col = this.col.concat(element.col);
        }


        for (let i = 0; i < element.idx.length; i++) {
            this.idx.push(element.idx[i] + count);
        }
    }

    
  
    create() {
        this.positions = Float32Array.from(this.pos);
        this.normals = Float32Array.from(this.nor);
        this.colors = Float32Array.from(this.col);
        this.indices = Uint32Array.from(this.idx);

        this.generateIdx();
        this.generatePos();
        this.generateNor();
        this.generateCol();
    
        this.count = this.indices.length;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufIdx);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
    
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufNor);
        gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);
    
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufPos);
        gl.bufferData(gl.ARRAY_BUFFER, this.positions, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufCol);
        gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);
    
    }
  };
  
  export { Scene };