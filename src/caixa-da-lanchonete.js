class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        const menu = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50
        };
    
        const extras = ['chantily', 'queijo'];
        const combos = ['combo1', 'combo2'];

        let total = 0;

        let hasSanduiche = false;
        let hasCafe = false;
        let itemInvalido = false;
        let quantidadeInvalida = false;

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }
    
        itens.forEach(pedido => {
            const [key, quantidade] = pedido.split(',');
    
            if (!menu[key]) {
                itemInvalido = true;
                return;
            }

            if (key === 'sanduiche') {
                hasSanduiche = true;
            }

            if (key === 'cafe') {
                hasCafe = true;
            }
    
            if (quantidade <= 0) {
                quantidadeInvalida = true;
                return;
            }
    
            total += menu[key] * quantidade;
        });

        if (itemInvalido) {
            return "Item inválido!";
        }

        if (quantidadeInvalida) {
            return "Quantidade inválida!";
        }

        if (!hasSanduiche && itens.some(item => extras.includes(item.split(',')[0]) && item.split(',')[0] === 'queijo')) {
            return "Item extra não pode ser pedido sem o principal";
        }

        if (!hasCafe && itens.some(item => extras.includes(item.split(',')[0]) && item.split(',')[0] === 'chantily')) {
            return "Item extra não pode ser pedido sem o principal";
        }
    
        if (metodoDePagamento !== 'dinheiro' && metodoDePagamento !== 'credito' && metodoDePagamento !== 'debito') {
            return "Forma de pagamento inválida!";
        }
    
        if (itens.some(item => extras.includes(item.split(',')[0])) && !itens.some(item => !extras.includes(item.split(',')[0]) && !combos.includes(item.split(',')[0]))) {
            return "Item extra não pode ser pedido sem o principal";
        }
    
        if (metodoDePagamento === 'dinheiro') {
            let desconto = total * 0.05;
            return 'R$ ' + (total - desconto).toFixed(2).replace('.', ',');
        }
    
        if (metodoDePagamento === 'credito') {
            let acrescimo = total * 0.03;
            return 'R$ ' + (total + acrescimo).toFixed(2).replace('.', ',');
        }
    
        if (metodoDePagamento === 'debito'){
            return 'R$ ' + total.toFixed(2).replace('.', ',');
        }
    
        return total.toFixed(2);
    }
    

}

export { CaixaDaLanchonete };

