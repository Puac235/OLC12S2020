from lexer import lexer
from sintac import sintac

entrada = open('entrada.olc1')
contenido = entrada.read()
lexico = lexer()

tokens = lexico.analyze(contenido)
for token in tokens:
    print(token)

parser = sintac()

parseoCorrecto = parser.parse(tokens)

if parseoCorrecto:
    print("Analisis Sintactico Correcto.")
else:
    print("Analisis Sintactico Incorrecto.")
