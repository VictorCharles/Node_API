const fetch = require('node-fetch')

function manejaErros(erro) {
    throw new Error(erro.message);
}

async function checaStatus(arrayURls) {
    try {
        //promise async await
        //promise all faz todas as requisições em simultaneo, diferente do async e await
        //.map faz alteração em arrays
        const arrayStatus = await Promise
            .all(arrayURls
                .map(async (url) => {
                    const res = await fetch(url)
                    return `${res.status} - ${res.statusText}`;
                }))
        return arrayStatus
    } catch (erro) {
        manejaErros(erro)
    }
}

function geraArrayURLs(arrayLinks) {
    //loop para cada objeto, e cada objeto tem seu proprio conjunto de chave e valor
    //  pegar um objeto => [valor]
    // Object.values()
    // esse comando tira tudo e joga em uma array dentro da array
    // .join tira da array e transforma tudo em string, ai vira uma string de array
    return arrayLinks
        .map((objetoLink) => Object
            .values(objetoLink).join())
}


async function validaURLs(arrayLinks) {
    const links = geraArrayURLs(arrayLinks);
    const statusLinks = await checaStatus(links);

    const resultados = arrayLinks.map((objeto, indice) => ({
        ...objeto,
        status: statusLinks[indice]
    }))

    return resultados
}

module.exports = validaURLs