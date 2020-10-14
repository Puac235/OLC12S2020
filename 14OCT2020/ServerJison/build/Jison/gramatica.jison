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

\"[^\"]*\"	                                                    return 'CADENA'; 
"'"[^']"'"				                                        return 'CARACTER';
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

    const Asignacion            = require('./Instrucciones/Asignacion');
    const Declaracion           = require('./Instrucciones/Declaracion');
    const Print                 = require('./Instrucciones/Print');
    const If                    = require('./Instrucciones/If');
    const While                 = require('./Instrucciones/While');
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
        console.log('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
    }
    | error LLAVEC { 
        console.log('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
    }
;

BLOQUESENTENCIAS
    : LLAVEA INSTRUCCIONES LLAVEC	{ $$ = $2; }
;

DEFDECLARACION
    : TYPE IDENTIFICADOR IGUAL EXPRESION 	    { $$ = new Declaracion.default($1, $2, $4, @1.first_line, @1.first_column); }
;

TYPE
    : RINT 	{ $$ = 'entero'; }
    | RDOUBLE 	{ $$ = 'decimal'; }
    | RBOOLEAN 	{ $$ = 'booleano'; }
    | RCHAR 	{ $$ = 'caracter'; }
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
	: EXPRESION MAS EXPRESION               { $$ = new Aritmetica.default('+', @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION MENOS EXPRESION             { $$ = new Aritmetica.default('-', @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION POR EXPRESION               { $$ = new Aritmetica.default('*', @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION DIV EXPRESION               { $$ = new Aritmetica.default('/', @1.first_line, @1.first_column, $1, $3); }
    | MENOS EXPRESION %prec UMENOS	        { $$ = new Aritmetica.default('-', @1.first_line, @1.first_column, $2); }
    | ENTERO                                { $$ = new Primitivo.default($1, @1.first_line, @1.first_column); }
    | DECIMAL                               { $$ = new Primitivo.default($1, @1.first_line, @1.first_column); }
    | CARACTER                              { $$ = new Primitivo.default($1, @1.first_line, @1.first_column); }
    | CADENA                                { $$ = new Primitivo.default($1, @1.first_line, @1.first_column); }
    | RTRUE                                 { $$ = new Primitivo.default('verdadero', @1.first_line, @1.first_column); }
    | RFALSE                                { $$ = new Primitivo.default('falso', @1.first_line, @1.first_column); }
    | IDENTIFICADOR                         { $$ = new Identificador.default($1, @1.first_line, @1.first_column); }
    | EXPRESION IGUALIGUAL EXPRESION        { $$ = new Relacional.default($1, $3, '==', @1.first_line, @1.first_column); }
    | EXPRESION DIFERENTE EXPRESION         { $$ = new Relacional.default($1, $3, '!=', @1.first_line, @1.first_column); }
    | EXPRESION MENORQUE EXPRESION          { $$ = new Relacional.default($1, $3, '<', @1.first_line, @1.first_column); }
    | EXPRESION MAYORQUE EXPRESION          { $$ = new Relacional.default($1, $3, '>', @1.first_line, @1.first_column); }
    | EXPRESION MENOR_IGUAL EXPRESION       { $$ = new Relacional.default($1, $3, '<=', @1.first_line, @1.first_column); }
    | EXPRESION MAYOR_IGUAL EXPRESION       { $$ = new Relacional($1, $3, '>=', @1.first_line, @1.first_column); }
    | EXPRESION AND EXPRESION               { $$ = new Aritmetica.default('||', @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION OR EXPRESION                { $$ = new Aritmetica.default('&&', @1.first_line, @1.first_column, $1, $3); }
    | NOT EXPRESION %prec UNOT              { $$ = new Aritmetica.default('!', @1.first_line, @1.first_column, $2); }
    | PARA EXPRESION PARC                   { $$ = new Primitivo.default(`( ${$2} )`, @1.first_line, @1.first_column); }
;