function buscarPrevisao() {
    // Limpa o conteúdo atual do resultado
    document.getElementById('weather-result').innerHTML = '';

    // Obtém os valores inseridos pelo usuário
    var cidade = document.getElementById('cityInput').value;
    var apiKey = document.getElementById('apiKeyInput').value;

    // URL da API OpenWeatherMap para buscar a previsão do tempo atual por cidade
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`;

    // Faz a requisição GET para a API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Verifica se a requisição foi bem-sucedida
            if (data.cod === 200) {
                // Formata os dados relevantes para exibição
                var temperatura = data.main.temp;
                var descricao = data.weather[0].description;
                var cidadeNome = data.name;

                // Cria o HTML para exibição do resultado
                var resultadoHTML = `
                    <h2>Previsão do Tempo para ${cidadeNome}</h2>
                    <p><strong>Temperatura:</strong> ${temperatura} °C</p>
                    <p><strong>Descrição:</strong> ${descricao}</p>
                `;

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
