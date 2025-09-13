import { describe, expect, test } from "vitest";
import { quickSort } from "../src/quicksort"; 

// Funções auxiliares mantidas
function gerarLista(tamanho: number) {
    const lista: number[] = [];
    for (let i = 0; i < tamanho; i++) {
        lista.push(Math.floor(Math.random() * tamanho));
    }
    return lista;
}

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
        const lista = [6, 1, 9, 4, 2, 7];
        console.log("\n===========================================");
        console.log("  Iniciando QuickSort com a lista:", lista.join(", "));
        console.log("===========================================\n");

        function quickSortComLog(arr: number[], left = 0, right = arr.length - 1): void {
            if (left >= right) {
                return;
            }

            const pivot = arr[right];
            let i = left - 1;

            // Destacar o subarray com o pivô em evidência
            const subarrayVisualizacao = arr.slice(left, right + 1);
            const pivotPosicao = subarrayVisualizacao.length - 1;
            const subarrayComPivot = subarrayVisualizacao.map((val, idx) => 
                idx === pivotPosicao ? `[${val}]` : val.toString()
            ).join(", ");

            console.log(`  > Particionando subarray: [${subarrayComPivot}]`);
            console.log(`  > PIVÔ ESCOLHIDO: ${pivot} (última posição do subarray)`);
            console.log(`  > Comparando todos os elementos com o pivô ${pivot}:`);

            let trocas = 0;
            for (let j = left; j < right; j++) {
                if (arr[j] < pivot) {
                    i++;
                    const valorAtual = arr[j];
                    const valorTroca = arr[i];
                    
                    // Só mostra a troca se realmente houver mudança
                    if (i !== j) {
                        [arr[i], arr[j]] = [arr[j], arr[i]];
                        console.log(`    + ${valorAtual} < ${pivot} (pivô) → Troca: ${valorAtual} <-> ${valorTroca} → [${arr.join(", ")}]`);
                    } else {
                        [arr[i], arr[j]] = [arr[j], arr[i]];
                        console.log(`    + ${valorAtual} < ${pivot} (pivô) → Já na posição correta → [${arr.join(", ")}]`);
                    }
                    trocas++;
                } else {
                    console.log(`    - ${arr[j]} >= ${pivot} (pivô) → Fica à direita do pivô`);
                }
            }

            const novoPivotIndex = i + 1;
            const valorPivotPosicao = arr[novoPivotIndex];
            
            if (trocas === 0) {
                console.log(`    INFO: Nenhum elemento menor que ${pivot} foi encontrado`);
                console.log(`    INFO: Todos os elementos (${arr.slice(left, right).join(", ")}) são >= ${pivot}`);
            }
            
            [arr[novoPivotIndex], arr[right]] = [arr[right], arr[novoPivotIndex]];
            
            // Destacar onde o pivô ficou posicionado
            const arrayComPivotFinal = arr.map((val, idx) => 
                idx === novoPivotIndex ? `[${val}]` : val.toString()
            ).join(", ");
            
            console.log(`    > Posicionando PIVÔ ${pivot} na posição ${novoPivotIndex} → [${arrayComPivotFinal}]`);
            
            const subarraySize = right - left + 1;
            if (novoPivotIndex === left) {
                console.log(`    → Pivô ${pivot} é o MENOR do subarray, vai para o INÍCIO (posição ${novoPivotIndex})`);
            } else if (novoPivotIndex === right) {
                console.log(`    → Pivô ${pivot} é o MAIOR do subarray, vai para o FIM (posição ${novoPivotIndex})`);
            } else {
                console.log(`    → Pivô ${pivot} fica entre menores e maiores (posição ${novoPivotIndex})`);
            }
            console.log();

            quickSortComLog(arr, left, novoPivotIndex - 1);
            quickSortComLog(arr, novoPivotIndex + 1, right);
        }

        const listaParaOrdenar = [...lista];
        quickSortComLog(listaParaOrdenar);

        console.log("===========================================");
        console.log("  Processo concluído. Lista final:", listaParaOrdenar.join(", "));
        console.log("===========================================\n");

        expect(verificaOrdem(listaParaOrdenar)).toBe(true);
    });
});