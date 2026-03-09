// Função principal para gerar CPF
function gerarCPF() {
    // Gerar 9 dígitos aleatórios
    let cpf = [];
    for (let i = 0; i < 9; i++) {
        cpf.push(Math.floor(Math.random() * 10));
    }

    // Calcular primeiro dígito verificador
    let digito1 = calcularDigito(cpf, 10);
    cpf.push(digito1);

    // Calcular segundo dígito verificador
    let digito2 = calcularDigito(cpf, 11);
    cpf.push(digito2);

    // Verificar se o CPF não é inválido (todos dígitos iguais)
    if (cpf.every(digito => digito === cpf[0])) {
        return gerarCPF(); // Recursão para gerar outro CPF
    }

    // Formatar CPF
    let cpfFormatado = formatarCPF(cpf);
    
    // Atualizar display
    document.getElementById('cpfGerado').textContent = cpfFormatado;
    
    // Validar o CPF gerado
    validarCPFGerado(cpf.join(''));
    
    return cpfFormatado;
}

// Função para calcular dígitos verificadores
function calcularDigito(cpf, peso) {
    let soma = 0;
    for (let i = 0; i < cpf.length; i++) {
        soma += cpf[i] * (peso - i);
    }
    
    let resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
}

// Função para formatar CPF
function formatarCPF(cpfArray) {
    let cpfStr = cpfArray.join('');
    return cpfStr.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

// Função para validar CPF completo
function validarCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, '');
    
    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpf)) return false;
    
    // Valida primeiro dígito
    let cpfArray = cpf.split('').map(Number);
    let digito1 = calcularDigito(cpfArray.slice(0, 9), 10);
    if (digito1 !== cpfArray[9]) return false;
    
    // Valida segundo dígito
    let digito2 = calcularDigito(cpfArray.slice(0, 10), 11);
    if (digito2 !== cpfArray[10]) return false;
    
    return true;
}

// Função para validar CPF gerado e mostrar status
function validarCPFGerado(cpf) {
    let isValid = validarCPF(cpf);
    let statusDiv = document.getElementById('validationStatus');
    
    statusDiv.style.display = 'block';
    statusDiv.className = 'validation-status ' + (isValid ? 'valid' : 'invalid');
    statusDiv.textContent = isValid ? 
        '✅ CPF VÁLIDO! (Gerado com sucesso)' : 
        '❌ CPF INVÁLIDO (Erro na geração)';
    
    if (isValid) {
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 5000);
    }
}

// Função para copiar CPF
function copiarCPF() {
    let cpf = document.getElementById('cpfGerado').textContent;
    
    // Verifica se é um CPF válido (não é o placeholder)
    if (cpf === '000.000.000-00') {
        alert('⚠️ Gere um CPF primeiro!');
        return;
    }
    
    navigator.clipboard.writeText(cpf).then(() => {
        alert('✅ CPF copiado para a área de transferência!');
    }).catch(() => {
        alert('❌ Erro ao copiar. Tente novamente.');
    });
}

// Função para sugerir validadores externos
function testarComValidadoresExternos() {
    let cpf = document.getElementById('cpfGerado').textContent;
    if (cpf !== '000.000.000-00') {
        let cpfNumeros = cpf.replace(/[^\d]/g, '');
        let mensagem = '🔍 Para testar este CPF em validadores online:\n\n';
        mensagem += '🌐 4Devs: https://www.4devs.com.br/validador_cpf\n';
        mensagem += '🌐 Gerador de CPF: https://www.geradordecpf.org/validador-cpf\n';
        mensagem += '🌐 Receita Federal: https://servicos.receita.fazenda.gov.br/servicos/cpf/consultasituacao/consultapublica.asp\n\n';
        mensagem += `📋 CPF para testar: ${cpf}`;
        alert(mensagem);
        
        // Abrir um validador em nova aba (opcional)
        if (confirm('Deseja abrir o validador do 4Devs?')) {
            window.open('https://www.4devs.com.br/validador_cpf', '_blank');
        }
    } else {
        alert('Gere um CPF primeiro!');
    }
}

// Função para gerar CPF com formatação específica (estados)
function gerarCPFComEstado(estado) {
    // Tabela de dígitos do 9º dígito por estado
    const estados = {
        'AC': 2, 'AL': 4, 'AP': 2, 'AM': 2, 'BA': 5, 'CE': 3, 'DF': 1, 'ES': 7,
        'GO': 1, 'MA': 3, 'MT': 1, 'MS': 1, 'MG': 6, 'PA': 2, 'PB': 4, 'PR': 7,
        'PE': 4, 'PI': 3, 'RJ': 7, 'RN': 4, 'RS': 0, 'RO': 2, 'RR': 2, 'SC': 9,
        'SP': 8, 'SE': 5, 'TO': 1
    };
    
    if (!estados[estado]) {
        alert('Estado inválido!');
        return gerarCPF();
    }
    
    // Gerar 8 primeiros dígitos aleatórios
    let cpf = [];
    for (let i = 0; i < 8; i++) {
        cpf.push(Math.floor(Math.random() * 10));
    }
    
    // Adicionar dígito do estado como 9º dígito
    cpf.push(estados[estado]);
    
    // Calcular dígitos verificadores
    let digito1 = calcularDigito(cpf, 10);
    cpf.push(digito1);
    
    let digito2 = calcularDigito(cpf, 11);
    cpf.push(digito2);
    
    // Formatar e exibir
    let cpfFormatado = formatarCPF(cpf);
    document.getElementById('cpfGerado').textContent = cpfFormatado;
    validarCPFGerado(cpf.join(''));
    
    return cpfFormatado;
}

// Inicializar com um CPF válido
window.onload = function() {
    gerarCPF();
    
    // Adicionar evento de tecla para atalho (opcional)
    document.addEventListener('keydown', function(e) {
        // Ctrl + G para gerar novo CPF
        if (e.ctrlKey && e.key === 'g') {
            e.preventDefault();
            gerarCPF();
        }
        // Ctrl + C para copiar (já é padrão do navegador)
    });
};

// Exportar funções para uso global (útil para debugging)
window.gerarCPF = gerarCPF;
window.copiarCPF = copiarCPF;
window.testarComValidadoresExternos = testarComValidadoresExternos;
window.gerarCPFComEstado = gerarCPFComEstado;
