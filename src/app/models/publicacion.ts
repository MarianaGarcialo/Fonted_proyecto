export class Publicacion{
    title:string;
    descripcion:string;
    img:string;
    enlaces:Array<string>;
    author:string;
    constructor(title:string="", descripcion:string="", img:string="", author:string="", enlaces:Array<string>=[]){
        this.title=title;
        this.descripcion=descripcion;
        this.img=img;
        this.author=author;
        this.enlaces=enlaces;

    }
    
}