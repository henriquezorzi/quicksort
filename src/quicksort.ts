import { lexicograficallyCompare } from "./utils/lexicograficallyCompare.js";


export const quickSort = <T>(
    arr: T[],
    compFn: (a: T, b: T) => number = lexicograficallyCompare
): T[] => {
    // Se o array tem 0 ou 1 elemento, ele já está ordenado.
    if (arr.length <= 1) {
        return arr;
    }

    // 1. Define o ultimo elemento sendo o pivô.
    const pivotIndex = arr.length - 1;
    const pivot = arr[pivotIndex];

    const menores: T[] = [];
    const maiores: T[] = [];

    // 2. Separa os elementos em dois grupos: menores ou iguais ao pivô e maiores que o pivô.
    for (let i = 0; i < arr.length - 1; i++) {
        if (compFn(arr[i], pivot) <= 0) {
            menores.push(arr[i]);
        } else {
            maiores.push(arr[i]);
        }
    }

    // 3. Aplicando a recursividade, ordenando e juntando os sub-arrays
    return [...quickSort(menores, compFn), pivot, ...quickSort(maiores, compFn)];
};
