from tkinter import Tk, Menu, messagebox, filedialog, ttk, Label, scrolledtext, INSERT, END, Button, Scrollbar, RIGHT, Y, Frame, Canvas, HORIZONTAL, VERTICAL, simpledialog

root = Tk()
root.title("LABORATORIO")
root.configure(background = "black")

'''FUNCIONES DEL MENU'''

archivo = ""

def nuevo():
    global archivo
    editor.delete(1.0, END)#ELIMINAR EL CONTENIDO
    archivo = ""

def abrir():
    global archivo
    archivo = filedialog.askopenfilename(title = "Abrir Archivo", initialdir = "C:/")

    entrada = open(archivo)
    content = entrada.read()

    editor.delete(1.0, END)
    editor.insert(INSERT, content)
    entrada.close()

def salir():
    value = messagebox.askokcancel("Salir", "Está seguro que desea salir?")
    if value :
        root.destroy()

def guardarArchivo():
    global archivo
    if archivo == "":
        guardarComo()
    else:
        guardarc = open(archivo, "w")
        guardarc.write(editor.get(1.0, END))
        guardarc.close()

def guardarComo():
    global archivo
    guardar = filedialog.asksaveasfilename(title = "Guardar Archivo", initialdir = "C:/")
    fguardar = open(guardar, "w+")
    fguardar.write(editor.get(1.0, END))
    fguardar.close()
    archivo = guardar


barraMenu = Menu(root)
root.config(menu = barraMenu, width = 1000, height = 600)

archivoMenu = Menu(barraMenu, tearoff=0)
archivoMenu.add_command(label = "Nuevo", command = nuevo)
archivoMenu.add_command(label = "Abrir", command = abrir)
archivoMenu.add_command(label = "Guardar", command = guardarArchivo)
archivoMenu.add_command(label = "Guardar Como...", command = guardarComo)
archivoMenu.add_separator()
archivoMenu.add_command(label = "Salir", command = salir)

barraMenu.add_cascade(label = "Archivo", menu = archivoMenu)
barraMenu.add_command(label = "Salir",  command = salir)

frame = Frame(root, bg="black")
canvas = Canvas(frame, bg="black")
scrollbar = Scrollbar(frame, orient=VERTICAL, command=canvas.yview)
scroll = Frame(canvas, bg="black")

scroll.bind("<Configure>",lambda e: canvas.configure(scrollregion=canvas.bbox("all")))

canvas.create_window((0, 0), window=scroll, anchor="nw")

canvas.configure(yscrollcommand=scrollbar.set, width = 1000, height = 600)

ttk.Label(scroll, text = "LABORATORIO", font = ("Arial", 17), background='black', foreground = "white").grid(column = 1, row = 0)

editor = scrolledtext.ScrolledText(scroll, undo = True, width = 60, height = 15, font = ("Arial", 15), background = 'OliveDrab1',  foreground = "black")

editor.grid(column = 1, row = 1, pady = 25, padx = 125)

frame.grid(sticky='news')
canvas.grid(row=0,column=1)
scrollbar.grid(row=0, column=2, sticky='ns')


editor.focus()
root.mainloop()