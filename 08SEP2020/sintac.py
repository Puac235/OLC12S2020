'''
ANÁLISIS SINTACTICO
'''


class sintac:
    def __init__(self):
        self.counter = 0
        self.tabla = { 
            'E' : { 'PARA' : "XT", 'NUMERIC' : "XT" }, 
            'X' : { 'MAS' : "XT+", 'PARC' : None, '$' : None }, #X = E
            'T' : { 'PARA' : "ZF", 'NUMERIC' : "ZF" },
            'Z' : { 'POR' : "ZF*", 'MAS' : None, 'PARC' : None, '$' : None }, #Z = T'
            'F' : { 'PARA' : ")E(", 'NUMERIC' : "i" } #NUMERIC = i
            }
        self.pila = ['$','E'] #INICIALMENTE, TIENE EL EOF Y LA PRODUCCION INICIAL
        self.Errores = []


    def obtenerMatrix(self, produccion, token):
        try:
            return self.tabla[produccion][token]
        except:#AQUI SE MANEJARIAN LOS ERRORES :D
            print("ERROR SINTACTICO")
            return "MALO"
    
    def pushear(self, producciones):
        lista = list(producciones)
        for l in lista:
            if l == "(":
                self.pila.append('PARA')
            elif l == ")":
                self.pila.append('PARC')
            elif l == "i":
                self.pila.append('NUMERIC')
            elif l == "+":
                self.pila.append('MAS')
            elif l == "*":
                self.pila.append('POR')
            else:
                self.pila.append(l)

    def parse(self,tokens):
        tokens.append([0,0,'$',0])
        while len(self.pila) -1 >= 0:
            self.counter = len(self.pila) -1
            var1 = self.pila[self.counter]  #ULTIMO VALOR DE LA PILA, HASTA ARRIBA
            var2 = tokens[0][2]             #PRIMER TOKEN, TIPO DE TOKEN
            if var1 == var2:
                if var1 == "$":
                    print("------------------------------------------------PILA------------------------------------------------")
                    print(self.pila)
                    print("------------------------------------------------BUFFER------------------------------------------------")
                    print(tokens)
                    return True
                elif var1 == "NUMERIC" or var1 == "PARA" or var1 == "PARC" or var1 == "MAS" or var1 == "POR":
                    self.pila.pop()
                    del tokens[0]
                    print("------------------------------------------------PILA------------------------------------------------")
                    print(self.pila)
                    print("------------------------------------------------BUFFER------------------------------------------------")
                    print(tokens)
            else:
                self.pila.pop() #SACA EL ULTIMO ELEMENTO DE LA PILA, HASTA ARRIBA
                val = self.obtenerMatrix(var1, var2)
                
                if val == "MALO":
                    return False
                elif val != None:
                    self.pushear(val)
                print("------------------------------------------------PILA------------------------------------------------")
                print(self.pila)
                print("------------------------------------------------BUFFER------------------------------------------------")
                print(tokens)

            print("***********************************************************************************************************************")
