function buscarPrevisao() {
    // Limpa o conteúdo atual do resultado
    document.getElementById('weather-result').innerHTML = '';

    // Obtém os valores inseridos pelo usuário
    var cidade = document.getElementById('cityInput').value;
    var apiKey = document.getElementById('apiKeyInput').value;

    // URL da API OpenWeatherMap para buscar a previsão do tempo para os próximos 5 dias
    var url = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`;

    // Faz a requisição GET para a API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Verifica se a requisição foi bem-sucedida
            if (data.cod === '200') {
                // Filtra os dados para obter a previsão para os próximos 5 dias
                var previsoes = data.list;

                // Cria um objeto para armazenar as temperaturas mínimas e máximas por dia
                var previsoesPorDia = {};

                previsoes.forEach(previsao => {
                    var dataHora = new Date(previsao.dt * 1000);
                    var dia = dataHora.getDate();
                    var hora = dataHora.getHours();
                    var temperatura = previsao.main.temp;

                    // Verifica se já existe um registro para esse dia
                    if (!previsoesPorDia[dia]) {
                        // Se não existir, inicializa as temperaturas mínima e máxima
                        previsoesPorDia[dia] = {
                            minima: temperatura,
                            maxima: temperatura
                        };
                    } else {
                        // Se já existir, atualiza as temperaturas mínima e máxima
                        if (temperatura < previsoesPorDia[dia].minima) {
                            previsoesPorDia[dia].minima = temperatura;
                        }
                        if (temperatura > previsoesPorDia[dia].maxima) {
                            previsoesPorDia[dia].maxima = temperatura;
                        }
                    }
                });

                // Cria o HTML para exibir as previsões
                var resultadoHTML = `<h2>Previsão do Tempo para os Próximos 5 Dias em ${data.city.name}</h2>`;
                resultadoHTML += '<div class="previsoes-container">';

                for (var dia in previsoesPorDia) {
                    resultadoHTML += `
                        <div class="previsao-item">
                            <p><strong>Dia ${dia}</strong></p>
                            <p><strong>Temperatura Mínima:</strong> ${previsoesPorDia[dia].minima} °C</p>
                            <p><strong>Temperatura Máxima:</strong> ${previsoesPorDia[dia].maxima} °C</p>
                        </div>
                    `;
                }

                resultadoHTML += '</div>';

                // Insere o resultado no elemento weather-result
                document.getElementById('weather-result').innerHTML = resultadoHTML;
                
            } else {
                // Exibe uma mensagem de erro se a cidade não for encontrada ou outro erro ocorrer
                document.getElementById('weather-result').innerHTML = `<p>Erro: ${data.message}</p>`;
            }
        })
        .catch(error => {
            // Exibe uma mensagem de erro caso ocorra algum problema na requisição
            document.getElementById('weather-result').innerHTML = `<p>Erro na requisição: ${error.message}</p>`;
        });
}