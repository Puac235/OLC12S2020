/* Definición Léxica */
%lex

%options case-insensitive

%%
\s+											// se ignoran espacios en blanco
"//".*										// comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas

"int"			    return 'RINT';
"double"			return 'RDOUBLE';
"char"				return 'RCHAR';
"boolean"			return 'RBOOLEAN';
"string"			return 'RSTRING';
"print"				return 'RPRINT';
"if"				return 'RIF';
"else"				return 'RELSE';
"true"				return 'RTRUE';
"false"				return 'RFALSE';
"while"             return 'RWHILE';



";"					return 'PTCOMA';
"{"					return 'LLAVEA';
"}"					return 'LLAVEC';
"("					return 'PARA';
")"					return 'PARC';


"+"					return 'MAS';
"-"					return 'MENOS';
"*"					return 'POR';
"/"					return 'DIV';

"&&"				return 'AND';
"||"				return 'OR';
"<="				return 'MENOR_IGUAL';
"<"					return 'MENORQUE';
">="				return 'MAYOR_IGUAL';
">"					return 'MAYORQUE';
"=="				return 'IGUALIGUAL';
"="					return 'IGUAL';
"!="				return 'DIFERENTE';
"!"					return 'NOT';

\"[^\"]*\"	             { yytext = yytext.substr(1,yyleng-2); 	return 'CADENA'; }
"'"[^']"'"				 { yytext = yytext.substr(1,yyleng-2); 	return 'CARACTER'; }
[0-9]+("."[0-9]+)\b  											return 'DECIMAL';
[0-9]+\b														return 'ENTERO';
([a-zA-Z])[a-zA-Z0-9_]*	                                        return 'IDENTIFICADOR';

<<EOF>>				return 'EOF';

.					{ 
                        console.log('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                        
                    }

/lex

%{
    const Identificador         = require('./Expresiones/Identificador');
    const Primitivo             = require('./Expresiones/Primitivo');
    const Aritmetica            = require('./Expresiones/Aritmetica');
    const Relacional            = require('./Expresiones/Relacional');
    const Logica                = require('./Expresiones/Logica');

    const Excepcion             = require('./Excepciones/Excepcion')

    const Asignacion            = require('./Instrucciones/Asignacion');
    const Declaracion           = require('./Instrucciones/Declaracion');
    const Print                 = require('./Instrucciones/Print');
    const If                    = require('./Instrucciones/If');
    const While                 = require('./Instrucciones/While');

    const Tipo                  = require('./tablaSimbolos/Tipo');
    const Arbol                 = require('./tablaSimbolos/Arbol');
%}

/* Asociación de operadores y precedencia */
%left 'OR'
%left 'AND'
%left 'IGUALIGUAL' 'DIFERENTE'
%left 'MAYORQUE' 'MENORQUE' 'MENOR_IGUAL' 'MAYOR_IGUAL'
%left 'MAS' 'MENOS'
%left 'POR' 'DIV'
%right 'UMENOS' 'UNOT'

%start INICIO

%% /* Definición de la gramática */

INICIO
	: INSTRUCCIONES EOF {
		// cuando se haya reconocido la entrada completa retornamos la entrada traducida
		return $1;
	}
;

INSTRUCCIONES
	: INSTRUCCIONES INSTRUCCION 	{ $1.push($2); $$ = $1; }
	| INSTRUCCION					{ $$ = [$1]; }
;

INSTRUCCION
	: DEFDECLARACION PTCOMA		{ $$ = $1; }
	| DEFASIGNACION PTCOMA		{ $$ = $1; }
    | DEFIF						{ $$ = $1; }
    | DEFWHILE					{ $$ = $1; }
    | DEFPRINT PTCOMA 			{ $$ = $1; }
	| error PTCOMA { 
        console.log(this); 
        $$ = new Excepcion.default('Sintactico', `Error recuperado con ${yytext}`, this._$.first_line, this._$.first_column);
    }
;

BLOQUESENTENCIAS
    : LLAVEA INSTRUCCIONES LLAVEC	{ $$ = $2; }
;

DEFDECLARACION
    : TYPE IDENTIFICADOR IGUAL EXPRESION 	    { $$ = new Declaracion.default($1, $2, $4, @1.first_line, @1.first_column); }
;

TYPE
    : RINT 	{ $$ = new Tipo.default(Tipo.tipos.ENTERO); }
    | RDOUBLE 	{ $$ = new Tipo.default(Tipo.tipos.DECIMAL); }
    | RBOOLEAN 	{ $$ = new Tipo.default(Tipo.tipos.BOOLEANO); }
    | RCHAR 	{ $$ = new Tipo.default(Tipo.tipos.CARACTER); }
    | RSTRING 	{ $$ = new Tipo.default(Tipo.tipos.CADENA); }
;

DEFASIGNACION
    : IDENTIFICADOR IGUAL EXPRESION 	{ $$ = new Asignacion.default($1, $3, @1.first_line, @1.first_column); }
;

DEFIF
    : RIF PARA EXPRESION PARC BLOQUESENTENCIAS							{ $$ = new If.default($3, $5, @1.first_line, @1.first_column); }
    | RIF PARA EXPRESION PARC BLOQUESENTENCIAS RELSE BLOQUESENTENCIAS	{ $$ = new If.default($3, $5, @1.first_line, @1.first_column, $7); }
    | RIF PARA EXPRESION PARC BLOQUESENTENCIAS RELSE DEFIF				{ $$ = new If.default($3, $5, @1.first_line, @1.first_column, $7); }
;

DEFPRINT
    : RPRINT PARA EXPRESION PARC 				{ $$ = new Print.default($3, @1.first_line, @1.first_column); }
;

DEFWHILE
    : RWHILE PARA EXPRESION PARC BLOQUESENTENCIAS { $$ = new While.default($3, $5, @1.first_line, @1.first_column) }
;

EXPRESION
	: EXPRESION MAS EXPRESION               { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.SUMA, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION MENOS EXPRESION             { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.RESTA, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION POR EXPRESION               { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.MULTIPLICACION, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION DIV EXPRESION               { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.DIVISION, @1.first_line, @1.first_column, $1, $3); }
    | MENOS EXPRESION %prec UMENOS	        { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.MENOSUNARIO, @1.first_line, @1.first_column, $2); }
    | ENTERO                                { $$ = new Primitivo.default($1, new Tipo.default(Tipo.tipos.ENTERO),@1.first_line, @1.first_column); }
    | DECIMAL                               { $$ = new Primitivo.default($1, new Tipo.default(Tipo.tipos.DECIMAL), @1.first_line, @1.first_column); }
    | CARACTER                              { $$ = new Primitivo.default($1, new Tipo.default(Tipo.tipos.CARACTER),@1.first_line, @1.first_column); }
    | CADENA                                { $$ = new Primitivo.default($1, new Tipo.default(Tipo.tipos.CADENA),@1.first_line, @1.first_column); }
    | RTRUE                                 { $$ = new Primitivo.default($1, new Tipo.default(Tipo.tipos.BOOLEANO),@1.first_line, @1.first_column); }
    | RFALSE                                { $$ = new Primitivo.default($1, new Tipo.default(Tipo.tipos.BOOLEANO),@1.first_line, @1.first_column); }
    | IDENTIFICADOR                         { $$ = new Identificador.default($1, @1.first_line, @1.first_column); }
    | EXPRESION IGUALIGUAL EXPRESION        { $$ = new Relacional.default($1, $3, Relacional.OperadorRelacional.IGUALACION, @1.first_line, @1.first_column); }
    | EXPRESION DIFERENTE EXPRESION         { $$ = new Relacional.default($1, $3, Relacional.OperadorRelacional.DIFERENCIACION, @1.first_line, @1.first_column); }
    | EXPRESION MENORQUE EXPRESION          { $$ = new Relacional.default($1, $3, Relacional.OperadorRelacional.MENORQUE, @1.first_line, @1.first_column); }
    | EXPRESION MAYORQUE EXPRESION          { $$ = new Relacional.default($1, $3, Relacional.OperadorRelacional.MAYORQUE, @1.first_line, @1.first_column); }
    | EXPRESION MENOR_IGUAL EXPRESION       { $$ = new Relacional.default($1, $3, Relacional.OperadorRelacional.MENORIGUAL, @1.first_line, @1.first_column); }
    | EXPRESION MAYOR_IGUAL EXPRESION       { $$ = new Relacional.default($1, $3, Relacional.OperadorRelacional.MAYORIGUAL, @1.first_line, @1.first_column); }
    | EXPRESION AND EXPRESION               { $$ = new Logica.default(Logica.OperadorLogico.AND, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION OR EXPRESION                { $$ = new Logica.default(Logica.OperadorLogico.OR, @1.first_line, @1.first_column, $1, $3); }
    | NOT EXPRESION %prec UNOT              { $$ = new Logica.default(Logica.OperadorLogico.NOT, @1.first_line, @1.first_column, $2); }
    | PARA EXPRESION PARC                   { $$ = $2 }
;