function sumar() {
    // Obtener los valores de los inputs
    const numero1 = parseFloat(document.getElementById('numero1').value);
    const numero2 = parseFloat(document.getElementById('numero2').value);
    
    // Verificar si los valores son números válidos
    if (isNaN(numero1) || isNaN(numero2)) {
        document.getElementById('resultado').textContent = 'Por favor, ingrese números válidos';
        return;
    }
    
    // Realizar la suma
    const suma = numero1 + numero2;
    
    // Mostrar el resultado
    document.getElementById('resultado').textContent = `La suma es: ${suma}`;
}