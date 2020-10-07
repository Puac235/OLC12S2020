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
	: INSTRUCCIONES INSTRUCCION 	{ $$ = `${$1}${$2}`; }
	| INSTRUCCION					{ $$ = `${$1}`; }
;

INSTRUCCION
	: DEFDECLARACION PTCOMA		{ $$ = `${$1};\n`; }
	| DEFASIGNACION PTCOMA		{ $$ = `${$1};\n`; }
    | DEFIF						{ $$ = `${$1}\n`; }
    | DEFWHILE					{ $$ = `${$1}\n`; }
    | DEFPRINT PTCOMA 			{ $$ = `${$1};\n`; }
	| error PTCOMA { 
        console.log('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
    }
;

BLOQUESENTENCIAS
    : LLAVEA INSTRUCCIONES LLAVEC	{ $$ = `{\n${$2}}`; }
;

DEFDECLARACION
    : TYPE IDENTIFICADOR IGUAL EXPRESION 	    { $$ = `${$1} ${$2} = ${$4}`; }
;

TYPE
    : RINT 	{ $$ = 'entero'; }
    | RDOUBLE 	{ $$ = 'decimal'; }
    | RBOOLEAN 	{ $$ = 'booleano'; }
    | RCHAR 	{ $$ = 'caracter'; }
;

DEFASIGNACION
    : IDENTIFICADOR IGUAL EXPRESION 	{ $$ = `${$1} = ${$3}`; }
;

DEFIF
    : RIF PARA EXPRESION PARC BLOQUESENTENCIAS							{ $$ = `si ( ${$3} ) \n${$5}`; }
    | RIF PARA EXPRESION PARC BLOQUESENTENCIAS RELSE BLOQUESENTENCIAS	{ $$ = `si ( ${$3} ) \n${$5}sino \n${$7}`; }
    | RIF PARA EXPRESION PARC BLOQUESENTENCIAS RELSE DEFIF				{ $$ = `si ( ${$3} ) \n${$5}sino ${$7}`; }
;

DEFPRINT
    : RPRINT PARA EXPRESION PARC 				{ $$ = `imprimir ( ${$3} )`; }
;

DEFWHILE
    : RWHILE PARA EXPRESION PARC BLOQUESENTENCIAS { $$ = `mientras ( ${$3} ) \n${$5}` }
;

EXPRESION
	: EXPRESION MAS EXPRESION               { $$ = `${$1} + ${$3}`; }
    | EXPRESION MENOS EXPRESION             { $$ = `${$1} - ${$3}`; }
    | EXPRESION POR EXPRESION               { $$ = `${$1} * ${$3}`; }
    | EXPRESION DIV EXPRESION               { $$ = `${$1} / ${$3}`; }
    | MENOS EXPRESION %prec UMENOS	        { $$ = `- ${$2}`; }
    | ENTERO                                { $$ = `${$1}`; }
    | DECIMAL                               { $$ = `${$1}`; }
    | CARACTER                              { $$ = `${$1}`; }
    | CADENA                                { $$ = `${$1}`; }
    | RTRUE                                 { $$ = `verdadero` }
    | RFALSE                                { $$ = `falso` }
    | IDENTIFICADOR                         { $$ = $1 }
    | EXPRESION IGUALIGUAL EXPRESION        { $$ = `${$1} == ${$3}`; }
    | EXPRESION DIFERENTE EXPRESION         { $$ = `${$1} != ${$3}`; }
    | EXPRESION MENORQUE EXPRESION          { $$ = `${$1} < ${$3}`; }
    | EXPRESION MAYORQUE EXPRESION          { $$ = `${$1} > ${$3}`; }
    | EXPRESION MENOR_IGUAL EXPRESION       { $$ = `${$1} <= ${$3}`; }
    | EXPRESION MAYOR_IGUAL EXPRESION       { $$ = `${$1} >= ${$3}`; }
    | EXPRESION AND EXPRESION               { $$ = `${$1} && ${$3}`; }
    | EXPRESION OR EXPRESION                { $$ = `${$1} || ${$3}`; }
    | NOT EXPRESION %prec UNOT              { $$ = `! ${$2}`; }
    | PARA EXPRESION PARC                   { $$ = `( ${$2} )`; }
;