export class Publicacion{
    _id?:string;
    title:string;
    descripcion:string;
    img:string;
    enlaces:Array<string>;
    authors:Array<string>;
    publicado_por:string;
    constructor(title:string="", descripcion:string="", img:string="", authors:Array<string>=[], enlaces:Array<string>=[],publicado_por:string=""){
        this.title=title;
        this.descripcion=descripcion;
        this.img=img;
        this.authors=authors;
        this.enlaces=enlaces;
        this.publicado_por=publicado_por

    }
    
}