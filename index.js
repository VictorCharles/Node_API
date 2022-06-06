const chalk = require('chalk')

const fs = require('fs');

function extraiLinks(texto) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^\$#\s].[^\s]*)\)/gm
    const arrayResultados = [];
    let temp;
    while ((temp = regex.exec(texto)) !== null) {
        arrayResultados.push({ [temp[1]]: temp[2] }) // separa em objetos o resultado do regex e os agrupa em uma array
    }
    return arrayResultados.length === 0 ? 'não há links' : arrayResultados;
}

function trataErro(erro) {
    throw new Error(chalk.blue(erro.code, 'não há arquivo no caminho'))
}

async function pegaArquivo(caminhoDoArquivo) {
    const encoding = 'utf-8'
    try {
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        return (extraiLinks(texto))
    }
    catch (erro) {
        trataErro(erro)
    }
}
// // função assincrona
// function pegaArquivo(caminhoDoArquivo: any) {
//     const encoding: any = 'utf-8'
//     fs.promises
//         .readFile(caminhoDoArquivo, encoding)
//         .then((texto: string) => console.log(chalk.green(texto)))
//         .catch((erro: any) => trataErro(erro))
// }

// //função sincrona
// function pegaArquivo(caminhoDoArquivo: string) {
//     const encoding: any = 'utf-8'
//     fs.readFile(caminhoDoArquivo, encoding, (erro: any, texto: any) => {
//         if (erro) {
//             trataErro(erro);
//         }
//         console.log(chalk.green(texto))

//     })
// }

// pegaArquivo('./arquivos/texto1.md')

module.exports = pegaArquivo;