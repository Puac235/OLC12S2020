'''
EXPRESIONES REGULARES PARA IMPLEMENTACIÓN DE ANÁLISIS LÉXICO
'''
#[linea, columna, tipo, valor]
import re

class lexer:
    def __init__(self):
        self.linea = 0
        self.columna = 0
        self.counter = 0

        self.Errores = []

        self.signos = {"MAS":'\+', "POR":'\*', "PARA":'\(', "PARC":'\)'}

    def inic(self, text):
        self.linea = 1
        self.columna = 1
        listaTokens = []

        while self.counter < len(text):
            if re.search(r"[0-9]", text[self.counter]): #NUMERO
                listaTokens.append(self.StateNumber(self.linea, self.columna, text, text[self.counter]))
            elif re.search(r"[\n]", text[self.counter]):#SALTO DE LINEA
                self.counter += 1
                self.linea += 1
                self.columna = 1 
            elif re.search(r"[ \t]", text[self.counter]):#ESPACIOS Y TABULACIONES
                self.counter += 1
                self.columna += 1 
            else:
                #SIGNOS
                isSign = False
                for clave in self.signos:
                    valor = self.signos[clave]
                    if re.search(valor, text[self.counter]):
                        listaTokens.append([self.linea, self.columna, clave, valor.replace('\\','')])
                        self.counter += 1
                        self.columna += 1
                        isSign = True
                        break
                if not isSign:
                    self.columna += 1
                    self.Errores.append([self.linea, self.columna, text[self.counter]])
                    self.counter += 1
        return listaTokens



    
    def StateNumber(self, line, column, text, word):
        self.counter += 1
        self.columna += 1
        if self.counter < len(text):
            if re.search(r"[0-9]", text[self.counter]):#ENTERO
                return self.StateNumber(line, column, text, word + text[self.counter])
            elif re.search(r"\.", text[self.counter]):#DECIMAL
                return self.StateDecimal(line, column, text, word + text[self.counter])
            else:
                return [line, column, 'NUMERIC', word]
                #agregar automata de numero en el arbol, con el valor
        else:
            return [line, column, 'NUMERIC', word]

    def StateDecimal(self, line, column, text, word):
        self.counter += 1
        self.columna += 1
        if self.counter < len(text):
            if re.search(r"[0-9]", text[self.counter]):#DECIMAL
                return self.StateDecimal(line, column, text, word + text[self.counter])
            else:
                return [line, column, 'NUMERIC', word]
                #agregar automata de decimal en el arbol, con el valor
        else:
            return [line, column, 'NUMERIC', word]

    def analyze(self, entrada):
        tokens = self.inic(entrada)
        return tokens


