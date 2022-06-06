const pegaArquivo = require('../index');

const arrayResult = [
    {
        FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList'
    }

]


describe('pegaArquivo::', () => {
    it('deve ser uma função', () => {
        expect(typeof pegaArquivo).toBe('function') // compara os mesmo tips
    })
    it('deve retornar array com resultados', async () => {
        const resultados = await pegaArquivo('./test/arquivos/texto1.md')
        expect(resultados).toEqual(arrayResult) // compara os dados até dentro da array
    })
    it('deve retornar mensagem "Não há links"', async () => {
        const resultado = await pegaArquivo('./test/arquivos/texto1_semlinks.md')
        expect(resultado).toBe('não há links') // compara se o expect é o texto que ta em toBe
    })
    it('deve lançar um erro na falta de arquivo', async () => {
        await expect(pegaArquivo('./test/arquivo')).rejects.toThrow('não há arquivo no caminho')// verifica de forma assíncrona se uma promessa é rejeitada e resulta em um lançamento de erro
    })
    it('deve resolver a função com sucesso', async () => {
        await expect(pegaArquivo('./test/arquivos/texto1.md')).resolves.toEqual(arrayResult)
    })
})