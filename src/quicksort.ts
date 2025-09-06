import { lexicograficallyCompare } from "./utils/lexicograficallyCompare.js";

/**
 * Implementação do QuickSort em TypeScript
 * @param arr - Array a ser ordenado
 * @param compFn - Função de comparação (opcional). Por padrão, usa comparação lexicográfica
 * @returns Array ordenado
 */
export const quickSort = <T>(
    arr: T[],
    compFn: (a: T, b: T) => number = lexicograficallyCompare
): T[] => {

    // Caso base: se o array tiver 0 ou 1 elemento, já está ordenado
    if (arr.length <= 1) {
        return arr;
    }

    // Escolhemos um "pivô" (aqui pegamos o elemento do meio do array)
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr[pivotIndex];

    // Criamos dois arrays auxiliares:
    // "menores" para elementos menores que o pivô
    // "maiores" para elementos maiores que o pivô
    const menores: T[] = [];
    const maiores: T[] = [];

    // Percorremos todos os elementos (menos o pivô)
    for (let i = 0; i < arr.length; i++) {
        if (i === pivotIndex) continue; // Pula o pivô
        const comp = compFn(arr[i], pivot);
        
        if (comp <= 0) {
            // Elemento menor ou igual ao pivô → vai para o array "menores"
            menores.push(arr[i]);
        } else {
            // Elemento maior que o pivô → vai para o array "maiores"
            maiores.push(arr[i]);
        }
    }

    // Recursivamente ordenamos os menores e maiores, e juntamos tudo:
    // quickSort(menores) + pivô + quickSort(maiores)
    return [...quickSort(menores, compFn), pivot, ...quickSort(maiores, compFn)];
};
