import { describe, expect, test } from "vitest";
import { quickSort } from "../src/quicksort"; 

/**
 * Gera lista de números aleatórios
 */
function gerarLista(tamanho: number) {
    const lista: number[] = [];
    for (let i = 0; i < tamanho; i++) {
        lista.push(Math.floor(Math.random() * tamanho));
    }
    return lista;
}

/**
 * Verifica se lista está ordenada
 */
function verificaOrdem(lista: number[]) {
    for (let i = 1; i < lista.length; i++) {
        if (lista[i] < lista[i - 1]) return false;
    }
    return true;
}

describe("Testes em QuickSort", () => {
    test("QuickSort (versão limpa)", () => {
        const compFn = (a: number, b: number) => a - b;

        expect(quickSort([], compFn)).toEqual([]);
        expect(quickSort([1], compFn)).toEqual([1]);
        expect(quickSort([1, 2, 3, 4], compFn)).toEqual([1, 2, 3, 4]);
        expect(quickSort([4, 3, 2, 1], compFn)).toEqual([1, 2, 3, 4]);
    });

    test("QuickSort com logs (apresentação)", () => {
        // Lista fixa para mostrar passo a passo
        const lista = [7, 2, 9, 4, 1, 6];
        console.log("\n===========================");
        console.log("📌 Lista inicial:", lista);

        // Função "espelho" que chama quickSort e exibe cada passo
        function quickSortComLog(arr: number[], left = 0, right = arr.length - 1): number[] {
            if (left < right) {
                const pivot = arr[right];
                let i = left - 1;

                console.log(`\n🔹 Subarray: [${arr.slice(left, right + 1)}], Pivot = ${pivot}`);

                for (let j = left; j < right; j++) {
                    if (arr[j] < pivot) {
                        i++;
                        [arr[i], arr[j]] = [arr[j], arr[i]];
                        console.log(`   🔄 Troca -> [${arr}]`);
                    }
                }

                [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
                console.log(`   📍 Pivot ${pivot} movido -> [${arr}]`);

                const pivotIndex = i + 1;
                quickSortComLog(arr, left, pivotIndex - 1);
                quickSortComLog(arr, pivotIndex + 1, right);
            }
            return arr;
        }

        const resultado = quickSortComLog([...lista]);

        console.log("✅ Lista final:", resultado);
        console.log("===========================\n");

        expect(verificaOrdem(resultado)).toBe(true);
    });
});
