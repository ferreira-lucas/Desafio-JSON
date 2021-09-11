const fs = require('fs')
const { compileFunction } = require('vm')
const caminho = __dirname + '/listaFuncionarios.json'

fs.readFile(caminho, 'utf-8', (err, conteudo) => {
    const arquivo = JSON.parse(conteudo)
    let lista = arquivo.map(json => json)
    let chinesas = new Array
    let brasileiras = new Array
    
    for(i in lista){
        if(lista[i].genero == 'F' && lista[i].pais == 'China'){
            chinesas.push(lista[i])
        }else if(lista[i].genero == 'F' && lista[i].pais == 'Brazil'){
            brasileiras.push(lista[i])
        }
    }

    let maiorChinesa = chinesas[0], menorChinesa = chinesas[0]
    let maiorBrasileira = brasileiras[0], menorBrasileira = brasileiras[0]

    for(i in chinesas){
        if(chinesas[i].salario > maiorChinesa.salario){
            maiorChinesa = chinesas[i]
        }
        if(chinesas[i].salario < menorChinesa.salario){
            menorChinesa = chinesas[i]
        }
    }

    for(i in brasileiras){
        if(brasileiras[i].salario > maiorBrasileira.salario){
            maiorBrasileira = brasileiras[i]
        }
        if(brasileiras[i].salario < menorBrasileira.salario){
            menorBrasileira = brasileiras[i]
        }
    }
    console.log(`Chinesa com maior salário: ${maiorChinesa.nome} : R$${maiorChinesa.salario}`)
    console.log(`Chinesa com menor salário: ${menorChinesa.nome} : R$${menorChinesa.salario}`)
    console.log(`Brasileira com maior salário: ${maiorBrasileira.nome} : R$${maiorBrasileira.salario}`)
    console.log(`Brasileira com menor salário: ${menorBrasileira.nome} : R$${menorBrasileira.salario}`)
    console.log()

    let resultado = new Array
    resultado.push(maiorChinesa, menorChinesa, maiorBrasileira, menorBrasileira)

    fs.writeFile(__dirname + '/funcionariosFiltrados.json', JSON.stringify(resultado), (err, conteudo) => {
        console.log(err || 'Arquivo salvo!')
    })
})