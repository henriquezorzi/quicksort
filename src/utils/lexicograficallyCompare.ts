/**
 * Função que compara dois valores de forma lexicográfica (como strings)
 * @param a 
 * @param b 
 * @returns número negativo se a < b, 0 se iguais, positivo se a > b
 */
export function lexicograficallyCompare(a: any, b: any): number {
    // undefined vai para o final
    if (a === undefined && b === undefined) return 0;
    if (a === undefined) return 1;
    if (b === undefined) return -1;

    // Converte ambos para string para comparação "lexicográfica"
    const strA = String(a);
    const strB = String(b);

    if (strA < strB) return -1;
    if (strA > strB) return 1;
    return 0;
}
