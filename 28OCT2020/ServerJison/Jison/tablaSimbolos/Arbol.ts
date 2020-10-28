import {Instruccion} from "../Abstract/instruccion";
import Excepcion from "../Excepciones/Excepcion";
import TablaSimbolos from "./tablaSimbolos";

export default class Arbol{
    private instrucciones: Array<Instruccion>;
    private excepciones: Array<Excepcion>;
    private consola: String;
    private global: TablaSimbolos;

    constructor(instrucciones:Array<Instruccion>) {
        this.instrucciones = instrucciones;
        this.excepciones = new Array<Excepcion>();
        this.consola = "";
        this.global = new TablaSimbolos();
    }

    public getInstrucciones():Array<Instruccion> {
        return this.instrucciones;
    }

    public setInstrucciones(instrucciones:Array<Instruccion>):void {
        this.instrucciones = instrucciones;
    }

    public getExcepciones():Array<Excepcion> {
        return this.excepciones;
    }

    public setExcepciones(excepciones:Array<Excepcion>):void {
        this.excepciones = excepciones;
    }

    public getConsola():String {
        return this.consola;
    }

    public setConsola(consola:String):void {
        this.consola = `${this.getConsola()}${consola}`;
    }

    public getGlobal():TablaSimbolos {
        return this.global;
    }

    public setGlobal(global:TablaSimbolos):void {
        this.global = global;
    }
}